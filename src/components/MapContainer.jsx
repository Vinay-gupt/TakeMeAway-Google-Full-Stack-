import { GoogleMap, Marker, MarkerF, OverlayView, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ReactStars from 'react-stars'
import React from 'react'

const MapContainer = ({ lat, lon, mapToggle, details }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const center = useMemo(() => ({ lat: lat, lng: lon }), []);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (isLoaded) {
      // Clear previous markers
      setMarkers([{ lat: lat, lng: lon }]);
    }
  }, [isLoaded, lat, lon]);

  return (
    <>
      <div className="App1 d-flex flex-column justify-content-center align-items-center" style={{ maxHeight: mapToggle ? '60vh' : '0vh' }}>
        {!isLoaded ? (
          <LoadingSpinner />
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={20}
          >
            {/* Render all markers */}
            {markers.map((marker, index) => (
              <MarkerF key={index} position={marker}>
                {/* Overlay clickable Link at marker position */}
                <OverlayViewF
                  position={marker}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={(width, height) => ({
                    x: -(width / 2),
                    y: -(height),
                  })}
                >
                  <div className="flex-col px-2" style={{ backgroundColor: "white", position: "absolute", cursor: "pointer", left: 2, bottom: 0 }}>

                    <a href={details?.url} target="_blank">
                      {/* Marker image */}
                      {details?.photos?.[0] ?
                        <img
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details?.photos[0]?.photo_reference}&key=${import.meta.env.VITE_API_KEY}`}
                          alt="Marker"
                          style={{ width: "55px", height: "55px" }}
                          data-bs-dismiss="modal"
                        />
                        :
                        <img
                          src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600" // Specify the URL of the custom icon
                          alt="Marker"
                          style={{ width: "55px", height: "55px" }}
                          data-bs-dismiss="modal"
                        />
                      }
                    </a>
                    <ReactStars
                      count={5}
                      size={13}
                      color2={'#ffd700'}
                      edit={false}
                      value={3.5} />
                  </div>
                </OverlayViewF>
              </MarkerF>
            ))}
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default MapContainer;

