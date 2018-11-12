<template>
  <v-layout row wrap>

  <v-card
    flat
  >
      <v-toolbar
        color="primary"
        dark
      >
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            タグ
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-card class="d-inline-block elevation-12">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="true"
        permanent
        stateless
        value="true"
      >
        <v-list dense>
          <v-list-tile
            v-for="tag in tags"
            :key="tag"
            :value="tag.active"
            @click=""
          >
            <v-list-tile-content>
              <v-list-tile-title @click="tagFilter(tag)">{{ tag }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-card>
    <v-flex xs8 sm8>
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
        items: [],
        tags: [],
        itemsSource: [],
        drawer: true
      }
    },
    components: {
      Logo,
      VuetifyLogo
    },
    // async asyncData () {
    asyncData({store}) {
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
      return getQiitaItems('1', '30')
        .then((res) => {
          const tags = []
          const items = res.data
          items.forEach((item) => {
            item.tags.forEach((tag) => {
              // タグが存在しない
              const tagName = tag["name"]
              if(!tags.includes(tagName)) {
                tags.push(tagName)
              }
            })
          })
          return {
            items: res.data,
            itemsSource: res.data,
            tags: tags
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
      },
      tagFilter(tag) {
        const filteredItems = []
        this.itemsSource.forEach((item) => {
          let exist = item.tags.some((tagObj) => {
            return tag === tagObj["name"]
          })
          if(exist) {
            filteredItems.push(item)
          }
        })
        this.items = filteredItems
      }
    }
  }
</script>
