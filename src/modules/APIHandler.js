const remoteURL = "http://localhost:8088";

export default {
    getAll() {
        return fetch(`${remoteURL}/presets?_embed=distortionSettings&&_embed=chorusSettings&&_embed=delaySettings`)
            .then(resp => resp.json()).then(presets => {
                // TODO: transform data shape into pedal array
                return presets.map(p => {

                    const preset = {...p}
                    
                    preset.chain = []
                    if (preset.distortionSettings) {
                       preset.distortionSettings.forEach(distortion => {
                           distortion.pedalType = "Distortion"
                           preset.chain[distortion.order] = distortion
                       })
                    } 

                    if (preset.chorusSettings) {
                        preset.chorusSettings.forEach(chorus => {
                            chorus.pedalType = "Chorus"
                            preset.chain[chorus.order] = chorus
                        })
                    }

                    if (preset.delaySettings) {
                        preset.delaySettings.forEach(delay => {
                            delay.pedalType = "Delay"
                            preset.chain[delay.order] = delay
                        })
                    }

                    return preset
                })
            })
    },
    post(newPreset) {
        return fetch(`${remoteURL}/presets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPreset)
        }).then(resp => resp.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/presets/${id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
    }
}