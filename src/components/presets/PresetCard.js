import React from "react";

const PresetCard = props => {

    const handlePresetSelect = () => {
        props.loadPreset(props.preset);
        props.history.push("/board")
    }

    return (
        <div className="card">
        <div className="card-content">
            <h3>{props.preset.name}</h3>
            <button onClick={handlePresetSelect}>Load Preset</button>
        </div>
        </div>
    )
}

export default PresetCard