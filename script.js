//Tercer pre entrega proyecto

let recetasJSON=[];
let hizoAlgo = 0;

//Toma los datos del archivo JSON
async function obtenerJSON() {
    const URLJSON="recetas.json";
    const resp = await fetch(URLJSON);
    const data = await resp.json();
    recetasJSON = data;

    renderizarCards()
}
obtenerJSON();

//Promesa encargada de verificar si el usuario realizo alguna actividad en la pagina
const hizoAlgoPromise = (res) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(hizoAlgo)

            reject(hizoAlgo)

        }, 40000);
    })
}

hizoAlgoPromise()
.then((hizo)=>{
    if (hizo==0) {
        Swal.fire({
            title: '¿No te gusta ninguna receta?\n Te recomendamos esta! \n' + recetasJSON[2].nombre,
            text: recetasJSON[2].pasos,
            imageUrl: recetasJSON[2].imagen,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    };
})


let formulario = document.getElementById("formulario");
formulario.onsubmit=Buscador_de_recetas;  

//buscador de recetas
function Buscador_de_recetas(ev){
    ev.preventDefault()
    if (formulario.children[0].value == ""){
        ev.preventDefault();//evita que se borren los datos
        alert("Ingrese una receta")
    }else{
        let receta_a_buscar = formulario.children[0].value;
        const encontrado = recetasJSON.find((receta) => receta.nombre.toLowerCase() == receta_a_buscar.toLowerCase());
        if (encontrado != undefined){
            hizoAlgo = hizoAlgo + 1
            Swal.fire({
                title: encontrado.nombre,
                text: encontrado.pasos,
                imageUrl: encontrado.imagen,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              }) 
        }else{
            console.log("Receta no encontrada!");
        }
    }
}

function renderizarCards() {
    // Se carga el article donde iran las cards
let articuloCartas = document.getElementById("cartas");
let contador = 0;
let i = 0;
numero_receta = [];

//define 3 numero aleatorios que no se repitan, asi no aparecen dos recetas iguales en las recetas del dia
do {
    let num = Math.round(Math.random() * 14);
    if (numero_receta.indexOf(num) < 0){ 
        numero_receta.push(num);
        i += 1
    }    
} while (i < 5); 

//Inserta las cards de las recetas del dia
for (let i = 0; i < 4; i++) {
    contador += 1;
    let carta = document.createElement("div");
    carta.className="card col-md-3";
    carta.innerHTML = `
    <div class="card-img-top img-fluid">
    <br></br>
    <img class="card-img-top  img-fluid" src="${recetasJSON[numero_receta[contador]].imagen}" alt=${recetasJSON[numero_receta[contador]].nombre}>
    <div class="card-block">
        <h5 class="card-title">${recetasJSON[numero_receta[contador]].nombre}</h5>
        <br></br>
        <button type="button" id ="boton${contador}" class="btn btn-primary" daa-toggle="modal" data-target="exampleModalLong${recetasJSON[numero_receta[contador]]}">
        Ver mas
    </button>
    </div>
    </div>`;
    articuloCartas.append(carta)
}

// Define la funcionalidad de los botones de las cards
let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");

boton1.onclick = function() {
    hizoAlgo+=1
    Swal.fire({
        title: recetasJSON[numero_receta[1]].nombre,
        text: recetasJSON[numero_receta[1]].pasos,
        imageUrl: recetasJSON[numero_receta[1]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}

boton2.onclick = function() {
    hizoAlgo+=1
    Swal.fire({
        title: recetasJSON[numero_receta[2]].nombre,
        text: recetasJSON[numero_receta[2]].pasos,
        imageUrl: recetasJSON[numero_receta[2]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}
boton3.onclick = function() {
    hizoAlgo+=1
    Swal.fire({
        title: recetasJSON[numero_receta[3]].nombre,
        text: recetasJSON[numero_receta[3]].pasos,
        imageUrl: recetasJSON[numero_receta[3]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}
boton4.onclick = function() {
    hizoAlgo+=1
    Swal.fire({
        title: recetasJSON[numero_receta[4]].nombre,
        text: recetasJSON[numero_receta[4]].pasos,
        imageUrl: recetasJSON[numero_receta[4]].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}

}


//BotonPrincipal
let botonP = document.getElementById("botonprincipal");

botonP.onclick = function() {
    hizoAlgo+=1
    Swal.fire({
        title: recetasJSON[12].nombre,
        text: recetasJSON[12].pasos,
        imageUrl: recetasJSON[12].imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}

//Boton modo oscuro/claro
let principal = document.getElementById("principal");
let boton = document.getElementById("mode");
let modo = localStorage.getItem("modo");

if(modo != null){
    if(modo == "light"){
        document.body.className = modo;
        principal.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center "+modo;
        boton.innerText="Modo Claro";
    }
    if(modo == "dark"){
        document.body.className = modo;
        principal.className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center "+modo;
        boton.innerText="Modo Oscuro";
    }
}

boton.onclick = function() {
    if(modo == "light"){
        document.body.className="dark";
        principal.classList.remove("light");
        principal.classList.add("dark");
        boton.innerText="Modo Claro";
        modo = "dark";
    }else{
        document.body.className="light";
        principal.classList.remove("dark");
        principal.classList.add("light");
        boton.innerText="Modo Oscuro";
        modo = "light";
    }
    localStorage.setItem("modo",modo);
}


// muestra el paso a paso de una receta ingresada como parametro
function mostrar_pasos(receta){
console.log("--------------------------------------"+receta.nombre+"--------------------------------------");
console.log(receta.pasos);
}



