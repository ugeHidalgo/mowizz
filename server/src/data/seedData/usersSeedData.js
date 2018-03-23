(function (usersSeedData) {
    var defaultUserName = 'ugehidalgo';

     initialUsers = [{
            name: 'Eugenio Hidalgo', email: 'ugehidalgo@gmail.com', username: defaultUserName,
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: true
        }, {
            name: 'Pepe', email: 'pepe@gmail.com', username: 'pepe',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: false,
        }];
})(module.exports);
