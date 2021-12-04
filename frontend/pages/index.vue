<template>
  <div>
    <v-row>
      <client-only>
        <leaflet-map @boundUpdated="onBoundUpdated" />
      </client-only>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    LeafletMap: () => import('~/lazy-components/LeafletMap'),
  },
  data() {
    return {
      bounds: null
    }
  },
  methods: {
    onBoundUpdated(bounds) { // todo call api here to update map
      this.bounds = bounds;
      console.log("bounds", bounds);
    }
  },
}
</script>