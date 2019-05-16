// Clase de alumno
class Alumno{
  constructor(nombre, apellido){
    this._nombre = nombre;
    this._apellido = apellido;
  }

  getNombreCompleto(){
    return `${this._nombre}, ${this._apellido}`;
  }
}

// Variable para listado general de alumnos
let listadoAlumnos = [];

// Obtener el formulario
const formAlumno = document.getElementById('formAlumno');

// Obtengo el nodo de listado
const listado = document.getElementById('listado');

// Función para agregar alumno al DOM
function agregarAlumnoAListado(alumno){
  const elemListado = document.createElement('li');
  elemListado.innerHTML = alumno;
  listado.appendChild(elemListado);
}

// Functión para guardar alumno en local storage
function guardarAlumno(alumno){
  // Agrego el alumno en el array de listado
  listadoAlumnos.push(alumno);
  // Guardo el array con el nuevo item como string en el local storage
  // (sobreescribiendo lo que ya tenía ese key en el local storage)
  localStorage.setItem('alumnos', JSON.stringify(listadoAlumnos));
}

// Inicio:
// Reviso el local storage para ver si ya hay alumnos guardados
let alumnosGuardados = localStorage.getItem('alumnos');
if( alumnosGuardados ){
  // Tenemos alumnos guardados en local storage, parsearlo al string
  // y convertirlo en array
  listadoAlumnos = JSON.parse(alumnosGuardados);
  listadoAlumnos.forEach(alumno => {
    // Recorro el array de alumnos guardados y los agrego al listado en el DOM
    agregarAlumnoAListado(alumno);
  });
}

// Agrego event listener para guardar
formAlumno.addEventListener('submit', function(evento){
  // Evito event default
  evento.preventDefault();

  // Obtener los datos del alumno a partir del nodo del DOM
  // que disparó el evento (aquí "this = form")
  const inputNombre   = this.querySelector('#nombre');
  const inputApellido = this.querySelector('#apellido');

  // Otra forma de obtener los inputs en un form
  // const inputNombre   = this.nombre;
  // const inputApellido = this.apellido;

  // Creo instancia de alumno
  const nuevoAlumno = new Alumno(inputNombre.value, inputApellido.value)

  // Guardo el alumno
  guardarAlumno(nuevoAlumno.getNombreCompleto());

  // Muestro alumno en el listado
  agregarAlumnoAListado(nuevoAlumno.getNombreCompleto());

  // Reseteo el form para poner los campos en blanco
  this.reset();

  // Hago foco en el campo del nombre para poner el cursor ahí
  inputNombre.focus();
});