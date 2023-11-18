const usersSchema = require("./user.model")
const verifyToken = require("../../middleware/auth"); 
const jwt = require("jsonwebtoken");
const jwtSecret = 'danish';


const postSignup = async (req, res) => {
  const alphabeticRegex = /^[A-Za-z]+$/;
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
    } = req.body;
    if(!firstName || !lastName || !email || !country || !state || !city || !gender || !dateOfBirth ){
      return res.status(401).json({message: "All fields are required!."})
    }
    if(!firstName || !alphabeticRegex.test(firstName) || !lastName || !alphabeticRegex.test(lastName) ){
      return res.status(401).json({message: "First name and Last Name should be Alphabetical!"});
    }

 if (!isValidEmail(email)) {
      return res
        .status(401)
        .json({ message: "Please provide a valid email address!" });
    }

    const dob = new Date(dateOfBirth);
    const today = new Date();
    const ageDifference = today.getFullYear() - dob.getFullYear();

    if (ageDifference < 14) {
      return res.status(401).json({ message: "You must be older than 14 years!" });
    }

    // Create a new user instance using your User model/schema
    const newUser = new usersSchema({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age:ageDifference,
    });
    console.log(newUser,"body")

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: 'Failed to register user' });
  }
}

const all_user = async (req, res) => {
  try {
    const allUsers = await usersSchema.find();
    const userEmail = req.email;

    res.status(200).json({
      message: 'User profile fetched successfully',
      email: userEmail,
      users: allUsers 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists by email
    const user = await usersSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a JWT token for authentication based on user's email
    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log("Deleting user with ID:", userId);

    // Find and delete the user by ID
    const user = await usersSchema.findOneAndDelete({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

  module.exports = {
    postSignup,
    login,
    all_user,
    verifyToken,
    deleteUser
  }