import React, {useEffect, useRef} from 'react'
import { loadModules } from "esri-loader";

export default function Map() {
    const mapEl = useRef(null)

        const loadMap = () =>loadModules([
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/GeoJSONLayer",
            "esri/widgets/Locate",
            "esri/widgets/Track",
            "esri/Graphic"
        ], {css: true})
            .then(function ([esriConfig, Map, MapView, GeoJSONLayer, Locate, Track, Graphic]){
                esriConfig.apiKey = 'AAPKaeaf4e70e4fd4906b1257137a854cc97eVbz1ae-QH51T37UQW1XvlnO64OTwPnR9J4tnfA6uDtrLwzani_HfpOETtNobPp_'
                
                const routes = new GeoJSONLayer({
                        url: 'https://opendata.arcgis.com/datasets/80d7b4b8e93f43929ed345d7c72ec4c5_0.geojson',
                    popupTemplate: {
                        title: "Routes",
                        content: "<b>Route: </b>{RouteAbbr}"
                        }
                })      

                const map = new Map({
                        basemap: "arcgis-navigation", // Basemap layer service
                        layers: [routes]
                    });


                const view = new MapView({
                    container: mapEl.current,
                    map: map,
                    center: [-90.199402, 38.627003],
                    zoom: 13
                });
                
                const locate = new Locate({
                    view: view,
                    useHeadingEnabled: false,
                    goToOverride: function(view, options) {
                      options.target.scale = 1500;
                      return view.goTo(options.target);
                    }
                });
                const track = new Track({
                    view: view,
                    graphic: new Graphic({
                      symbol: {
                        type: "simple-marker",
                        size: "12px",
                        color: "green",
                        outline: {
                          color: "#efefef",
                          width: "1.5px"
                        }
                      }
                    }),
                    useHeadingEnabled: false
                  });

                view.ui.add(track, "top-left");
                view.ui.add(locate, "top-left"); 
                    
            })
    
    useEffect(() => {
        loadMap()
        
    }, [])

    return (
        <div style={{ height: '100vh' }} ref={mapEl} />
    )
}
