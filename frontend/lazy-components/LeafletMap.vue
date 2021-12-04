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
    getColor(value) {
        const range = [1, 1000];
        const d = (value - range[0]) / (range[1] - range[0]);
      return d > 0.9  ? '#338556' :
        d > 0.8 ? '#4FBA19' :
        d > 0.7 ? '#8CDD20' :
        d > 0.6 ? '#B8E222' :
        d > 0.5 ? '#E5FC27' :
        d > 0.4 ? '#FFF73F' :
        d > 0.3 ? '#FBD521' :
        d > 0.2 ? '#F4811F' :
        d > 0.1 ? '#F0340A' :
        '#BC2505' ;
    }
  }
}
</script>