const recursos= require('./recursos');
const mascotas= require('./rutas/mascotas');
const veterinarias=require('./rutas/veterinarias');
const duenos=require('./rutas/duenos');
const consultas= require("./rutas/consultas");

module.exports= {
    ruta: (data,callback) => {
      callback(200, {mensaje: 'ESTA ES RUTA'});
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarias: veterinarias(recursos.veterinarias),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos),
    noEncontrado:(data, callback)=>{
              callback(404, {mensaje: 'NO ENCONTRADO'});
    },
};