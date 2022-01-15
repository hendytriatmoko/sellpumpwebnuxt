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

    <!-- dua satu iklan baris iklankan secara cepat -->
    <div >
      <div>
        <div id="duasatu" class="mt-2 mx-4">
          <v-row>
              <v-col cols="12" sm="8">
                  <v-card
                        rounded="lg"
                        style="margin: 0 auto !important"
                  >
                    <v-toolbar dense flat>
                        <v-card-title
                        >
                            <b>Pengaturan Kategori </b>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-actions>
                        <v-btn small color="primary" @click="addKategori = true" dark>
                            <v-icon>mdi-plus</v-icon>
                            Kategori
                        </v-btn>
                        <v-btn small color="primary" @click="addSub = true" dark>
                            <v-icon>mdi-plus</v-icon>
                            Sub
                        </v-btn>
                        <v-btn small color="primary" @click="editKategori = true" dark>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        </v-card-actions>
                        
                    </v-toolbar>
                    <v-treeview
                        v-if="viewKategori.length > 0"
                        dense
                        shaped
                        hoverable
                        activatable
                        :items="viewKategori"
                        open-all
                        style="cursor:pointer"
                    >
                        <template v-slot:prepend="{ item, open }">
                        <v-icon
                            color="primary"
                            v-if="item.children"
                        >
                            {{ open ? "mdi-folder-open" : "mdi-folder" }}
                        </v-icon>
                        <v-icon v-else></v-icon>
                        </template>
                        <template v-slot:label="{ item }">
                        <span class="subtitle-2" >
                            <b> {{ item.name }}</b>
                        </span>
                        </template>
                    </v-treeview>
                  </v-card>
              </v-col>
              <v-col cols="12" sm="4">
                  <v-card
                        rounded="lg"
                        style="margin: 0 auto !important"
                  >
                    <v-toolbar dense flat>
                        <v-card-title
                        >
                            <b>Pengaturan Merk </b>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-actions
                        ><v-btn color="primary" @click="addMerk=true" dark>
                            Tambah
                        </v-btn>
                        </v-card-actions>
                    </v-toolbar>
                    <v-list dense>
                        <template v-for="(item, index) in listMerk">
                        <v-list-item :key="index">
                            <v-list-item-avatar tile>
                            <v-img :src="getImageMerk(item.gambar_merk)"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    <b>{{ item.nama_merk }}</b>
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action class="px-0 mx-0">
                                <v-icon
                                    class="px-0 mx-0"
                                    small
                                    color="blue"
                                    @click="editDataMerk(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                            </v-list-item-action>
                            <v-list-item-action class="px-0 mx-0">
                                <v-icon
                                    class="px-0 mx-0"
                                    small
                                    color="red"
                                    @click="dataHapusMerk(item)"
                                >
                                    mdi-delete
                                </v-icon>
                            </v-list-item-action>
                        </v-list-item>
                        </template>
                    </v-list>
                  </v-card>
              </v-col>
          </v-row>
          
        </div>
      </div>
    </div>
    <br>
    <Footer />
    <v-dialog max-width="500px" v-model="addMerk">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Tambah Merk</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addMerk = false, xMerk()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <center>
        <div
            v-for="item in list"
            :key="item.id"
            class="required ml-3"
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
                        :width="$vuetify.breakpoint.xsOnly ? 130 : 100"
                        :height="$vuetify.breakpoint.xsOnly ? 130 : 100"
                        v-on="on"
                        style="position:relative"
                    >
                    </v-img>
                    </template>
                    <span>Pilih Foto</span>
                </v-tooltip>
                </label>
            </image-uploader>
            </div>
        </center>
        <br>
        <v-text-field
          v-model="namaMerk"
          class="mx-4"
          dense
          label="Nama Merk"
          prepend-inner-icon="mdi-drama-masks"
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            @click="postMerk()"
          >
            Tambah
          </v-btn>
          <v-btn @click="addMerk=false,xMerk()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="editMerk">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Update Merk</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editMerk = false, xMerk()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <center>
        <div
            v-for="item in list"
            :key="item.id"
            class="required ml-3"
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
                        :src="item.previewUrl.includes('/merk/')
                                ? getImageMerk(item.previewUrl)
                                : item.previewUrl"
                        contain
                        :width="$vuetify.breakpoint.xsOnly ? 130 : 100"
                        :height="$vuetify.breakpoint.xsOnly ? 130 : 100"
                        v-on="on"
                        style="position:relative"
                    >
                    </v-img>
                    </template>
                    <span>Pilih Foto</span>
                </v-tooltip>
                </label>
            </image-uploader>
            </div>
        </center>
        <br>
        <v-text-field
          v-model="namaMerk"
          class="mx-4"
          dense
          label="Nama Merk"
          prepend-inner-icon="mdi-drama-masks"
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            @click="updateMerk()"
          >
            Tambah
          </v-btn>
          <v-btn @click="editMerk=false,xMerk()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="hapusMerk" width="300">
      <v-card class="rounded-lg">
        <v-toolbar dense flat dark color="primary">
          <v-toolbar-title>
            <b>Hapus Merk</b>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="hapusMerk = false,xMerk()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <br />

        <v-card-text>
          Apakah Anda Yakin Ingin Menghapus Merk {{ namaMerk }} ?
        </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-capitalize"
            color="secondary"
            @click="hapusMerk = false,xMerk()"
            text
          >
            <b>Cancel</b>
          </v-btn>
          <v-btn class="text-capitalize" @click="deleteMerk()" color="error" text>
            <b>Hapus</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="addKategori">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Tambah Kategori</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addKategori = false, xKategori()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-text-field
          v-model="namaKategori"
          class="mx-4"
          dense
          label="Nama Kategori"
          prepend-inner-icon="mdi-package-up"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="namaSubkategori"
          class="mx-4"
          dense
          label="Nama Sub Kategori"
          prepend-inner-icon="mdi-package-down"
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            @click="postKategori()"
            :disabled="namaKategori == '' || namaSubkategori == '' ? true : false"
          >
            Tambah
          </v-btn>
          <v-btn @click="addKategori=false, xKategori()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="addSub">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Tambah Sub Kategori</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addSub = false, xKategori()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-autocomplete
            v-model="namaKategori"
            :items="listKategori"
            outlined
            item-text="kategori"
            item-value="kategori"
            dense
            class="mx-6"
            label="Nama Kategori"
        ></v-autocomplete>
        <v-text-field
          v-model="namaSubkategori"
          class="mx-6"
          dense
          label="Nama Sub Kategori"
          prepend-inner-icon="mdi-package-down"
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            @click="postKategori()"
            :disabled="namaKategori == '' || namaSubkategori == '' ? true : false"
          >
            Tambah
          </v-btn>
          <v-btn @click="addSub=false, xKategori()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="editKategori">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Edit Kategori</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editKategori = false, xKategori()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-autocomplete
            v-model="namaKategori"
            :items="listKategori"
            outlined
            item-text="kategori"
            item-value="kategori"
            @change="editDataKategori()"
            dense
            class="mx-6"
            label="Nama Kategori"
        ></v-autocomplete>
        <v-autocomplete
            v-model="namaSubkategori"
            :items="listSubkategori"
            outlined
            v-if="namaKategori != ''"
            item-text="sub_kategori"
            item-value="sub_kategori"
            dense
            @change="editDataSubKategori()"
            class="mx-6"
            label="Nama Sub Kategori"
        ></v-autocomplete>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            :disabled="idKategori == '' ? true : false" 
            small color="primary" 
            @click="editKategori = false,updateKategori = true" dark>
            <v-icon>mdi-pencil</v-icon>
            Update
          </v-btn>
          <v-btn 
            :disabled="idKategori == '' ? true : false" 
            small x-small color="red" 
            @click="editKategori = false,hapusKategori = true" dark>
            <v-icon>mdi-delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="updateKategori">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Update Kategori</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="updateKategori = false, editKategori=true">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-text-field
          v-model="namaKategori"
          class="mx-4"
          dense
          label="Nama Kategori"
          prepend-inner-icon="mdi-package-up"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="namaSubkategori"
          class="mx-4"
          dense
          label="Nama Sub Kategori"
          prepend-inner-icon="mdi-package-down"
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            @click="updateKategoriF()"
          >
            Update
          </v-btn>
          <v-btn @click="updateKategori = false, editKategori=true">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="hapusKategori" width="300">
      <v-card class="rounded-lg">
        <v-toolbar dense flat dark color="primary">
          <v-toolbar-title>
            <b>Hapus Kategori</b>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="hapusKategori = false,editKategori = true">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <br />

        <v-card-text>
          Apakah Anda Yakin Ingin Menghapus Kategori <b> {{ namaKategori }} </b>, sub kategori <b> {{ namaSubkategori }} </b> ?
        </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-capitalize"
            color="secondary"
            @click="hapusKategori = false,editKategori = true"
            text
          >
            <b>Cancel</b>
          </v-btn>
          <v-btn class="text-capitalize" @click="deleteKategori()" color="error" text>
            <b>Hapus</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
