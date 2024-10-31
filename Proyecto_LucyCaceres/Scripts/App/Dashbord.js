function getUsuarios() {
    fetch('/api/Usuarios')
        .then(response => response.json())
        .then(data => MostrarUsuarios(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function MostrarUsuarios(data) {
    const usuarios = data.length;
    var totalUsu = document.getElementById("TotalUsu");
    totalUsu.textContent = usuarios.toString();
}

function getAprobados() {
    fetch('/api/TipoDocumentosxCiudadanoes')
        .then(response => response.json())
        .then(data => mostrarAprobados(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarAprobados(data) {
    const aprobados = data.filter(item => item.estadoExamenOral && item.estadoExamenPractico).length;
    var totalUsu = document.getElementById("aprobados");
    totalUsu.textContent = aprobados.toString();
}

function getRenovacion() {
    fetch('/api/TipoDocumentosxCiudadanoes')
        .then(response => response.json())
        .then(data => mostrarRenovacion(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarRenovacion(data) {
    const aprobados = data.filter(item => item.esRenovacion).length;
    var totalUsu = document.getElementById("esRenovacion");
    totalUsu.textContent = aprobados.toString();
}

function getPrimeraVez() {
    fetch('/api/TipoDocumentosxCiudadanoes')
        .then(response => response.json())
        .then(data => mostrarPrimera(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarPrimera(data) {
    const aprobados = data.filter(item => !item.esRenovacion).length;
    var totalUsu = document.getElementById("noRenovacion");
    totalUsu.textContent = aprobados.toString();
}

function getReprobados() {
    fetch('/api/TipoDocumentosxCiudadanoes')
        .then(response => response.json())
        .then(data => mostrarReprobados(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarReprobados(data) {
    const aprobados = data.filter(item => !item.estadoExamenOral || !item.estadoExamenPractico).length;
    var totalUsu = document.getElementById("reprobados");
    totalUsu.textContent = aprobados.toString();
}

function getCiudadanos() {
    fetch('/api/Ciudadanoes')
        .then(response => response.json())
        .then(data => mostrarCiudad(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

function mostrarCiudad(data) {
    const totalCiu = data.length;
    var ciuInput = document.getElementById("ciudada");
    ciuInput.textContent = totalCiu.toString();
}