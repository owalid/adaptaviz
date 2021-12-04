export default {
  name: "NavigationMixin",
  data () {
    const from = new Date().getFullYear() + 1
    return {
      payload: {
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
      rightDrawer: false,
      title: 'Vuetify.js',
      min: "2018",
      max: "2020"
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