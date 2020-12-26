const db = require("../index");
const hash = require("password-hash")
const User = db.user;
const Role = db.role
const noRoleId = "5fe6430d870d0a130f1bab6b"

// Fetch user
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .populate("articles")
        .populate("role")
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Not found User with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving User with id=${id}` });
        });
};

// Fetch users
exports.findAll = (req, res) => {
    User.find()
        .populate("articles")
        .populate("role")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users"
            });
        });
};

// Register User
exports.register = (req, res) => {
    const userParams = req.body;

    const user = new User({
        login: userParams.login,
        password: hash.generate(userParams.password),
        firstName: userParams.firstName,
        lastName: userParams.lastName,
        about: "",
        avatar: userParams.avatar,
        articles: [],
        role: noRoleId
    });

    user.save(user)
        .then(data => {
            Role.findByIdAndUpdate(noRoleId, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({ message: `Error retrieving Role with id=${noRoleId}` });
                });
            res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the User"
                });
        });
};

// Update user
exports.update = (req, res) => {
    const id = req.params.id;
    const user = req.body
    const currentRole = user.currentRole
    const newRole = user.data.role

    User.findByIdAndUpdate(id, user.data, { useFindAndModify: false })
        .then(data => {
            if (currentRole !== newRole) {
                Role.findByIdAndUpdate(newRole, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                    .then(resp => {
                        Role.findByIdAndUpdate(currentRole, { $pull: { users: data.id } }, { useFindAndModify: false })
                            .then(resp => {
                                res.send(data)
                            })
                            .catch(err => {
                                res
                                    .status(500)
                                    .send({
                                        message: err.message || "Some error occurred while updating the Role"
                                    });
                            });
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while updating the Role"
                            });
                    });
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error updating User with id=" + id });
        });
}

// Login User
exports.login = (req, res) => {
    const user = req.body
    const login = user.login
    const password = user.password
    User.findOne({ login: login })
        .populate("articles")
        .populate("role")
        .then(data => {
            if (!data || !hash.verify(password, data.password)) {
                res
                    .status(404)
                    .send({ message: 'Wrong email or password' })
            }
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving User with login=${login}`});
        });
}