const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const csvtojson = require('csvtojson');
const path = require('path');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('CSV to JSON Converter', () => {
  it('should convert a CSV file to JSON', async () => {
    const csvFilePath = path.join(__dirname, '../data/simple.csv');

    const json = await csvtojson().fromFile(csvFilePath);

    // We can add more assertions to validate the JSON data if needed
    expect(json).to.be.an('array');
    expect(json.length).to.be.greaterThan(0);
  });

  it('should handle errors gracefully', async () => {
    const invalidCsvFilePath = 'nonexistent.csv';

    // Using chai-as-promised to assert that the promise is rejected
    await expect(csvtojson().fromFile(invalidCsvFilePath)).to.be.rejected;
  });
});
