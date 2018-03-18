(function (seedData) {
    var defaultUserName = 'ugehidalgo';

     seedData.initialUsers = [{
            name: 'Eugenio Hidalgo', email: 'ugehidalgo@gmail.com', username: defaultUserName,
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: true
        }, {
            name: 'Pepe', email: 'pepe@gmail.com', username: 'pepe',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: false,
        }]; 

    seedData.initialHeroes = [{
            name: 'Superman',
            username: defaultUserName
        },{
            name: 'Spiderman',
            username: defaultUserName         
        },{
            name: 'El tio de la vara',
            username: defaultUserName
        },{
            name: 'Torrezno',
            username: defaultUserName
        },{
            name: 'Guarroman',
            username: defaultUserName
        }];

})(module.exports);
