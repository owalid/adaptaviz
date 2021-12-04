<template>
  <div>
    <v-row>
      <client-only>
        <pyplot-map />
      </client-only>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    PyplotMap: () => import('~/lazy-components/map/PyplotMap'),
  }
}
</script>