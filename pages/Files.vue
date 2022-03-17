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
        <h2 class="text-center">FILES PRODUK</h2>
        <v-divider></v-divider>
        <br>
        <v-card class="mx-6">
            <v-row v-if="user.status != 'penjual'">
                <v-col cols="12" sm="12">
                    <v-text-field
                        class="mx-6"
                        solo
                        label="Cari File"
                        v-model="cariFile"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12" sm="8">
                    <v-text-field
                        class="mx-6"
                        solo
                        label="Cari File"
                        v-model="cariFile"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-btn
                        class="white--text mx-6"
                        color="#20929d"
                        large
                        @click="dialogFile = true"
                    >
                        <v-icon>mdi-plus </v-icon> Tambah File
                    </v-btn>
                </v-col>
            </v-row>
            <v-data-table
                :headers="headers"
                :search="cariFile"
                :items="files"
                :items-per-page="15"
                class="elevation-1 mx-6"
            >
                <template v-slot:[`item.no`]="{ index }">
                    <div>{{ index+1 }}</div>
                </template>
                <template v-slot:[`item.aksi`]="{ item }">
                    <div class="d-flex">
                        <v-btn
                            @click="cobaDownload(item.file,item.nama_file)"
                            color="#20929d"
                            small
                            outlined
                        >
                            <v-icon>mdi-download </v-icon> Download</v-btn>
                        <v-btn
                            @click="deleteFile(item)"
                            class="ml-3"
                            color="#EB5757"
                            small
                            outlined
                        >
                            <v-icon>mdi-delete </v-icon> Hapus</v-btn>
                    </div>
                </template>
            </v-data-table>
            <br>
        </v-card>
        <br>
        <Footer/>
        <v-dialog v-model="dialogFile" width="500px">
            <v-card>
                <v-toolbar flat dense color="#20929D">
                    <v-toolbar-title><b>Tambah File</b></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogFile = false,namaFile = '',dataFile = null">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <br>
                <!-- <v-file-input
                    class="mx-3"
                    accept="image/*"
                    label="File input"
                    v-model="dataFile"
                    accept=".xlsx"
                    outlined
                    dense
                ></v-file-input> -->
                <v-file-input
                  show-size
                  prepend-icon=""
                  prepend-inner-icon="mdi-file-pdf-box"
                  v-model="dataFile"
                  accept=".pdf"
                  outlined
                  class="mx-3"
                  dense
                  label="Upload File Pdf"
                ></v-file-input>
                <v-text-field
                    v-model="namaFile"
                    class="mx-3"
                    dense
                    label="Nama File"
                    @keyup.enter="getProduk()"
                    outlined
                ></v-text-field>
                <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="dialogFile = false,namaFile = '',dataFile = null"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="#20929D"
                        class="white--text"
                        :disabled="namaFile == '' || dataFile == null"
                        @click="tambahFile()"
                    >
                        Tambah File
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'katalog',
    components: {
    AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    },
    data: () => ({
        cariFile:'',
        namaFile:'',
        dataFile:null,
        headers: [
            {
                text: 'No',
                value: 'no',
            },
            { text: 'Nama File', value: 'nama_file' },
            { text: 'Aksi', value: 'aksi' },
        ],
        files:[],
        dialogFile:false,
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
        async getFile(){
          var params = new URLSearchParams();

          var request = {
            params: params,
          };
          await this.$axios
            .get('/produk/v1/file/getfile', request)
            .then((response) => {
                this.files = response.data.data
                console.log('file', this.files)
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
        },
        async tambahFile(){
            let formData = new FormData()

            formData.append('nama_file', this.namaFile)
            formData.append('file', this.dataFile)

            await this.$axios
                .post('/produk/v1/file/create', formData, {
                    headers: { Authorization: this.DataToken }
                })
                .then((response) => {
                    console.log(response)
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'File berhasil ditambahkan',
                    })
                    this.getFile()
                    this.dialogFile = false
                    this.namaFile = ''
                    this.dataFile = null
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
        async downloadFile(urls){
            await this.$axios
                .get("produk/photo"+urls, {
                    headers: { 
                        Authorization: this.DataToken ,
                        'Access-Control-Allow-Origin': '*'
                    },
                })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
                    console.log('ini file',urls)
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download',urls)
                    document.body.appendChild(link)
                    // link.click()
                    // this.download = true
                    // setTimeout(() => {
                    //     this.download = false
                    // }, 2000)
                    // console.log(response)
                    })
                .catch(error => {
                    let responses = error.response.data
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: responses.api_message,
                    })
                });
        },
        async cobaDownload(urls,nama){
            const response = await this.$axios.get("https://api.sellpump.xyz/sellpump/api/produk/photo"+urls, { responseType: "blob" });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = nama+'.pdf';
            link.click();
            URL.revokeObjectURL(link.href);
        },
        async deleteFile(item){
            let formData = new FormData()

            formData.append('id_file', item.id_file)

            await this.$axios
                .put('/produk/v1/file/delete', formData, {
                    headers: { Authorization: this.DataToken }
                })
                .then((response) => {
                    console.log(response)
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'File berhasil dihapus',
                    })
                    this.getFile()
                })
                .catch((error) => {
                    let responses = error.response.data
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: responses.api_message,
                    })
                })
        }
    },
    async created(){
        this.DataToken = this.$cookies.get("token");
        await this.getFile()
        console.log('user file', this.user)
    }
}
</script>

<style>

</style>