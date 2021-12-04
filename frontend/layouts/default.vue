<template>
  <v-app dark>
    <template v-if="mounted">
      <navigation-desktop v-if="$vuetify.breakpoint.mdAndUp" />
    </template>
    <v-main>
      <nuxt />
    </v-main>
    <navigation-mobile v-if="$vuetify.breakpoint.mdAndDown" />
  </v-app>
</template>

<script>
import NavigationDesktop from '~/components/navigation/NavigationDesktop'
import NavigationMobile from '~/components/navigation/NavigationMobile'

export default {
  components: {NavigationDesktop, NavigationMobile},
  data() {
    return {
      mounted: false
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>
<style lang="scss">
.input--search {
  width: 50%;
}
</style>