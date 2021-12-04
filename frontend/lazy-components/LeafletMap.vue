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
            <v-row>
              <v-alert
                :impactTemp="impactTemp"
                class="ma-2"
                color="black"
                small
              >
                <v-icon small class="mr-2">{{impactTempResult.icon}}</v-icon>
                <span>{{impactTempResult.res}}</span>
              </v-alert>
            </v-row>
        </l-control>
      </l-map>
    </client-only>
	</v-col>
</template>
<script>
import NavigationMixin from '~/mixins/Navigation'

/*
This component will send the data to the parent (the index.vue page) which can send the changes and refresh the page
*/
export default  {
  name: "LeafletMap",
  mixins: [NavigationMixin],

  props: {
    geojson: {
      type: Object,
      required: true
    },
    impactTemp: {
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
      },
    };
  },
  watch: {
    selectedType(newValue) {
      this.$emit('updateSelectedType', newValue)
    }
  },
  computed: {
    impactTempResult() {
      const quarter = "fa-thermometer-quarter";
      const half = "fa-thermometer-half";
      const threeQuarter = "fa-thermometer-three-quarters";
      const full = "fa-thermometer-full";

      if (this.impactTemp.scenario === '2.6') {
        switch (this.impactTemp.previsionYear) {
          case '2050':
            return {
              icon : quarter,
              res : "+1,6°C"
            }
          case '2075':
            return {
              icon : half,
              res : "+1,9°C"
            }
          case '2100':
            return {
              icon : half,
              res : "+2,0°C"
            }
        
          default:
            break;
        }
      }
      if (this.impactTemp.scenario === '4.5') {
          switch (this.impactTemp.previsionYear) {
          case '2050':
            return {
              icon : quarter,
              res : "+1,6°C"
            }
          case '2075':
            return {
              icon : half,
              res : "+2,1°C"
            }
          case '2100':
            return {
              icon : threeQuarter,
              res : "+2,9°C"
            }
        
          default:
            break;
        }
        }
      if (this.impactTemp.scenario === '8.5') {
          switch (this.impactTemp.previsionYear) {
          case '2050':
            return {
              icon : quarter,
              res : "+1,7°C"
            }
          case '2075':
            return {
              icon : threeQuarter,
              res : "+2,5°C"
            }
          case '2100':
            return {
              icon : full,
              res : "+4,8°C"
            }
        
          default:
            break;
        }
        }
       return {
              icon : quarter,
              res : "1.6°C"
            }
    },
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