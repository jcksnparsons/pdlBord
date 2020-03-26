const remoteURL = "http://localhost:8088";

export default {
  getAll() {
    return fetch(
      `${remoteURL}/presets?_embed=distortionSettings&&_embed=chorusSettings&&_embed=delaySettings`
    )
      .then(resp => resp.json())
      .then(presets => {
        return presets.map(p => {
          const preset = { ...p };

          preset.chain = [];
          if (preset.distortionSettings) {
            preset.distortionSettings.forEach(distortion => {
              distortion.pedalType = "Distortion";
              preset.chain[distortion.order] = distortion;
            });
          }

          if (preset.chorusSettings) {
            preset.chorusSettings.forEach(chorus => {
              chorus.pedalType = "Chorus";
              preset.chain[chorus.order] = chorus;
            });
          }

          if (preset.delaySettings) {
            preset.delaySettings.forEach(delay => {
              delay.pedalType = "Delay";
              preset.chain[delay.order] = delay;
            });
          }

          return preset;
        });
      });
  },
  getUser() {
    return fetch(`${remoteURL}/users`).then(resp => resp.json());
  },
  postUser(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(resp => resp.json());
  },
  post(newPreset) {
    return fetch(`${remoteURL}/presets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPreset)
    }).then(resp => resp.json());
  },
  postDistortion(distortionObject) {
    return fetch(`${remoteURL}/distortionSettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(distortionObject)
    }).then(resp => resp.json());
  },
  postChorus(chorusObject) {
    return fetch(`${remoteURL}/chorusSettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chorusObject)
    }).then(resp => resp.json());
  },
  postDelay(delayObject) {
    return fetch(`${remoteURL}/delaySettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(delayObject)
    }).then(resp => resp.json());
  },
  updatePreset(preset) {
    return fetch(`${remoteURL}/presets/${preset.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preset)
    }).then(resp => resp.json());
  },
  updateDistortion(distortionObject) {
    return fetch(`${remoteURL}/distortionSettings/${distortionObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(distortionObject)
    }).then(resp => resp.json());
  },
  updateChorus(chorusObject) {
    return fetch(`${remoteURL}/chorusSettings/${chorusObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chorusObject)
    }).then(resp => resp.json());
  },
  updateDelay(delayObject) {
    return fetch(`${remoteURL}/delaySettings/${delayObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(delayObject)
    }).then(resp => resp.json());
  },
  delete(id) {
    return fetch(`${remoteURL}/presets/${id}`, {
      method: "DELETE"
    }).then(resp => resp.json());
  }
};
