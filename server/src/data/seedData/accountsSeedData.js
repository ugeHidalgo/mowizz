/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo';

module.exports.initialAccounts = [{
    name: 'ING-N',
    description: 'ING Direct cuenta nómina',
    iban: 'AL47 2121 1009 0000 0002 3569 8741',
    comments: 'Cuenta de ING Direct para diario',
    created: new Date('2018-3-23'),
    updated: new Date('2018-3-23'),
    username: defaultUserName
},{
    name: 'ING-D',
    description: 'ING Direct depósito naranja',
    iban: 'AL47 2121 1009 0000 0002 3569 8741',
    comments: 'Depósito naranja de ING Direct',
    created: new Date('2018-3-30'),
    updated: new Date('2018-3-30'),
    username: defaultUserName
},{
    name: 'BS',
    description: 'Banco Santander',
    iban: 'BS47 1111 2222 3333 4444 5555 6666',
    comments: 'Cuenta del banco de Santander',
    created: new Date('2018-3-23'),
    updated: new Date('2018-3-23'),
    username: defaultUserName         
},{
    name: 'BBVA',
    description: 'BBVA',
    iban: 'BB47 1111 2222 3333 4444 5555 6666',
    comments: 'Cuenta del banco BBVA',
    created: new Date('2018-3-30'),
    updated: new Date('2018-3-30'),
    username: defaultUserName         
},{
    name: 'CR',
    description: 'Caja Rural',
    active: false,
    iban: 'CR47 1111 2222 3333 4444 5555 6666',
    comments: 'Cuenta de la caja rural',
    created: new Date('2018-3-30'),
    updated: new Date('2018-3-30'),
    username: defaultUserName         
},{
    name: 'CASH',
    description: 'Metálico',
    iban: '',
    comments: 'Efectivo.',
    created: new Date('2018-3-23'),
    updated: new Date('2018-3-23'),
    username: defaultUserName
},{
    name: 'CASH-H',
    description: 'Metálico en casa',
    iban: '',
    comments: 'Efectivo.',
    created: new Date('2018-3-30'),
    updated: new Date('2018-3-30'),
    username: defaultUserName
},{
    name: 'PPL',
    description: 'Paypal',
    iban: 'PP47 1111 2222 3333 4444 5555 6666',
    comments: 'Cuenta para pagos de compras por internet.',
    created: new Date('2018-3-30'),
    updated: new Date('2018-3-30'),
    username: defaultUserName
}];

