"use client"
import {cache, useEffect, useState} from "react";
import {getAllParcoursType, getNameParcoursType} from "@/actions/ParcoursType";
import fs from "fs/promises";


const getParcoursBDD = cache(async () => {
    const response = await getNameParcoursType();
    return response;
});



function ParcoursItem({ parcours, onQuantityChange }) {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity(quantity + 1);
        onQuantityChange(parcours._id, 1);
    };

    const handleSubtract = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            onQuantityChange(parcours._id, -1);
        }
    };

    return (
        <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-800">{parcours.name}</span>
            <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={handleAdd}>
                +
            </button>
            <span className="text-gray-800">{quantity}</span>
            <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={handleSubtract}>
                -
            </button>
        </div>
    );
}

export default function Planification() {
    const weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    const [parcoursTypes, setParcoursTypes] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [parcoursQuantities, setParcoursQuantities] = useState({});

    useEffect(() => {
        const fetchParcours = async () => {
            try {
                const data = await getParcoursBDD();
                setParcoursTypes(data);

                // Initialise les quantités à zéro pour chaque parcours et chaque jour
                const initialQuantities = {};
                weekdays.forEach((day) => {
                    initialQuantities[day] = data.reduce((acc, parcours) => ({ ...acc, [parcours._id]: 0 }), {});
                });
                setParcoursQuantities(initialQuantities);
            } catch (error) {
                console.error("Erreur lors de la récupération des données des parcours:", error);
            }
        };

        fetchParcours();
    }, []);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const handleQuantityChange = (parcoursId, change) => {
        setParcoursQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[selectedDay][parcoursId] || 0;
            const newQuantity = Math.max(0, currentQuantity + change);


            return {
                ...prevQuantities,
                [selectedDay]: { ...prevQuantities[selectedDay], [parcoursId]: newQuantity },
            };
        });
    };

    return (
        <div className="flex">
            <div className="flex flex-col space-y-2">
                {weekdays.map((day) => (
                    <button
                        key={day}
                        className={`px-4 py-2 rounded ${
                            selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Affichage des parcours types */}
            <div className="flex flex-col ml-4">
                {selectedDay && (
                    <div>
                        <h2 className="text-lg font-bold mb-2">Parcours types pour {selectedDay} :</h2>
                        {parcoursTypes.map((parcours) => (
                            <ParcoursItem
                                key={parcours._id}
                                parcours={parcours}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))}
                    </div>
                )}

            </div>

        </div>



    );
}
