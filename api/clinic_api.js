const client = require('../client/client');

class Clinic extends client {
    async getAllEmails(token) {
        if(!token) throw Error('getAllEmails: Token is required fields');

        const response = await this.get('/clinics/2/emails', token);

        return response;
    }

    async search(searchTerm, token) {
        const response = await this.get(`/clinics?term=${searchTerm}`, token);
        
        return response;
    }
}

module.exports = new Clinic();