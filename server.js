const crypto = require('crypto');
const randomBytes = require('randombytes');
const io = require('socket.io-client');


// data file
const data = require('./data.json');

const emitter = io('http://localhost:3000'); // listner server

// function to generate random number
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min  + 1 ) + min);
}


// function to create random integer
function createRandomMessage(){
    const randomNameIndex = getRandomInt(0, data.names.length - 1);
    const randomOriginCityIndex = getRandomInt(0, data.cities.length - 1);
    const randomDestinationCityIndex = getRandomInt(0, data.cities.length - 1);


    const name = data.names[randomNameIndex];
    const origin = data.cities[randomOriginCityIndex];
    const destination = data.cities[randomDestinationCityIndex];

    const originalMessage = {
        name, 
        origin,
        destination,
    };

    const secret_key = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');


    return {
        ...originalMessage,
        secret_key,
    };

}
