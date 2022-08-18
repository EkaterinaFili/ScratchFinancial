const client = require('./client');
const { assert, expect } = require('chai');


describe('Business date', async function () {
    describe('GET Business date', async function () {
        it('should return ok for business dates', async function () {
            const response = await client.get('/isBusinessDay', { params: { date: '2022-08-17T10:10:10Z' } });

            expect(response.status).to.equal(200);
            assert.isTrue(response.data.ok === true, 'Response did not contain {ok: true}');
            assert.isTrue(response.data.results === true, 'Business dates should return {results: true}');
        });

        it('should throw error message if no date passed', async function () {
            const response = await client.get('/isBusinessDay');

            expect(response.status).to.equal(200);
            expect(response.data.errorMessage).to.equal('A valid date is required')
            expect(response.data.ok).to.equal(false)
        });

        it('should return false for none business dates', async function () {
            const response = await client.get('/isBusinessDay', { params: { date: '2022-08-20T10:10:10Z' } });

            expect(response.status).to.equal(200);
            assert.isTrue(response.data.ok === true, 'Response did not contain {ok: true}');
            assert.isTrue(response.data.results === false, 'None business dates should return {results:false}');
        });
    });


    describe('GET Settlement date', async function () {
        it('through the work weekend', async function () {
            const config = { params: { initialDate: '2022-08-20T10:10:10Z', delay: "3" } }
            const response = await client.get('/settlementDate', config);

            expect(response.data.ok).to.equal(true);
            expect(response.data.initialQuery).to.deep.equal(config.params);
            expect(response.data.results.businessDate).to.equal('2022-08-24T10:10:10Z');
            expect(response.data.results.holidayDays).to.equal(0);
            expect(response.data.results.totalDays).to.equal(5);
            expect(response.data.results.weekendDays).to.equal(2);
        });

        it('through the holiday and weekend', async function () {
            const config = { params: { initialDate: '2022-09-04T10:10:10Z', delay: "3" } }
            const response = await client.get('/settlementDate', config);

            expect(response.data.ok).to.equal(true);
            expect(response.data.initialQuery).to.deep.equal(config.params);
            expect(response.data.results.businessDate).to.equal('2022-09-08T10:10:10Z');
            expect(response.data.results.holidayDays).to.equal(1);
            expect(response.data.results.totalDays).to.equal(5);
            expect(response.data.results.weekendDays).to.equal(1);
        });

        it('with no weekend', async function () {
            const config = { params: { initialDate: '2022-08-15T10:10:10Z', delay: "2" } }
            const response = await client.get('/settlementDate', config);

            expect(response.data.ok).to.equal(true);
            expect(response.data.initialQuery).to.deep.equal(config.params);
            expect(response.data.results.businessDate).to.equal('2022-08-16T10:10:10Z');
            expect(response.data.results.holidayDays).to.equal(0);
            expect(response.data.results.totalDays).to.equal(2);
            expect(response.data.results.weekendDays).to.equal(0);
        });

        it('without delay', async function () {
            const config = { params: { initialDate: '2022-08-15T10:10:10Z', delay: "0" } }
            const response = await client.get('/settlementDate', config);

            expect(response.data.ok).to.equal(true);
            expect(response.data.initialQuery).to.deep.equal(config.params);
            expect(response.data.results.businessDate).to.equal('2022-08-14T10:10:10Z');
            expect(response.data.results.holidayDays).to.equal(0);
            expect(response.data.results.totalDays).to.equal(0);
            expect(response.data.results.weekendDays).to.equal(0);
        });
    });
});