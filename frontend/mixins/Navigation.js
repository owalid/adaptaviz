/*
  This computed property is used for browsing (mobile and desktop) it allows to update the index.vue page with the event-bus.
  The components will share the same data property for the sake of code clarity
*/
export default {
  name: "NavigationMixin",
  data () {
    const from = new Date().getFullYear() + 1
    return {
      payload: { // Here it will be the data property used for the inputs
        scenario: '1',
        previsionYear: from
      },
      ticksScenarios: ['2.6', '4.5', '8.5'],
      clipped: false,
      drawer: true,
      fixed: false,
      itemsDates: [...Array(100).keys()].map(elmt => elmt + from),
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    currentScenario() {
      return this.ticksScenarios[this.payload.scenario]
    }
  },
  watch: {
    payload: {
      handler(newValue) {
        this.$nuxt.$emit('updatePayloadNavigation', {...newValue, scenario: this.currentScenario})
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