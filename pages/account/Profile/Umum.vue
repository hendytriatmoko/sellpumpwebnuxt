<template>
  <div>

    <h2>Profil Umum</h2>

    <br />

    <v-form ref="form">
      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Nama Akun</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahNama"
          >
            <div>{{ user.nama }}</div>

            <v-btn
              text
              @click="ubahNama = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="user.nama"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNama = false"
            @click:append="saveData('nama', user.nama)"
            :rules="namaRules"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
          <div class="teal--text">Nomor Handphone</div>
          <div class="d-flex align-center justify-space-between" v-if="!ubahNo">
            <div>{{ user.no_telp }}</div>

            <v-btn
              text
              @click="ubahNo = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="user.no_telp"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNo = false"
            @click:append="saveData('no_telp', user.no_telp)"
            :rules="waRules"
            v-else
          ></v-text-field>
        </v-container>
        </div>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
            <div class="teal--text">Alamat Email</div>
            <div>{{ user.email }}</div>
          </v-container>
          <v-icon
            color="#008693"
            medium
            class="mr-4 ml-1"
            v-if="user.verifikasi == 'Y'"
          >
            mdi-check-decagram
          </v-icon>
        </div>
      </v-card>
      <br />

      
    </v-form>
    <br>

    <h2>Profil Perusahaan</h2>
    <br />
    <v-form ref="form" v-if="profil != undefined">
      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Nama Perusahaan</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahPerusahaan"
          >
            <div>{{ profil.nama }}</div>

            <v-btn
              text
              @click="ubahPerusahaan = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="profil.nama"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahPerusahaan = false,getProfil()"
            @click:append="saveDataPerusahaan('nama', profil.nama)"
            :rules="namaRules"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
          <div class="teal--text">Alamat Perusahaan</div>
          <div class="d-flex align-center justify-space-between" v-if="!ubahAlamat">
            <div>{{ profil.alamat }}</div>

            <v-btn
              text
              @click="ubahAlamat = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="profil.alamat"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahAlamat = false,getProfil()"
            @click:append="saveDataPerusahaan('no_telp', profil.alamat)"
            :rules="namaRules"
            v-else
          ></v-text-field>
        </v-container>
        </div>
      </v-card>
      <br />
      <v-card rounded="lg" elevation="6" raised class="pt-3">
        <table style="width:100%">
          <tr>
            <td class="text-center"><b>NPWP</b></td>
            <td class="text-center"><b>SIUP</b></td>
            <td class="text-center"><b>TDP</b></td>
          </tr>
          <tr>
            <td><center><img :src="getImageUser(profil.npwp)"></center></td>
            <td><center><img :src="getImageUser(profil.siup)"></center></td>
            <td><center><img :src="getImageUser(profil.tdp)"></center></td>
          </tr>
          <tr>
            <td class="text-center"><v-btn color="#20929D">Ubah</v-btn></td>
            <td class="text-center"><v-btn color="#20929D">Ubah</v-btn></td>
            <td class="text-center"><v-btn color="#20929D">Ubah</v-btn></td>
          </tr>
        </table>
        <br>
      </v-card>
      <br>
      
    </v-form>
    <v-form ref="form" v-else>
      <v-card rounded="lg" elevation="6" raised>
        <div class="mx-6 pt-5">
          <div class="teal--text">Nama Perusahaan</div>

          <v-text-field
            v-model="perusahaan.nama"
            outlined
            dense
            :rules="namaRules"
          ></v-text-field>

          <div class="teal--text">Alamat Perusahaan</div>

          <v-text-field
            v-model="perusahaan.alamat"
            outlined
            dense
            :rules="alamatRules"
          ></v-text-field>
        </div>
        <div class="d-flex ml-6">
          <div
            v-for="item in list"
            :key="item.id"
            class="required ml-6 mt-6"
          >
            <image-uploader
              v-model="item.foto"
              :quality="0.7"
              :scaleRatio="0.5"
              accept="image/*"
              :preview="false"
              :className="[
                'fileinput',
                { 'fileinput--loaded': hasImage },
              ]"
              :autoRotate="true"
              outputFormat="blob"
              @input="setImage('foto' + item.id)"
              :id="'foto' + item.id"
            >
              <label :for="'foto' + item.id" slot="upload-label">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-img
                      :src="item.previewUrl"
                      contain
                      :width="$vuetify.breakpoint.xsOnly ? 130 : 200"
                      :height="$vuetify.breakpoint.xsOnly ? 130 : 200"
                      v-on="on"
                    >
                    </v-img>
                  </template>
                  <span>Pilih Foto</span>
                </v-tooltip>
              </label>
            </image-uploader>
            <br>
            <b> {{ item.jenis }}</b>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            :disabled="perusahaan.nama == '' || perusahaan.alamat == '' 
              || list[0].foto == null 
              || list[1].foto == null 
              || list[2].foto == null ? true : false"
            @click="savePerusahaan()"
          >
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import FlipCountdown from 'vue2-flip-countdown'
import VueCountdown from '@chenfengyuan/vue-countdown'
Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'profil-umum',
  data: () => ({
    namaRules: [(v) => !!v || 'Nama harus diisi!'],
    alamatRules: [(v) => !!v || 'Alamat harus diisi!'],
    deskripsiRules: [(v) => v.length >= 5 || 'Min. 5 karakter',],
    ubahNo: false,
    ubahNama: false,
    ubahPerusahaan: false,
    ubahAlamat: false,
    waRules: [
      (v) => v.length >= 10 || 'Min. 10 karakter',
      (v) =>
        /^[+]?[(]?[0-9]{3,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{1,8}$/im.test(v) ||
        'Nomor hp varus valid',
    ],
    profil: [],
    DataToken:'',
    perusahaan:[
      {
        nama:'',
        alamat:'',
      }
    ],
    list: [
      {
        id: 1,
        jenis:'NPWP',
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 1',
        required: '*',
      },
      {
        id: 2,
        jenis:'SIUP',
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 2',
        required: '*',
      },
      {
        id: 3,
        jenis:'TDP',
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 3',
        required: '',
      },
    ],
    countRules: [],
    hasImage: false,
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async saveData(param, value) {
        let formData = new FormData()

        formData.set(param, value)
        formData.set('id_user', this.user.id_user)

        await this.$axios
          .put('/user/v1/user/update', formData)
          .then((response) => {
            let { data } = response
            if (param === 'nama') {
              this.ubahNama = false
              this.setAlert({
                status: true,
                color: 'success',
                text: 'Nama berhasil diupdate',
              })
            }
            if (param === 'no_telp') {
              this.ubahNo = false
              this.setAlert({
                status: true,
                color: 'success',
                text: 'No Telepon berhasil diupdate',
              })
            }
            
            this.setAuth(data.data[0])
            this.$cookies.set('user', JSON.stringify(data.data[0]))
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
      // console.log('nama', param)
      // console.log('value', value)
    },
    async getProfil(){
      var params = new URLSearchParams();
      params.append("id_user", this.user.id_user);
      var request = {
        params: params,
        headers: { Authorization: this.DataToken }
      };
      this.$axios
        .get("/user/v1/profil/getprofil", request)
        .then(response => {
          this.profil = response.data.data[0]
          console.log('profil nih', this.profil)
        })
        .catch(error => {
          console.log(error.response.data.api_message);
          
        });
    },
    setImage(file) {
      this.hasImage = true
      this.image = file
      this.onFileChange(file)
    },
    onFileChange(foto) {
      const reader = new FileReader()
      if (foto == 'foto1') {
        reader.onload = (e) => {
          this.list[0].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[0].foto)
        this.countRules.push(this.list[0].foto)
      }
      if (foto == 'foto2') {
        reader.onload = (e) => {
          this.list[1].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[1].foto)
        this.countRules.push(this.list[1].foto)
      }
      if (foto == 'foto3') {
        reader.onload = (e) => {
          this.list[2].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[2].foto)
        this.countRules.push(this.list[2].foto)
      }
    },
    async savePerusahaan(){
      let formData = new FormData()
      formData.set('id_user', this.user.id_user)
      formData.set('nama', this.perusahaan.nama)
      formData.set('alamat', this.perusahaan.alamat)
      formData.set('npwp', this.list[0].foto)
      formData.set('siup', this.list[1].foto)
      formData.set('tdp', this.list[2].foto)

      await this.$axios
        .post('/user/v1/profil/create', formData, {
          headers: { Authorization: this.DataToken }
        })
        .then((response) => {
          let data = response.data.data[0]
          console.log(data)
          this.getProfil()
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
  },
  async created() {
    console.log('user', this.user)
    this.DataToken = this.$cookies.get("token");
    this.getProfil()
  },
  async mounted() {
    
  },
}
</script>

<style>
#riwayat{
  height: 200px;
  overflow-y: scroll;
}
#foto{
  display: none;
}
#foto1 {
  display: none;
}
#foto2 {
  display: none;
}
#foto3 {
  display: none;
}
</style>