<template>
  <div>
    <v-alert
      :value="hits.length == 0 && (keyword != '' || keyword != null)"
      color="warning"
    >
      <span>Harap Tunggu Sebentar...</span>

      <v-progress-circular
        :size="40"
        color="amber"
        indeterminate
      ></v-progress-circular>
    </v-alert>

    <v-list subheader>
      <div v-if="keyword != ''">
        <v-subheader>Hasil Pencarian</v-subheader>

        <v-list-item @click="hasilPencarian">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ keyword }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-subheader>Motor Bekas</v-subheader>

      <v-virtual-scroll
        :items="hits"
        :item-height="80"
        :height="hits.length * 81"
      >
        <template v-slot="{ item }">
          <v-list-item
            @click="
              go2(
                item.id_produk,
                item.nama_produk,
              )"
          >
            <v-list-item-avatar>
              <v-img :src="getImageProduk(item.gambar_produk)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.nama_produk }}</v-list-item-title>

              <v-list-item-subtitle
                class="red--text"
              >
                Rp
                {{ Number(item.harga_produk).toLocaleString('id-ID') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-subheader>Penjual</v-subheader>

      <v-virtual-scroll
        :items="artikel"
        :item-height="60"
        :height="artikel.length * 60"
      >
        <template v-slot="{ item }">
          <v-list-item @click="go(item.id)">
            <v-list-item-avatar>
              <v-img :src="getImageProduk(item.gambar_artikel)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                {{ item.judul_artikel }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'menu-search',
  props: ['keyword'],
  data: () => ({
    sheet: false,
    hits: [],
    seller: [],
    artikel:[],
    selected: '0',
    order: 'posting_terbaru',
    page: 1,
    lengthPage: 0,
    limit: 5,
    total: 0,
    isActive: false,
    now: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
      setSellertId: 'product/setSeller',
    }),
    async doSearch() {
      var params = new URLSearchParams();

      if (this.keyword != '') {
          params.append("search", this.keyword);
      }

      var request = {
        params: params,
      };
      await this.$axios
        .get('/produk/v1/produk/getproduk', request)
        .then((response) => {
            this.hits = response.data.data
            console.log('produk search', this.hits)
        })
        .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
        })
    },
    async getArtikel() {
      await this.$axios
        .get('/produk/v1/artikel/getartikel', {
          params: {
            limit: 4,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.artikel = data
          console.log('artikel', this.artikel)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    go(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id)
    },
    go2(id, name) {
      this.setProductId(id)

      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
  },
  created() {
    this.doSearch()
    this.getArtikel()
  },
}
</script>