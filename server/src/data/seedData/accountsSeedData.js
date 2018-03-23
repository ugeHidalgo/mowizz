/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo';

module.exports.initialAccounts = [{
    name: 'ING Direct',
    iban: 'AL47 2121 1009 0000 0002 3569 8741',
    comments: 'Cuenta de ING Direct para diario',
    created: new Date('2018-3-23'),
    updated: new Date('2018-3-23'),
    username: defaultUserName
},{
    name: 'Banco Santander',
    iban: 'AL47 1111 2222 3333 4444 5555 6666',
    comments: 'Cuenta del banco de Santander',
    created: new Date('2018-3-23'),
    updated: new Date('2018-3-23'),
    username: defaultUserName         
},{
    name: 'Metálico',
    iban: '',
    comments: 'Efectivo.',
    created: new Date('2018-3-23'),
    updated: new Date('2018-3-23'),
    username: defaultUserName
}];

