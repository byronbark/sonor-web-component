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
        var switched=false;
        
        const shadowRoot = this.attachShadow({ mode: 'open' });

        //JS Script files
        



        shadowRoot.appendChild(this.createTemplate(templateStyle).content.cloneNode(true));
        shadowRoot.appendChild(this.createTemplate(templateContent).content.cloneNode(true));

        //binding methods
        this.increaseZoom=this.increaseZoom.bind(this);
        this.demoMap=this.demoMap.bind(this);
        this.decreaseZoom=this.decreaseZoom.bind(this);
        this.updateLayer=this.updateLayer.bind(this);
        this.initMap=this.initMap.bind(this);
        this.addInitialLayers=this.addInitialLayers.bind(this);
        this.addInitialLayers=this.addInitialLayers.bind(this);
        this.updateLayers=this.updateLayers.bind(this);
        this.updateLayerTwo=this.updateLayerTwo.bind(this);
        this.initGraph=this.initGraph.bind(this);



    }
    

    updateLayer(e) {
        console.log('updated');
        this.shadowRoot.getElementById('input-3').setAttribute('class','btn btn-primary mr-1');
        this.shadowRoot.getElementById('input-2').setAttribute('class','btn btn-secondary mr-1');
        this.removeLayers(this.map);
        
        console.log('layers updated');

        if (this.switched) {
            this.updateLayers(this.map);
        } else {
            this.addInitialLayers(this.map);
        }

    }


    removeLayers(e) {
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
    }
    
    updateLayerTwo(e) {
        if (!this.switched) {
            this.shadowRoot.getElementById("input-4").innerText="Évolution";
            this.switched=true;
            this.removeLayers(this.map);
            this.updateLayers(this.map);
        } else {
            this.shadowRoot.getElementById("input-4").innerText="Moyenne";
            this.switched=false;
            this.removeLayers(this.map);
            this.addInitialLayers(this.map);

        }
        console.log('updated');
        
        console.log('layers updated');
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
        this.shadowRoot.getElementById('input-2').setAttribute('class','btn btn-primary mr-1');
        this.shadowRoot.getElementById('input-3').setAttribute('class','btn btn-secondary mr-1');
        console.log('clicked 2');
        this.removeLayers(this.map);
        this.addInitialLayers(this.map);
    }

    demoMap(e) {
        var loaded=this.map.areTilesLoaded();
        console.log(loaded);
        if (loaded) {
        this.map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            center: [2.349014, 48.864716],
            zoom: 13,
            bearing: 10,
             
            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 0.2, // make the flying slow
            curve: 1, // change the speed at which it zooms out
             
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function (t) {
            return t;
            },
             
            // this animation is considered essential with respect to prefers-reduced-motion
            essential: true
            });
            setTimeout(function() {this.removeLayers(this.map);this.updateLayers(this.map);}.bind(this),3000);
        }
    }

    initGraph(isFirst) {

        var config = {
            type: 'line',
            data: {
                labels: ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Aujourdhui'],
                datasets: [{
                    label: 'Bruit Nocturnale (dB)',
                    backgroundColor: "rgba(255,159,5,0.3)",
                    borderColor: "rgba(255,159,5,0.6)",
                    pointBackgroundColor: "rgba(255,159,5,0.9)",
                    tension: 0.2,
                    data: [34,49,48,60,45],
                    fill: true,
                }, {
                    label: 'Bruit Jour (dB)',
                    backgroundColor: "rgba(229,41,29,0.3)",
                    borderColor: "rgba(229,41,29,0.6)",
                    pointBackgroundColor: "rgba(229,41,29,0.9)",
                    tension: 0.2,
                    fill: true,
                    data: [42,49,35,75,32],
                }]
            },
            options: {
                animation: {
                    duration: 4500,
                },
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
                            labelString: 'Bruit (dB)'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Jour'
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

        setInterval(function(){
            // Get a random index point
            var indexToUpdate = Math.round(Math.random() * config.data.labels.length);
            console.log(indexToUpdate)
            var avg=myLine.data.datasets[0].data.reduce((acc,v) => acc + v) / config.data.labels.length;
            this.shadowRoot.getElementById("canvasResult").innerHTML="Moyenne:"+avg;
            // Update one of the points in the second dataset
            //myLine.datasets[1].points[indexToUpdate].value = Math.random() * 100;
            myLine.data.datasets[0].data[indexToUpdate]=Math.floor(Math.random()*100);
            myLine.data.datasets[1].data[indexToUpdate]=Math.floor(Math.random()*50);

            
            myLine.update();
          }.bind(this), 5000);
    }

    connectedCallback() {
        //initialise map and add layers after loaded into DOM
        this.initMap();
        this.addInitialLayers(this.map);
        this.initGraph(true);

        //inputs and controls
        const demobutton = this.shadowRoot.getElementById('input-1');
        const zoomoutbutton = this.shadowRoot.getElementById('input-2');
        const updatelayerbutton = this.shadowRoot.getElementById('input-3');
        const updatelayertwobutton = this.shadowRoot.getElementById('input-4');


        //setup events
        demobutton.addEventListener('click',this.demoMap);
        zoomoutbutton.addEventListener('click',this.decreaseZoom);
        updatelayerbutton.addEventListener('click',this.updateLayer);
        updatelayertwobutton.addEventListener('click',this.updateLayerTwo);
        console.log(this.switched);


        

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

    updateLayers(mapbox,e) {
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
                        'red'
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