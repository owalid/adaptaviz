/*
  This computed property is used for browsing (mobile and desktop) it allows to update the index.vue page with the event-bus.
  The components will share the same data property for the sake of code clarity
*/
export default {
  name: "NavigationMixin",
  data () {
    return {
      payload: { // Here it will be the data property used for the inputs
        scenario: '0',
        previsionYear: '0',
        specie: 0,
        anomaly: true
      },
      ticksScenarios: ['2.6', '4.5', '8.5'],
      species: [
        "Colza",
        "Soja",
        "Orge",
        "Manioc",
        "Basilic",
        "Pomme de terre",
        "Cacao",
        "Mais",
        "Lavande",
        "Riz",
        "Bl\u00E9 compact",
        "Bl\u00E9 dur ",
        "Sorgho"
      ],
      clipped: false,
      drawer: true,
      fixed: false,
      itemsDates: ['Actuel', '2050', '2075', '2100'],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    currentSpecie() {
      return this.species[this.payload.specie]
    },
    currentScenario() {
      return this.ticksScenarios[this.payload.scenario]
    },
    currentDate() {
      return this.itemsDates[this.payload.previsionYear]
    }
  },
  watch: {
    payload: {
      handler(newValue) {
        this.$nuxt.$emit('updatePayloadNavigation',
                          {...newValue,
                            scenario: this.currentScenario,
                            previsionYear: this.currentDate,
                            specie: this.currentSpecie
                          })
      },
      deep: true
    }
  },
  methods: {
    saveYear() {
      this.$refs.picker.activePicker = 'YEAR'
    }
  },
}