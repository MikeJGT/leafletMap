import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet.markercluster';
import 'leaflet-routing-machine';


//import 'leaflet/dist/images/marker-icon.png';
//import '../../../../assets/images/marker-icon.png';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  map: any;
  marker: any;
  markers: any;
  coord: any;
  ruta: any;
  rutas: any;
  constructor() {
    this.markers = [];
    this.coord = [];
    this.rutas = [];

  }

  ngOnInit() {
    //set map

    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);


    (L.Control as any).geocoder({
      defaultMarkGeocode: false
    })
      .on('markgeocode', (e: {
        geocode: {
          center: any; bbox: any;
        };
      }) => {
        var bbox = e.geocode.bbox;
        var posicion = e.geocode.center;

        console.log('POSICION', e.geocode.center, e.geocode);
        // this.marker = L.marker(posicion, {
        //   icon: L.icon({
        //     ...L.Icon.Default.prototype.options,
        //     iconUrl: 'assets/marker-icon.png',
        //     iconRetinaUrl: 'assets/marker-icon-2x.png',
        //     shadowUrl: 'assets/marker-shadow.png'
        //   })
        // }).addTo(this.map);
        //this.markers.push(this.marker);
        this.map.fitBounds(bbox);
      })
      .addTo(this.map);
    //this.quitarMarcador();
    this.ponerMarcador();
  }

  relieve() {

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  }

  carreteras() {

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  bici() {
    L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }



  senderismo() {
    L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  }

  ponerMarcador() {

    this.map.on('click', (e: {
      originalEvent: any; latlng: { lat: any; lng: any; };
    }) => {
      let lat = e.latlng.lat;
      let lon = e.latlng.lng;
      this.coord.push([lat, lon]);
      console.log("You clicked the map at LAT: " + lat + " and LONG: " + lon, e.originalEvent.target.alt);
      //Clear existing marker, 


      this.marker = L.marker([lat, lon], {
        icon: L.icon({
          ...L.Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }).addTo(this.map);
      this.markers.push(this.marker);
      console.log('Marcadores', this.coord);
    })

  }


  quitarMarcador() {

    if (this.marker) {
      this.marker.remove();
    }
    if (this.markers) {
      this.markers.forEach((mark: any) => mark.remove());
      this.markers = [];
    }
    if (this.coord) {
      this.coord = [];
    }
    console.log('Marcadores', this.markers);

  }

  borrarRutas() {

    if (this.rutas) {
      this.rutas.forEach((rut: any) => rut.remove());
      this.rutas = [];
    }
    // this.ruta.remove();
    if (this.coord) {
      this.coord = [];
    }
  }

  calculaRuta() {

    this.ruta = L.Routing.control({
      waypoints: this.coord
    }).addTo(this.map);

    this.rutas.push(this.ruta);
    this.quitarMarcador();
  }
}
