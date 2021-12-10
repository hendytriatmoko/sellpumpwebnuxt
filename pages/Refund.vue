<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <h2 align="center">Refund Tiket Tawar Bersama</h2>

      <v-card>
        <v-container fluid>
          <v-img src="/img/bg.png" height="200">
            <v-container fluid>
              <h1>{{ ticket.tersedia }}</h1>
              <h3>Tiket Tersedia</h3>

              <h5>
                Tiket yang tersedia dapat Anda refund. Silahkan refund dengan
                klik tombol dibawah ini:
              </h5>

              <v-dialog v-model="dialog" fullscreen>
                <template v-slot:activator="{ on, attrs }">
                  <div align="right" class="mt-4">
                    <v-btn
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="open"
                      color="#20929D"
                    >
                      Pilih Tiket
                      <v-icon right>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </template>

                <v-toolbar dark color="#20929D">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    color="primary"
                    dark
                    class="mx-2"
                    @click="getTiket"
                    :disabled="listRefund.length > 0 ? false : true"
                  >
                    Refund
                  </v-btn>
                </v-toolbar>

                <v-card>
                  <v-container fluid>
                    <div class="d-flex justify-space-between">
                      <h3>
                        Pilih tiket yang akan di refund:
                        {{ listRefund.length }} Tiket
                      </h3>

                      <v-switch
                        label="Select All"
                        v-model="checkbox"
                        @change="selectAll"
                      ></v-switch>
                    </div>

                    <v-item-group>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="4"
                          v-for="item in listTersedia"
                          :key="item.id"
                        >
                          <v-item v-slot:default="{ active }">
                            <v-card>
                              <v-list>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-subtitle>
                                      Kode Tiket
                                    </v-list-item-subtitle>
                                    <v-list-item-title>
                                      {{ item.code }}
                                    </v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-checkbox
                                      v-model="listRefund"
                                      :value="item"
                                      :input-value="active"
                                    ></v-checkbox>
                                  </v-list-item-action>
                                </v-list-item>

                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-subtitle>
                                      Harga
                                    </v-list-item-subtitle>
                                    <v-list-item-title class="teal--text">
                                      Rp
                                      {{
                                        Number(item.harga_beli).toLocaleString(
                                          'id-ID'
                                        )
                                      }}
                                    </v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-content>
                                    <v-list-item-subtitle>
                                      Masa Berlaku
                                    </v-list-item-subtitle>
                                    <v-list-item-title
                                      class="red--text text-caption"
                                    >
                                      {{
                                        moment(item.expired_at)
                                          .add(utc, 'h')
                                          .format('YYYY-MM-DD, HH:mm')
                                      }}
                                      {{ timezone }}
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-item>
                        </v-col>
                      </v-row>
                    </v-item-group>

                    <v-pagination
                      v-model="page"
                      @input="tiketTersedia"
                      :length="lengthPage"
                      :total-visible="5"
                    ></v-pagination>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-container>
          </v-img>

          <v-divider class="my-4"></v-divider>

          <h2 align="center">Detail Tiket</h2>

          <v-row v-for="(item, i) in groupHarga" :key="i">
            <v-col cols="6">
              - {{ item.qty.length }} Tiket x Rp
              {{ Number(item.harga_beli).toLocaleString('id-ID') }}
            </v-col>

            <v-col cols="6" align="right">
              Rp
              {{
                Number(item.qty.length * item.harga_beli).toLocaleString(
                  'id-ID'
                )
              }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <h3>Total Refund</h3>
            </v-col>

            <v-col cols="6" align="right">
              <h3>Rp {{ Number(subtotal).toLocaleString('id-ID') }}</h3>
            </v-col>
          </v-row>

          <v-divider class="my-2"></v-divider>

          <h2 align="center">Pilih Rekening</h2>

          <v-list v-if="accounts.length > 0">
            <v-list-item v-for="item in accounts" :key="item.id">
              <v-list-item-avatar tile size="80">
                <v-img :src="getImage(item.foto)" contain></v-img>
              </v-list-item-avatar>

              <v-list-item-content class="text-left">
                <v-list-item-title>{{ item.bank_name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.nomor_rekening }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.nama_rekening }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-radio-group v-model="selected" column>
                  <v-radio :value="item.id"></v-radio>
                </v-radio-group>
              </v-list-item-action>
            </v-list-item>

            <v-btn
              block
              class="ma-2"
              color="primary"
              @click="dialogRekening = true"
            >
              Tambah Rekening
            </v-btn>

            <h4 class="my-3" align="center">
              *Refund akan diproses maksimal 2x24 Jam hari kerja
            </h4>

            <v-btn
              block
              class="my-3 white--text"
              color="teal"
              @click="refund"
              :disabled="selected == '' || subtotal == 0 ? true : false"
            >
              Refund
            </v-btn>
          </v-list>

          <h3 v-else>Tidak ada Rekening</h3>

          <v-dialog v-model="dialogRekening" persistent width="400">
            <v-card>
              <v-toolbar dark color="teal darken-3">
                <v-toolbar-title>Tambah Rekening</v-toolbar-title>

                <div class="flex-grow-1"></div>
                <v-btn icon dark @click="dialogRekening = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-row dense>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.bank_name"
                        :items="banks"
                        item-value="id"
                        item-text="bank_name"
                        :rules="[(v) => !!v || 'Field is required']"
                        label="Pilih Nama Bank"
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nama_rekening"
                        :counter="20"
                        :rules="[(v) => !!v || 'Field is required']"
                        label="Nama Pemilik Rekening"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nomor_rekening"
                        :counter="20"
                        :rules="[
                          (v) => !!v || 'Field is required',
                          (v) => /^\d+$/.test(v) || 'Numbers Only',
                        ]"
                        label="Nomor Rekening"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  class="mb-2 white--text"
                  @click="save"
                  :disabled="!valid"
                >
                  Simpan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card>
    </div>

