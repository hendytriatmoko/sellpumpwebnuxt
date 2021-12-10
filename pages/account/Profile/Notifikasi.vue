<template>
  <div>
    <h2>Semua Notifikasi</h2>

    <br />

    <v-card>
      <v-tabs
        v-model="tab"
        grow
        slider-color="#20929D"
        show-arrows
        @change="getNotif"
      >
        <v-tab class="text-caption">Semua</v-tab>
        <v-tab class="text-caption">Iklan</v-tab>
        <v-tab class="text-caption">Transaksi</v-tab>
        <v-tab class="text-caption">Unit</v-tab>
        <v-tab class="text-caption">Tiket</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-list-item-group v-model="model" multiple>
            <template v-for="(item, i) in notif">
              <v-list-item
                :key="i"
                @click="
                  read(
                    item.id,
                    item.id_modul,
                    item.id_data,
                    item.judul,
                    item.deskripsi
                  )
                "
                :value="item.is_read"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img
                      src="/img/icons/unit_moderasi.webp"
                      v-if="item.id_modul == 4"
                    ></v-img>

                    <v-img
                      src="/img/icons/transaksi.webp"
                      v-if="item.id_modul == 3"
                    ></v-img>

                    <v-img
                      src="/img/icons/iklan.webp"
                      v-if="item.id_modul == 1"
                    ></v-img>

                    <v-img
                      src="/img/icons/iklan.webp"
                      v-if="item.id_modul == 5"
                    ></v-img>

                    <v-img
                      src="/img/icons/tiket_expired.webp"
                      v-if="item.id_modul == 7"
                    ></v-img>

                    <v-img
                      src="/img/icons/tiket_hangus.webp"
                      v-if="item.id_modul == 10"
                    ></v-img>

                    <v-img
                      src="/img/icons/tiket_terpakai.webp"
                      v-if="item.id_modul == 11"
                    ></v-img>

                    <v-img
                      src="/img/icons/tiket_tersedia.webp"
                      v-if="item.id_modul == 12"
                    ></v-img>

                    <v-img
                      src="/img/icons/ic_review.webp"
                      v-if="item.id_modul == 13"
                    ></v-img>

                    <v-img
                      src="/img/icons/hampir-expired.webp"
                      v-if="item.id_modul == 6"
                    ></v-img>

                    <v-img
                      src="/img/icons/ic_review_dibalas.webp"
                      v-if="item.id_modul == 9"
                    ></v-img>

                    <v-img
                      src="/img/icons/review_pembeli.webp"
                      v-if="item.id_modul == 8"
                    ></v-img>

                    <v-img
                      src="/img/icons/id14_blokir.webp"
                      v-if="item.id_modul == 14"
                    ></v-img>
                    <v-img
                      src="/img/icons/id14_blokir.webp"
                      v-if="item.id_modul == 17"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.judul }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.deskripsi }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="overline teal--text">
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </v-list-item-action>

                  <v-list-item-action-text class="d-none">
                    <v-checkbox
                      :input-value="active"
                      color="deep-purple accent-4"
                    ></v-checkbox>
                  </v-list-item-action-text>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
           <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="notif.length == 0"
          >
            <h2>Belum ada notifikasi</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-list-item-group v-model="model" multiple>
            <template v-for="(item, i) in notif">
              <v-list-item
                :key="i"
                @click="
                  read(
                    item.id,
                    item.id_modul,
                    item.id_data,
                    item.judul,
                    item.deskripsi
                  )
                "
                :value="item.is_read"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img src="/img/icons/iklan.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.judul }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.deskripsi }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="overline teal--text">
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </v-list-item-action>

                  <v-list-item-action-text style="display: none">
                    <v-checkbox
                      :input-value="active"
                      color="deep-purple accent-4"
                    ></v-checkbox>
                  </v-list-item-action-text>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
            <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="notif.length == 0"
          >
            <h2>Belum ada notifikasi</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-list-item-group v-model="model" multiple>
            <template v-for="(item, i) in notif">
              <v-list-item
                :key="i"
                @click="read(item.id, item.id_modul, item.id_data, item.judul)"
                :value="item.is_read"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img
                      src="/img/icons/unit_serah_terima.webp"
                      v-if="item.id_modul == 3"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.judul }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.deskripsi }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="overline teal--text">
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </v-list-item-action>

                  <v-list-item-action-text style="display: none">
                    <v-checkbox
                      :input-value="active"
                      color="deep-purple accent-4"
                    ></v-checkbox>
                  </v-list-item-action-text>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
            <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="notif.length == 0"
          >
            <h2>Belum ada notifikasi</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-list-item-group v-model="model" multiple>
            <template v-for="(item, i) in notif">
              <v-list-item
                :key="i"
                @click="read(item.id, item.id_modul, item.id_data, item.judul)"
                :value="item.is_read"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img
                      src="/img/icons/unit_moderasi.webp"
                      v-if="item.id_modul == 4"
                    ></v-img>
                    <v-img src="/img/icons/unit.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.judul }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.deskripsi }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="overline teal--text">
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </v-list-item-action>

                  <v-list-item-action-text style="display: none">
                    <v-checkbox
                      :input-value="active"
                      color="deep-purple accent-4"
                    ></v-checkbox>
                  </v-list-item-action-text>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
            <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="notif.length == 0"
          >
            <h2>Belum ada notifikasi</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-list-item-group v-model="model" multiple>
            <template v-for="(item, i) in notif">
              <v-list-item
                :key="i"
                @click="read(item.id, item.id_modul, item.id_data)"
                :value="item.is_read"
                active-class="deep-purple--text text--accent-4"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img
                      src="/img/icons/tiket_expired.webp"
                      v-if="item.id_modul == 7"
                    ></v-img>

                    <v-img
                      src="/img/icons/tiket_terpakai.webp"
                      v-if="item.id_modul == 11"
                    ></v-img>
                    <v-img
                      src="/img/icons/tiket_tersedia.webp"
                      v-if="item.id_modul == 12"
                    ></v-img>

                    <v-img
                      src="/img/icons/tiket_terpakai.webp"
                      v-if="item.id_modul == 11"
                    ></v-img>
                    <v-img
                      src="/img/icons/hampir-expired.webp"
                      v-if="item.id_modul == 6"
                    ></v-img>
                    <v-img
                      src="/img/icons/tiket_hangus.webp"
                      v-if="item.id_modul == 10"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.judul }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.deskripsi }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="overline teal--text">
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </v-list-item-action>

                  <v-list-item-action-text style="display: none">
                    <v-checkbox
                      :input-value="active"
                      color="deep-purple accent-4"
                    ></v-checkbox>
                  </v-list-item-action-text>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
            <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="notif.length == 0"
          >
            <h2>Belum ada notifikasi</h2>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <br />

      <v-pagination
        v-model="page"
        @input="getNotif"
        :length="lengthPage"
        :total-visible="7"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'notifikasi',
  props: ['user'],
  data: () => ({
    tab: 0,
    modul: 0,
    notif: [],
    notifIklan: [],
    model: [false],
    page: 1,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getNotif() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_user', this.user.id)
      if (this.tab > 0) {
        if (this.tab == 1) {
          this.modul = 1
          params.set('id_modul', this.modul)
        }
        if (this.tab == 2) {
          this.modul = 3
          params.set('id_modul', this.modul)
        }
        if (this.tab == 3) {
          this.modul = 4
          params.set('id_modul', this.modul)
        }
        if (this.tab == 4) {
          params.append('id_modul', 7)
          params.append('id_modul', 10)
          params.append('id_modul', 11)
          params.append('id_modul', 12)
        }
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/log/v3/log/notifikasi', request)
        .then((response) => {
          let { data } = response
          this.notif = data.data
          console.log('notif',this.notif)
          this.total = data.count
          this.lengthPage = Math.ceil(this.total / this.limit)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
    async read(id, modul, data, judul, desc) {
      let formData = new FormData()

      formData.set('id', id)

      await this.$axios
        .put('/log/v3/log/notifikasi', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then(() => {
          if (modul == 1) {
            this.setProductId(data)
            let name = desc.substring(
              desc.indexOf("'") + 1,
              desc.lastIndexOf("'")
            )
            let trimName = name.trim()
            this.$router.push(
              '/detail-iklan/' + trimName.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+data
            )
          } else if (modul == 4) {
            this.$router.push({ path: '/garasi/detail-unit/' + data })
          } else if (modul == 8) {
            this.$router.push({ path: '/buyer-review' })
          } else if (modul == 7) {
            this.$router.push({ path: '/ticket' })
          } else if (modul == 10) {
            this.$router.push({ path: '/ticket' })
          } else if (modul == 11) {
            this.$router.push({ path: '/ticket' })
          } else if (modul == 12) {
            this.$router.push({ path: '/ticket' })
          } else if (modul == 9) {
            this.$router.push({ path: '/buyer-review' })
          } else if (modul == 3) {
            if (judul == 'Tiket') {
              this.$router.push({ path: '/detail-transaksi/ticket/' + data })
            } else {
              this.$router.push({ path: '/detail-transaksi/unit/' + data })
            }
          } else if (modul == 13) {
            this.$router.push({ path: '/account/profile/ulasan' })
          } else if (modul == 14) {
            this.$router.push({ path: '/account/profile/umum' })
          } else {
            this.$router.push({ path: '/detail-transaksi/ticket/' + data })
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
  },
  async created() {
    await this.getNotif()
  },
}
</script>

<style>
</style>