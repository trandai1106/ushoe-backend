require('dotenv').config();
var mongoose = require('mongoose');
const districtSeeder = require('./districtSeeder');
const provinceSeeder = require('./provinceSeeder');
const productSeeder = require('./productSeeder');
const userSeeder = require('./userSeeder');
const testSeeder = require('./test');

exports.seed = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(
            process.env.DB_URI,  
            null,
            (err) => {
                if (err) {
                    console.log(err);
                }
                else console.log("Mongodb is connected");
            }
        );

        // await provinceSeeder.seed();
        // await districtSeeder.seed();
        await productSeeder.seed();
        await userSeeder.seed();
        // await testSeeder.seed();
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}