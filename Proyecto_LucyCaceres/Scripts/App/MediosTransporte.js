const urlMedTran = '/api/MediosTransportes';
let todos = [];

function getMedTransp() {
    fetch(urlMedTran)
        .then(response => response.json())
        .then(data => mostrarMedTransp(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function mostrarMedTransp(data) {
    const tBody = document.getElementById('detaTipDoc');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `editMedTip('${item.id}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteMedTip('${item.id}')`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtid = document.createTextNode(item.id);
        td1.appendChild(txtid);

        let td2 = tr.insertCell(1);
        let txttipo = document.createTextNode(item.tipo);
        td2.appendChild(txttipo);

        let td3 = tr.insertCell(2);
        let txtdescripcion = document.createTextNode(item.descripcion);
        td3.appendChild(txtdescripcion);

        let td4 = tr.insertCell(3);
        let txtcategoria = document.createTextNode(item.categoria);
        td4.appendChild(txtcategoria);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });
    todos = data;
}


function editMedTip(medId) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.id.toString() === medId);
    document.getElementById('medTraId').value = item.id;
    document.getElementById('medTraTipo').value = item.tipo;
    document.getElementById('medTraDes').value = item.descripcion;
    document.getElementById('medTraCat').value = item.categoria;
}


function closeInput() {
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    limpiarMedTran();
}


function updateMedTrans() {
    const idMedTip = document.getElementById('medTraId').value;
    const item = {
        id: document.getElementById('medTraId').value,
        tipo: document.getElementById('medTraTipo').value,
        descripcion: document.getElementById('medTraDes').value,
        categoria: document.getElementById('medTraCat').value,
    };
    fetch(`${urlMedTran}/${idMedTip}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getMedTransp())
        .then(() => limpiarMedTran())
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar el medio de transporte.', error));
    return false;
}

function deleteMedTip(medId) {
    fetch(`${urlMedTran}/${medId}`, {
        method: 'DELETE'
    })
        .then(() => getMedTransp())
        .catch(error => console.error('Error al eliminar el medio de transporte.', error));
}


function addMedTrans() {
    const addTipo = document.getElementById('medTraTipo');
    const addDescrip = document.getElementById('medTraDes');
    const addCateg = document.getElementById('medTraCat');

    const item = {
        tipo: addTipo.value.trim(),
        descripcion: addDescrip.value.trim(),
        categoria: addCateg.value.trim()
    };

    fetch(`${urlMedTran}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => getMedTransp())
        .then(() => limpiarMedTran())
        .catch(error => console.error('Error al agregar el medio de transporte.', error));
}


function limpiarMedTran() {
    document.getElementById('medTraId').value = '';
    document.getElementById('medTraTipo').value = '';
    document.getElementById('medTraDes').value = '';
    document.getElementById('medTraCat').value = '';
}