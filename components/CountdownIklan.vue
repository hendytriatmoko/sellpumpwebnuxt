<template>
  <div>
    <v-chip
    small
    color="#20929D"
    dark
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'countdown-iklan',
  props: ['items'],
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
  },
  data: () => ({
    countdown2: 0,
  }),
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    async getCountdown(){
        let now = this.moment
            .utc(this.items.server_time)
            .add(this.utc, 'h')
            .toDate()
        now.setDate(now.getDate() - 1)
  
        let d = this.moment
            .utc(this.items.tanggal_selesai)
            .add(this.utc, 'h')
            .toDate()
        d.setDate(d.getDate() - 1)

        this.countdown2 = d - now
    },
  },
  async created() {
    await this.getCountdown()
    console.log('ini data iklan', this.items)
    console.log('ini countdown2', this.countdown2)
  },

}
</script>

<style>

</style>