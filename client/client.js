const axios = require('axios');
const baseUrl = process.env.BASE_URL;


class ClientApi {
    async get(path, token=null) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let response;

        if (token) {
            try {
                response = await axios.get(baseUrl + path, config);
            }
            catch (error) {
                return error.response.data;
            }
        }
        else {
                try {
                    response = await axios.get(baseUrl + path, config);
                }
                catch (error) {
                    return error.response.data;
                }
        }

        return response.data;
    }

    async post(path, body) {
        let response;

        try {
            response = await axios.post(baseUrl + path, body);
        }
        catch (error) {
            return error.response;
        }

        return response.data;
    }

    async put(path, body) {
        let response;

        try {
            response = await axios.put(baseUrl + path, body);
        }
        catch (error) {
            return error.response;
        }

        return response.data;
    }

    async delete(path) {
        let response;

        try {
            response = await axios.delete(baseUrl + path);
        }
        catch (error) {
            return error.response;
        }

        return response.data;
    }
};
module.exports = ClientApi;