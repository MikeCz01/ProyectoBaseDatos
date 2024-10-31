const urlCiu = '/api/Ciudadanoes';
let todos = [];

function getCiudadanos() {
    fetch(urlCiu)
        .then(response => response.json())
        .then(data => MostrarCiudadanos(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function MostrarCiudadanos(data) {
    const tBody = document.getElementById('DetCiudadanos');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `displayEditForm('${item.dni}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteCiud('${item.dni}')`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtId = document.createTextNode(item.dni);
        td1.appendChild(txtId);

        let td2 = tr.insertCell(1);
        let txtNombre = document.createTextNode(item.nombre);
        td2.appendChild(txtNombre);

        let td3 = tr.insertCell(2);
        let txtApellido = document.createTextNode(item.apellido);
        td3.appendChild(txtApellido);

        let td4 = tr.insertCell(3);
        let txtFechaNac = document.createTextNode(new Date(item.fechaNacimiento).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }));
        td4.appendChild(txtFechaNac);

        let td5 = tr.insertCell(4);
        let txtEdad = document.createTextNode(item.edad);
        td5.appendChild(txtEdad);

        let td6 = tr.insertCell(5);
        let txtGenero = document.createTextNode(item.genero);
        td6.appendChild(txtGenero);

        let td7 = tr.insertCell(6);
        let txtDirec = document.createTextNode(item.direccion);
        td7.appendChild(txtDirec);

        let td8 = tr.insertCell(7);
        let txtCel = document.createTextNode(item.celular);
        td8.appendChild(txtCel);

        let td9 = tr.insertCell(8);
        let txtTipSan = document.createTextNode(item.tipoSanguineo);
        td9.appendChild(txtTipSan);

        let td10 = tr.insertCell(9);
        td10.appendChild(editButton);

        let td11 = tr.insertCell(10);
        td11.appendChild(deleteButton);
    });
    todos = data;
}


function displayEditForm(IdCiud) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.dni === IdCiud);
    document.getElementById('IdCiudadano').value = item.dni;
    document.getElementById('Nombre').value = item.nombre;
    document.getElementById('Apellido').value = item.apellido;
    document.getElementById('FechaNacimiento').value = item.fechaNacimiento;
    document.getElementById('Edad').value = item.edad;
    document.getElementById('Genero').value = item.genero;
    document.getElementById('Direccion').value = item.direccion;
    document.getElementById('Celular').value = item.celular;
    document.getElementById('TipoSang').value = item.tipoSanguineo;
}


function closeInput() {
    const IdCiud = localStorage.getItem('dniUser');
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    document.getElementById('IdCiudadano').value = item.dni;
    limpiarCampos();
}


