const { expect } = require('chai');
const loginApi = require('../api/login_api');
const clinicApi = require('../api/clinic_api');

const users = require('../data/users.json');


describe('Clinic', async function () {
    it('should not get all emails without permissions', async function () {
        const login = await loginApi.login(users.gianna);
        const response = await clinicApi.getAllEmails(login.data.session.token);

        expect(response.data.message).to.equal('An error happened');
        expect(response.data.error).to.equal('Error: User does not have permissions');
    });

    it('should get clinic veterinary search results', async function () {
        const login = await loginApi.login(users.gianna);
        const response = await clinicApi.search('veterinary', login.data.session.token);
        expect(response.data.displayName).to.equal('Continental Veterinary Clinic, Los Angelec, CA');
        expect(response.data.displayName).to.equal('Third Transfer Veterinary Clinic, Los Angelec, CA');
    });

    it('should not get clinic veterinary search results when not authenticated', async function () {
        const response = await clinicApi.search('veterinary');

        expect(response.data.message).to.equal('You need to be authorized for this action.');
    });
});