const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

let signupuser = async (request, response) => {
    let { Username, Email, Password } = request.body;

    if (!Username || !Email || !Password) {
        return response.status(400).json({
            message: "Please fill all the fields"
        });
    }

    try {
        let expectedAdminEmail = `${Username}.Admin@gmail.com`;
        let role = "user";
        if (Email.toLowerCase().includes("admin") && !Email.includes(".Admin")) {
            return response.status(400).json({
                message: "Invalid Email! If you're trying to create Admin, use '.Admin' with dot & capital A."
            });
        }
        if (Email.includes(".Admin") && Email !== expectedAdminEmail) {
            return response.status(400).json({
                message: `Invalid Admin Email! Correct format: ${expectedAdminEmail}`
            });
        }
        if (Email === expectedAdminEmail) {
            role = "Admin";
        }
        bcrypt.hash(Password, 10, async (err, hash) => {
            if (err) {
                return response.status(400).json({
                    message: err.message
                });
            }
            if (hash) {
                let user = {
                    Username,
                    Email,
                    role,
                    Password: hash
                };
                jwt.sign({ user }, "kcsxsx", { expiresIn: "5h", algorithm: 'HS256' }, function (err, token) {
                    if (err) {
                        response.status(400).json({
                            message: err.message
                        })
                    }
                    return response.cookie("Verificationtokent", token).status(200).json({
                        message: role === "Admin" ? "Admin user created successfully" : "User registered successfully",
                        user: { Username, Email, role, Password: hash },
                        token
                    });
                });
            }
        });

    } catch (error) {
        return response.status(400).json({
            message: error.message
        });
    }
};


let signinuser = async (request, response) => {
    let { Email, Password } = request.body;
    if (!Email || !Password) {
        return response.status(400).json({
            message: "Please fill the all feilds"
        })
    }

    try {
        if (Email !== request.User.Email) {
            return response.status(401).json({
                message: "Invalid Email!"
            });
        }
        bcrypt.compare(Password, request.User.Password, function (err, result) {
            if (err) {
                return response.status(400).json({
                    message: err.message
                })
            }
            if (!result) {
                return response.status(401).json({
                    message: "Invalid Password!"
                });
            }
            return response.status(200).json({
                message: "Login Successful",
                user: request.User,
                token: request.cookies.Verificationtokent
            });
        });
    } catch (error) {
        return response.status(400).json({
            message: error.message
        })
    }
}

module.exports = { signupuser, signinuser };
