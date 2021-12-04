<template>
  <v-col cols="12">
    <client-only>
      <l-map
        style="height: 97vh; width:100%"
        :zoom="zoom"
        :options="mapOptions"
        :center="center"
        @update:zoom="onZoom"
        @update:bounds="(bounds) => $emit('boundUpdated', bounds)"
      >
        <l-control-zoom position="bottomright"/>
        <l-tile-layer :url="url"></l-tile-layer>
         <l-geo-json
          :geojson="geojson"
          :options="geojsonOptions"
        />
        <l-control position="topleft">
          <v-row>
            <v-btn
              class="ma-2"
              :outlined="selectedType !== 'SUN'"
              small
              color="black"
              dark
              :plain="selectedType !== 'SUN'"
              @click="selectedType = 'SUN'"
            >
              <v-icon small class="mr-2">fa-cloud-rain</v-icon>
              <span>Stress hydrique</span>
            </v-btn>
            <v-btn
              class="ma-2"
              :outlined="selectedType !== 'RAIN'"
              small
              color="black"
              dark
              :plain="selectedType !== 'RAIN'"
              @click="selectedType = 'RAIN'"
            >
              <v-icon small class="mr-2">fa-sun</v-icon>
              <span>Stress solaire</span>
            </v-btn>
          </v-row>
        </l-control>
      </l-map>
    </client-only>
	</v-col>
</template>
<script>

/*
This component will send the data to the parent (the index.vue page) which can send the changes and refresh the page
*/
export default  {
  name: "LeafletMap",
  props: {
    geojson: {
      type: Object,
      required: true
    }
  },
   data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 2,
      selectedType: 'RAIN',
      center: [48, -1.219482],
      currentCenter: null,
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false
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
  watch: {
    selectedType(newValue) {
      this.$emit('updateSelectedType', newValue)
    }
  },
  methods: {
    onZoom(zoom) {
      console.log("zoom", zoom)
    },
    clickHandler () {
      window.alert('and mischievous')
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