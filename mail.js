const {userEmitter} = require('./db');

function sendEmail(user) {
    console.log('Sending email to user', user.email);
}

userEmitter.on('new-register', (user) =>
    sendEmail(user));
