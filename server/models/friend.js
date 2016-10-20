////////////////////////////////////////////////////////////
//                   Require Mongoose                     //
////////////////////////////////////////////////////////////

var mongoose = require('mongoose');

////////////////////////////////////////////////////////////
//                         Schemas                        //
////////////////////////////////////////////////////////////

var friendSchema = new mongoose.Schema({
    name: {type:String, required: true},
    birthday: {type:Date, required: true},
},
{
    timestamps: true
});

////////////////////////////////////////////////////////////
//             Attaching Schemas to the Model             //
////////////////////////////////////////////////////////////

mongoose.model('mongoose_friend', friendSchema);

////////////////////////////////////////////////////////////
//           Passing Model to the Controllers             //
////////////////////////////////////////////////////////////

var mongoose_friend = mongoose.model('mongoose_friend');

console.log("model file is working");