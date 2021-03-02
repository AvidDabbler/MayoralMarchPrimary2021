import React, {useEffect, useRef} from 'react'
import { loadModules } from "esri-loader";

export default function Map() {
    const mapEl = useRef(null)
        // const routes = (GeoJSONLayer)=>{
        //     return new GeoJSONLayer({
        //         url: 'https://opendata.arcgis.com/datasets/80d7b4b8e93f43929ed345d7c72ec4c5_0.geojson',

        //     })
        // }

        const loadMap = () =>loadModules([
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/GeoJSONLayer"
        ], {css: true})
            .then(function ([esriConfig, Map, MapView, GeoJSONLayer]){
                esriConfig.apiKey = 'AAPKaeaf4e70e4fd4906b1257137a854cc97eVbz1ae-QH51T37UQW1XvlnO64OTwPnR9J4tnfA6uDtrLwzani_HfpOETtNobPp_'
                
                const routes = new GeoJSONLayer({
                        url: 'https://opendata.arcgis.com/datasets/80d7b4b8e93f43929ed345d7c72ec4c5_0.geojson',
        
                })

                const map = new Map({
                        basemap: "arcgis-topographic", // Basemap layer service
                        layers: [routes]
                    });


                const view = new MapView({
                    container: mapEl.current,
                    map: map,
                    center: [-90.199402, 38.627003],
                    zoom: 13
                    });
                    
            })
    
    useEffect(() => {
        loadMap()
        
    }, [])

    return (
        <div style={{ height: '100vh' }} ref={mapEl} />
    )
}
