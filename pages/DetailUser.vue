<template>
  <div>
      <app-bar />
      <div class="mt-3">
          <center>
          <!-- <v-img width="200px" height="200px" v-if="listUser.foto != ''" :src="getImageProduk(listUser.foto)"></v-img>
          <v-img width="200px" height="200px" v-else src="/img/profile.png"></v-img> -->
          <v-avatar size="200" item>
            <v-img
              src="/img/icons/people.webp"
              contain
              v-if="listUser.foto == ''"
            ></v-img>
            <v-img :src="getImageUser(listUser.foto)" alt="Avatar" v-else></v-img>
          </v-avatar>
          </center>
      </div>
      <h2 class="text-center mt-6 mb-2 mx-5">Profil Pribadi</h2>
      <v-row class="mx-1" >
        <v-col cols="6" >
            <v-text-field
                label="Id User"
                dense
                readonly
                outlined
                v-model="listUser.id_user"
            >
            </v-text-field>
        </v-col>
        <v-col cols="6" >
            <v-text-field
                label="Nama"
                dense
                readonly
                outlined
                v-model="listUser.nama"
            >
            </v-text-field>
        </v-col>
        <v-col cols="6" >
            <v-text-field
                label="Email"
                dense
                readonly
                outlined
                v-model="listUser.email"
            >
            </v-text-field>
        </v-col>
        <v-col cols="6" >
            <v-text-field
                label="No Telepon"
                dense
                readonly
                outlined
                v-model="listUser.no_telp"
            >
            </v-text-field>
        </v-col>
    </v-row>
    <div v-if="profil != undefined">
    <h2 class="text-center mt-2 mb-2 mx-5">Profil Perusahaan</h2>
    <v-row class="mx-1" >
        <v-col cols="12" >
            <v-text-field
                label="Nama Perusahaan"
                dense
                readonly
                outlined
                v-model="profil.nama"
            >
            </v-text-field>
            <v-text-field
                label="Alamat"
                dense
                readonly
                outlined
                v-model="profil.alamat"
            >
            </v-text-field>
        </v-col>
    </v-row>
    <table style="width:100%">
        <tr>
        <td class="text-center"><b>NPWP</b></td>
        <td class="text-center"><b>SIUP</b></td>
        <td class="text-center"><b>TDP</b></td>
        </tr>
        <tr>
        <td>
            <center>
                <div v-viewer="{ movable: false }">
                    <img style="width:200px" :src="getImageUser(profil.npwp)">
                </div>
                
            </center>
        </td>
        <td>
            <center>
                <div v-viewer="{ movable: false }">
                    <img style="width:200px" :src="getImageUser(profil.siup)">
                </div>
                
            </center>
        </td>
        <td>
            <center>
                <div v-viewer="{ movable: false }">
                    <img style="width:200px" :src="getImageUser(profil.tdp)">
                </div>
                
            </center>
        </td>
        </tr>
    </table>
    </div>
    <br>
      <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default {
    name: 'DetailUser',
    components: {
        AppBarLanding: () =>
        import(
            /* webpackChunkName: "app-bar" */ '~/components/AppBarLanding.vue'
        ),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
        ListIklan: () =>
        import(/* webpackChunkName: "list-iklan" */ '@/components/ListIklan.vue')
        
    },
    data: () => ({
        listUser:[],
        profil:[],
    }),
    methods:{
        async getUser(){
            var params = new URLSearchParams();

            params.append("id_user", this.$route.query.id);

            var request = {
                params: params,
                headers: { Authorization: this.DataToken }
            };
            await this.$axios
                .get('/user/v1/user/getuser', request)
                .then((response) => {
                    this.listUser = response.data.data[0]
                    console.log('dataUser', this.listUser)
                    this.getProfile()
                })
                .catch((error) => {
                    let responses = error.response.data
                    console.log(responses.api_message)
                })
        },
        async getProfile(){
            var params = new URLSearchParams();
            params.append("id_user", this.$route.query.id);
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
    },
    async created(){
        this.DataToken = this.$cookies.get("token");
        this.DataUser = this.$cookies.get("user");
        this.getUser()
    },
}
</script>

<style>

</style>