import {templateContent} from './template.js';
import {templateStyle} from './style.js';
import mapboxgl from 'https://cdn.skypack.dev/mapbox-gl';
import * as  ChartJs  from "./node_modules/chart.js/dist/chart.js"


const $ = window.$;

export class SonorCharts extends HTMLElement {   
    constructor() {
        super();
    
        var mapContainer;
        var zoom=14;
        var newChart;
        var isClicked=false;
        var myLine;
        
        const shadowRoot = this.attachShadow({ mode: 'open' });

        //JS Script files
        



        shadowRoot.appendChild(this.createTemplate(templateStyle).content.cloneNode(true));
        shadowRoot.appendChild(this.createTemplate(templateContent).content.cloneNode(true));

        //binding methods
        this.increaseZoom=this.increaseZoom.bind(this);
        this.decreaseZoom=this.decreaseZoom.bind(this);
        this.updateLayer=this.updateLayer.bind(this);
        this.initMap=this.initMap.bind(this);
        this.addInitialLayers=this.addInitialLayers.bind(this)
    }
    

    updateLayer(e) {
        console.log('updated');
        if (this.map.getLayer('pointLayer')) {
            this.map.removeLayer('pointLayer');
          }
        if (this.map.getSource('points')) {
            this.map.removeSource('points');
          }
        if (this.map.getLayer('hexLayer')) {
            this.map.removeLayer('hexLayer');
          }
        if (this.map.getSource('hexGrid')) {
            this.map.removeSource('hexGrid');
          }
        
        console.log('layers updated');


        this.addInitialLayers(this.map);
    }

    increaseZoom(e) {
        console.log('clicked');
        console.log(this.map);
        this.map.zoomTo(18);
        if (this.isClicked) {
            this.shadowRoot.getElementById("input-1").setAttribute('class',"btn btn-secondary mr-1")
            this.isClicked=false;
        }
        else {
            this.shadowRoot.getElementById("input-1").setAttribute('class',"btn btn-primary mr-1")
            this.isClicked=true;
        }
    }

    decreaseZoom(e) {
        console.log('clicked 2');
        console.log(this.map);
        this.map.zoomTo(8);
    }

    initGraph() {
        var config = {
            type: 'line',
            data: {
                labels: ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Aujourdhui'],
                datasets: [{
                    label: 'Bruit Nocturnale (dB)',
                    backgroundColor: "#E5291D",
                    borderColor: "#E5291D",
                    data: [34,49,48,60,45],
                    fill: true,
                }, {
                    label: 'Bruit Jour (dB)',
                    backgroundColor: "hsl(37,100%,51%)",
                    borderColor: "hsl(37,100%,51%)",
                    fill: true,

                    data: [42,49,35,75,32],
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Bruit Moyenne'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                          var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                          return " " + data.datasets[tooltipItem.datasetIndex].label+": " + parseInt(tooltipValue).toLocaleString("fr");
                        }
                      }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }]
                }
            }
        };


        var canvas = this.shadowRoot.getElementById('canvas');
        if (!canvas){
            console.log("CANVAS EMPTY");
        }
            
        var ctx = canvas.getContext('2d');
        window.myLine = new Chart(ctx, config);
    }

    connectedCallback() {
        //initialise map and add layers after loaded into DOM
        this.initMap();
        this.addInitialLayers(this.map);
        this.initGraph();

        //inputs and controls
        const zoominbutton = this.shadowRoot.getElementById('input-1');
        const zoomoutbutton = this.shadowRoot.getElementById('input-2');
        const updatelayerbutton = this.shadowRoot.getElementById('input-3');

        //setup events
        zoominbutton.addEventListener('click',this.increaseZoom);
        zoomoutbutton.addEventListener('click',this.decreaseZoom);
        updatelayerbutton.addEventListener('click',this.updateLayer);

        

    }
    

    initMap(e) {
        this.mapContainer = this.shadowRoot.getElementById("map");
    
        mapboxgl.accessToken = 'pk.eyJ1IjoiYnlyb25iYXJraHVpemVuIiwiYSI6ImNrbWVsODV3ZjIyOW8ycHBodzZ4MGJlaDEifQ.tFaCp0Ql8PJQxXaJwNdk0g'
        this.map = new mapboxgl.Map({
            container: this.mapContainer, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [2.3, 48.84], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        
        //On hex click event

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    

    addInitialLayers(mapbox,e) {
	        // Loading hexagon data with d3
            d3.json(hexurl,
                function(err, data) {
                
                if (err) throw err;
                data.features = data.features.map(function (d) {
                    d.properties.scale = getRandomInt(35,85);
                    return d;
                });


                console.log(data)

                mapbox.addSource('hexGrid', {
                    type: 'geojson',
                    'data': data,
                });
                
                mapbox.addLayer({
                    id: 'hexLayer',
                    type: 'fill',
                    source: 'hexGrid',
                    'layout': {},
                    'paint': {
                        'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'scale'],
                            30,
                            '#d3f9b5',
                            35,
                            'hsl(199,90%,83%)',
                            50,
                            'hsl(200,73%,66%)',
                            70,
                            'hsl(199,90%,83%)',
                            80,
                            'hsl(204,58%,46%)'
                            ],
                        'fill-opacity': 0.7,
                        'fill-outline-color': "rgba(0,0,0,0)"
                    }
                });


            });

            d3.json(pointsurl,
                function(err, data) {
                
                if (err) throw err;

                mapbox.addSource('points', {
                    type: 'geojson',
                    'data': data,
                });
                
                mapbox.addLayer({
                    id: 'pointLayer',
                    type: 'circle',
                    source: 'points',
                    'paint': {
                        'circle-color': "rgb(5,5,5)",
                        'circle-radius': 10
                    }
                });


            });
            
            mapbox.on('click', 'hexLayer', function (e) {
                var scale = e.features[0].properties.scale;
                new mapboxgl.Popup()
                  .setLngLat(e.features[0].geometry.coordinates[0][5])
                  .setHTML(`<div class="p-2 mb-0 block-bordered border bg-primary text-white">
                            <p>Bruit Moyenne Ici: `+scale+` dB</p>
                            </div>`)
                  .addTo(mapbox);
              });
    }

    createMapTemplate(html) {
        const mapTemplate = document.createElement('map');
        html=html.trim();
        mapTemplate.innerHTML=html;
        return mapTemplate;
    }

    createTemplate(html){
        const template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template;
    }
}

window.customElements.define('sonor-charts', SonorCharts);