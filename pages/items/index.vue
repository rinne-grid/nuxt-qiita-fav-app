<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <template v-for="item in items">
      <v-card>
        <v-flex>
          <v-card-title primary-title>
            <div>
              <v-img
                :src="item.user.profile_image_url"
                width="50px"
                contain
              ></v-img>
              {{ dateFormat( item.created_at, 'YYYY-MM-DD HH:mm:ss', {locale: 'ja'})}}
              <h3 class="headline mb-0">{{item.title}}</h3>
              <div></div>
            </div>
          </v-card-title>
        </v-flex>
      </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import { getQiitaItems } from '~/plugins/qiita.js'
  import axios from 'axios'


  export default {
    data () {
      return {
        items: []
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
      //     params: {
      //       page: '1' ,
      //       per_page: '1'
      //     }
      //   })
      // return {
      //   qitems: data
      // }

      // return axios.get("https://qiita.com/api/v2/items",
      //   {
      //     params: {
      //       page: '1' ,
      //       per_page: '1'
      //     }
      //   }
      return getQiitaItems('1', '5')
        .then((res) => {
          return {
            items: res.data
          }
        })
    },
    mounted () {
      console.log(this.items)
    },
    methods:{
      dateFormat (date, dateFormatStr, options) {
        const dateLoc = new Date(date).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'} )
        return this.$date_fns_format(dateLoc, dateFormatStr, options)
      }
    }
  }
</script>
