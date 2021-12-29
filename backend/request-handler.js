const url=require('url');
const StringDecoder= require('string_decoder').StringDecoder;
 const enrutador= require('./enrutador');

module.exports=(req, res)=>{
//1. OBTENER EL URL DESDE EL OBJETO request
const urlActual= req.url;
const urlParseada= url.parse(urlActual, true);

//2. OBTENER LA RUTA
const ruta= urlParseada.pathname;

//3. QUITAR /
const rutaLimpia= ruta.replace(/^\/+|\/+$/g, "");


//3.1. OBTENER EL METODO HTTP
const metodo=req.method.toLowerCase();

//3.1.1 Dar permisos de CORS ESCRIBIENDO LOS headers
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader(
    "Access-Control-Request-Methods",
  "OPTIONS,GET,PUT,DELETE,POST"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
  "OPTIONS,GET,PUT,DELETE,POST"
  );
  

  //3.1.2 DAR respuesta inmediatam cuando el metodo sea options
  if(metodo === 'options'){
    res.writeHead(200);
    res.end();
    return;
}
//console.log(metodo);

//3.2. OBTENER VARIABLES DEL QUERY URL
const { query={} }= urlParseada;

//3.3. OBTENER HEADERS
  const { headers ={} }= req;
  //console.log({headers});

  //3.4.  OBTENER PAYLOAD EN EL CASO DE HABER UNO
  const decoder= new StringDecoder('utf-8');
  let  buffer="";

    //3.4.1  IR ACUMULANDO LA DATA CUANDO EL REQUEST RECIBE UN PAYLOAD
  req.on('data',(data)=>{
            buffer += decoder.write(data);
  });

  //3.4.2  TERMINAR DE ACUMULAR DATOS Y DECIRLE AL DECODER QUE FINALICE
  req.on("end",()=>{
        buffer += decoder.end();

        if(headers["content-type"]==="application/json"){
          buffer= JSON.parse(buffer);
        }
        //3.4.3 revisar si tiene subrutas en este caso es el indice del array
        if(rutaLimpia.indexOf("/")> -1){
        var [rutaPrincipal, indice]= rutaLimpia.split('/')

      }

      //3.5. ORDENAR LA DATA del request
      const data={
      indice,
      ruta: rutaPrincipal || rutaLimpia,
      query,
      metodo,
      headers,
      payload: buffer,
      };
      
      console.log({ data });

      //3.6. ELEGIR EL MANEJADOR DEpendiendo de la ruta y asignarle funcion que el enrutador tiene
      let handler;
      if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
                handler=enrutador[data.ruta][metodo];
      }
      else{
                handler= enrutador.noEncontrado;
      }
      //4. EJECUTAR HANDLER(manejador) para enviar respuesta
      if (typeof handler === "function"){
        handler(data, (statusCode = 200, mensaje) =>{
          const respuesta= JSON.stringify(mensaje);
          res.setHeader("Content-Type","application/json");
          res.writeHead(statusCode);
          //AQUI SE ESTA RESPONDIENDO A LA APLICACION CLIENTE
          res.end(respuesta);
        });
      }
      
  });   
};