<template>
  <client-only>
    <v-container fluid>
      <v-row fill-height align-center justify-center>
        <leaflet-map
          v-if="regions"
          :geojson="regions"
          :anomaly="anomaly"
          :impact-temp="impactTemp"
          @updateSelectedType="onSelectedTypeUpdated"
        />
      </v-row>
    </v-container>
  </client-only>
</template>
<script>
/*
This page is the master page, it allows to make the link between the layout form and the map,
it recovers the changed data and reload the page according to the selected data
*/
import { cloneDeep } from 'lodash'
export default {
  name: "Home",
  components: {
    LeafletMap: () => import('~/lazy-components/LeafletMap'),
  },
  data() {
    return {
      previsionYear: 'Actuel',
      scenario: '2.6',
      specie: 'Sorgho',
      scoreType: 'Score_Tot',
      anomaly: true,

      regions: null,
      bounds: null,
      selectedType: {
        scoreHydro: false,
        scoreTemp: false
      },
      cultivationType: null,
      interval: null,
    }
  },
  async fetch() {
    const res = await this.$axios.$post('/get-geojson', this.payload)
    console.log("res", res)
    this.regions = cloneDeep(res.data)
  },
  computed: {
    impactTemp() {
      return {
        previsionYear: this.previsionYear,
        scenario: this.scenario
      }
    },
    getCurrentScoreType() {
      if (!this.selectedType.scoreHydro && !this.selectedType.scoreTemp) {
        return  'Score_Tot'
      } else if (this.selectedType.scoreHydro) {
        return 'Score_T'
      }
      return 'Score_P'
    },
    getCurrentHorizon() {
      if (this.previsionYear === 'Actuel') {
        return 'H0'
      } else if (this.previsionYear === '2050') {
        return 'H1'
      } else if (this.previsionYear === '2075') {
        return 'H2'
      } 
      return 'H3'
    },
    payload() { // This object will be sent to the api to allow to filter the data according to the fields and the displayed zone
      return  {
        scenario: `RCP${this.scenario}`,
        horizon: this.getCurrentHorizon,
        specie: this.specie,
        scoreType: this.getCurrentScoreType,
        anomaly: this.anomaly
      }
    }
  },
  watch: {
    async payload() {
      await this.$fetch()
    }
  },
  mounted() {
    this.$nuxt.$on('updatePayloadNavigation', (payload) => {
      this.previsionYear = payload.previsionYear;
      this.scenario = payload.scenario;
      this.anomaly = payload.anomaly
      this.specie = payload.specie
    });
  },
  beforeDestroy() {
    this.$nuxt.$off('updatePayloadNavigation')
  },
  methods: {
    updateMap() { // This function allows to get the data from the api it will be called every 500ms to avoid overloading the call api
      if (this.interval === null) {
        this.interval = setInterval(() => {
          // todo call api here
          this.interval = null
        }, 500)
      }
    },
    async  onSelectedTypeUpdated(selectedType) { // todo call updateMap function
      this.selectedType = selectedType
      await this.$fetch()
    }
  },
}
</script>