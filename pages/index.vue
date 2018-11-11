<template>
  <v-layout
    column
    justify-center
    align-center>

  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
//import { getQiitaItems } from '~/plugins/qiita.js'
import axios from 'axios'
export default {
  data () {
    return {
      qitems: []
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  // async asyncData () {
  asyncData() {
    // let { data } = await axios.get("https://qiita.com/api/v2/items",
    //   {
    //     params: [
    //       { page: '1' },
    //       { per_page: '1' }
    //     ]
    //   })
    // return {
    //   qitems: data
    // }

    return axios.get("https://qiita.com/api/v2/items",
      {
        params: [
          { page: '1' },
          { per_page: '1'}
        ]
      }
    ).then((data) => {
      return {
        qitems: data.data
      }
    })

  }
}
</script>
