const urlDoCiu = '/api/TipoDocumentosxCiudadanoes';
let todos = [];

function getDoCiu() {
    fetch(urlDoCiu)
        .then(response => response.json())
        .then(data => mostrarDocxCiu(data, 1))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function mostrarDocxCiu(data, rol) {
    if (!data.length > 0) {
        return;
    }
    const tBody = document.getElementById('detDocxCiu');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `EditDocxCiu('${item.id}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteDocxCiu('${item.id}')`);
        
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtid = document.createTextNode(item.id);
        td1.appendChild(txtid);

        let td2 = tr.insertCell(1);
        let txtcodigoDocumento = document.createTextNode(item.codigoDocumento);
        td2.appendChild(txtcodigoDocumento);

        let td3 = tr.insertCell(2);
        let txtciudadanoId = document.createTextNode(item.ciudadanoId);
        td3.appendChild(txtciudadanoId);

        let td4 = tr.insertCell(3);
        let txtestadoExamenOral = document.createTextNode(item.estadoExamenOral == null ? "-" : item.estadoExamenOral ? "Sí":"No");
        td4.appendChild(txtestadoExamenOral);

        let td5 = tr.insertCell(4);
        let txtestadoExamenPractico = document.createTextNode(item.estadoExamenPractico == null ? "-" : item.estadoExamenPractico ? "Sí" : "No");
        td5.appendChild(txtestadoExamenPractico);

        let td6 = tr.insertCell(5);
        let aprobado = document.createTextNode(item.estadoExamenPractico == null || item.estadoExamenOral == null ? "-" : item.estadoExamenPractico && item.estadoExamenOral ? "Aprobado" : "Reprobado");
        td6.appendChild(aprobado);

        let td7 = tr.insertCell(6);
        let txtfechaEmision = document.createTextNode(item.fechaEmision == null ? "-" : new Date(item.fechaEmision).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }));
        td7.appendChild(txtfechaEmision);

        let td8 = tr.insertCell(7);
        let txtfechaVencimiento = document.createTextNode(item.fechaVencimiento == null ? "-" : new Date(item.fechaVencimiento).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }));
        td8.appendChild(txtfechaVencimiento);

        let td9 = tr.insertCell(8);
        let txtRenovacion = document.createTextNode(item.esRenovacion ? "Renovación" : "Primera vez");
        td9.appendChild(txtRenovacion);

        let td10 = tr.insertCell(9);
        let txtFechaCita = document.createTextNode(item.fechaCita == null ? "-" : new Date(item.fechaCita).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }));
        td10.appendChild(txtFechaCita);

        let td11 = tr.insertCell(10);
        if (item.examenMedico) {
            let img = document.createElement('img');
            img.src = `data:image/jpeg;base64,${item.examenMedico}`;
            img.width = 100;
            img.height = 100;
            td11.appendChild(img);
        } else {
            td11.innerText = 'No disponible';
        }
       
        let td12 = tr.insertCell(11);
        if (item.examenVista) {
            let img = document.createElement('img');
            img.src = `data:image/jpeg;base64,${item.examenVista}`;
            img.width = 100;
            img.height = 100;
            td12.appendChild(img);
        } else {
            td12.innerText = 'No disponible';
        }
        
        let td13 = tr.insertCell(12);
        if (item.examenPsico) {
            let img = document.createElement('img');
            img.src = `data:image/jpeg;base64,${item.examenPsico}`;
            img.width = 100;
            img.height = 100;
            td13.appendChild(img);
        } else {
            td13.innerText = 'No disponible';
        }

        let td14 = tr.insertCell(13);
        if (item.deposito) {
            let img = document.createElement('img');
            img.src = `data:image/jpeg;base64,${item.deposito}`;
            img.width = 100;
            img.height = 100;
            td14.appendChild(img);
        } else {
            td14.innerText = 'No disponible';
        }

        let td15 = tr.insertCell(14);
        td15.appendChild(deleteButton);
        if (rol != 2) {
            td15.appendChild(editButton);
        }
    });
    todos = data;
}


