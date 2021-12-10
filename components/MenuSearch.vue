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
                item._id,
                item._source.judul,
              )
            "
          >
            <v-list-item-avatar>
              <v-img :src="getImage(item._source.photo)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item._source.judul }}</v-list-item-title>

              <v-list-item-subtitle
                class="red--text"
                v-if="
                  item._source.harga_saat_ini == null &&
                  item._source.id_mst_iklan_jenis == 1
                "
              >
                Rp
                {{ Number(item._source.harga).toLocaleString('id-ID') }}
              </v-list-item-subtitle>

              <v-list-item-subtitle
                class="red--text"
                v-if="
                  item._source.harga_saat_ini == null &&
                  item._source.id_mst_iklan_jenis == 2
                "
              >
                Rp
                {{ Number(item._source.harga_awal).toLocaleString('id-ID') }}
              </v-list-item-subtitle>

              <v-list-item-subtitle
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
              </v-list-item-subtitle>

              <v-list-item-subtitle
                class="red--text"
                v-if="
                  item._source.id_mst_iklan_jenis == 5
                "
              >
                Rp
                {{
                  Number(item._source.harga).toLocaleString('id-ID')
                }}
              </v-list-item-subtitle>

              <v-list-item-subtitle>
                <v-chip
                  color="red"
                  text-color="white"
                  x-small
                  v-if="item._source.id_mst_iklan_jenis == 2"
                >
                  TB {{ item._source.mst_iklan_type }} {{ item._source.mst_type_tb }}
                </v-chip>

                <v-chip color="teal" text-color="white" x-small v-if="item._source.id_mst_iklan_jenis == 1">
                  {{ item._source.mst_iklan_jenis }}
                </v-chip>
                <v-chip color="#FF9800" text-color="white" x-small v-if="item._source.id_mst_iklan_jenis == 5">
                  {{ item._source.mst_iklan_jenis }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-subheader>Penjual</v-subheader>

      <v-virtual-scroll
        :items="seller"
        :item-height="60"
        :height="seller.length * 60"
      >
        <template v-slot="{ item }">
          <v-list-item @click="go(item.id, item.nama)">
            <v-list-item-avatar>
              <v-img :src="getImage(item.foto)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  color="blue"
                  small
                  class="mr-1"
                  v-if="item.id_mst_user_type == 2"
                >
                  mdi-check-decagram
                </v-icon>
                {{ item.nama }}
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
    doSearch() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('search', this.keyword)
      params.set('sort', this.order)
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
      }

      this.$axios
        .get('/search/v3/search', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits = hits
          console.log('ini hits pencarian',this.hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)

          this.seller = []

          const map = new Map()

          for (const item of this.hits) {
            if (!map.has(item._source.id_app_user)) {
              map.set(item._source.id_app_user, true)
              this.seller.push({
                id: item._source.id_app_user,
                nama: item._source.app_user,
                foto: item._source.app_user_photo,
              })
            }
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    hasilPencarian() {
      window.location.href =
        '/search?q=' +
        this.keyword +
        '&category=0&order=posting_terbaru&tb=false'
    },
    go(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id)
    },
    go2(id, name) {
      this.setProductId(id)
      this.$router.push('/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id)
    },
  },
  created() {
    this.doSearch()
    
  },
}
</script>