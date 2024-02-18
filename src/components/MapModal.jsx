import React, { useState } from 'react'
import MapContainerAllPlaces from './MapContainerAllPlaces'
import { SiGooglemaps } from "react-icons/si";


const MapModal = ({ allPlacesArr }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div>
                <button
                    title='Switch to Map view'
                    type="button"
                    className="btn btn-primary map-button"
                    data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ borderRadius: "50%", height: "5rem", width: "5rem" }}
                    onClick={openModal}>
                    <SiGooglemaps size={44} />
                </button>

                {isOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className='d-flex flex-row justify-content-between p-2'>
                                <h2>Map view</h2>
                                <span className="close" onClick={closeModal}>&times;</span>
                            </div>
                            <div className="modal-body" style={{ height: "100%" }}>
                                <MapContainerAllPlaces allPlacesArr={allPlacesArr} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MapModal
