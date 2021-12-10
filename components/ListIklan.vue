<template>
  <div>
    <v-card
      rounded="lg"
      :style=" item._source.highlight ? 'border:2px solid #20929D' : ''"
      @click="
        go(item._source.id, item._source.judul, item._source.unit_motor_bekas)
      "
    >
      <v-card-title style="position: absolute; z-index: 1; right: -30px">
        <v-img src="/img/siappakai.png" width="100px" v-if="item._source.id_mst_iklan_jenis == 1"></v-img>
      </v-card-title>
      <v-card-title
        style="position: absolute; z-index: 1; right: -30px; top: 120px"
      >
      
        <v-img v-if="item._source.garansi" src="/img/garansi.png" width="100px"></v-img>
      </v-card-title>

      <v-card-title 
        v-if="item._source.id_mst_iklan_jenis == 2" 
        style="position: absolute; z-index: 1; right: 0px; top:5px">
          <v-chip
            small
            color="#27AE60"
            dark
            v-if="start == true && end == false"
          >
            <countdown
              :time="countdown2 < 0 ? 0 : countdown2"
              v-slot="{ days, hours, minutes, seconds }"
              style="font-size: 10px"
            >
              {{ days }} h : {{ hours }} j : {{ minutes }} m :
              {{ seconds }} d
            </countdown>
          </v-chip>
          <v-chip
            small
            color="#EB5757"
            dark
            v-if="start == false && end == false"
          >
            <countdown
              :time="countdown < 0 ? 0 : countdown"
              v-slot="{ days, hours, minutes, seconds }"
              style="font-size: 10px"
            >
              -
              {{ days }} h : {{ hours }} j : {{ minutes }} m :
              {{ seconds }} d
            </countdown>
          </v-chip>
          <v-chip
            small
            color="#EB5757"
            dark
            v-if="start == true && end == true"
          >
            Selesai
          </v-chip>
          
        </v-card-title>

      <v-img :src="getImage(item._source.photo)" style="border-radius:2% 2% 0 0" height="210">
        
        <v-card-title>
          <v-chip
            small
            color="#20929D"
            dark
            class="mt-1"
            v-if="item._source.highlight == true"
          >
            Highlight
          </v-chip>
        </v-card-title>
        
      </v-img>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="teal--text">
              <h5 v-if="item._source.id_mst_iklan_jenis == 1">
                {{ item._source.mst_iklan_jenis }}
              </h5>
              <h5 v-else>
                {{ item._source.mst_iklan_jenis }}
                {{ item._source.mst_iklan_type }} {{ item._source.mst_type_tb }}
              </h5>
              <!-- <h5>
                {{ item._source.mst_iklan_jenis }}
              </h5> -->
            </v-list-item-subtitle>

            <h5
              class="d-flex align-center"
              v-if="item._source.app_user.length < 15"
            >
              <v-list-item-avatar size="40">
                <v-img
                  src="/img/icons/people.webp"
                  contain
                  v-if="item.photo == 'null'"
                ></v-img>

                <v-img
                  :src="getImage(item._source.app_user_photo)"
                  v-else
                ></v-img>
              </v-list-item-avatar>
              <v-icon
                color="blue"
                class="mr-1"
                small
                v-if="item._source.id_mst_user_type == 2"
              >
                mdi-check-decagram
              </v-icon>
              {{ item._source.app_user }}
            </h5>

            <h5 class="d-flex align-center" v-else>
              <v-list-item-avatar size="40">
                <v-img
                  src="/img/icons/people.webp"
                  contain
                  v-if="item.photo == 'null'"
                ></v-img>

                <v-img
                  :src="getImage(item._source.app_user_photo)"
                  v-else
                ></v-img>
              </v-list-item-avatar>
              <v-icon
                color="blue"
                class="mr-1"
                small
                v-if="item._source.id_mst_user_type == 2"
              >
                mdi-check-decagram
              </v-icon>
              {{ item._source.app_user.substring(0, 15) + '..' }}
            </h5>
            <!-- <h4 class="my-4">
              {{ item._source.judul }}
            </h4> -->
            <h4 class="my-4" v-if="item._source.judul.length < 25">
              {{ item._source.judul }}
            </h4>
            <h4 class="my-4" v-else>
              {{ item._source.judul.substring(0, 25) + '..' }}
            </h4>

            <v-divider class="mb-2"> </v-divider>

            <div class="d-flex">
              <!--  iklan baris -->
              <v-list-item-title
                v-if="
                  item._source.harga_saat_ini == null &&
                  item._source.id_mst_iklan_jenis == 1
                "
              >
                Harga
              </v-list-item-title>

              <!-- TB -->
              <v-list-item-title
                v-if="
                  item._source.harga_saat_ini == null &&
                  item._source.id_mst_iklan_jenis == 2
                "
              >
                Harga awal
              </v-list-item-title>

              <v-list-item-title
                v-if="
                  item._source.harga_saat_ini != null &&
                  item._source.id_mst_iklan_jenis == 2
                "
              >
                Harga saat ini
              </v-list-item-title>

              <!-- aksesoris -->
              <v-list-item-title
                v-if="
                  item._source.id_mst_iklan_jenis == 5
                "
              >
                Harga
              </v-list-item-title>

              <!-- IB -->
              <v-list-item-title
                align="right"
                class="red--text"
                v-if="
                  item._source.harga_saat_ini == null &&
                  item._source.id_mst_iklan_jenis == 1
                "
              >
                Rp
                {{ Number(item._source.harga).toLocaleString('id-ID') }}
              </v-list-item-title>

              <!-- TB -->
              <v-list-item-title
                align="right"
                class="red--text"
                v-if="
                  item._source.harga_saat_ini == null &&
                  item._source.id_mst_iklan_jenis == 2
                "
              >
                Rp
                {{ Number(item._source.harga_awal).toLocaleString('id-ID') }}
              </v-list-item-title>

              <v-list-item-title
                align="right"
                class="red--text"
                v-if="
                  item._source.harga_saat_ini != null &&
                  item._source.id_mst_iklan_jenis == 2
                "
              >
                Rp
                {{
                  Number(item._source.harga_saat_ini).toLocaleString('id-ID')
                }}
              </v-list-item-title>

              <!-- ass -->
              <v-list-item-title
                align="right"
                class="red--text"
                v-if="
                  item._source.id_mst_iklan_jenis == 5
                "
              >
                Rp
                {{ Number(item._source.harga).toLocaleString('id-ID') }}
              </v-list-item-title>
            </div>
            <!-- <v-list-item-subtitle class="mt-2">
              <v-list-item-action-text
                v-if="item._source.id_mst_iklan_jenis == 2"
                class="font-weight-bold teal--text my-4"
              >
                <v-icon small color="teal">mdi-calendar</v-icon>
                {{
                  moment(item._source.tanggal_mulai)
                    .add(utc, 'h')
                    .format('YYYY-MM-DD HH:mm')
                }}
                {{ timezone }}
              </v-list-item-action-text>
            </v-list-item-subtitle> -->
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
  name: 'list-iklan',
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
    now: function () {
      return this.time
    },
    start: function () {
      if (this.item._source.id_mst_iklan_jenis == 2) {
        return this.moment.utc(this.now).isAfter(this.item._source.tanggal_mulai)        
      }
    },
    end: function () {
      if (this.item._source.id_mst_iklan_jenis == 2) {        
        return this.moment.utc(this.now).isAfter(this.item._source.tanggal_selesai)
      }
    },
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
    go(id, name, unit) {
      this.setProductId(id)

      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
      if (unit_motor_bekas != null) {
        this.setUnitID(unit)
      }
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
    await this.getTB()
    console.log('ini data iklan', this.item)
  },
}
</script>