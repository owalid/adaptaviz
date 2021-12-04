<template>
  <client-only>
    <leaflet-map
      :geojson="geojson"
      @boundUpdated="onBoundUpdated"
      @updateSelectedType="onSelectedTypeUpdated"
    />
  </client-only>
</template>
<script>
import geojson from '../data/geojson'  // Fake data used to see how map choropleth works

/*
This page is the master page, it allows to make the link between the layout form and the map,
it recovers the changed data and reload the page according to the selected data
*/
export default {
  name: "Home",
  components: {
    LeafletMap: () => import('~/lazy-components/LeafletMap'),
  },
  data() {
    return {
      geojson,
      bounds: null,
      previsionYear: null,
      selectedType: null,
      scenario: null,
      cultivationType: null,
      interval: null
    }
  },
  fetch() {
    this.$nuxt.$on('updatePayloadNavigation', (payload) => {
      this.previsionYear = payload.previsionYear;
      this.scenario = payload.scenario;
    });
  },
  computed: {
    payload() { // This object will be sent to the api to allow to filter the data according to the fields and the displayed zone
      return  {
        bounds: this.bounds,
        previsionYear: this.previsionYear,
        selectedType: this.selectedType,
        scenario: this.scenario,
        cultivationType: this.cultivationType
      }
    }
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
    onSelectedTypeUpdated(selectedType) { // todo call updateMap function
      this.selectedType = selectedType
      console.log("selectedType", selectedType)
    },
    onBoundUpdated(bounds) { // todo call updateMap function
      this.bounds = bounds;
      console.log("bounds", bounds);
    }
  },
}
</script>