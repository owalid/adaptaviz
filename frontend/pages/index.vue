<template>
  <v-container>
    <v-row>
      <hello-world />
    </v-row>
    <v-row>
      <client-only>
        <pyplot-example />
      </client-only>
    </v-row>
  </v-container>
</template>
<script>
import HelloWorld from '~/components/HelloWorld'

export default {
  name: "Home",
  components: {
    PyplotExample: () => import('~/lazy-components/PyplotExample/PyplotExample'),
    HelloWorld,
  }
}
</script>
