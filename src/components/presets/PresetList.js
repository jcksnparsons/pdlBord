import React, { useEffect, useState } from "react";
import APIHandler from "../../modules/APIHandler";
import PresetCard from "./PresetCard";

const PresetList = props => {
  const [presets, setPresets] = useState([]);
  const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

  const getPresets = () => {
    return APIHandler.getAll().then(presetsFromAPI => {
      const userPresets = presetsFromAPI.filter(preset => preset.userId === userNow)
      setPresets(userPresets);
    });
  };

  const deletePreset = id => {
    APIHandler.delete(id).then(() => {
      APIHandler.getAll().then(presetsFromAPI => {
        const userPresets = presetsFromAPI.filter(preset => preset.userId === userNow)
        setPresets(userPresets)
      });
    });
  };

  useEffect(() => {
    getPresets();
  }, []);

  return (
    <>
      <div className="container-cards">
        {presets.map(preset => (
          <PresetCard
            key={preset.id}
            preset={preset}
            loadPreset={props.onSelectPreset}
            deletePreset={deletePreset}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default PresetList;