<Footer />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'refund',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
     Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    dialog: false,
    listRefund: [],
    checkbox: false,
    listTersedia: [],
    groupHarga: [],
    qty: 0,
    subtotal: 0,
    accounts: [],
    selected: '',
    dialogRekening: false,
    valid: true,
    banks: [],
    editedItem: {
      bank_name: '',
      nama_rekening: '',
      nomor_rekening: '',
    },
    defaultItem: {},
    page: 1,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      ticket: 'ticket/ticket',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    open() {
      this.groupHarga = []
      this.subtotal = 0
    },
    async tiketTersedia() {
      let offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.listTersedia = data.data

          this.total = data.count
          this.lengthPage = Math.ceil(this.total / this.limit)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    selectAll() {
      if (this.checkbox) {
        this.listRefund = this.listTersedia
      } else {
        this.listRefund = []
      }
    },
    getTiket() {
      const map = new Map()

      for (const item of this.listRefund) {
        if (!map.has(item.harga_beli)) {
          map.set(item.harga_beli, true)

          let found = this.listRefund.filter(
            (element) => element.harga_beli == item.harga_beli
          )

          this.groupHarga.push({
            harga_beli: item.harga_beli,
            qty: found,
          })
        }
      }

      for (let index = 0; index < this.groupHarga.length; index++) {
        const element = this.groupHarga[index]
        this.subtotal += element.qty.length * element.harga_beli
      }

      this.qty = this.listRefund.length
      this.dialog = false
    },
    async getRekening() {
      await this.$axios
        .get('/user/v3/user/rekening', {
          params: {
            id_app_user: this.user.id,
            limit: 5,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.accounts = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getBank() {
      await this.$axios
        .get('/master/v3/mst_bank', {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.banks = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    close() {
      this.dialogRekening = false

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      let formData = new FormData()

      formData.set('id_mst_bank', this.editedItem.bank_name)
      formData.set('nama_rekening', this.editedItem.nama_rekening.trim())
      formData.set('nomor_rekening', this.editedItem.nomor_rekening.trim())
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/user/v3/user/rekening', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getRekening()
          this.close()
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
    async refund() {
      let formData = new FormData()

      for (let index = 0; index < this.listRefund.length; index++) {
        const element = this.listRefund[index].id
        formData.append('id_tiket', element)
      }
      formData.set('id_penjual', this.user.id)
      formData.set('id_app_user_rekening', this.selected)

      await this.$axios
        .post('/transaksi/v3/pencairan_tiket', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.$router.push('/ticket')
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
    await this.tiketTersedia()
    await this.getRekening()
    await this.getBank()
  },
}
</script>

<style>
</style>