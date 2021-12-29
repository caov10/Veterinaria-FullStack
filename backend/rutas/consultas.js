module.exports = function consultasHandler({consultas, veterinarias, mascotas}){
          return {
      get: (data, callback) => {
        if(typeof data.indice !== "undefined"){
          console.log( {data} );
          if(consultas[data.indice]){
           return  callback(200, consultas[data.indice]);
          }
          return  callback(404, {mensaje: `consulta con indice ${data.indice} no encontrado`,
        });
        }
        const consultasConRelaciones=consultas.map((consulta)=>(
          {...consulta,
            mascota: {...mascotas[consulta.mascota], id: consulta.mascota},
            veterinaria: {...veterinarias[consulta.veterinaria], id: consulta.veterinaria,},
          }

        ));
        callback(200, consultasConRelaciones);
      },
      post: (data, callback)=>{
       let nuevaconsulta=data.payload;
       nuevaconsulta.fechaCreacion= new Date();
       nuevaconsulta.fechaEdicion= null;
       consultas=[...consultas, nuevaconsulta]
       //consultas.push(data.payload);
        callback(201, nuevaconsulta);
      },
      put: (data, callback) => {
        if(typeof data.indice !== "undefined"){
          //console.log( {data} );
          if(consultas[data.indice]){
                    const {fechaCreacion}= consultas[data.indice];
                    consultas[data.indice]={...data.payload,
                               fechaCreacion,
                               fechaEdicion:new Date(),
                              };
           return  callback(200, consultas[data.indice]);
          }
          return  callback(404, {mensaje: `consulta con indice ${data.indice} no encontrado`,
        });
        }
        callback(400, { mensaje: "INDICE NO ENVIADO"});
      },
      delete: (data, callback) => {
        if(typeof data.indice !== "undefined"){
          //console.log( {data} );
          if(consultas[data.indice]){
                    consultas= consultas.filter((_consulta,indice)=> indice != data.indice);
           return  callback(204, {mensaje:`elemento con el indice ${data.indice} eliminado`});
          }
          return  callback(404, {mensaje: `consulta con indice ${data.indice} no encontrado`,
        });
        }
        callback(400, { mensaje: "INDICE NO ENVIADO"});
      }
    };
} 