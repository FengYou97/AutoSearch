// This Serves as a template with notes - Please review the Final post on GitHub for FULL requirements

// IF your custom node module correctly for the midterm - then no updates are needed.
// IF you did NOT do your custom node module correctly for the midterm - update it so it meet requirements (outlined in the Final.md).

// Export a method for API search
// Export a method for API fetch by id
// This are most likely 2 different URLs (one for searching and the other to fetch by a unique identifier)

// If you API has Authentication - you would handle it here too.

const config = require('./config');
const superagent = require('superagent');

// return required data matching name
const find = async name => {
    const carsSearchURL = `${config.url}/GetVehicleTypesForMake/${name}?format=json`;
    try {
        const carsSearchResponse = await superagent.get(carsSearchURL);
        return carsSearchResponse.body;
    } catch (error) {
        return error;
    }
}

// return required data matching ID
const fetch = async id => {
    const carFetchURL = `${config.url}/GetVehicleTypesForMakeId/${id}?format=json`;
    // console.log(carFetchURL);
    try {
        const carsFetchResponse = await superagent.get(carFetchURL);
        return carsFetchResponse.body;
    } catch (error) {
        return error;
    }
}

// exporting find and fetch methods
module.exports = {
    find,
    fetch
}