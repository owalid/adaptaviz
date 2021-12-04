/*
  This computed property is used for browsing (mobile and desktop) it allows to update the index.vue page with the event-bus.
  The components will share the same data property for the sake of code clarity
*/
export default {
  name: "NavigationMixin",
  data () {
    return {
      payload: { // Here it will be the data property used for the inputs
        scenario: '1',
        previsionYear: '1'
      },
      ticksScenarios: ['2.6', '4.5', '8.5'],
      clipped: false,
      drawer: true,
      fixed: false,
      itemsDates: ['2050', '2075', '2100'],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
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
        this.$nuxt.$emit('updatePayloadNavigation', {scenario: this.currentScenario, previsionYear: this.currentDate})
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