<template>
  <div>
        <app-bar />
        <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        </v-app-bar>
        <!-- <v-app-bar app color="#20929D" dark>
        <v-btn icon @click.stop="$router.go(-1)">
            <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        </v-app-bar> -->
        <br />
        <h2 class="text-center">Produk Khusus</h2>
        <v-divider></v-divider>
        
        
        <br>
        <v-row align="start" class="mx-6">
            <v-col cols="12" sm="12">
            <v-card rounded="lg" elevation="1" height="418px">
                <v-container>
                <div >

                    <div class="scrolling-wrapper-flexbox">
                    <!-- moment(item.date).add(utc, 'h').format('DD MMM, YYYY') -->
                    <v-card
                        class="ma-2 ml-4"
                        rounded="xl"
                        width="250px"
                        v-for="(item, index) in dataKhusus.produk_khusus"
                        @click="goProduk(item.produk[0].id_produk,item.produk[0].nama_produk)"
                        contain
                        :key="index"
                        >
                            <div class="red white--text py-1"><center>X{{ item.kuantitas }} Unit</center></div>
                            <v-img :src="getImageProduk(item.produk[0].gambar_produk)" height="210">
                            </v-img>

                            <v-list dense>
                                <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="teal--text">
                                    <h5>
                                        {{ item.produk[0].kategori }} - {{ item.produk[0].sub_kategori }}
                                    </h5>
                                    <!-- <h5>
                                        {{ item._source.mst_iklan_jenis }}
                                    </h5> -->
                                    </v-list-item-subtitle>
                                    <!-- <h4 class="my-4">
                                    {{ item._source.judul }}
                                    </h4> -->
                                    <h4 class="my-4">
                                    {{ item.produk[0].nama_produk }}
                                    </h4>

                                    <v-divider class="mb-2"> </v-divider>

                                    <div class="d-flex">
                                    <!--  iklan baris -->
                                    <v-list-item-title
                                    >
                                        Harga Produk
                                    </v-list-item-title>

                                    <!-- IB -->
                                    <v-list-item-title
                                        align="right"
                                        class="red--text"
                                    >
                                        Rp
                                        {{ Number(item.produk[0].harga_produk).toLocaleString('id-ID') }}
                                    </v-list-item-title>
                                    </div>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                    </v-card>
                    </div>
                </div>
                </v-container>
            </v-card>
            </v-col>
        </v-row>
      <br>
        <h2 class="text-center">{{ dataKhusus.nama_khusus }}</h2>
        <v-row class="mx-6">
            <v-col cols="8">
                <h3>Deskripsi</h3>
                <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="dataKhusus.deskripsi_khusus"
                ></div>
            </v-col>
            <v-col cols="4">
                <h3>Harga <span class="red--text">(diskon {{ dataKhusus.diskon }}%)</span></h3>
                <div> 
                    Rp
                    {{ Number(dataKhusus.harga_khusus).toLocaleString('id-ID') }} 
                    <sup class="red--text">
                        <s>
                        Rp
                        {{ Number(dataKhusus.harga_asli).toLocaleString('id-ID') }}
                        </s>
                    </sup>
                </div>
            </v-col>
        </v-row>
        <br>
        <div class="mx-6">
            <v-btn width="100%" color="#20929D" class="mx-1">
                Pesan Sekarang
            </v-btn>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'pesanan',
    data: () => ({
        dataKhusus:[],
        DataUser:'',
        DataToken:'',
    }),
    computed: {
        ...mapGetters({
            guest: 'auth/guest',
            user: 'auth/user',
            // id: 'product/id',
            unitid: 'product/unitid',
            utc: 'timezone/utc',
        }),
    },
    methods: {
        ...mapActions({
            setSellertId: 'product/setSeller',
            setProductId: 'product/setProduct',
        }),
        async getDataProdukKhusus(){
            var params = new URLSearchParams();

            params.append("id_user", this.DataUser.id_user);
            params.append("id_khusus", this.$route.query.id);

            var request = {
                params: params,
                headers: { Authorization: this.DataToken }
            };
            await this.$axios
                .get('/produk/v1/khusus/getkhusus', request)
                .then((response) => {
                    // this.listIklan = response.data.data[0]
                    this.dataKhusus = response.data.data[0]
                    console.log('dataKhusus', this.dataKhusus)
                })
                .catch((error) => {
                    let responses = error.response.data
                    console.log(responses.api_message)
                })
        },
        async goProduk(id,name){
            this.$router.push(
                '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
            )
        },
    },
    async created(){
        this.DataToken = this.$cookies.get("token");
        this.DataUser = this.$cookies.get("user");
        this.getDataProdukKhusus()
    },
}
</script>

<style>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.scrolling-wrapper-flexbox {
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>