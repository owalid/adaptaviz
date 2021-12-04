<template>
  <v-col cols="12">
    <client-only>
      <l-map
        style="height: 100vh; width:99vw"
        :zoom="zoom"
        :options="mapOptions"
        :center="center"
        @update:zoom="onZoom"
        @update:bounds="(bounds) => $emit('boundUpdated', bounds)"
      >
        <l-tile-layer :url="url"></l-tile-layer>
         <l-geo-json
          :geojson="geojson"
          :options="geojsonOptions"
        />
      </l-map>
    </client-only>
	</v-col>
</template>
<script>
import geojson from './data'

export default  {
  name: "LeafletMap",
   data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 2,
      center: [48, -1.219482],
      geojson,
      currentCenter: null,
      mapOptions: {
        zoomSnap: 0.5
      },
      geojsonOptions: { // TODO PLUGIN
        style: feature => {
          return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: this.getColor(feature.properties.density)
          }
        },
      }
    };
  },
  methods: {
    onZoom(zoom) {
      console.log("zoom", zoom)
    },
    getColor(d) {
      return d > 1000 ? '#800026' :
              d > 500  ? '#BD0026' :
              d > 200  ? '#E31A1C' :
              d > 100  ? '#FC4E2A' :
              d > 50   ? '#FD8D3C' :
              d > 20   ? '#FEB24C' :
              d > 10   ? '#FED976' :
                      '#FFEDA0';
    }
  }
}
</script>