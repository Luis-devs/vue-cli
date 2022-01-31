const URL = "http://localhost/api/api.php?accion=";
class peticiones {
    async crear(data) {
        const response = await fetch(`${URL}INSERT`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async leer() {
        const response = await fetch(`${URL}SELECT`);
        return await response.json();
    }
    leer1() {
        fetch(`${URL}SELECT`)
            .then(response => { return response.json() });
    }
    actualizar(data) {
        fetch(`${URL}UPDATE`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then((response) => { return response });

    }
}
export default new peticiones();