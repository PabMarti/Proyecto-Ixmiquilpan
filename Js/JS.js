

// Función para obtener la dirección IP del usuario
function getIPAddress(callback) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            callback(data.ip);
        })
        .catch(error => {
            console.error('Error al obtener la dirección IP:', error);
            callback(null);
        });
}

// Función para obtener el último ID registrado en el mockapi
function getLastRegisteredID(callback) {
    fetch('https://65ef77abead08fa78a507acc.mockapi.io/contador')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.id - a.id);
            const lastID = data.length > 0 ? data[0].id : null;
            callback(lastID);
        })
        .catch(error => {
            console.error('Error al obtener el último ID registrado:', error);
            callback(null);
        });
}

// Función para enviar la dirección IP al mockapi
function saveIPToMockAPI(ip) {
    if (ip) {
        fetch('https://65ef77abead08fa78a507acc.mockapi.io/contador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip: ip })
        })
        .then(response => {
            if (response.ok) {
                console.log('Dirección IP guardada correctamente en el mockapi.');
            } else {
                console.error('Error al guardar la dirección IP en el mockapi:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error al guardar la dirección IP en el mockapi:', error);
        });
    } else {
        console.error('La dirección IP es nula.');
    }
}

// Cuando se cargue la página, obtenemos el último ID registrado y luego guardamos la dirección IP
window.addEventListener('load', function() {
    getLastRegisteredID(function(lastID) {
        console.log('Último ID registrado:', lastID);
        let spanID = document.getElementById('ID')
        spanID.innerHTML = lastID
        getIPAddress(function(ip) {
            saveIPToMockAPI(ip);
        });
    });
});
