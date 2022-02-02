const URL = "http://localhost/api/api.php?accion=";
class peticiones {
    async crear(data) {
        let response = await fetch(`${URL}INSERT`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async leer() {
        let response = await fetch(`${URL}SELECT`);
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