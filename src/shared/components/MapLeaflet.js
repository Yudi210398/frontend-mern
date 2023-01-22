import React, { useEffect } from "react";
import "./maps.css";

import L from "leaflet";

function MapLeaflet(props) {
  const myStyle = {
    height: "25rem",
    width: "48rem",
  };

  const { kordinat } = props;

  useEffect(() => {
    // create map
    let map = L.map("map", {
      center: [kordinat.lat, kordinat.lng],
      zoom: 15,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    L.circle([kordinat.lat, kordinat.lng], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 200,
    }).addTo(map);
  }, [kordinat]);

  return <div id="map" style={myStyle} />;
}

export default MapLeaflet;