function EditDocxCiu(idDocxCiu) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.id.toString() === idDocxCiu);
    document.getElementById('IdDocCiu').value = item.id;
    document.getElementById('listDocumentos').value = item.codigoDocumento;
    document.getElementById('listCiudadano').value = item.ciudadanoId;
    document.getElementById('exOral').value = item.estadoExamenOral;
    document.getElementById('exPractico').value = item.estadoExamenPractico;
    document.getElementById('fechaCita').value = item.fechaCita ? item.fechaCita.slice(0, 16) : '';
    document.getElementById('fechaEmision').value = item.fechaEmision ? new Date(item.fechaEmision).toISOString().slice(0, 10) : '';
    document.getElementById('fechaVencimiento').value = item.fechaVencimiento ? new Date(item.fechaVencimiento).toISOString().slice(0, 10) : '';
}


function closeInput() {
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    limpiarDoCiu();
}

function closeInputCiudad() {
    document.getElementById('addBotton').style.display = 'block';
    limpiarDoCiu();
    document.getElementById('listCiudadano').value = localStorage.getItem('dniUser');
}

function updateDocCiu() {
    const IdDocCiu = parseInt(document.getElementById('IdDocCiu').value);
    const item = {
        id: parseInt(document.getElementById('IdDocCiu').value),
        codigoDocumento: document.getElementById('listDocumentos').value,
        ciudadanoId: document.getElementById('listCiudadano').value,
        estadoExamenOral: document.getElementById('exOral').value,
        estadoExamenPractico: document.getElementById('exPractico').value,
        fechaEmision: document.getElementById('fechaEmision').value,
        fechaVencimiento: document.getElementById('fechaVencimiento').value,
        fechaCita: document.getElementById('fechaCita').value
    };
    fetch(`${urlDoCiu}/${IdDocCiu}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getDoCiu())
        .then(() => limpiarDoCiu())
        .then(() => closeInput())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    return false;
}

function deleteDocxCiu(IdRol) {
    fetch(`${urlDoCiu}/${IdRol}`, {
        method: 'DELETE'
    })
        .then(() => getDoCiu())
        .catch(error => console.error('Error al eliminar el rol.', error));
}


function addDocCiu(rol) {
    const listCiudadano = document.getElementById('listCiudadano');
    const medicFile = document.getElementById('medicFile'); // archivo
    const psicoFile = document.getElementById('psicoFile'); // archivo
    const vistaFile = document.getElementById('vistaFile'); // archivo
    const depositoFile = document.getElementById('depositoFile'); // archivo

    const formData = new FormData();
    formData.append('ciudadanoId', rol == 2 ? localStorage.getItem('dniUser') : listCiudadano.value.trim());
    formData.append('codigoDocumento', document.getElementById('listDocumentos').value);
    formData.append('esRenovacion', document.getElementById('esRenovacion').value);

    if (medicFile.files.length > 0) {
        formData.append('examenMedico', medicFile.files[0]);
    }
    if (vistaFile.files.length > 0) {
        formData.append('examenVista', vistaFile.files[0]);
    }
    if (psicoFile.files.length > 0) {
        formData.append('examenPsico', psicoFile.files[0]);
    }
    if (depositoFile.files.length > 0) {
        formData.append('deposito', depositoFile.files[0]);
    }

    fetch(`${urlDoCiu}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(() => getDoCiu())
        .then(() => limpiarDoCiu())
        .catch(error => console.error('Error al agregar el rol.', error));
}


function limpiarDoCiu() {
    document.getElementById('listDocumentos').value = '';
    document.getElementById('listCiudadano').value = '';
    document.getElementById('esRenovacion').value = '';
    document.getElementById('inputvistaFile').textContent = 'Seleccionar imágen';
    document.getElementById('inputpsicoFile').textContent = 'Seleccionar imágen';
    document.getElementById('inputmedicFile').textContent = 'Seleccionar imágen';
    document.getElementById('inputdepositoFile').textContent = 'Seleccionar imágen';
    document.getElementById('fechaCita').value = '';
    document.getElementById('fechaEmision').value = '';
    document.getElementById('fechaVencimiento').value = '';
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

fetch('/api/TipoDocumentoes')
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('listDocumentos');
        data.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.codigo; // Asignar el valor del ciudadano
            option.textContent = doc.codigo; // Mostrar el nombre del ciudadano
            dropdown.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener los documentos', error));

function getDoCiuOficial() {
    fetch(urlDoCiu)
        .then(response => response.json())
        .then(data => mostrarDocxCiuOfi(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function mostrarDocxCiuOfi(data) {
    const tBody = document.getElementById('detDocxCiu');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtid = document.createTextNode(item.id);
        td1.appendChild(txtid);

        let td2 = tr.insertCell(1);
        let txtcodigoDocumento = document.createTextNode(item.codigoDocumento);
        td2.appendChild(txtcodigoDocumento);

        let td3 = tr.insertCell(2);
        let txtciudadanoId = document.createTextNode(item.ciudadanoId);
        td3.appendChild(txtciudadanoId);

        let td4 = tr.insertCell(3);
        let txtestadoExamenOral = document.createTextNode(item.estadoExamenOral ? "Sí" : "No");
        td4.appendChild(txtestadoExamenOral);

        let td5 = tr.insertCell(4);
        let txtestadoExamenPractico = document.createTextNode(item.estadoExamenPractico ? "Sí" : "No");
        td5.appendChild(txtestadoExamenPractico);

        let td6 = tr.insertCell(5);
        let aprobado = document.createTextNode(item.estadoExamenPractico && item.estadoExamenOral ? "Aprobado" : "Reprobado");
        td6.appendChild(aprobado);

        let td7 = tr.insertCell(6);
        let txtfechaEmision = document.createTextNode(new Date(item.fechaEmision).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }));
        td7.appendChild(txtfechaEmision);

        let td8 = tr.insertCell(7);
        let txtfechaVencimiento = document.createTextNode(new Date(item.fechaVencimiento).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }));
        td8.appendChild(txtfechaVencimiento);
    });
    todos = data;
}

