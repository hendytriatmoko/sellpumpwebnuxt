<template>
  <div>
    <v-divider></v-divider>

    <div class="d-flex justify-space-between grey lighten-3 pa-2">
      <div v-if="selected != null">
        Penjual:
        <a :href="'/list-tb/' + item.order.nama_penjual">
          {{ item.order.nama_penjual }}
        </a>
      </div>

      <div v-else>
        Nomor Order:
        <NuxtLink :to="'/invoice/unit/' + item.order.id">
          {{ item.order.id }}
        </NuxtLink>
      </div>

      <div>
        Pesanan selesai:
        {{
          moment
            .utc(item.review.dates)
            .add(utc, 'h')
            .format('DD MMM YYYY, HH:mm')
        }}
        {{ timezone }}
      </div>
    </div>

    <v-divider></v-divider>

    <v-row dense v-if="selected == null">
      <v-col cols="12" sm="6">
        <v-list>
          <v-list-item
            @click="go(item.order.id_penjual, item.order.nama_penjual)"
          >
            <v-list-item-avatar tile size="70">
              <v-img
                src="/img/profile.png"
                contain
                v-if="item.order.photo_penjual == null"
              ></v-img>

              <v-img
                :src="getImage(item.order.photo_penjual)"
                alt="Avatar"
                v-else
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.order.nama_penjual }}
              </v-list-item-title>

              <v-list-item-subtitle class="d-inline-flex">
                <div class="red pa-1 white--text">Penjual</div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="ma-2 text-center" v-if="point == 0">
          <div>
            Berikan penilaian pada:
            <b> {{ item.review.app_user_name_penjual }} </b>
          </div>

          <v-item-group v-model="point" class="d-flex justify-center">
            <div class="flex-column" v-for="item in points" :key="item.id">
              <v-btn icon class="mx-3" v-on:click="setPoint(item)">
                <v-img :src="item.img" contain width="30" height="30"></v-img>
              </v-btn>

              <div class="text-caption">{{ item.text }}</div>
            </div>
          </v-item-group>
        </div>

        <div class="ma-2 text-center" v-else>
          <div>Penilaian Anda</div>

          <div v-if="point == -1">
            <img :src="points[0].img" width="30" height="30" />

            <div class="text-caption">{{ points[0].text }}</div>
          </div>

          <div v-if="point == 1">
            <img :src="points[1].img" width="30" height="30" />

            <div class="text-caption">{{ points[1].text }}</div>
          </div>

          <div v-if="point == 2">
            <img :src="points[2].img" width="30" height="30" />

            <div class="text-caption">{{ points[2].text }}</div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex">
        <v-divider vertical></v-divider>

        <v-list subheader>
          <v-subheader class="font-weight-bold">Daftar Produk</v-subheader>

          <v-list-item>
            <v-list-item-avatar tile size="100">
              <v-img :src="getImage(item.order.iklan.photo)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a @click="go2(item.order.id_iklan, item.order.iklan.judul)">
                  {{ item.order.iklan.judul }}
                </a>
              </v-list-item-title>

              <v-list-item-subtitle v-if="rating == 0">
                Berikan Ulasan
              </v-list-item-subtitle>

              <v-list-item-subtitle class="d-inline-flex" v-else>
                <v-icon color="yellow" v-for="n in rating" :key="n">
                  mdi-star
                </v-icon>
              </v-list-item-subtitle>

              <v-list-item-subtitle class="d-flex d-sm-none" v-if="rating == 0">
                <v-btn
                  color="teal"
                  class="white--text"
                  :disabled="point == 0 ? true : false"
                  small
                  @click="ulas = false"
                >
                  Tulis Ulasan
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-none d-sm-flex" v-if="rating == 0">
              <v-btn
                color="teal"
                class="white--text"
                :disabled="point == 0 ? true : false"
                small
                @click="tulisReview(item.review)"
              >
                Tulis Ulasan
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row dense no-gutters v-else>
      <v-col cols="12" sm="7">
        <v-list three-line>
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="getImage(item.order.iklan.photo)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <NuxtLink :to="'/iklan/' + item.order.id_iklan">
                  {{ item.order.iklan.judul }}
                </NuxtLink>
              </v-list-item-title>

              <v-list-item-subtitle>
                Bagaimana kualitas produk ini secara keseluruhan?
              </v-list-item-subtitle>

              <div class="d-flex align-center flex-wrap">
                <v-rating v-model="rating" dense color="yellow"></v-rating>

                <div class="text-caption">
                  <div v-if="rating == 0">
                    Bantu pembeli lain dengan bagikan pengalamanmu
                  </div>
                  <div v-if="rating == 1">Tidak Memuaskan</div>
                  <div v-if="rating == 2">Kurang Memuaskan</div>
                  <div v-if="rating == 3">Cukup Memuaskan</div>
                  <div v-if="rating == 4">Memuaskan</div>
                  <div v-if="rating == 5">Sangat Memuaskan</div>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div class="d-flex flex-wrap justify-space-around text-center">
          <div v-for="item in list" :key="item.id">
            <image-uploader
              v-model="item.foto"
              :quality="0.7"
              :scaleRatio="0.5"
              accept="image/*"
              :preview="false"
              :className="['fileinput', { 'fileinput--loaded': hasImage }]"
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
                      :width="100"
                      :height="100"
                      v-on="on"
                    ></v-img>
                  </template>
                  <span>Pilih Foto</span>
                </v-tooltip>
              </label>
            </image-uploader>
          </div>

          <v-list-item-subtitle>
            Silahkan bagikan foto produk Anda
          </v-list-item-subtitle>
        </div>
      </v-col>

      <v-col cols="12" sm="5">
        <v-card flat class="pa-2">
          <div>Berikan ulasan untuk produk ini</div>

          <v-textarea
            v-model="deskripsiUlasan"
            placeholder="Tulis deskripsi Anda mengenai produk ini..."
            outlined
            dense
            rows="3"
            :rules="ulasanRules"
            no-resize
          ></v-textarea>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="teal" outlined dark @click="selected = null">
              Kembali
            </v-btn>

            <v-btn
              color="teal"
              class="white--text"
              :disabled="rating == 0 || deskripsiUlasan == '' ? true : false"
              @click="sendReview"
            >
              Kirim
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list-review',
  props: ['item', 'user'],
  data: () => ({
    ulas: true,
    selected: null,
    review: [],
    point: '',
    points: [
      {
        id: 1,
        img: '/img/icons/emoji_tidakpuas.png',
        color: 'red',
        text: 'Tidak Puas',
        point: -1,
      },
      {
        id: 2,
        img: '/img/icons/emoji_netral.png',
        color: 'orange',
        text: 'Netral',
        point: 1,
      },
      {
        id: 3,
        img: '/img/icons/emoji_puas.png',
        color: 'teal',
        text: 'Puas',
        point: 2,
      },
    ],
    rating: 0,
    deskripsiUlasan: '',
    ulasanRules: [
      (v) => !!v || 'Kolom ulasan harus diisi',
      (v) => v.length >= 10 || 'Min 10 karakter',
      (v) => v.length <= 150 || 'Max 150 karakter',
    ],
    list: [
      {
        id: 1,
        foto: null,
        previewUrl: '/img/icons/camera.png',
        label: 'Foto 1',
      },
      {
        id: 2,
        foto: null,
        previewUrl: '/img/icons/camera.png',
        label: 'Foto 2',
      },
      {
        id: 3,
        foto: null,
        previewUrl: '/img/icons/camera.png',
        label: 'Foto 3',
      },
      {
        id: 4,
        foto: null,
        previewUrl: '/img/icons/camera.png',
        label: 'Foto 4',
      },
      {
        id: 5,
        foto: null,
        previewUrl: '/img/icons/camera.png',
        label: 'Foto 5',
      },
    ],
    hasImage: false,
    image: null,
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
      setSellertId: 'product/setSeller',
      setProduct: 'product/setProduct',
    }),
    setPoint(item) {
      let r = confirm('Apakah Anda yakin memberi penilaian ' + item.text + '?')
      if (r == true) {
        this.point = item.point
      } else {
        this.point = 0
      }
    },
    tulisReview(item) {
      this.selected = item
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
      }
      if (foto == 'foto2') {
        reader.onload = (e) => {
          this.list[1].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[1].foto)
      }
      if (foto == 'foto3') {
        reader.onload = (e) => {
          this.list[2].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[2].foto)
      }
      if (foto == 'foto4') {
        reader.onload = (e) => {
          this.list[3].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[3].foto)
      }
      if (foto == 'foto5') {
        reader.onload = (e) => {
          this.list[4].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[4].foto)
      }
    },
    async sendReview() {
      var r = confirm('Yakin dengan ulasan berikut?')
      if (r == true) {
        let formData = new FormData()

        formData.set('id_iklan', this.selected.id_iklan)
        formData.set('id_app_user', this.user.id)
        formData.set('ratting_iklan', this.rating)
        formData.set('ratting_user', this.point)
        if (this.list[0].foto != null) {
          formData.set('foto_1', this.list[0].foto, 'foto_1.jpg')
        }
        if (this.list[1].foto != null) {
          formData.set('foto_2', this.list[1].foto, 'foto_2.jpg')
        }
        if (this.list[2].foto != null) {
          formData.set('foto_3', this.list[2].foto, 'foto_3.jpg')
        }
        if (this.list[3].foto != null) {
          formData.set('foto_4', this.list[3].foto, 'foto_4.jpg')
        }
        if (this.list[4].foto != null) {
          formData.set('foto_5', this.list[4].foto, 'foto_5.jpg')
        }
        formData.set('review', this.deskripsiUlasan)

        await this.$axios
          .post('/transaksi/v3/review', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.$router.push('/account/profile/ulasan')
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
      }
    },
    go(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id)
    },
    go2(id, name) {
      this.setProduct(id)
      this.$router.push('/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id)
    },
    tes() {
      this.$router.app.refresh()
    },
  },
}
</script>

<style>
a:link,
a:visited {
  color: teal;
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
</style>