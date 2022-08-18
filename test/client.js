const axios = require('axios');

const baseUrl = process.env.BASE_URL;


class ClientApi {
    async get(path, body) {
        let response;

        try{
            response = await axios.get(baseUrl + path, body);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }

    async post(path, body) {
        let response;

        try{
            response = await axios.post(baseUrl + path, body);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }

    async put(path, body) {
        let response;

        try{
            response = await axios.put(baseUrl + path, body);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }

    async delete(path) {
        let response;

        try{
            response = await axios.delete(baseUrl + path);
        }
        catch(error){
            response = error.response;
        }

        return response;
    }
};
module.exports = new ClientApi();