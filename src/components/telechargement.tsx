"use client"
import React from 'react';

const DownloadParcours = ({parcours}) => {
    const handleClick = () => {

        const jsonData = JSON.stringify(parcours);

        const blob = new Blob([jsonData], {type: 'application/json'});

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `${parcours.name}.json`;


        document.body.appendChild(a);
        a.click();


        document.body.removeChild(a);
    };

    return (
        <button onClick={handleClick} className="bg-grey p-4 mt-6 rounded-2xl text-white hover:rounded-full">
            Télécharger le fichier JSON
        </button>
    );
};

export default DownloadParcours;
