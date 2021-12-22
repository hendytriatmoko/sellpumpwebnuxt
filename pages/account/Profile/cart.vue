<template>
  <div>
    <h2>Keranjang</h2>
    <br />
            <v-card
              rounded="lg"
              v-for="item in infoKeranjang"
              :key="item.data.id_produk"
              elevation="6"
              class="mb-2 mx-2"
            >
                <div class="d-flex">
                  <div>
                    <v-checkbox v-model="item.check" class="ml-2 mt-6"></v-checkbox>
                  </div>
                  <div>
                    <v-img :src="getImageProduk(item.data.gambar_produk)" class="my-2" width="80px" height="80px"></v-img>
                  </div>
                  <div class="ml-3 my-2" style="width:58%">
                    <h3>{{item.data.nama_produk}}</h3>
                    <h5 v-if="item.data.deskripsi_produk.length < 80">{{item.data.deskripsi_produk}}</h5>
                    <h5 v-else>{{item.data.deskripsi_produk.substring(0, 80) + '....' }}</h5>
                    <h3>
                      Rp
                      {{ Number(item.data.harga_produk).toLocaleString('id-ID') }}
                    </h3>
                  </div>
                  <div>
                    <div class="d-flex mt-2 mx-3">
                      <v-btn class="mt-8" x-small @click="change(item.data.id_produk,'minus')">
                        <v-icon color="red" >mdi-minus</v-icon>
                      </v-btn>
                      <v-text-field
                        class="mt-5 mx-2"
                        style="width:50px"
                        v-model="item.unit"
                        solo
                        number
                        dense
                      ></v-text-field>
                      <v-btn class="mt-8" x-small @click="change(item.data.id_produk,'plus')">
                        <v-icon color="green" >mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="mt-6 ml-6">
                    <v-icon class="pt-2" large color="red">mdi-delete</v-icon>
                  </div>
                </div>
            </v-card>

        <br />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VMoney } from 'v-money'
import { data } from '@chenfengyuan/vue-countdown'
export default {
  name: 'cart',
  components: {
  },
  data: () => ({
    keranjang: [],
    infoKeranjang:[]
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      // id: 'product/id',
      unitid: 'product/unitid',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setSellertId: 'product/setSeller',
      setAuth: 'auth/set',
    }),
    async getKeranjang() {
      // await this.$axios
      //   .get('/keranjang/v1/keranjang/getkeranjang', {
      //     headers: { Authorization: this.DataToken }
      //   })
      //   .then((response) => {
      //     this.keranjang = response.data.data
      //     console.log('keranjang', this.keranjang)
      //   })
      //   .catch((error) => {
      //     let responses = error.response.data
      //     console.log(responses.api_message)
      //   })
      await this.$axios
        .get('/produk/v1/produk/getproduk')
        .then((response) => {
          this.keranjang = response.data.data
          let dataKeranjang = []
          for (let i = 0; i < this.keranjang.length; i++) {
            dataKeranjang.push({
              check:false,
              unit:1,
              data:this.keranjang[i]
            })
          }
          this.infoKeranjang = dataKeranjang
          console.log('keranjang', this.keranjang)
          console.log('data keranjang', this.infoKeranjang)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async change(id,param){
      for (let i = 0; i < this.infoKeranjang.length; i++) {
        if (this.infoKeranjang[i].data.id_produk == id) {
          if (param == 'plus') {
            this.infoKeranjang[i].unit = this.infoKeranjang[i].unit+1
          }else{
            if (this.infoKeranjang[i].unit != 1) {
              this.infoKeranjang[i].unit = this.infoKeranjang[i].unit-1
            }
          }
        }
      }
    },
    
  },
  async created() {
    this.DataToken = this.$cookies.get("token");
    console.log('user', this.user)
    await this.getKeranjang()
  },
}
</script>

<style>
div.sticky {
  overflow: hidden;
  position: sticky;
  top: 12.6%;
  z-index: 1;
}
div.fixed {
  position: fixed;
  top: 35%;
  width: 290px;
  z-index: 1;
}
.v-application.primary--text {
  color: #20929d !important;
  caret-color: #20929d !important;
}
ody {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
h1 {
  text-align: center;
  margin: 50px 0 80px;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^='share-network-'] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^='share-network-'] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^='share-network-'] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>