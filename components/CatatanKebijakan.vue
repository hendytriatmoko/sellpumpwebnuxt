<template>
  <v-card rounded="lg" elevation="6" raised>
    <v-container>
      <v-row align="center">
        <v-col cols="6">
          <div class="teal--text">Catatan</div>
          <div>Catatan penjualan, kebijakan penjual</div>
        </v-col>

        <v-col cols="6" align="right">
          <v-btn
            color="teal"
            dark
            small
            @click="openDialog('Tambah Catatan')"
            class="mb-1"
          >
            <v-icon left>mdi-plus</v-icon>
            Tambah Catatan
          </v-btn>

          <v-btn
            color="teal"
            dark
            small
            @click="openDialog('Tambah Kebijakan')"
            v-if="kebijakan.length == 0"
          >
            <v-icon left>mdi-plus</v-icon>
            Tambah Kebijakan
          </v-btn>
        </v-col>
      </v-row>

      <br />

      <v-expansion-panels focusable>
        <v-expansion-panel v-for="item in catatan" :key="item.id">
          <v-expansion-panel-header>
            <div class="d-flex align-center">
              <b class="mr-auto">{{ item.judul }}</b>

              <div class="mx-2">
                <v-btn x-small outlined @click="edit(item)">
                  <v-icon left>mdi-pencil</v-icon> Ubah
                </v-btn>
              </div>

              <div class="mx-2">
                <v-btn x-small outlined @click="deleteCatatan(item)">
                  <v-icon left>mdi-delete</v-icon> Hapus
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div v-html="item.deskripsi"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <br />

      <v-expansion-panels focusable v-if="kebijakan.length != 0">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div class="d-flex align-center">
              <b class="mr-auto">{{ kebijakan.judul }}</b>

              <div class="mx-2">
                <v-btn x-small outlined @click="edit(kebijakan)">
                  <v-icon left>mdi-pencil</v-icon> Ubah
                </v-btn>
              </div>

              <div class="mx-2">
                <v-btn x-small outlined @click="deleteCatatan(kebijakan)">
                  <v-icon left>mdi-delete</v-icon> Hapus
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div v-html="kebijakan.deskripsi"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title
            class="headline grey lighten-2 d-flex align-center justify-space-between"
          >
            <div>{{ title }}</div>

            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <h3 class="mt-2">Judul Catatan</h3>

            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="judul"
                placeholder="Masukkan Judul"
                outlined
                dense
                :readonly="readonly"
              ></v-text-field>

              <h3>Isi Catatan</h3>

  
                <vue-editor
                  v-model="content"
                  :editorToolbar="customToolbar"
                ></vue-editor>
       
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="white--text"
              :disabled="judul == '' || content == '' ? true : false"
              @click="simpan"
            >
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

let VueEditor

if (process.client) {
  VueEditor = require('vue2-editor').VueEditor
}

export default {
  name: 'catatan-kebijakan',
  props: ['user'],
  components: { VueEditor },
  data: () => ({
    valid: true,
    dialog: false,
    customToolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
    ],
    title: '',
    catatan: [],
    judul: '',
    content: '',
    kebijakan: [],
    readonly: false,
    type: 0,
    jenis: 'post',
    mounted: false,
  }),
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getCatatan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.user.id,
            type_catatan: 2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          if (data.count > 0) {
            this.catatan = data.data
          } else {
            this.catatan = []
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getKebijakan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.user.id,
            type_catatan: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          if (data.count > 0) {
            this.kebijakan = data.data[0]
          } else {
            this.kebijakan = []
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    openDialog(title) {
      this.dialog = true
      this.title = title
      this.type = 2
      this.judul = ''
      this.content = ''
      if (title == 'Tambah Kebijakan') {
        this.judul = 'Kebijakan'
        this.readonly = true
        this.type = 1
      }
    },
    simpan() {
      if (this.jenis == 'post') {
        this.postCatatan()
      } else {
        this.updateCatatan()
      }
    },
    async postCatatan() {
      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('judul', this.judul)
      formData.set('deskripsi', this.content)
      formData.set('type_catatan', this.type)

      await this.$axios
        .post('/user/v3/user/catatan_penjual', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.dialog = false
          this.judul = ''
          this.content = ''
          this.getCatatan()
          this.getKebijakan()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

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
    edit(item) {
      this.selected = item
      this.dialog = true
      this.jenis = 'edit'
      this.title = item.type_catatan == 1 ? 'Edit Catatan' : 'Edit Kebijakan'
      if (this.title == 'Edit Kebijakan') {
        this.type = 1
      } else {
        this.type = 2
      }
      this.judul = item.judul
      this.content = item.deskripsi
    },
    async updateCatatan() {
      let formData = new FormData()

      formData.set('id', this.selected.id)
      formData.set('judul', this.judul)
      formData.set('deskripsi', this.content)

      await this.$axios
        .put('/user/v3/user/catatan_penjual', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.dialog = false
          this.judul = ''
          this.content = ''
          this.getCatatan()
          this.getKebijakan()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

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
    async deleteCatatan(item) {
      var r = confirm('Yakin akan dihapus?')
      if (r == true) {
        await this.$axios
          .delete('/user/v3/user/catatan_penjual', {
            headers: { Authorization: 'Bearer ' + this.user.token },
            data: {
              id: item.id,
            },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.getCatatan()
            this.getKebijakan()
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })

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
      }
    },
  },
  async created() {
    await this.getCatatan()
    await this.getKebijakan()
  },
  mounted() {
    this.mounted = true
  },
}
</script>

<style>
</style>