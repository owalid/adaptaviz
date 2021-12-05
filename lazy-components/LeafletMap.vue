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
    geojsonOptions() {
      return  {
        style: feature => {
            return {
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7,
              fillColor: this.$colors.generateAnomalyColor(feature.score)
            }
          }
        }
      },
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
    }
  }
}
</script>