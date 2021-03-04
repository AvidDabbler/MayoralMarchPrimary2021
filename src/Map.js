import React, {useEffect, useRef} from 'react'
import { loadModules } from "esri-loader";
import wardsData from './data/ElectionResults202103.json'
import electionRender from './data/electionRender.json'

export default function Map() {
    const mapEl = useRef(null)
    
    const loadMap = () =>loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/GeoJSONLayer",
        "esri/widgets/Locate",
        "esri/widgets/Track",
        "esri/Graphic",
        "esri/widgets/Legend"
    ], {css: true})
    .then(function ([esriConfig, Map, MapView, GeoJSONLayer, Locate, Track, Graphic, Legend]){
                esriConfig.apiKey = process.env.REACT_APP_API_KEY
        
                const wardsBlob = new Blob([JSON.stringify(wardsData)], {type: "application/json"});
                const url = URL.createObjectURL(wardsBlob);

                const wardResults = new GeoJSONLayer({
                        url: url,
                        popupTemplate: {
                            title: "Ward {Ward} Election Results",
                            content: [
                                {
                                    type: "fields",
                                    fieldInfos: [
                                        {
                                            fieldName: "Tishaura_Jones",
                                            visible: true,
                                            label: "Tishaura Jones",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},
                                        {
                                            fieldName: "Cara_Spencer",
                                            visible: true,
                                            label: "Cara Spencer",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},
                                        {
                                            fieldName: "Lewis_Reed",
                                            visible: true,
                                            label: "Lewis Reed",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},
                                        {
                                            fieldName: "Andrew_Jones",
                                            visible: true,
                                            label: "Andrew Jones",
                                            format: {
                                              places: 0,
                                              digitSeparator: true
                                        }},
                                    ]
                                },
                                {
                                type: "media",
                                mediaInfos: [{
                                    type: "pie-chart",
                                    title: "Votes by Ward",
                                    value: {
                                        fields:[
                                            "Tishaura_Jones",
                                            "Cara_Spencer",
                                            "Lewis_Reed",
                                            "Andrew_Jones"
                                        ]
                                    }
                                }]
                                }]
                            }
                })

                wardResults.renderer = electionRender

                const map = new Map({
                        basemap: "arcgis-dark-gray", // Basemap layer service
                        layers: [wardResults]
                    });


                const view = new MapView({
                    container: mapEl.current,
                    map: map,
                    center: [-90.20, 38.65],
                    zoom: 11,
                    popup:{
                        dockEnabled: true,
                        dockOptions:{
                            breakpoint: false,
                            buttonEnabled: false,
                            position:'bottom-left'
                        }
                    }
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

                var legend = new Legend({
                    view: view,
                    layerInfos: [{
                        layer: wardResults,
                        title: "Legend"
                    }]
                });

                view.ui.add(legend, "bottom-right");
                view.ui.add(locate, "top-left"); 

                    
            })
    
    useEffect(() => {
        loadMap()
        
    }, [])

    return (
        <div style={{ height: '100vh' }} ref={mapEl} />
    )
}
