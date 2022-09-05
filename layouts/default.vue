<template>
  <v-app dark>
    <template v-if="mounted">
      <navigation-desktop v-if="$vuetify.breakpoint.lgAndUp" />
    </template>
    <v-main>
      <nuxt />
    </v-main>
    <navigation-mobile v-if="$vuetify.breakpoint.mdAndDown" />
    <v-footer v-if="$vuetify.breakpoint.lgAndUp" app class="z-index-top">
      <v-row justify="center" align="center">
        <v-btn text link plain href="https://github.com/owalid/adaptaviz" target="_blank" style="text-decoration: none;">
          <v-row align="baseline">
            <p>
              Ce projet est open source, toutes contributions ou propositions d'amélioration sont les bienvenues.
            </p>
            <v-icon small class="ml-2">
              fa-brands fa-github
            </v-icon>
          </v-row>
        </v-btn>
      </v-row>
    </v-footer>
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