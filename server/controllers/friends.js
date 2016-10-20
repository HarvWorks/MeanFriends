////////////////////////////////////////////////////////////
//                   Importing Mongoose                   //
////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var mongoose_friends = mongoose.model('mongoose_friend');

////////////////////////////////////////////////////////////
//                   Friends Controller                   //
////////////////////////////////////////////////////////////

module.exports = {

    index: function(req, res) {
        mongoose_friends.find({}, function(err, people) {
            if(err){
                res.json("Error");
            }
            else {
                res.json(people);
            }
        });
    },

    create: function(req, res) {
        var mongoose_friend = new mongoose_friends(req.body);
        mongoose_friend.save(function(err) {
            if(err) {
                res.json("Error");
            }
            else {
                res.json("Success!");
            }
        });
    },

    update: function(req, res) {
        mongoose_friends.findOne({_id: req.params.id},function(err, person) {
            if(err) {
                res.json("Error");
            }
            else {
                console.log(req.body);
                person.name = req.body.name;
                person.birthday = req.body.birthday;
                person.save(function(err, updated) {
                    if(err) {
                        res.json("Error");
                    }
                    else {
                        res.json(updated);
                    }
                });
            }
        });
    },

    delete: function(req, res) {
        mongoose_friends.remove({_id: req.params.id}, function(err) {
            if(err) {
                res.json("Error");
            }
            else {
                res.json("Success!");
            }
        });
    },

    show: function(req, res) {
        mongoose_friends.findOne({_id: req.params.id},function(err, person) {
            if(err) {
                res.json("Error");
            }
            else {
                res.json(person);
            }
        });
    }
};
