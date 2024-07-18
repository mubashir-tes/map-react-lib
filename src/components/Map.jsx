import maplibregl from "maplibre-gl";
import React,{useRef,useEffect} from "react";
function Map() {
  const mapRef = useRef();
  useEffect(() => {
    if (!mapRef.current) return;
    const initialMap = new maplibregl.Map({
      container: mapRef.current, // container id
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1, // starting zoom
    });
    return () => {};
  }, [mapRef]);
  return (
    <div
      ref={mapRef}
      style={{ width: window.innerWidth, height: window.innerHeight }}
    />
  );
}

export default Map;
