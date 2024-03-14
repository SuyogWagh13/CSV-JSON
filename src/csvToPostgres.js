const csvtojson = require('csvtojson');
const pool = require('../config/Database');

// Defining the CSV file path
const csvFilePath = '../data/simple.csv';

// Function to read and insert data into the PostgreSQL table
async function readAndInsertData() {
  try {
    // Read CSV and convert to JSON
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    // Create a table dynamically based on CSV headers
    const headers = Object.keys(jsonArray[0]);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS csv_data (
        ${headers.map((header) => `${header} TEXT`).join(', ')}
      )
    `;

    await pool.query(createTableQuery);

    // Insert data into the table
    for (const row of jsonArray) {
      const values = headers.map((header) => row[header]);
      const insertQuery = `
        INSERT INTO csv_data
        (${headers.join(', ')})
        VALUES
        (${values.map((_, idx) => `$${idx + 1}`).join(', ')})
      `;

      await pool.query(insertQuery, values);
    }

    console.log('Data inserted into the PostgreSQL table.');

    // Close the PostgreSQL connection pool
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to read and insert data
readAndInsertData();
