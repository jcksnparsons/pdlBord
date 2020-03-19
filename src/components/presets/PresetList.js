import React, { useEffect, useState } from "react";
import APIHandler from "../../modules/APIHandler";
import PresetCard from "./PresetCard";

const PresetList = props => {
  const [presets, setPresets] = useState([]);


  const getPresets = () => {
      return APIHandler.getAll().then(presetsFromAPI => {
          setPresets(presetsFromAPI);
      })
  };

  useEffect(() => {
    getPresets();
  }, []);

  return (
    <>
      <div className="container-cards">
        {presets.map(preset => (
          <PresetCard key={preset.id} preset={preset} loadPreset={props.onSelectPreset} {...props} />
        ))}
      </div>
    </>
  );
};

export default PresetList