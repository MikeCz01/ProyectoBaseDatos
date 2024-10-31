const urlTipDoc = '/api/TipoDocumentoes';
let todos = [];

function getTipoDoc() {
    fetch(urlTipDoc)
        .then(response => response.json())
        .then(data => mostrarTipDoc(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function mostrarTipDoc(data) {
    const tBody = document.getElementById('detaTipDoc');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `EditTipDoc('${item.codigo}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteTipDoc('${item.codigo}')`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let tctCodigo = document.createTextNode(item.codigo);
        td1.appendChild(tctCodigo);

        let td2 = tr.insertCell(1);
        let txtdescripcion = document.createTextNode(item.descripcion);
        td2.appendChild(txtdescripcion);

        let td3 = tr.insertCell(2);
        let txtprecio = document.createTextNode(item.precio);
        td3.appendChild(txtprecio);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });
    todos = data;
}


function EditTipDoc(codTipDoc) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.codigo === codTipDoc);
    document.getElementById('codTipDoc').value = item.codigo;
    document.getElementById('DescTipDoc').value = item.descripcion;
    document.getElementById('precioDoc').value = item.precio;
}


function closeInput() {
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    limpiarTipDoc();
}


function updateTipoDoc() {
    const codTipDoc = document.getElementById('codTipDoc').value;
    const item = {
        codigo: document.getElementById('codTipDoc').value,
        descripcion: document.getElementById('DescTipDoc').value,
        precio: document.getElementById('precioDoc').value,
    };
    fetch(`${urlTipDoc}/${codTipDoc}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getTipoDoc())
        .then(() => limpiarTipDoc())
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    return false;
}

function deleteTipDoc(IdRol) {
    fetch(`${urlTipDoc}/${IdRol}`, {
        method: 'DELETE'
    })
        .then(() => getTipoDoc())
        .catch(error => console.error('Error al eliminar el rol.', error));
}


function addTipDoc() {
    const addCodigo = document.getElementById('codTipDoc');
    const addDescription = document.getElementById('DescTipDoc');
    const addPrecio = document.getElementById('precioDoc');

    const item = {
        codigo: addCodigo.value.trim(),
        descripcion: addDescription.value.trim(),
        precio: addPrecio.value.trim()
    };

    fetch(`${urlTipDoc}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => getTipoDoc())
        .then(() => limpiarTipDoc())
        .catch(error => console.error('Error al agregar el rol.', error));
}


function limpiarTipDoc() {
    document.getElementById('codTipDoc').value = '';
    document.getElementById('DescTipDoc').value = '';
    document.getElementById('precioDoc').value = '';
}

function getTipoDocOficial() {
    fetch(urlTipDoc)
        .then(response => response.json())
        .then(data => mostrarTipDocOfi(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function mostrarTipDocOfi(data) {
    const tBody = document.getElementById('detaTipDoc');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let tctCodigo = document.createTextNode(item.codigo);
        td1.appendChild(tctCodigo);

        let td2 = tr.insertCell(1);
        let txtdescripcion = document.createTextNode(item.descripcion);
        td2.appendChild(txtdescripcion);

        let td3 = tr.insertCell(2);
        let txtprecio = document.createTextNode(item.precio);
        td3.appendChild(txtprecio);
    });
    todos = data;
}