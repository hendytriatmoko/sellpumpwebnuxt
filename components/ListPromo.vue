<template>
  <v-container>
    <v-card
      color="transparent"
      rounded="lg"  
      width="250"
      id="card"
      @click="
        go(
          item._source.id,
          item._source.judul,
          item._source.unit_motor_bekas[0].id
        )
      "
    >
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

      <v-img :src="getImage(item._source.photo)" style="border-radius:2% 2% 0 0" width="250" height="200"> </v-img>

      <div class="d-flex pt-3 pl-3 pa-2">
        <v-icon color="primary" small class="mr-1"> mdi-check-decagram </v-icon>
        <b class="teal--text">Pilihan SiMotor</b>
      </div>
      <div class="d-flex pl-3 pb-2" style="color:#282828">
        <b>{{ item._source.judul }}</b>
      </div>

      <v-divider class="mx-3"></v-divider>

      <div class="d-flex align-center justify-space-around pa-2 teal--text">
        <div style="color:#282828">Mulai dari</div>

        <div style="color:#EB5757;">
          Rp {{ Number(item._source.harga_awal).toLocaleString('id-ID') }}
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list-promo',
  props: ['item'],
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
      this.setUnitID(unit)
      this.$router.push('/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id)
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
    console.log('ini countdown1', this.countdown)
    console.log('ini countdown2', this.countdown2)
  },
}
</script>
<style>
#card{
  /* border: 2px solid transparent;*/
  /* border-image:linear-gradient(0deg,red,#20929D) 10; */
  border: 2px solid transparent;
  border-radius: 80px;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left,#20929D, #f00);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>