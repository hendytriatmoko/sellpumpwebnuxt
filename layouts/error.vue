<template>
  <div>
    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        
      </v-btn>
    </v-app-bar>

    <div v-if="$vuetify.breakpoint.xs">
        <v-col cols="12" v-if="error.statusCode == 404">
        <v-card flat class="pa-4" rounded="xl">
      <v-list-item>
        <v-img src="/img/icons/pnf.webp" max-height="100" contain></v-img>
      </v-list-item>
      <v-list-item dense>
        <center>
          <v-list-item-content>
            <h1 class="font-weight-bold text--secondary">
              Oops, Halaman tidak ditemukan
            </h1>
            <v-card-actions>
              <span class="subheading text--secondary"
                >Kami tidak dapat menemukan apa yang kamu cari. Silahkan kembali
                ke halaman utama</span
              >
            </v-card-actions>
            <a href="https://simotor.id">
              <v-btn rounded color="#20929D" dark>
                Kembali ke halaman utama
              </v-btn>
            </a>
          </v-list-item-content>
        </center>
      </v-list-item>
        </v-card>
        </v-col>
    </div>
    <div v-else>
      <app-bar />
      <v-col cols="12" v-if="error.statusCode == 404">
        <v-card flat class="pa-4" rounded="xl">
          <v-list-item dense>
            <v-img src="/img/icons/pnf.webp" max-height="200" contain></v-img>
            <v-list-item-content>
              <h1 class="font-weight-bold text--secondary mt-4 my-2 mx-2">
                Oops, Halaman tidak ditemukan
              </h1>
              <v-card-actions class="mt-2 mx-2">
                <span class="subheading text--secondary"
                  >Kami tidak dapat menemukan apa yang kamu cari. Silahkan
                  kembali ke halaman utama</span
                >
              </v-card-actions>
              <a href="https://simotor.id">
                <v-btn rounded class="mt-4 ml-4" color="#20929D" dark>
                  Kembali ke halaman utama
                </v-btn>
              </a>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </div>

      <div v-if="$vuetify.breakpoint.xs">
         <v-col cols="12" v-if="error.statusCode == 400">
        <v-card flat class="pa-4" rounded="xl">
      <v-list-item>
        <v-img src="/img/icons/server-down.png" max-height="100" contain></v-img>
      </v-list-item>
      <v-list-item dense>
        <center>
          <v-list-item-content>
            <h1 class="font-weight-bold text--secondary">
              Oops, Server Bermasalah
            </h1>
            <v-card-actions>
              <span class="subheading text--secondary"
                >Server Sedang Bermasalah. Coba lagi nanti</span
              >
            </v-card-actions>
            <a href="https://simotor.id">
              <v-btn rounded color="#20929D" dark>
                Kembali ke halaman utama
              </v-btn>
            </a>
          </v-list-item-content>
        </center>
      </v-list-item>
        </v-card>
         </v-col>
    </div>
    <div v-else>
      <app-bar />
      <v-col cols="12" v-if="error.statusCode == 400">
        <v-card flat class="pa-4" rounded="xl">
          <v-list-item dense>
            <v-img src="/img/icons/server-down.webp" max-height="200" contain></v-img>
            <v-list-item-content>
              <h1 class="font-weight-bold text--secondary ">
                Oops, Server Bermasalah
              </h1>
              <v-card-actions class="mt-2 mx-2">
                <span class="subheading text--secondary"
                  >Server Sedang Bermasalah. Coba lagi nanti</span
                >
              </v-card-actions>
              <a href="https://simotor.id">
                <v-btn rounded class="mt-4 ml-4" color="#20929D" dark>
                  Kembali ke halaman utama
                </v-btn>
              </a>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </div>


    </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // pageNotFound: 'Oops, Halaman tidak ditemukan',
      // otherError:
      //   'Kami tidak dapat menemukan apa yang kamu cari. Silahkan kembali ke halaman utama',
    }
  },
  // head() {
  //   const title =
  //     this.error.statusCode === 404 ? this.pageNotFound : this.otherError
  //   return {
  //     title,
  //   }
  // },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
