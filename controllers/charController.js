const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db.Char
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Char
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Char
            .create(req.body)
            .then(dbModle => {
                console.log(dbModle.user);
                console.log(dbModle._id);
                db.User.findOneAndUpdate({ userName: dbModle.user }, { $push: { chars: dbModle._id } }, { new: true })
                    .then(dbUser => console.log(dbUser));
            })
            .then(dbModle => { res.json(dbModle) })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Char
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Char
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
