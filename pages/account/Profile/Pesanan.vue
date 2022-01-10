<template>
  <div>
    <v-card
      elevation="1"
      outlined>
      <v-tabs
        v-model="tab"
        align-with-title
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
        >
          <span>
            <v-icon
              medium
              color="darken-2"
            >
              {{ item.icon }}
            </v-icon> {{ item.name }}
          </span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.id"
        >
          <v-card flat>
            <v-card-text v-for="text in text" :key="text.id">{{ text.name }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          { id: 1, name: 'Semua', icon: 'mdi mdi-view-parallel' },
          { id: 2, name: 'Menunggu Pembayaran', icon: 'mdi mdi-credit-card-clock-outline' },
          { id: 3, name: 'Menunggu Verifikasi', icon: 'mdi mdi-timer-outline' },
          { id: 4, name: 'Pembayaran Diverifikasi', icon: 'mdi mdi-credit-card-check-outline' },
          { id: 5, name: 'Ditolak', icon: 'mdi mdi-close-octagon' },
          { id: 6, name: 'Pesanan Diterima', icon: 'mdi mdi-check-circle' },
        ],
        text: [
          { id: 1, name: 'Pesanan', },
          { id: 1, name: 'Dipesan', },
        ]
      }
    },
  }
</script>

<style>

</style>