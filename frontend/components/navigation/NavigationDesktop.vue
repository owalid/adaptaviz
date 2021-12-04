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
            <h1>Adaptaviz</h1>
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
            <v-text-field
              label="Adresse"
              placeholder="150 rue General de Gaulle"
              solo
              rounded
              outlined
              small
              dense
              single-line
              light
              class="shrink"
            >
              <template #prepend-inner>
                <v-icon small class="mr-2">fa-search</v-icon>
              </template>
            </v-text-field>
          </v-row>
            <v-row>
              <h2>Scenarios</h2>
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
                ></v-slider>
              </v-col>
            </v-row>
          <v-row>
            <h2>Année</h2>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="payload.previsionYear"
                :items="itemsDates"
                label="Choisissez une année de prévision"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <h2>Cultures</h2>
          </v-row>
        </v-container>
      </v-container>
    </v-navigation-drawer>
</template>
<script>
import NavigationMixin from '~/mixins/Navigation'

export default {
  name: "NavigationDesktop",
  mixins: [NavigationMixin]  
}
</script>