
module.exports = (app) =>{
    app.use("/api/users", require("./api/users/user"))

}