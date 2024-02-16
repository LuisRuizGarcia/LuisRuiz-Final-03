let alumnos = [];
let grupos = [];

document.addEventListener('DOMContentLoaded', function () {
    actualizarGruposSelect();
    document.getElementById('alumnoForm').reset();
});

function inscribirAlumno() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    const materias = document.getElementById('materias').value;
    const calificaciones = document.getElementById('calificaciones').value;

    if (nombre && apellidos && edad && materias && calificaciones) {
        const alumno = {
            nombre,
            apellidos,
            edad,
            materias,
            calificaciones: calificaciones.split(',').map(Number)
        };

        alumnos.push(alumno);
        actualizarGruposSelect();
        mostrarAlumnos();
        document.getElementById('alumnoForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function actualizarGruposSelect() {
    const grupoSelect = document.getElementById('grupoSelect');
    grupoSelect.innerHTML = '<option value="todos">Todos los Alumnos</option>';

    grupos = Array.from(new Set(alumnos.map(alumno => alumno.materias)));
    grupos.forEach(grupo => {
        grupoSelect.innerHTML += `<option value="${grupo}">${grupo}</option>`;
    });
}

function mostrarAlumnos() {
    const listaAlumnos = document.getElementById('listaAlumnos');
    listaAlumnos.innerHTML = '';

    alumnos.forEach(alumno => {
        const nuevoAlumno = document.createElement('li');
        nuevoAlumno.innerHTML = `
            <strong>${alumno.nombre} ${alumno.apellidos}</strong><br>
            Edad: ${alumno.edad}<br>
            Materias: ${alumno.materias}<br>
            Calificaciones: ${alumno.calificaciones.join(', ')}
        `;
        listaAlumnos.appendChild(nuevoAlumno);
    });
}

function mostrarAlumnosPorGrupo() {
    const grupoSelect = document.getElementById('grupoSelect');
    const grupoSeleccionado = grupoSelect.value;

    const listaAlumnos = document.getElementById('listaAlumnos');
    listaAlumnos.innerHTML = '';

    if (grupoSeleccionado === 'todos') {
        mostrarAlumnos();
    } else {
        const alumnosEnGrupo = alumnos.filter(alumno => alumno.materias === grupoSeleccionado);

        alumnosEnGrupo.forEach(alumno => {
            const nuevoAlumno = document.createElement('li');
            nuevoAlumno.innerHTML = `
                <strong>${alumno.nombre} ${alumno.apellidos}</strong><br>
                Edad: ${alumno.edad}<br>
                Materias: ${alumno.materias}<br>
                Calificaciones: ${alumno.calificaciones.join(', ')}
            `;
            listaAlumnos.appendChild(nuevoAlumno);
        });
    }
}

function buscarPorNombre() {
    const nombreBuscar = prompt('Ingrese el nombre a buscar:');
    if (nombreBuscar) {
        const resultados = alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(nombreBuscar.toLowerCase()));
        mostrarResultadosBusqueda(resultados);
    }
}

function buscarPorApellido() {
    const apellidoBuscar = prompt('Ingrese el apellido a buscar:');
    if (apellidoBuscar) {
        const resultados = alumnos.filter(alumno => alumno.apellidos.toLowerCase().includes(apellidoBuscar.toLowerCase()));
        mostrarResultadosBusqueda(resultados);
    }
}

function mostrarResultadosBusqueda(resultados) {
    const listaAlumnos = document.getElementById('listaAlumnos');
    listaAlumnos.innerHTML = '';

    resultados.forEach(alumno => {
        const nuevoAlumno = document.createElement('li');
        nuevoAlumno.innerHTML = `
            <strong>${alumno.nombre} ${alumno.apellidos}</strong><br>
            Edad: ${alumno.edad}<br>
            Materias: ${alumno.materias}<br>
            Calificaciones: ${alumno.calificaciones.join(', ')}
        `;
        listaAlumnos.appendChild(nuevoAlumno);
    });
}

function calcularPromedioAlumno() {
    const nombreBuscar = prompt('Ingrese el nombre del alumno:');
    if (nombreBuscar) {
        const alumno = alumnos.find(alumno => alumno.nombre.toLowerCase() === nombreBuscar.toLowerCase());
        if (alumno) {
            const promedio = calcularPromedio(alumno.calificaciones);
            alert(`El promedio de ${alumno.nombre} ${alumno.apellidos} es: ${promedio}`);
        } else {
            alert('Alumno no encontrado.');
        }
    }
}

function calcularPromedioGrupo() {
    const grupoSeleccionado = document.getElementById('grupoSelect').value;
    const alumnosEnGrupo = alumnos.filter(alumno => alumno.materias === grupoSeleccionado);

    if (alumnosEnGrupo.length > 0) {
        const calificacionesGrupo = alumnosEnGrupo.flatMap(alumno => alumno.calificaciones);
        const promedioGrupo = calcularPromedio(calificacionesGrupo);
        alert(`El promedio del grupo ${grupoSeleccionado} es: ${promedioGrupo}`);
    } else {
        alert('No hay alumnos en el grupo seleccionado.');
    }
}

function calcularPromedio(calificaciones) {
    const sumatoria = calificaciones.reduce((acumulador, calificacion) => acumulador + calificacion, 0);
    return sumatoria / calificaciones.length;
}

function ordenarAlumnos(orden) {
    const listaAlumnos = document.getElementById('listaAlumnos');
    const alumnosOrdenados = [...alumnos];

    if (orden === 'asc') {
        alumnosOrdenados.sort((a, b) => calcularPromedio(a.calificaciones) - calcularPromedio(b.calificaciones));
    } else if (orden === 'desc') {
        alumnosOrdenados.sort((a, b) => calcularPromedio(b.calificaciones) - calcularPromedio(a.calificaciones));
    }

    listaAlumnos.innerHTML = '';

    alumnosOrdenados.forEach(alumno => {
        const nuevoAlumno = document.createElement('li');
        nuevoAlumno.innerHTML = `
            <strong>${alumno.nombre} ${alumno.apellidos}</strong><br>
            Edad: ${alumno.edad}<br>
            Materias: ${alumno.materias}<br>
            Calificaciones: ${alumno.calificaciones.join(', ')}
        `;
        listaAlumnos.appendChild(nuevoAlumno);
    });
}

function ordenarAlumnosAlfabeticamente() {
    const listaAlumnos = document.getElementById('listaAlumnos');
    const alumnosOrdenados = [...alumnos];

    alumnosOrdenados.sort((a, b) => {
        const nombreA = `${a.nombre} ${a.apellidos}`.toLowerCase();
        const nombreB = `${b.nombre} ${b.apellidos}`.toLowerCase();
        return nombreA.localeCompare(nombreB);
    });

    listaAlumnos.innerHTML = '';

    alumnosOrdenados.forEach(alumno => {
        const nuevoAlumno = document.createElement('li');
        nuevoAlumno.innerHTML = `
            <strong>${alumno.nombre} ${alumno.apellidos}</strong><br>
            Edad: ${alumno.edad}<br>
            Materias: ${alumno.materias}<br>
            Calificaciones: ${alumno.calificaciones.join(', ')}
        `;
        listaAlumnos.appendChild(nuevoAlumno);
    });
}