import { VMoney } from 'v-money'
Vue.use(VueGeolocation)
export default {
  name: 'add',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  directives: { money: VMoney, mask },
  data: () => ({
    list: [
      {
        id: 1,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 1',
        required: '*',
      },
    ],
    countRules: [],
    hasImage: false,
    listKategori:[],
    viewKategori: [],
    listMerk:[],
    addMerk:false,
    namaMerk:'',
    gambarMerk:null,
    addKategori:false,
    addSub:false,
    namaKategori: '',
    namaSubkategori: '',
    editMerk:false,
    idMerk:'',
    hapusMerk: false,
    editKategori: false,
    idKategori:'',
    listSubkategori:[],
    updateKategori: false,
    hapusKategori: false,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    async getKategori(){
      await this.$axios
        .get('/kategori/v1/getkategori')
        .then((response) => {
          this.listKategori = response.data.data
          console.log('kategori', this.listKategori)
          this.aturKategori()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async aturKategori(){
        this.viewKategori = []
        let distincKategori = Array.from(new Set(this.listKategori.map(s => s.kategori)))
            .map(kategori => {
                return {
                    name: kategori,
                    children: []
                }
            })
        for (let i = 0; i < distincKategori.length; i++) {
            for (let j = 0; j < this.listKategori.length; j++) {
                if (this.listKategori[j].kategori == distincKategori[i].name) {
                    let ind = j
                    distincKategori[i].children.push({
                        id: j,
                        name:this.listKategori[ind].sub_kategori
                    })
                }
            }
        }
        this.viewKategori = distincKategori
        console.log('view kategori', this.viewKategori)

    },
    async getMerk(){
      await this.$axios
        .get('/merk/v1/getmerk')
        .then((response) => {
          this.listMerk = response.data.data
          console.log('merk', this.listMerk)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
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
    },
    async postMerk(){
      let formData = new FormData()

      formData.append('nama_merk', this.namaMerk)
      formData.append('gambar_merk', this.list[0].foto)

      await this.$axios
        .post('/merk/v1/create', formData)
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Merk berhasil ditambahkan',
            })
            this.getMerk()
            this.addMerk = false
            this.xMerk()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async xMerk(){
        this.list= [
            {
                id: 1,
                foto: null,
                previewUrl: '/img/icons/thumbnail/Photo.png',
                label: 'Foto 1',
                required: '*',
            },
        ]
        this.namaMerk=''
        this.idMerk =''
    },
    async xKategori(){
        this.namaKategori = ''
        this.namaSubkategori = ''
        this.idKategori = ''
    },
    async postKategori(){
      let formData = new FormData()

      formData.append('kategori', this.namaKategori)
      formData.append('sub_kategori', this.namaSubkategori)

      await this.$axios
        .post('/kategori/v1/create', formData)
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Kategori berhasil ditambahkan',
            })
            this.getKategori()
            this.addKategori = false
            this.addSub = false
            this.xKategori()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async editDataMerk(item){
        this.list= [
            {
                id: 1,
                foto: null,
                previewUrl: item.gambar_merk,
                label: 'Foto 1',
                required: '*',
            },
        ]
        this.editMerk = true
        this.namaMerk = item.nama_merk
        this.idMerk = item.id_merk
        
    },
    async updateMerk(){
      let formData = new FormData()

      formData.append('nama_merk', this.namaMerk)
      formData.append('id_merk', this.idMerk)
      if (this.list[0].foto != null) {
          formData.append('gambar_merk', this.list[0].foto)
      }

      await this.$axios
        .put('/merk/v1/update', formData)
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Merk berhasil diupdate',
            })
            this.getMerk()
            this.editMerk = false
            this.xMerk()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async dataHapusMerk(item){
        this.namaMerk = item.nama_merk
        this.idMerk = item.id_merk
        this.hapusMerk = true
    },
    async deleteMerk(){
      let id = parseInt(this.idMerk)
      let formData = new FormData()
      formData.append('id_merk', this.idMerk)

      await this.$axios
        .delete('/merk/v1/delete', formData)
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Merk berhasil dihapus',
            })
            this.getMerk()
            this.hapusMerk = false
            this.xMerk()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
        // let id = parseInt(this.idMerk)
        // console.log('id merk', typeof id)
    },
    async editDataKategori(){
        this.listSubkategori = []
        console.log('nama kategori', this.namaKategori)
        for (let i = 0; i < this.listKategori.length; i++) {
            if (this.listKategori[i].kategori == this.namaKategori) {
                this.listSubkategori.push({
                    id:this.listKategori[i].id_kategori,
                    sub_kategori:this.listKategori[i].sub_kategori
                })
            }
        }
    },
    async editDataSubKategori(){
        for (let i = 0; i < this.listSubkategori.length; i++) {
            if (this.listSubkategori[i].sub_kategori == this.namaSubkategori) {
                this.idKategori = this.listSubkategori[i].id
            }
        }
        console.log('id', this.idKategori)
    },
    async updateKategoriF(){
      let formData = new FormData()

      formData.append('kategori', this.namaKategori)
      formData.append('sub_kategori', this.namaSubkategori)
      formData.append('id_kategori', this.idKategori)

      await this.$axios
        .put('/kategori/v1/update', formData)
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Kategori berhasil diupdate',
            })
            this.getKategori()
            this.updateKategori = false
            this.xKategori()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async deleteKategori(){
      let formData = new FormData()
      formData.append('id_kategori', this.idKategori)

      await this.$axios
        .delete('/kategori/v1/delete', formData)
        .then((response) => {
            console.log(response)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'Kategori berhasil dihapus',
            })
            this.getKategori()
            this.hapusKategori = false
            this.xKategori()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
        // let id = parseInt(this.idMerk)
        // console.log('id merk', typeof id)
    },
    
  },
  async created() {
    this.getKategori()
    this.getMerk()
  },
}
</script>

<style>
.pilih {
  background: rgba(32, 146, 157, 0.1);
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
#foto4 {
  display: none;
}
#foto5 {
  display: none;
}
.lingluar {
  width: 20px;
  height: 20px;
  background: #20929d;
  border-radius: 50%;
  border: 2px solid white;
}
.lingdalam {
  width: 10px;
  height: 10px;
  margin-left: 2.6px;
  margin-top: 2.6px;
  background: white ;
  border: 1px solid white;
  border-radius: 50%;
}
.sdank {
  color: #20929d;
}
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