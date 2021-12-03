<template>
  <v-container>
    <v-row>
      <hello-world />
    </v-row>
  </v-container>
</template>
<script>
import HelloWorld from '~/components/HelloWorld'
export default {
  name: "Home",
  components: { HelloWorld }
}
</script>
