<template>
    <client-only>
      <l-map
        :style="($vuetify.breakpoint.lgAndUp) ? 'height: 97vh; width:100%' : 'height: 90vh; width:100vw'"
        :zoom="zoom"
        :options="mapOptions"
        :center="center"
        @update:bounds="(bounds) => $emit('boundUpdated', bounds)"
      >
        <l-control-zoom position="bottomright"/>
        <l-tile-layer :url="url"></l-tile-layer>
         <l-geo-json
          :geojson="geojson"
          :options="geojsonOptions"
        />
        <l-control position="topleft">
          <v-row
            v-if="$vuetify.breakpoint.mdAndDown"
            class="mt-3 ml-1"
          >
            <input-address />
          </v-row>
          <v-row>
            <v-btn
              class="ma-2"
              :outlined="!scoresType.scoreHydro"
              small
              color="black"
              dark
              :plain="!scoresType.scoreHydro"
              @click="updateScoreType('scoreHydro')"
            >
              <v-icon small class="mr-2">fa-cloud-rain</v-icon>
              <span>Stress hydrique</span>
            </v-btn>
            <v-btn
              class="ma-2"
              :outlined="!scoresType.scoreTemp"
              small
              color="black"
              dark
              :plain="!scoresType.scoreTemp"
              @click="updateScoreType('scoreTemp')"
            >
              <v-icon small class="mr-2">fa-sun</v-icon>
              <span>Stress thermique</span>
            </v-btn>
          </v-row>
            <v-row>
              <v-alert
                :impact-temp="impactTemp"
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
</template>
<script>
import NavigationMixin from '~/mixins/Navigation'
import InputAddress from '~/components/inputs/InputAddress'
/*
This component will send the data to the parent (the index.vue page) which can send the changes and refresh the page
*/
export default  {
  name: "LeafletMap",
  components: {InputAddress},
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
      zoom: 6.25,
      scoresType: {
        scoreHydro: false,
        scoreTemp: false,
      },
      center: [46.5, 2.5],
      currentCenter: null,
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false
      },
      address: "",
      geojsonOptions: {
        style: feature => {
          return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: this.getAnomalyColor(feature.score)
          }
        },
      },
    };
  },
  fetch() {
    this.$nuxt.$on('updateCenterMap', (center) => {
      this.zoom = 10
      this.$nextTick(() => {
        this.$set(this.center, 0, center[0])
        this.$set(this.center, 1, center[1])
      })
    })
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
            return { icon : quarter, res : "+1,6°C" }
          case '2075':
            return { icon : half, res : "+1,9°C" }
          case '2100':
            return { icon : half, res : "+2,0°C"}

          default:
            break;
        }
      }
      if (this.impactTemp.scenario === '4.5') {
        switch (this.impactTemp.previsionYear) {
          case '2050':
            return { icon : quarter, res : "+1,6°C" }
          case '2075':
            return { icon : half, res : "+2,1°C" }
          case '2100':
            return { icon : threeQuarter, res : "+2,9°C" }

          default:
            break;
        }
      }
      if (this.impactTemp.scenario === '8.5') {
          switch (this.impactTemp.previsionYear) {
            case '2050':
              return { icon : quarter, res : "+1,7°C" }
            case '2075':
              return { icon : threeQuarter, res : "+2,5°C"}
            case '2100':
              return { icon : full, res : "+4,8°C"}
          
            default:
              break;
          }
        }
       return { icon : quarter, res : "1.6°C" }
    },
  },
  watch: {
    scoresType: {
      handler(newValue) {
        this.$emit('updateSelectedType', newValue)
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('updateCenterMap')
  },
  methods: {
    updateScoreType(key) {
      if (key === 'scoreHydro' && !this.scoresType.scoreHydro) {
        this.scoresType.scoreHydro = true
        if (this.scoresType.scoreTemp) {
          this.scoresType.scoreTemp = false
        }
      } else if (key === 'scoreTemp' && !this.scoresType.scoreTemp) {
        this.scoresType.scoreTemp = true
        if (this.scoresType.scoreHydro) {
          this.scoresType.scoreHydro = false
        }
      } else {
        this.scoresType[key] = !this.scoresType[key]
      }
    },
    getAnomalyColor(value) {
      return value > -1  ? '#3aa2bb' :
        value > -0.95 ? '#3da9c4' :
        value > -0.90 ? '#3fb1cc' :
        value > -0.85 ? '#42b8d5' :
        value > -0.80 ? '#4abbd7' :
        value > -0.75 ? '#4dbcd8' :
        value > -0.70 ? '#55bfd9' :
        value > -0.65 ? '#5cc2db' :
        value > -0.60 ? '#64c5dd' :
        value > -0.55 ? '#6cc8de' :
        value > -0.50 ? '#6fc9df' :
        value > -0.45 ? '#77cce1' :
        value > -0.40 ? '#7ecfe2' :
        value > -0.35 ? '#86d2e4' :
        value > -0.30 ? '#8ed4e6' :
        value > -0.25 ? '#91d6e7' :
        value > -0.20 ? '#9ddae9' :
        value > -0.15 ? '#a4ddeb' :
        value > -0.10 ? '#ace0ed' :
        value > 0 ? '#ffffff' :
        value > 0.1 ? '#ffe6e9' :
        value > 0.15 ? '#ffe6e9' :
        value > 0.2 ? '#ffccd3' :
        value > 0.25 ? '#ffccd3' :
        value > 0.3 ? '#ffb3be' :
        value > 0.35 ? '#ffb3be' :
        value > 0.4 ? '#ff99a8' :
        value > 0.45 ? '#ff99a8' :
        value > 0.5 ? '#ff8092' :
        value > 0.55 ? '#ff8092' :
        value > 0.6 ? '#ff667c' :
        value > 0.65 ? '#ff667c' :
        value > 0.7 ? '#ff4d66' :
        value > 0.75 ? '#ff4d66' :
        value > 0.8 ? '#ff3351' :
        value > 0.85 ? '#ff3351' :
        value > 0.9 ? '#b3001a' :
        value > 0.95 ? '#b3001a' :
        '#990016' ;
    },
    getColor(value) {
      // if (value < 0) value *= -1 

      return value > 0.9  ? '#338556' :
        value > 0.8 ? '#4FBA19' :
        value > 0.7 ? '#8CDD20' :
        value > 0.6 ? '#B8E222' :
        value > 0.5 ? '#E5FC27' :
        value > 0.4 ? '#FFF73F' :
        value > 0.3 ? '#FBD521' :
        value > 0.2 ? '#F4811F' :
        value > 0.1 ? '#F0340A' :
        '#BC2505' ;
    }
  }
}
</script>