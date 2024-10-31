const url = '/api/Roles';
const rutaBase = '/';
let todos = [];

function getRoles() {
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarRoles(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function mostrarRoles(data) {
    const tBody = document.getElementById('detRoles');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `EditRol('${item.id}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteRol('${item.id}')`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtId = document.createTextNode(item.id);
        td1.appendChild(txtId);

        let td2 = tr.insertCell(1);
        let txtNombre = document.createTextNode(item.nombre);
        td2.appendChild(txtNombre);

        let td3 = tr.insertCell(2);
        let txtdescripcion = document.createTextNode(item.descripcion);
        td3.appendChild(txtdescripcion);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });
    todos = data;
}


function EditRol(IdRol) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.id.toString() === IdRol);
    document.getElementById('IdRol').value = item.id;
    document.getElementById('NombreRol').value = item.nombre;
    document.getElementById('DescriptionRol').value = item.descripcion;
}


function closeInput() {
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    limpiarRol();
}


function updateRol() {
    const IdRol = document.getElementById('IdRol').value;
    const item = {
        id: document.getElementById('IdRol').value,
        nombre: document.getElementById('NombreRol').value,
        descripcion: document.getElementById('DescriptionRol').value,
    };
    fetch(`${url}/${IdRol}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getRoles())
        .then(() => limpiarRol())
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    return false;
}

function deleteRol(IdRol) {
    fetch(`${url}/${IdRol}`, {
        method: 'DELETE'
    })
        .then(() => getRoles())
        .catch(error => console.error('Error al eliminar el rol.', error));
}


function addRol() {
    const addNameTextbox = document.getElementById('NombreRol');
    const addDescriptionText = document.getElementById('DescriptionRol');

    const item = {
        nombre: addNameTextbox.value.trim(),
        descripcion: addDescriptionText.value.trim(),
    };

    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => getRoles())
        .then(() => limpiarRol())
        .catch(error => console.error('Error al agregar el rol.', error));
}


function limpiarRol() {
    document.getElementById('IdRol').value = '';
    document.getElementById('NombreRol').value = '';
    document.getElementById('DescriptionRol').value = '';
}