const urlUsu = '/api/Usuarios';

function getUsuarios() {
    fetch(urlUsu)
        .then(response => response.json())
        .then(data => MostrarUsuarios(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}


function MostrarUsuarios(data) {
    const tBody = document.getElementById('DetUsuario');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `editUsuario('${item.dni}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteUsu('${item.dni}')`);

        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        let txtId = document.createTextNode(item.dni);
        td0.appendChild(txtId);

        let td2 = tr.insertCell(1);
        let txtnombre = document.createTextNode(item.nombre);
        td2.appendChild(txtnombre);

        let td3 = tr.insertCell(2);
        let txtapellido = document.createTextNode(item.apellido);
        td3.appendChild(txtapellido);

        let td4 = tr.insertCell(3);
        let txtgenero = document.createTextNode(item.genero);
        td4.appendChild(txtgenero);

        let td5 = tr.insertCell(4);
        let txtemail = document.createTextNode(item.email);
        td5.appendChild(txtemail);

        let td6 = tr.insertCell(5);
        let txtcelular = document.createTextNode(item.celular);
        td6.appendChild(txtcelular);

        let td7 = tr.insertCell(6);
        let txtcontrasena = document.createTextNode(item.contrasena);
        td7.appendChild(txtcontrasena);

        let td8 = tr.insertCell(7);
        let txtrolId = document.createTextNode(item.rol);
        td8.appendChild(txtrolId);

        let td9 = tr.insertCell(8);
        td9.appendChild(editButton);

        let td10 = tr.insertCell(9);
        td10.appendChild(deleteButton);
    });
    todos = data;
}
//Mostrar Editor De Datos

function deleteUsu(usuId) {
    fetch(`${urlUsu}/${usuId}`, {
        method: 'DELETE'
    })
        .then(() => getUsuarios())
        .catch(error => console.error('Error al eliminar el el usuario.', error));
}

function editUsuario(dniUsu) {
    document.getElementById('editBotton').style.display = 'block';
    document.getElementById('addBotton').style.display = 'none';

    const item = todos.find(item => item.dni === dniUsu);
    document.getElementById('dniNewUser').value = item.dni;
    document.getElementById('nameNewUser').value = item.nombre;
    document.getElementById('lastNewUser').value = item.apellido;
    document.getElementById('emailNewUser').value = item.email;
    document.getElementById('genderNewUser').value = item.genero;
    document.getElementById('celNewUser').value = item.celular;
    document.getElementById('passNewUser').value = item.contrasena;
    document.getElementById('rolNewUser').value = item.rolId;
}

function closeInput() {
    document.getElementById('editBotton').style.display = 'none';
    document.getElementById('addBotton').style.display = 'block';
    limpiarUsuario();
}

