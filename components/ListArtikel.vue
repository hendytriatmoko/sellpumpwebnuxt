<template>
  <div>
    <v-card
      rounded="lg"
      @click="
        go(item.id_artikel)"
    >

      <v-img :src="getImageProduk(item.gambar_artikel)" style="border-radius:2% 2% 0 0" height="210">
      </v-img>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="teal--text">
              <h5>
                By Admin
              </h5>
              <!-- <h5>
                {{ item._source.mst_iklan_jenis }}
              </h5> -->
            </v-list-item-subtitle>
            <!-- <h4 class="my-4">
              {{ item._source.judul }}
            </h4> -->
            <h4 class="my-4">
              {{ item.judul_artikel }}
            </h4>

            <v-divider class="mb-2"> </v-divider>

            <div class="d-flex">
              <!--  iklan baris -->
              <v-list-item-title
              >
                Diposting
              </v-list-item-title>

              <!-- IB -->
              <v-list-item-title
                align="right"
                class="red--text"
              >
                {{
                  moment
                    .utc(item.created_at)
                    .add(utc, 'h')
                    .format('DD MMM YYYY')
                }}
              </v-list-item-title>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'list-artikel',
  props: ['item'],
   filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM, HH:mm");
    },
  },
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      
    }),
  },
  data: () => ({
    countdown: 0,
    countdown2: 0,
  }),
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    go(id) {
      this.setProductId(id)

      this.$router.push(
        '/artikel/'+id
      )
    },
    async getTB() {
      // console.log('ini iklannya', this.item)
      if (this.item._source.id_mst_iklan_jenis == 2) {
        await this.$axios
          .get('/iklan/v3/iklan_tb_mokas', {
            params: {
              id: this.item._source.id,
            },
          })
          .then((response) => {
            let { data } = response.data
            this.iklan = data
  
            let now = this.moment
              .utc(data.server_time)
              .add(this.utc, 'h')
              .toDate()
            now.setDate(now.getDate() - 1)
            console.log('data',data)
  
            let s = this.moment
              .utc(data.tanggal_mulai)
              .add(this.utc, 'h')
              .toDate()
            s.setDate(s.getDate() - 1)
  
            let d = this.moment
              .utc(data.tanggal_selesai)
              .add(this.utc, 'h')
              .toDate()
            d.setDate(d.getDate() - 1)
  
            this.countdown2 = d - now
            this.countdown = s - now
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })        
      }
    },
  },
  async created() {
    // await this.getTB()
    // console.log('ini data iklan', this.item)
  },
}
</script>