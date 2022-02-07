const URL = "https://vue-cli-api.000webhostapp.com/api/api.php?accion=";
class peticiones {
    async crear(data) {
        let response = await fetch("https://vue-cli-api.000webhostapp.com/api/api.php?accion=INSERT", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async leer() {
        let response = await fetch(`${URL}SELECT`, {
            headers: {
                'Accept': "application/json;q=0.9",
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        return await response.json();
    }

    async actualizar(data) {
        let response = await fetch(`${URL}UPDATE`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();

    }

    async eliminar(data) {
        let response = await fetch(`${URL}DELETE`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();

    }
}
export default new peticiones();