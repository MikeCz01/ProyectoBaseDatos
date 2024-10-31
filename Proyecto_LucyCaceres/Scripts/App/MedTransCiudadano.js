const urlDoCiu = '/api/TransportexCiudadanoes';
let todos = [];

function getMedTranCiudadano() {
    fetch(urlDoCiu)
        .then(response => response.json())
        .then(data => mostrarMedTranCiu(data, 1))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarMedTranCiu(data, rol) {
    const tBody = document.getElementById('detMedTranCiud');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `EditDocxCiu('${item.id}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        if (rol == 2) {
            deleteButton.setAttribute('onclick', `deleteDocxCiudad('${item.id}')`);
        }
        else {
            deleteButton.setAttribute('onclick', `deleteDocxCiu('${item.id}')`);
        }
      
        let tr = tBody.insertRow();
        let td1 = tr.insertCell(0);
        let txtid = document.createTextNode(item.id);
        td1.appendChild(txtid);

        let td2 = tr.insertCell(1);
        let txtcodigoDocumento = document.createTextNode(item.transporte);
        td2.appendChild(txtcodigoDocumento);

        let td3 = tr.insertCell(2);
        let txtciudadanoId = document.createTextNode(item.ciudadanoId);
        td3.appendChild(txtciudadanoId);

        let td4 = tr.insertCell(3);
        let txtmarca = document.createTextNode(item.marca);
        td4.appendChild(txtmarca);

        let td5 = tr.insertCell(4);
        let txtmodel = document.createTextNode(item.model);
        td5.appendChild(txtmodel);

        let td6 = tr.insertCell(5);
        let txtplaca = document.createTextNode(item.placa);
        td6.appendChild(txtplaca);

        let td7 = tr.insertCell(6);
        let txtanio = document.createTextNode(item.ano);
        td7.appendChild(txtanio);

        let td8 = tr.insertCell(7);
        td8.appendChild(editButton);

        let td9 = tr.insertCell(8);
        td9.appendChild(deleteButton);
    });
    todos = data;
}

function EditDocxCiu(idDocxCiu) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.id.toString() === idDocxCiu);
    document.getElementById('IdMedTraCiu').value = item.id;
    document.getElementById('listaTransp').value = item.idTransporte;
    document.getElementById('listCiudadano').value = item.ciudadanoId;
    document.getElementById('marca').value = item.marca;
    document.getElementById('model').value = item.model;
    document.getElementById('placa').value = item.placa;
    document.getElementById('ano').value = item.ano;
}

function closeInput() {
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    limpiarMedCiu();
}

function updateMedTraCiu(rol) {
    const IdMedTraCiu = parseInt(document.getElementById('IdMedTraCiu').value);
    const item = {
        id: parseInt(document.getElementById('IdMedTraCiu').value),
        idTransporte: document.getElementById('listaTransp').value,
        ciudadanoId: rol == 2 ? localStorage.getItem('dniUser') : document.getElementById('listCiudadano').value,
        marca: document.getElementById('marca').value,
        model: document.getElementById('model').value,
        placa: document.getElementById('placa').value,
        ano: document.getElementById('ano').value,
    };
    fetch(`${urlDoCiu}/${IdMedTraCiu}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => {
            limpiarMedCiu();
            if (rol == 2) {
                getMedTranCiudad();
            }
            if (rol == 1) {
                document.getElementById('listCiudadano').value = '';
                getMedTranCiudadano();
            }
        })
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    return false;
}

function deleteDocxCiu(IdRol) {
    fetch(`${urlDoCiu}/${IdRol}`, {
        method: 'DELETE'
    })
        .then(() => getMedTranCiudadano())
        .catch(error => console.error('Error al eliminar el rol.', error));
}

function deleteDocxCiudad(IdRol) {
    fetch(`${urlDoCiu}/${IdRol}`, {
        method: 'DELETE'
    })
        .then(() => getMedTranCiudad())
        .catch(error => console.error('Error al eliminar el rol.', error));
}

function addMedTraCiu(rol) {
    const listaTransp = document.getElementById('listaTransp');
    const listCiudadano = document.getElementById('listCiudadano');
    const marca = document.getElementById('marca');
    const model = document.getElementById('model');
    const placa = document.getElementById('placa');
    const ano = document.getElementById('ano');

    const item = {
        idTransporte: listaTransp.value.trim(),
        ciudadanoId: rol == 2 ? localStorage.getItem('dniUser') : listCiudadano.value.trim(),
        marca: marca.value.trim(),
        model: model.value.trim(),
        placa: placa.value.trim(),
        ano: ano.value.trim()
    };

    fetch(`${urlDoCiu}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            limpiarMedCiu();
            if (rol == 2) {
                getMedTranCiudad();
            }
            if (rol == 1) {
                document.getElementById('listCiudadano').value = '';
                getMedTranCiudadano();
            }
        })
        .catch(error => console.error('Error al agregar el rol.', error));
}


function limpiarMedCiu() {
    document.getElementById('IdMedTraCiu').value = '';
    document.getElementById('listaTransp').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('model').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('ano').value = '';
}

fetch('/api/Ciudadanoes')
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('listCiudadano');
        data.forEach(ciudadano => {
            const option = document.createElement('option');
            option.value = ciudadano.dni;
            option.textContent = ciudadano.dni;
            dropdown.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener los ciudadanos', error));

fetch('/api/MediosTransportes')
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('listaTransp');
        data.forEach(med => {
            const option = document.createElement('option');
            option.value = med.id; // Asignar el valor del ciudadano
            option.textContent = med.tipo + '-' + med.categoria; // Mostrar el nombre del ciudadano
            dropdown.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener los documentos', error));

function getMedTranCiudadanoOficial() {
    fetch(urlDoCiu)
        .then(response => response.json())
        .then(data => mostrarMedTranCiuOfi(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarMedTranCiuOfi(data) {
    const tBody = document.getElementById('detMedTranCiud');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtid = document.createTextNode(item.id);
        td1.appendChild(txtid);

        let td2 = tr.insertCell(1);
        let txtcodigoDocumento = document.createTextNode(item.transporte);
        td2.appendChild(txtcodigoDocumento);

        let td3 = tr.insertCell(2);
        let txtciudadanoId = document.createTextNode(item.ciudadanoId);
        td3.appendChild(txtciudadanoId);

        let td4 = tr.insertCell(3);
        let txtmarca = document.createTextNode(item.marca);
        td4.appendChild(txtmarca);

        let td5 = tr.insertCell(4);
        let txtmodel = document.createTextNode(item.model);
        td5.appendChild(txtmodel);

        let td6 = tr.insertCell(5);
        let txtplaca = document.createTextNode(item.placa);
        td6.appendChild(txtplaca);

        let td7 = tr.insertCell(6);
        let txtanio = document.createTextNode(item.ano);
        td7.appendChild(txtanio);
    });
    todos = data;
}


//METODOS CIUDADANO
function getMedTranCiudad() {
    const IdCiud = localStorage.getItem('dniUser');
    fetch(`${urlDoCiu}/dni/${IdCiud}`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición, no se encontraron datos");
            }
            document.getElementById('listCiudadano').value = IdCiud;
            return response.json();
        })
        .then(data => mostrarMedTranCiu(data, 2))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}