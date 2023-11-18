import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import './alldata.css'; // Import the external CSS file

export default function AllData() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
  
        const response = await fetch('http://localhost:5000/api/users/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        setUserData(data.users);

        // Assuming data contains user information after successful login
        if (data && data.users && data.users.length > 0) {
          const loggedInUser = data.users.find(user => user.loggedIn === true); // Adjust this based on your API response structure
          if (loggedInUser) {
            setUserName(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  
  // Rest of your code remains unchanged...

  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Data</h1>
      {userName && <h1>Welcome: {userName}</h1>}

      {/* <div style={{ margin: 100, display: "flex", justifyContent: "space-around", flexWrap: "wrap", flexDirection: "row" }}> */}
        {/* Rest of your code */}
      {/* </div> */}
      <div style={{ margin: 100, display: "flex", justifyContent: "space-around", flexWrap: "wrap", flexDirection: "row" }}>
      {userData &&
        userData.map((user) => (
          <Card key={user.id} raised={true} className="card" sx={{ bgcolor: "#E8E8E8", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px',marginTop:"30px" }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
              <h1 style={{ margin: '5px 0' }}>{user.firstName} {user.lastName}</h1>
              <h3 style={{ margin: '3px 0' }}>ID: {user._id}</h3>
              <h4 style={{ margin: '3px 0' }}>Email: {user.email}</h4>
              <h4 style={{ margin: '3px 0' }}>Country: {user.country}</h4>
              <h4 style={{ margin: '3px 0' }}>State: {user.state}</h4>
              <h4 style={{ margin: '3px 0' }}>City: {user.city}</h4>
              <h4 style={{ margin: '3px 0' }}>Age: {user.age}</h4>
              <h4 style={{ margin: '3px 0' }}>Gender: {user.gender}</h4>
            </CardContent>
            <CardActions>
              {/* <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
                Delete
              </Button> */}
            </CardActions>
          </Card>
        ))}
    </div>
    </>
  );
}
