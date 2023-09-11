import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet.markercluster';
import 'leaflet-routing-machine';
import { LeafletServiceService } from '../../../services/leaflet-service.service';

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

  constructor(public leafletSV: LeafletServiceService) {
    this.markers = [];
    this.coord = [];
    this.rutas = [];
  }


  ngOnInit() {
    this.map = L.map('map').setView([42.161, -8.619], 13);
    this.leafletSV.defaultTil().addTo(this.map);

    (L.Control as any).geocoder({
      defaultMarkGeocode: false
    })
      .on('markgeocode', (e: {
        geocode: {
          center: any; bbox: any;
        };
      }) => {
        var bbox = e.geocode.bbox;
        this.map.fitBounds(bbox);
      })
      .addTo(this.map);
    this.ponerMarcador();
  }

  ponerMarcador() {
    L.Marker.prototype.options.icon =
      L.icon({
        ...L.Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })

    this.map.on('click', (e: {
      originalEvent: any; latlng: { lat: any; lng: any; };
    }) => {
      let lat = e.latlng.lat;
      let lon = e.latlng.lng;
      this.coord.push([lat, lon]);

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
    if (this.marker) this.marker.remove();

    if (this.markers) {
      this.markers.forEach((mark: any) => mark.remove());
      this.markers = [];
    }
    if (this.coord) this.coord = [];
  }

  borrarRutas() {
    if (this.rutas) {
      this.rutas.forEach((rut: any) => rut.remove());
      this.rutas = [];
    }
    if (this.coord) this.coord = [];
  }

  calculaRuta() {
    this.ruta = L.Routing.control({
      waypoints: this.coord
    }).addTo(this.map);

    this.rutas.push(this.ruta);
    this.quitarMarcador();
  }
}
