module.exports = function veterinariasHandler(veterinarias){
          return {
      get: (data, callback) => {
        if(typeof data.indice !== "undefined"){
          console.log( {data} );
          if(veterinarias[data.indice]){
           return  callback(200, veterinarias[data.indice]);
          }
          return  callback(404, {mensaje: `veterinaria con indice ${data.indice} no encontrado`,
        });
        }
        callback(200, veterinarias);
      },
      post: (data, callback)=>{
        veterinarias.push(data.payload);
        callback(201, data.payload);
      },
      put: (data, callback) => {
        if(typeof data.indice !== "undefined"){
          //console.log( {data} );
          if(veterinarias[data.indice]){
                   veterinarias[data.indice]=data.payload;
           return  callback(200, veterinarias[data.indice]);
          }
          return  callback(404, {mensaje: `veterinaria con indice ${data.indice} no encontrado`,
        });
        }
        callback(400, { mensaje: "INDICE NO ENVIADO"});
      },
      delete: (data, callback) => {
        if(typeof data.indice !== "undefined"){
          //console.log( {data} );
          if(veterinarias[data.indice]){
                   veterinarias= veterinarias.filter((_mascota,indice)=> indice != data.indice);
           return  callback(204, {mensaje:`elemento con el indice ${data.indice} eliminado`});
          }
          return  callback(404, {mensaje: `veterinaria con indice ${data.indice} no encontrado`,
        });
        }
        callback(400, { mensaje: "INDICE NO ENVIADO"});
      }
    };
} 