const Dev = require('../models/Dev')
const parseStringparseArray = require('../utils/parseStringparseArray')
module.exports = {
    async index(request, response) {
        const { latitude, longitude, skills } = request.query;
        

        const skillsArray = parseStringparseArray(skills);

        const devs = await Dev.find( {
            skills: {
                $in: skillsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: `Point`,
                        coordinates: [longitude, latitude],

                    },
                    $maxDistance: 10000,
                },
            }
        });

        return response.json( { devs });
    }
}