const remoteURL = "http://localhost:8088";

export default {
    getAll() {
        return fetch(`${remoteURL}/presets`)
            .then(resp => resp.json())
    },
    post(newPreset) {
        return fetch(`${remoteURL}/presets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPreset)
        }).then(resp => resp.json())
    }
}