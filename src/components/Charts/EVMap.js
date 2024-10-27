// ./Charts/EVMap.js
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

const EVMap = ({ locations }) => {
  useEffect(() => {
    
    const map = L.map("evMap").setView([47.5, -122.5], 7);

   
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    
    const markers = L.markerClusterGroup();

   
    locations.forEach(location => {
      const [lng, lat] = location
        .replace("POINT (", "")
        .replace(")", "")
        .split(" ")
        .map(coord => parseFloat(coord));

      
      const marker = L.marker([lat, lng]);
      markers.addLayer(marker);
    });

    
    map.addLayer(markers);

    return () => {
      map.remove(); 
    };
  }, [locations]);

  return <div id="evMap" style={{ height: "400px", width: "100%" }}></div>;
};

export default EVMap;
