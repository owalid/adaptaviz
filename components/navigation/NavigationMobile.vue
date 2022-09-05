<template>
  <div>
    <v-bottom-sheet v-model="sheet" class="z-index-1000">
      <v-sheet max-height="50vh" class="overflow-scroll">
        <v-container fluid>
          <div v-if="curentSheet === 'SCENARIO'" class="mt-2">
            <v-row>
              <h2 class="ma-2">Scénarios</h2>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-slider
                  v-model="payload.previsionYear"
                  :tick-labels="itemsDates"
                  :max="3"
                  step="1"
                  ticks="always"
                  :tick-size="itemsDates.length"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-switch
                  v-model="payload.anomaly"
                  x-small
                  label="Anomalie"
                >
                </v-switch>
              </v-col>
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
          </div>
          <div v-if="curentSheet === 'CULTIVATION'" class="overflow-scroll">
            <h2>Culture</h2>
            <v-list>
              <v-list-item-group
                v-model="payload.specie"
                color="primary"
                width="100%"
              >
                <v-list-item
                  v-for="(specie, idSpecie) in species"
                  :key="idSpecie"
                  @click="updateSpecie(specie)"
                >
                  <v-list-item-title>{{ specie }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <div v-if="curentSheet === 'STRESS'">
            <h2>Culture</h2>
            <v-row class="mx-1 my-0 py-0">
              <v-switch
                v-model="scoreTemp"
                x-small
                label="Stress hydrique"
                class="pa-0 ma-0"
              >
              </v-switch>
            </v-row>
            <v-row class="mx-1 my-0 py-0">
              <v-switch
                v-model="scoreHydro"
                x-small
                label="Stress thermique"
                class="pa-0 ma-0"
              >
              </v-switch>
            </v-row>
          </div>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  <v-footer dense fixed inset app>
    <v-bottom-navigation>
      <v-row  justify="center" align="center">
        <v-col cols="1"><v-btn href="/about">
          <h2
            :class="[{'xsmall-title': $vuetify.breakpoint.xsOnly,
                      'small-title': $vuetify.breakpoint.smOnly}]"
          >
            Adaptaviz
          </h2></v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="7">
          <v-row justify="end" align="end">
              <div>
              <v-btn
                :x-small="$vuetify.breakpoint.xsOnly"
                :small="$vuetify.breakpoint.smOnly"
                @click="sheet = !sheet; curentSheet='STRESS'"
              >
                <span>Stress</span>
                <v-icon
                  :x-small="$vuetify.breakpoint.xsOnly"
                  :small="$vuetify.breakpoint.smOnly"
                  class="pb-1"
                >
                  fa-cloud-sun-rain
                </v-icon>
              </v-btn>
              <v-btn
                :x-small="$vuetify.breakpoint.xsOnly"
                :small="$vuetify.breakpoint.smOnly"
                @click="sheet = !sheet; curentSheet='SCENARIO'"
              >
                <span>Scénarios</span>
                <v-icon
                  :x-small="$vuetify.breakpoint.xsOnly"
                  :small="$vuetify.breakpoint.smOnly"
                  class="pb-1"
                >
                  fa-clock
                </v-icon>
              </v-btn>
              <v-btn
                :x-small="$vuetify.breakpoint.xsOnly"
                :small="$vuetify.breakpoint.smOnly"
                @click="sheet = !sheet; curentSheet='CULTIVATION'"
              >
                <span>Culture</span>
                <v-icon
                  :x-small="$vuetify.breakpoint.xsOnly"
                  :small="$vuetify.breakpoint.smOnly"
                  class="pb-1"
                >
                  fa-seedling
                </v-icon>
              </v-btn>
              </div>
          </v-row>
        </v-col>
      </v-row>
    </v-bottom-navigation>
  </v-footer>
  </div>
</template>
<script>
import NavigationMixin from '~/mixins/Navigation'

export default {
  name: "NavigationMobile",
  mixins: [NavigationMixin],
  data() {
    return {
      curentSheet: '',
      sheet: false
    }
  },
  methods: {
    updateSpecie(specie) {
      this.sheet = false;
      this.payload.specie = specie
    }
  }
}
</script>
<style>
.z-index-1000 {
  z-index: 1000;
}
.sheet-bottom {
  border-top-right-radius: 5%;
}
.overflow-scroll {
  overflow: scroll;
}
</style>