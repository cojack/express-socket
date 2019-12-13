const crypto = require('crypto');

function passwordHash(password) {
    return crypto.createHmac('sha256', 'kjeb26kjb24jk6')
        .update(password, 'utf8')
        .digest('hex');
}

module.exports = {
    passwordHash
};
