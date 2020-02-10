const moongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const DevSchema = new moongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    skills: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    } ,

});

module.exports = moongoose.model('Dev', DevSchema);
