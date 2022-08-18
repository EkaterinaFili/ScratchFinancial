const { expect } = require('chai');
const loginApi = require('../api/login_api');

const users = require('../data/users.json');


describe('Login', async function () {
    it('should not login without credentials', async function () {
        const response = await loginApi.login({email: '', password: ''});

        expect(response.data.ok).to.equal(false);
        expect(response.data.data.message).to.equal('Invalid login credentials');
    });

    it('should not login with invalid credentials', async function () {
        const credentials = { email: 'gianna@hightable.test', password: 'fakePass' }
        const response = await loginApi.login(credentials);

        expect(response.data.ok).to.equal(false);
        expect(response.data.data.message).to.equal('Invalid login credentials');
    });

    it('should login with correct password', async function () {
        const credentials = { email: 'gianna@hightable.test', password: 'thedantonio1' }
        const response = await loginApi.login(credentials);

        expect(response.data.session.loggedIn).to.equal(true);
        expect(typeof response.data.session.loggedInAt).to.equal('number');
        expect(typeof response.data.session.userId).to.equal('number');
        expect(response.data.session.role).to.equal('clinic');
        expect(response.data.session.key.length).to.be.greaterThan(5);
        expect(response.data.session.token.length).to.greaterThan(20);
    });

    it('should have session expiration = 604800000', async function () {
        const credentials = { email: users.gianna.email, password: users.gianna.password }
        const response = await loginApi.login(credentials);

        expect(response.data.session.expiresIn).to.equal(604800000);
    });

    it('should have expected permissions upon login', async function () {
        const credentials = { email: users.gianna.email, password: users.gianna.password }
        const response = await loginApi.login(credentials);

        expect(response.data.permissions).to.deep.equal(users.gianna.permissions);
    });
});