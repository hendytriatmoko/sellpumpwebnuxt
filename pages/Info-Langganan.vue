<template>
    <div>
        <app-bar />

        <div style="max-width: 1240px; margin: 0 auto !important">
        <v-card flat align="center" outlined max-width="1240px">
            <v-card-title class="justify-center" align="center">
             Pembelian Paket Berhasil
            </v-card-title>

            <v-img src="/img/icons/successful.webp" width="300"> </v-img>
            <v-card-subtitle class="black--text"> <div> Selamat!! Pembelian Paket Berhasil </div> <div> Pasang Iklanmu sekarang juga </div></v-card-subtitle>
            
            <v-btn color="#20929D" dark width="200" to="/account/profile/list-subs"
            > Lihat Paket </v-btn>
            <br />
          </v-card>
        </div>
    </div>
</template>

<script>

export default {
    name: 'info-langganan',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue')
    
  },
        
    
}
</script>