function updateUsuario() {
    const dniUsuario = document.getElementById('dniNewUser').value;
    const item = {
        dni: document.getElementById('dniNewUser').value.trim(),
        nombre: document.getElementById('nameNewUser').value.trim(),
        apellido: document.getElementById('lastNewUser').value.trim(),
        genero: document.getElementById('genderNewUser').value.trim(),
        email: document.getElementById('emailNewUser').value.trim(),
        celular: document.getElementById('celNewUser').value.trim(),
        contrasena: document.getElementById('passNewUser').value.trim(),
        rolId: parseInt(document.getElementById('rolNewUser').value),
    };
    fetch(`${urlUsu}/${dniUsuario}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getUsuarios())
        .then(() => limpiarUsuario())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    closeInput();
    return false;
}

function registrarUsuario() {
    const password = generarContrasena();
    if (document.getElementById('dniUser').value == "") {
        const errorModal = document.getElementById('errorModal');
        var titleModal = document.getElementById("titleModal");
        var mensajeModal = document.getElementById("mensajeModal");
        titleModal.textContent = "Hubo un error";
        mensajeModal.textContent = "El campo de número de identidad es requerido, por favor llenelo."
        $(errorModal).modal('show');
        return;
    }
    if (document.getElementById('nombreUser').value == "" || document.getElementById('apellidoUser').value == "") {
        const errorModal = document.getElementById('errorModal');
        var titleModal = document.getElementById("titleModal");
        var mensajeModal = document.getElementById("mensajeModal");
        titleModal.textContent = "Hubo un error";
        mensajeModal.textContent = "Tiene información sin llenar."
        $(errorModal).modal('show');
        return;
    }
    const item = {
        dni: document.getElementById('dniUser').value.trim(),
        nombre: document.getElementById('nombreUser').value.trim(),
        apellido: document.getElementById('apellidoUser').value.trim(),
        genero: document.getElementById('generoUser').value.trim(),
        email: document.getElementById('correoUser').value.trim(),
        celular: document.getElementById('celUser').value.trim(),
        contrasena: password,
        rolId: 2
    };
   
    fetch(urlUsu, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => {
            if (response.ok) {
                let dniUsuario = document.getElementById('dniUser').value.trim();
                localStorage.setItem('dniUser', dniUsuario);
                var rolCiudadano = document.getElementById('rolCiudadano').value;
                window.location.href = rolCiudadano;
            } else {
                alert('Hubo un error al tratar de crear el registro, comuniquese con el departamento de sistemas o un usuario administrativo.');
            }
        }).catch(error => console.error('Error al guardar el usuario', error));
}

function generarContrasena() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let contrasena = '';

    for (let i = 0; i < 8; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indice);
    }

    return contrasena;
}

function mostrarRegistrado(dniUser){
    fetch(`${urlUsu}/${dniUser}`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => displayShowInfo(data))
        .catch(error => console.error('Error mostrar el usuario', error));
}

function displayShowInfo(item) {
    document.getElementById('dniRegister').value = item.dni;
    document.getElementById('nameRegister').value = item.nombre;
    document.getElementById('lastNRegister').value = item.apellido;
    document.getElementById('correoRegister').value = item.email;
    document.getElementById('genderRegister').value = item.genero;
    document.getElementById('celRegister').value = item.celular;
    document.getElementById('passRegister').value = item.contrasena;
}

function confirmarAcceso() {
    let dni = document.getElementById('dni').value.trim();
    fetch(`${urlUsu}/codigo/${dni}`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => {
            let passwordUsuario = document.getElementById('passwordUsuario').value.trim();
            if (data.length > 0 || data.contrasena == passwordUsuario) {
                localStorage.setItem('dniUser', dni);
                if (data.rolId == 1) {
                    var rolAdmin = document.getElementById('rolAdmin').value;
                    window.location.href = rolAdmin;
                }
                if (data.rolId == 2) {
                    var rolDigitador = document.getElementById('rolDigitador').value;
                    window.location.href = rolDigitador;
                }
                if (data.rolId == 3) {
                    var rolOficial = document.getElementById('rolOficial').value;
                    window.location.href = rolOficial;
                }            
            } else {
                mostrarModalError("No se encontro ningún usuario con ese código, por favor registresé o comuniquesé con un administrador.");
            }
           
        }).catch(error => console.error('Error al iniciar sesión.', error));
}

function mostrarModalError(mensaje) {
    const errorModal = document.getElementById('errorModal');
    var titleModal = document.getElementById("titleModal");
    var mensajeModal = document.getElementById("mensajeModal");
    titleModal.textContent = "Hubo un error";
    mensajeModal.textContent = mensaje;
    $(errorModal).modal('show');
}

function registrarNuevoUsuario() {
    const item = {
        dni: document.getElementById('dniNewUser').value.trim(),
        nombre: document.getElementById('nameNewUser').value.trim(),
        apellido: document.getElementById('lastNewUser').value.trim(),
        genero: document.getElementById('genderNewUser').value.trim(),
        email: document.getElementById('emailNewUser').value.trim(),
        celular: document.getElementById('celNewUser').value.trim(),
        contrasena: document.getElementById('passNewUser').value.trim(),
        rolId: parseInt(document.getElementById('rolNewUser').value),
    };

    fetch(urlUsu, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(response => response.json())
        .then(() => getUsuarios())
        .then(() => limpiarUsuario())
        .catch(error => console.error('Error al agregar el usuario.', error));
}

function limpiarUsuario() {
    document.getElementById('dniNewUser').value = '';
    document.getElementById('nameNewUser').value = '';
    document.getElementById('lastNewUser').value = '';
    document.getElementById('genderNewUser').value = '';
    document.getElementById('emailNewUser').value = '';
    document.getElementById('celNewUser').value = '';
    document.getElementById('passNewUser').value = '';
    document.getElementById('rolNewUser').value = '';
}

function getUsuariosOficial() {
    fetch(`${urlUsu}/oficial`)
        .then(response => response.json())
        .then(data => MostrarUsuariosOficial(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function MostrarUsuariosOficial(data) {
    const tBody = document.getElementById('DetUsuario');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `editUsuario('${item.dni}')`);


        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.setAttribute('onclick', `deleteUsuOficial('${item.dni}')`);

        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        let txtId = document.createTextNode(item.dni);
        td0.appendChild(txtId);

        let td2 = tr.insertCell(1);
        let txtnombre = document.createTextNode(item.nombre);
        td2.appendChild(txtnombre);

        let td3 = tr.insertCell(2);
        let txtapellido = document.createTextNode(item.apellido);
        td3.appendChild(txtapellido);

        let td4 = tr.insertCell(3);
        let txtgenero = document.createTextNode(item.genero);
        td4.appendChild(txtgenero);

        let td5 = tr.insertCell(4);
        let txtemail = document.createTextNode(item.email);
        td5.appendChild(txtemail);

        let td6 = tr.insertCell(5);
        let txtcelular = document.createTextNode(item.celular);
        td6.appendChild(txtcelular);

        let td7 = tr.insertCell(6);
        let txtcontrasena = document.createTextNode(item.contrasena);
        td7.appendChild(txtcontrasena);

        let td8 = tr.insertCell(7);
        let txtrolId = document.createTextNode(item.rol);
        td8.appendChild(txtrolId);

        let td9 = tr.insertCell(8);
        td9.appendChild(editButton);

        let td10 = tr.insertCell(9);
        td10.appendChild(deleteButton);
    });
    todos = data;
}

function deleteUsuOficial(usuId) {
    fetch(`${urlUsu}/${usuId}`, {
        method: 'DELETE'
    })
        .then(() => getUsuariosOficial())
        .catch(error => console.error('Error al eliminar el el usuario.', error));
}

function updateRolOficial() {
    const dniUsuario = document.getElementById('dniNewUser').value;
    const item = {
        dni: document.getElementById('dniNewUser').value.trim(),
        nombre: document.getElementById('nameNewUser').value.trim(),
        apellido: document.getElementById('lastNewUser').value.trim(),
        genero: document.getElementById('genderNewUser').value.trim(),
        email: document.getElementById('emailNewUser').value.trim(),
        celular: document.getElementById('celNewUser').value.trim(),
        contrasena: document.getElementById('passNewUser').value.trim(),
        rolId: 2,
    };
    fetch(`${urlUsu}/${dniUsuario}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getUsuariosOficial())
        .then(() => limpiarUsuario())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    closeInput();
    return false;
}

function addRolOficial() {
    const item = {
        dni: document.getElementById('dniNewUser').value.trim(),
        nombre: document.getElementById('nameNewUser').value.trim(),
        apellido: document.getElementById('lastNewUser').value.trim(),
        genero: document.getElementById('genderNewUser').value.trim(),
        email: document.getElementById('emailNewUser').value.trim(),
        celular: document.getElementById('celNewUser').value.trim(),
        contrasena: document.getElementById('passNewUser').value.trim(),
        rolId: parseInt(document.getElementById('rolNewUser').value),
    };

    fetch(urlUsu, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(response => response.json())
        .then(() => getUsuariosOficial())
        .then(() => limpiarUsuario())
        .catch(error => console.error('Error al agregar el usuario.', error));
}
