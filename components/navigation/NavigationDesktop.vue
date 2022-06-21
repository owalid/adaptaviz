<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-container>
        <v-row class="mb-3">
          <v-col v-if="!miniVariant">
          <v-btn href="/about"><h1>Adaptaviz</h1></v-btn>
          </v-col>
          <v-col>
            <v-row align="center" :justify="(miniVariant) ? 'center' : 'end'">
              <v-btn
                icon
                plain
                @click="miniVariant = !miniVariant"
              >
                <v-icon v-if="miniVariant">fa-bars</v-icon>
                <v-icon v-else>fa-times</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-container v-if="!miniVariant">
          <v-row>
            <input-address :readonly="fetchingValues" />
          </v-row>
          <v-row class="justify-space-between">
            <h2>Scenario RCP</h2>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-slider
                v-model="payload.scenario"
                :tick-labels="ticksScenarios"
                :max="2"
                step="1"
                ticks="always"
                :tick-size="ticksScenarios.length"
                class="mb-2"
                :readonly="fetchingValues"
              ></v-slider>
              <v-row>
                <span class="small-text">Scénarion d'émission projectif par le GIEC</span>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-switch
                v-model="payload.anomaly"
                x-small
                label="Anomalie"
                :readonly="fetchingValues"
              >
              </v-switch>
            </v-col>
          </v-row>
          <v-row>
             <h2 class="mt-3">Stress</h2>
          </v-row>
          <v-row>
            <v-row class="mx-1 mb-0">
              <v-switch
                v-model="scoreTemp"
                x-small
                label="Stress hydrique"
                :readonly="fetchingValues"
              >
              </v-switch>
            </v-row>
            <v-row class="mx-1 mt-0">
              <v-switch
                v-model="scoreHydro"
                x-small
                label="Stress thermique"
                :readonly="fetchingValues"
              >
              </v-switch>
            </v-row>
          </v-row>
          <v-row>
            <h2 class="mt-3">Horizon</h2>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-slider
                v-model="payload.previsionYear"
                :tick-labels="itemsDates"
                :max="3"
                step="1"
                ticks="always"
                :tick-size="itemsDates.length"
                class="mb-2"
                :readonly="fetchingValues"
              ></v-slider>
            </v-col>
          </v-row>
          <v-row>
            <h2 class="mt-3">Cultures</h2>
          </v-row>
          <v-row>
            <v-list width="100%" shaped :disabled="fetchingValues">
              <v-list-item-group
                v-model="payload.specie"
                color="primary"
                width="100%"
              >
                <v-list-item
                  v-for="(specie, idSpecie) in species"
                  :key="idSpecie"
                  width="100%"
                >
                  <v-list-item-title>{{ specie }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-row>
        </v-container>
      </v-container>
    </v-navigation-drawer>
</template>
<script>
import NavigationMixin from '~/mixins/Navigation'
import InputAddress from '~/components/inputs/InputAddress'

export default {
  name: "NavigationDesktop",
  components: {InputAddress},
  mixins: [NavigationMixin]
}
</script>
<style>

</style>