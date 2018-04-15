/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var defaultUserName = 'ugehidalgo';

module.exports.initialConcepts = [{
    name: 'Abogado', description: 'Honorarios abogados.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Agua', description: 'Cuotas de agua.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Alquiler', description: 'Pagos de alquileres.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Basura', description: 'Cuotas basura.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Cajero', description: 'Sacar dinero de cajero.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Calefacción', description: 'Gastos en calefacción.', transactionType: 2,  comments: 'Diesel, leña, etc...',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Calzado', description: 'Calzado', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Carreras', description: 'Inscripiciones a pruebas deportivas.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Clubes', description: 'Cuotas de clubes y gimnasios.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Comida', description: 'Comida', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Deportes', description: 'Material deportivo.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Dominios', description: 'Costes de dominios.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'ebay', description: 'ebay', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Electrodomésticos', description: 'Electrodomésticos', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Formación', description: 'Academias, cursos.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Gas', description: 'Gas butano', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Combustible', description: 'Combustible para vehículos.', transactionType: 2,  comments: 'Gasolina, Gasoil',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Hacienda', description: '', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Hipoteca', description: 'Cuotas de hipoteca.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Hotel', description: 'Gastos en Hotel y hospedaje', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Impuestos', description: 'Pagos de impuestos.', transactionType: 2,  comments: 'hacienda, IBI, etc..',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Loterias', description: 'Gasto en loterías y apuestas.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Luz', description: 'Cuotas de lus.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Mantenimiento', description: '', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Médico', description: 'Pagos a médicos, dentistas, fisios, etc..', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Medicinas', description: 'Gasto en medicinas', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Menaje', description: 'Compras de menaje para la cocina/hogar.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Móvil', description: 'Cuotas de móvil, móvil, carcasas.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Multas', description: 'Multas de tráfico, etc..', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Ojos', description: 'Gafs, lentillas, etc..', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Paypal', description: 'Comisiones de paypal.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Peluquería', description: 'Peluquería', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Portes', description: 'Pagos de portes.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Préstamo', description: 'Cuotas de préstamos', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Restaurante', description: 'Pagos en restaurantes.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Ropa', description: 'Compra de ropa.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Seguro Hogar', description: 'Seguros del hogar.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Seguro Vehículo', description: 'Seguros de coches y motos.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Seguro Vida', description: 'Seguros de Vida.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'TLF/ADSL', description: 'Teléfono y ADSL', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'TV Pago', description: 'Cuotas TV de Pago.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Varios', description: 'Gastos sin categoría', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Vecinos', description: 'Cuotas comunidad de vecions.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Veterinario', description: 'Gastos en veterinarios, o artículos para mascotas.', transactionType: 2,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Alquiler', description: 'Ingresos por alquiler.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Blog', description: 'Ingresos por el blog.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Extras', description: 'Regalos de dinero por cumpleaños, etc..', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Hacienda', description: 'Ingresos por declaración de la renta.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'INGNaranja', description: 'Intereses cuenta naranja ING', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'INGNomina', description: 'Intereses cuenta ING nómina.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Nómina', description: 'Nómina normal', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Nómina B', description: 'Nómina extra.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Subsidio', description: 'Ingreso por subsidio de desempleo.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Trabajos', description: 'Trabajos adicionales remunerados.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
},{
    name: 'Ventas', description: 'Ingresos por ventas de segunda mano.', transactionType: 1,  comments: '',
    created: new Date('2018-3-30'), updated: new Date('2018-3-30'), username: defaultUserName
}];