function updateCiudadano() {
    const IdCiuda = document.getElementById('IdCiudadano').value;
    const item = {
        dni: document.getElementById('IdCiudadano').value,
        nombre: document.getElementById('Nombre').value,
        apellido: document.getElementById('Apellido').value,
        fechaNacimiento: new Date(document.getElementById('FechaNacimiento').value),
        edad: document.getElementById('Edad').value,
        genero: document.getElementById('Genero').value,
        direccion: document.getElementById('Direccion').value,
        celular: document.getElementById('Celular').value,
        tipoSanguineo: document.getElementById('signoSangre').value + document.getElementById('grupoSangre').value,
    };
    fetch(`${urlCiu}/${IdCiuda}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getCiudadanos())
        .then(() => limpiarCampos())
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    return false;
}

function deleteCiud(IdCiuda) {
    fetch(`${urlCiu}/${IdCiuda}`, {
        method: 'DELETE'
    })
        .then(() => getCiudadanos())
        .catch(error => console.error('Error al eliminar el ciudadano.', error));
}


function addCiudadano() {
    const addIdTextbox = document.getElementById('IdCiudadano');
    const addNameTextbox = document.getElementById('Nombre');
    const addApeTextbox = document.getElementById('Apellido');
    const addFechaNacTextbox = document.getElementById('FechaNacimiento');
    const addEdadTextbox = document.getElementById('Edad');
    const addGenTextbox = document.getElementById('Genero');
    const addDirecTextbox = document.getElementById('Direccion');
    const addCelTextbox = document.getElementById('Celular');
    const addTipSanTextbox = document.getElementById('TipoSang');

    const item = {
        dni: addIdTextbox.value.trim(),
        nombre: addNameTextbox.value.trim(),
        apellido: addApeTextbox.value.trim(),
        fechaNacimiento: new Date(addFechaNacTextbox.value.trim()),
        edad: parseInt(addEdadTextbox.value.trim()),
        genero: addGenTextbox.value.trim(),
        direccion: addDirecTextbox.value.trim(),
        celular: addCelTextbox.value.trim(),
        tipoSanguineo: addTipSanTextbox.value.trim()
    };

    fetch(urlCiu, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getCiudadanos();
            addIdTextbox.value = '';
            addNameTextbox.value = '';
            addApeTextbox.value = '';
            addEdadTextbox.value = '';
            addFechaNacTextbox.value = '';
            addGenTextbox.value = '';
            addDirecTextbox.value = '';
            addCelTextbox.value = '';
            addTipSanTextbox.value = '';
        })
        .catch(error => console.error('Error al agregar el ciudadano.', error));
}

function limpiarCampos() {
    document.getElementById('IdCiudadano').value = '';
    document.getElementById('Nombre').value = '';
    document.getElementById('Apellido').value = '';
    document.getElementById('FechaNacimiento').value = '';
    document.getElementById('Edad').value = '';
    document.getElementById('Genero').value = '';
    document.getElementById('Direccion').value = '';
    document.getElementById('Celular').value = '';
    document.getElementById('TipoSang').value = '';
}

function calcularEdad() {
    const fechaNacimiento = document.getElementById('FechaNacimiento').value;
    let partesFecha = fechaNacimiento.split('-');

    if (partesFecha.length !== 3) {
        document.getElementById('Edad').value = "Fecha invalida.";
        return;
    }

    let anio = parseInt(partesFecha[0], 10);
    let anioActual = new Date().getFullYear();
    if (anio < 1900 || anio > anioActual) {
        document.getElementById('Edad').value = "Año invalido.";
        return;
    }

    document.getElementById('Edad').value = anioActual - anio;
}

//METODOS PARA EL CIUDADANO
function getInfoCiudadano() {
    const IdCiud = localStorage.getItem('dniUser');

    fetch(`${urlCiu}/${IdCiud}`, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            const errorModal = document.getElementById('errorModal');
            var titleModal = document.getElementById("titleModal");
            var mensajeModal = document.getElementById("mensajeModal");
            titleModal.textContent = "Ciudadano no encontrado";
            mensajeModal.textContent = "El ciudadano con DNI: " + IdCiud + " no existe. Por favor registre el ciudadano o comuniquese con personal de soporte.";
            $(errorModal).modal('show');
        }
        return response.json();
    })
        .then(item => {
            document.getElementById('editBotton').style.display = 'block';
            document.getElementById('addBotton').style.display = 'none';
            document.getElementById('IdCiudadano').value = item.dni;
            document.getElementById('Nombre').value = item.nombre;
            document.getElementById('Apellido').value = item.apellido;
            document.getElementById('FechaNacimiento').value = new Date(item.fechaNacimiento).toISOString().split('T')[0];
            document.getElementById('Edad').value = item.edad;
            document.getElementById('Genero').value = item.genero;
            document.getElementById('Direccion').value = item.direccion;
            document.getElementById('Celular').value = item.celular;
            document.getElementById('signoSangre').value = item.tipoSanguineo.charAt(0);
            document.getElementById('grupoSangre').value = item.tipoSanguineo.length > 2 ? item.tipoSanguineo.charAt(1) + item.tipoSanguineo.charAt(2) : item.tipoSanguineo.charAt(1);
        }).catch(error => console.error('Error al encontrar usuario', error));
}

function addCiudad() {
    const addIdTextbox = localStorage.getItem('dniUser');
    const addNameTextbox = document.getElementById('Nombre');
    const addApeTextbox = document.getElementById('Apellido');
    const addFechaNacTextbox = document.getElementById('FechaNacimiento');
    const addEdadTextbox = document.getElementById('Edad');
    const addGenTextbox = document.getElementById('Genero');
    const addDirecTextbox = document.getElementById('Direccion');
    const addCelTextbox = document.getElementById('Celular');
    const addTipSanTextbox = document.getElementById('signoSangre').value + document.getElementById('grupoSangre').value;

    const item = {
        dni: addIdTextbox,
        nombre: addNameTextbox.value.trim(),
        apellido: addApeTextbox.value.trim(),
        fechaNacimiento: addFechaNacTextbox.value.trim(),
        edad: parseInt(addEdadTextbox.value.trim()),
        genero: addGenTextbox.value.trim(),
        direccion: addDirecTextbox.value.trim(),
        celular: addCelTextbox.value.trim(),
        tipoSanguineo: document.getElementById('signoSangre').value + document.getElementById('grupoSangre').value
    };

    fetch(urlCiu, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => getInfoCiudadano())
        .catch(error => console.error('Error al agregar el ciudadano.', error));
}

function updateCiudad() {
    const IdCiuda = document.getElementById('IdCiudadano').value;
    const item = {
        dni: document.getElementById('IdCiudadano').value,
        nombre: document.getElementById('Nombre').value,
        apellido: document.getElementById('Apellido').value,
        fechaNacimiento: new Date(document.getElementById('FechaNacimiento').value),
        edad: document.getElementById('Edad').value,
        genero: document.getElementById('Genero').value,
        direccion: document.getElementById('Direccion').value,
        celular: document.getElementById('Celular').value,
        tipoSanguineo: document.getElementById('signoSangre').value + document.getElementById('grupoSangre').value,
    };
    fetch(`${urlCiu}/${IdCiuda}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => {
            document.getElementById('editBotton').style.display = 'block';
            document.getElementById('addBotton').style.display = 'none';
            getInfoCiudadano()
        })
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    return false;
}