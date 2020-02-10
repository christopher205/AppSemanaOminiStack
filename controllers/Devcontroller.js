const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringparseArray = require('../utils/parseStringparseArray');
const { findConnections, sendMessage } = require('../webSocket')


module.exports = {

    async index(_, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store (request, response) {
        const { github_username, skills, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, avatar_url, bio} = apiResponse.data;
    
        const skillsArray = parseStringparseArray(skills);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
            
        };
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            skills: skillsArray,
            location,
        })

        const sendSocketMessageTo = findConnections( 
            {latitude, longitude},
        skillsArray,
        )
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }  
        return response.json(dev);
    }    

};