//METODOS PARA CIUDADANO
document.getElementById('medicFile').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!allowedTypes.includes(file.type)) {
            alert('Solo se permiten archivos de tipo imagen (JPEG, PNG, GIF).');
            event.target.value = '';
            return;
        }

        document.getElementById('inputmedicFile').value = file;
        document.getElementById('inputmedicFile').textContent  = file.name;
    } else {
        alert('No se seleccionó ningún archivo.');
    }
});

function getDoCiudad() {
    fetch(urlDoCiu)
        .then(response => response.json())
        .then(data => mostrarDocxCiu(data, 2))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

document.getElementById('psicoFile').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!allowedTypes.includes(file.type)) {
            alert('Solo se permiten archivos de tipo imagen (JPEG, PNG, GIF).');
            event.target.value = '';
            return;
        }
        document.getElementById('inputpsicoFile').value = file;
        document.getElementById('inputpsicoFile').textContent = file.name;
    } else {
        alert('No se seleccionó ningún archivo.');
    }
});

document.getElementById('vistaFile').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!allowedTypes.includes(file.type)) {
            alert('Solo se permiten archivos de tipo imagen (JPEG, PNG, GIF).');
            event.target.value = '';
            return;
        }
        document.getElementById('inputvistaFile').value = file;
        document.getElementById('inputvistaFile').textContent = file.name;
    } else {
        alert('No se seleccionó ningún archivo.');
    }
});

document.getElementById('depositoFile').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!allowedTypes.includes(file.type)) {
            alert('Solo se permiten archivos de tipo imagen (JPEG, PNG, GIF).');
            event.target.value = '';
            return;
        }
        document.getElementById('inputdepositoFile').value = file;
        document.getElementById('inputdepositoFile').textContent = file.name;
    } else {
        alert('No se seleccionó ningún archivo.');
    }
});

function getDoCiudad() {
    fetch(urlDoCiu)
        .then(response => response.json())
        .then(data => mostrarDocxCiu(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}
