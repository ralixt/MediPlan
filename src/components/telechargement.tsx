"use client"
import React from 'react';
import {FileArrowDown} from "@phosphor-icons/react";

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
        <button onClick={handleClick} className="bg-grey w-14 h-14 rounded-2xl text-white flex items-center content-center justify-center hover:rounded-full">
            <FileArrowDown size={32} />
        </button>
    );
};

export default DownloadParcours;
