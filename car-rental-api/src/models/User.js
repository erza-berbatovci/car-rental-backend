const { ObjectId } = require("mongodb");

class User {
    constructor(fullName, email, username, password) {
        this._id = new ObjectId();
        this.fullName = fullName;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

module.exports = User;
