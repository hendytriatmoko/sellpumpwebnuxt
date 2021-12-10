<template>
  <div>
    <h2>Iklan Favorit</h2>

    <v-container v-if="hits.length > 0">
      <v-row>
        <v-col cols="12" sm="4" v-for="item in hits" :key="item._source.id">
          <v-card
            rounded="lg"
            elevation="4"
            @click="go(item._source.id, item._source.judul)"
          >
            <v-img :src="getThumb(item._source.photo)" max-height="250">
              <v-card-title>
                <v-chip
                  small
                  color="#20929D"
                  dark
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
                    <h5>
                      {{ item._source.mst_iklan_jenis }}
                    </h5>
                  </v-list-item-subtitle>

                  <h5 class="d-flex align-center">
                    <v-list-item-avatar size="40">
                      <v-img
                        src="/img/icons/people.webp"
                        contain
                        v-if="item.photo == 'null'"
                      ></v-img>

                      <v-img :src="getImage(item._source.photo)" v-else></v-img>
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

                  <h4 class="my-4">
                    {{ item._source.judul }}
                  </h4>

                  <v-divider class="mb-2"> </v-divider>

                  <div class="d-flex">
                    <v-list-item-title
                      v-if="
                        item._source.harga_saat_ini == null &&
                        item._source.id_mst_iklan_jenis == 1
                      "
                    >
                      Harga
                    </v-list-item-title>

                    <v-list-item-title
                      v-if="
                        item._source.harga_saat_ini == null &&
                        item._source.id_mst_iklan_jenis > 1
                      "
                    >
                      Harga awal
                    </v-list-item-title>

                    <v-list-item-title
                      v-if="
                        item._source.harga_saat_ini != null &&
                        item._source.id_mst_iklan_jenis > 1
                      "
                    >
                      Harga saat ini
                    </v-list-item-title>

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

                    <v-list-item-title
                      align="right"
                      class="red--text"
                      v-if="
                        item._source.harga_saat_ini == null &&
                        item._source.id_mst_iklan_jenis > 1
                      "
                    >
                      Rp
                      {{
                        Number(item._source.harga_awal).toLocaleString('id-ID')
                      }}
                    </v-list-item-title>

                    <v-list-item-title
                      align="right"
                      class="red--text"
                      v-if="
                        item._source.harga_saat_ini != null &&
                        item._source.id_mst_iklan_jenis > 1
                      "
                    >
                      Rp
                      {{
                        Number(item._source.harga_saat_ini).toLocaleString(
                          'id-ID'
                        )
                      }}
                    </v-list-item-title>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <br />

      <div align="center">
        <v-btn
          color="teal"
          dark
          outlined
          @click="getFavourite"
          v-if="hits.length < 40 && hits.length < total"
        >
          Muat Lebih Banyak
        </v-btn>
      </div>

      <!-- <v-pagination
        v-model="page"
        @input="getFavourite"
        :length="lengthPage"
        :total-visible="7"
      ></v-pagination> -->
    </v-container>

    <v-container v-else>
      <v-card class="d-flex align-center justify-center" flat height="100" tile v-if="hits.length == 0">
        <h2>Belum ada list iklan favorit</h2>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'favorit',
  props: ['user'],
  data: () => ({
    hits: [],
    page: 1,
    limit: 8,
    total: 0,
    lengthPage: 0,
  }),
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
    }),
    async getFavourite() {
      let offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/iklan/v3/iklan_favorit', {
          params: {
            id_app_user: this.user.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits.push(...hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
  },
  async created() {
    await this.getFavourite()
  },
}
</script>

<style>
</style>