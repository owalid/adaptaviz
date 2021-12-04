<template>
  <client-only>
    <leaflet-map
      @boundUpdated="onBoundUpdated"
      @updateSelectedType="onSelectedTypeUpdated"
    />
  </client-only>
</template>
<script>
export default {
  name: "Home",
  components: {
    LeafletMap: () => import('~/lazy-components/LeafletMap'),
  },
  data() {
    return {
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
    payload() {
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
    updateMap() { // Function used to call the back and update the map
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