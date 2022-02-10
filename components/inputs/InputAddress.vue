<template>
  <v-text-field
    v-model="address"
    label="Adresse"
    placeholder="150 rue General de Gaulle"
    solo
    rounded
    outlined
    small
    dense
    light
    v-bind="$attrs"
    @keyup.enter="getAddress"
  >
    <template #prepend-inner>
      <v-icon small class="mr-2">fa-search</v-icon>
    </template>
    <template #append>
      <v-btn v-bind="$attrs" small icon @click="locateOnBrowser">
        <v-icon small class="mr-2">fa-location-arrow</v-icon>
      </v-btn>
      <v-btn v-bind="$attrs" small icon :disabled="!address" @click="getAddress">
        <v-icon small class="mr-2">fa-arrow-right</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>
<script>
import axios from 'axios'
export default {
  name: "InpuAddress",
  data() {
    return {
      address: ''
    }
  },
  methods: {
    async getAddress() {
      if (this.address) {
        const res = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(this.address)}&limit=5`)
        this.$nuxt.$emit('updateCenterMap', [...(res.data.features[0].geometry.coordinates.map(elmt => parseFloat(elmt).toFixed(6))).reverse()])
      }
    },
    getPositionWithIPAddress() {
      const vm = this;
     fetch('https://api.ipregistry.co/?key=tryout')
      .then(response => response.json())
      .then((payload) => {
        vm.$nuxt.$emit('updateCenterMap', [payload.location.latitude, payload.location.longitude])
      });
    },
    async locateOnBrowser() {
      const vm = this.$nuxt
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({coords}) => {
           vm.$emit('updateCenterMap', [coords.latitude, coords.longitude])
        }, this.getPositionWithIPAddress);
      } else {
        await this.getPositionWithIPAddress()
      }
    },
  }
}
</script>