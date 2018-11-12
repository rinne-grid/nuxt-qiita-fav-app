<template>
  <v-layout row wrap>
  </v-layout>
</template>
<script>
  export default {
    fetch({redirect}) {
      redirect('/items')
    }
  }
</script>
