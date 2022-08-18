const client = require('../client/client');

class Login extends client {
    async login(credentials) {
        const body = { email: credentials.email, password: credentials.password }
        const response = await this.post('/auth', body);

        return response;
    }
}

module.exports = new Login();