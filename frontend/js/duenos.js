const nombre= document.getElementById('nombre');
const apellido= document.getElementById('apellido');
const documento= document.getElementById('documento');
const indice= document.getElementById('indice')
const form= document.getElementById('form');
const btnGuardar=document.getElementById('btn-guardar');
const listaDuenos=document.getElementById('lista-duenos');
const url="http://localhost:3300/duenos";
let duenos=[];

async function listarDuenos(){
          try{
                     const respuesta= await fetch(url);
          const duenosDelServer= await respuesta.json();
           if(Array.isArray(duenosDelServer)){
                    duenos= duenosDelServer;
          }
           if(duenos.length>0){
                     const htmlDuenos=duenos.map((dueno, index)=>` <tr>
                    <th scope="row">${index}</th>
                     <td>${dueno.documento}</td>
                     <td>${dueno.nombre}</td>
                     <td>${dueno.apellido}</td>
                    
                    <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                              <button type="button" class="btn btn-info editar" data-toggle="modal" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit"></i></button>
                              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                              </div>
                    </td>
                    </tr>`).join("");
                    listaDuenos.innerHTML=htmlDuenos;
                    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
                    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));

                    return;

          }
                     listaDuenos.innerHTML=` <tr>
                    <td colspan="5">NO HAY REGISTROS</td>
                    </tr>`;
          }catch(error){
                    console.log(error);
                    $(".alert").show(); 
          }
}

          
async function enviarDatos(evento){
          evento.preventDefault();
          try{
                    const datos ={
                    nombre: nombre.value,
                    apellido: apellido.value,
                    documento: documento.value
          };
          const accion= btnGuardar.innerHTML;
          let urlEnvio=url;
          let method="POST";
          if(accion=== "Editar"){
                    urlEnvio=`${url}/${indice.value}`;
                    method="PUT";
          }
          const respuesta = await fetch(urlEnvio,{
                    method,
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                    mode: "cors",
                    });
                    if(respuesta.ok){
                              listarDuenos();
                              resetModal();
                    }
          }catch(error){
                     console.log(error);
                    $(".alert").show(); 

          }
          
}

function editar(index){
          return function cuandoCliqueo() {
                    btnGuardar.innerHTML="Editar"
                   // $myModal.toggle()
                   const dueno = duenos[index];
                    indice.value=index;
                    nombre.value= dueno.nombre;
                    apellido.value=dueno.apellido;
                    documento.value=dueno.documento;
          };    
}

function resetModal(){
          indice.value='',
          nombre.value='';
          apellido.value='';
          documento.value='';
          btnGuardar.innerHTML='Crear'
}

function eliminar(index){
          const urlEnvio=`${url}/${index}`;
          return async function clickEnEliminar(){
                    try{
                    const respuesta = await fetch(urlEnvio,{
                    method: "DELETE",
                    mode: "cors",
                    });
                    if(respuesta.ok){
                              listarDuenos();
                    }

                    }catch(error){
                               console.log({error});
                              $(".alert").show();

                              
                    }
          duenos= duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);
          listarDuenos();
          }
          
}

listarDuenos();
form.onsubmit= enviarDatos;
btnGuardar.onclick=enviarDatos;