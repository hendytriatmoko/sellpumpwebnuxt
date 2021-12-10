<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-row>
        <v-col cols="12" sm="4">
          <v-card rounded="lg" class="mt-3">
            <v-row>
              <v-col cols="12" sm="6">
                <h2 class="mx-2">Pesan</h2>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Cari Pengguna"
                  outlined
                  dense
                  rounded
                  append-icon="mdi-magnify"
                  hide-details
                  class="mx-2"
                  @keyup.enter="search"
                  clearable
                  @click:clear="getChats"
                ></v-text-field>
              </v-col>
            </v-row>

            <hr class="mt-5" />

            <div id="myDIV">
              <v-list three-line>
                <v-list-item-group
                  v-model="chat"
                  color="primary"
                  :mandatory="mandatory"
                  @change="getSelected"
                >
                  <template v-for="(item, index) in pengguna">
                    <v-list-item :key="item.IdAppUser" :value="item.IdAppUser">
                      <v-list-item-avatar>
                        <v-icon large v-if="item.photo == 'null'">
                          mdi-account-circle
                        </v-icon>

                        <v-img :src="getImage(item.photo)" v-else></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.nama }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ item.Messages }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text>
                          {{
                            moment(item.Time.toDate())
                              .add(utc, 'h')
                              .format('DD/MM/YYYY')
                          }}
                        </v-list-item-action-text>

                        <!-- <v-responsive
                        class="text-center orange rounded-circle d-inline-flex align-center justify-center pa-2"
                      >
                        5
                      </v-responsive> -->
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider :key="index"></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="8">
          <v-card rounded="lg">
            <div v-if="selected.length > 0">
              <v-list :three-line="selected[0].Pemenang ? true : false">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon large v-if="selected[0].photo == 'null'">
                      mdi-account-circle
                    </v-icon>

                    <v-img :src="getImage(selected[0].photo)" v-else></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <h2>{{ selected[0].nama }}</h2>
                    </v-list-item-title>

                    <v-list-item-subtitle v-if="selected[0].Pemenang">
                      User berikut adalah pemenang Tawar Bersama pada iklan yang
                      Anda pasang. Selesaikan status user sebagai pemenang?
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action v-if="selected[0].Pemenang">
                    <v-btn x-small dark @click="pinPemenang" color="teal">
                      Selesai
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </div>

            <hr />

            <v-container id="myDIV2">
              <div class="d-flex flex-column">
                <div
                  v-for="(item, index) in messages"
                  :key="index"
                  :class="
                    item.From == user.id ? 'ml-auto my-3' : 'mr-auto my-3'
                  "
                >
                  <v-card width="300" rounded="lg">
                    <v-card-text v-if="item.Type == 'text'">
                      {{ item.Message }}
                    </v-card-text>

                    <div v-if="item.Type == 'iklan'">
                      <v-list v-if="item.Iklan.length > 0">
                        <v-list-item
                          @click="
                            go(
                              item.Iklan[0].id,
                              item.Iklan[0].judul,
                              item.Iklan[0].motor_bekas[0].id
                            )
                          "
                        >
                          <v-list-item-avatar tile size="70">
                            <v-img :src="getImage(item.Iklan[0].photo)"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.Iklan[0].judul }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                              {{ item.Iklan[0].mst_iklan_jenis }}
                              {{ item.Iklan[0].mst_iklan_type }}
                            </v-list-item-subtitle>

                            <div class="teal--text">
                              Rp
                              {{
                                item.Iklan[0].harga_awal.toLocaleString('id-ID')
                              }}
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>

                    <v-card-text v-if="item.Type == 'image'">
                      <v-img :src="getImage(item.Image)"></v-img>
                    </v-card-text>
                  </v-card>

                  <div class="text-caption text-right">
                    {{
                      moment(item.Time.toDate())
                        .add(utc, 'h')
                        .format('DD/MM/YYYY - HH:mm:ss')
                    }}
                    {{ timezone }}
                  </div>
                </div>
              </div>
            </v-container>
          </v-card>

          <v-text-field
            outlined
            dense
            placeholder="Tuliskan pesan..."
            v-model="newMessage"
            class="mt-2"
            @keyup.enter="sendMessage"
            append-icon="mdi-send"
            @click:append="sendMessage"
          >
            <template v-slot:prepend>
              <v-menu top offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-attachment mdi-rotate-270</v-icon>
                </template>

                <v-list>
                  <v-list-item @click="browse">
                    <v-icon>mdi-image</v-icon>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-text-field>

          <image-uploader
            id="file"
            v-model="image"
            :quality="0.7"
            :scaleRatio="0.5"
            accept="image/*"
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            :capture="false"
            :debug="0"
            :autoRotate="true"
            outputFormat="blob"
            @input="sendImage"
            style="display: none"
          ></image-uploader>
        </v-col>
      </v-row>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'chat',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    lists: [],
    chat: 0,
    messages: [],
    selected: [],
    pengguna: [],
    newMessage: '',
    image: '',
    hasImage: false,
    mandatory: '',
    keyword: '',
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  // watch: {
  //   chat() {
  //     this.getSelected()
  //     this.getMessages()
  //     // this.read(val)
  //   },
  // },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    async getChats() {
      await this.$fire.firestore
        .collection('chat')
        .doc(String(this.user.id))
        .collection('user_messages')
        .orderBy('Time', 'desc')
        .onSnapshot((querySnapshot) => {
          let list = []
          querySnapshot.forEach((doc) => {
            list.push(doc.data())
          })

          this.lists = list
          this.getUsers()
        })
    },
    async getUsers() {
      this.pengguna = []

      for (let i = 0; i < this.lists.length; i++) {
        await this.$axios
          .get('/user/v3/user', {
            params: {
              id: this.lists[i].IdAppUser,
              limit: 1,
            },
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response.data

            this.pengguna.push({ ...this.lists[i], ...data[0] })
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      }

      await this.getMessages()
      await this.getSelected()
    },
    async getMessages() {
      await this.$fire.firestore
        .collection('chat')
        .doc(String(this.user.id))
        .collection('user_messages')
        .doc(String(this.chat))
        .collection('messages')
        .orderBy('Time', 'asc')
        .onSnapshot((querySnapshot) => {
          let message = []
          querySnapshot.forEach((doc) => {
            let iklan = []
            if (doc.data().Type == 'iklan') {
              this.$axios
                .get('/iklan/v3/iklan_tb_mokas', {
                  params: {
                    id: doc.data().Iklan,
                  },
                })
                .then((response) => {
                  let { data } = response.data
                  iklan.push(data)
                })
            }
            const data = {
              From: doc.data().From,
              Message: doc.data().Message,
              Iklan: iklan,
              Image: doc.data().Image,
              Receive: doc.data().Receive,
              Seen: doc.data().Seen,
              Time: doc.data().Time,
              Type: doc.data().Type,
            }

            message.push(data)
          })
          this.messages = message
          this.$nextTick(() => this.scrollToBottom())
        })
    },
    async getSelected() {
      let search = this.pengguna.filter((item) => {
        return item.id === this.chat
      })

      if (search.length > 0) {
        this.selected = search
      } else {
        await this.$axios
          .get('/user/v3/user', {
            params: {
              id: this.chat,
              limit: 1,
            },
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response.data
            this.selected = data
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      }

      this.getMessages()
      this.read()
    },
    async sendMessage() {
      let formData = new FormData()

      formData.set('from', this.user.id)
      formData.set('receive', this.chat)
      formData.set('message', this.newMessage)

      await this.$axios
        .post('/user/v3/chat/text', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then(() => {
          this.newMessage = null
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
    browse() {
      document.getElementById('file').click()
    },
    async sendImage() {
      let formData = new FormData()

      formData.set('from', this.user.id)
      formData.set('receive', this.chat)
      formData.set('foto', this.image, 'foto.jpg')

      await this.$axios
        .post('/user/v3/chat/image', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then(() => {})
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
    scrollToBottom() {
      let div = document.getElementById('myDIV2')
      div.scrollTop = div.scrollHeight - div.clientHeight
    },
    async read() {
      let formData = new FormData()

      formData.set('from', this.user.id)
      formData.set('receive', this.chat)

      await this.$axios
        .post('/user/v3/chat/read', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then(() => {})
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
    async pinPemenang() {
      let formData = new FormData()

      formData.set('from', this.user.id)
      formData.set('receive', this.chat)

      await this.$axios.post('/user/v3/chat/pin_pemenang', formData, {
        headers: { Authorization: 'Bearer ' + this.user.token },
      })
    },
    go(id, name, unit) {
      this.setProductId(id)
      this.setUnitID(unit)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
    async search() {
      const filterItems = (needle, heystack) => {
        let query = needle.toLowerCase()
        return heystack.filter(
          (item) => item.nama.toLowerCase().indexOf(query) >= 0
        )
      }

      this.pengguna = filterItems(this.keyword, this.pengguna)
    },
  },
  async created() {
    await this.getChats()

    if (this.$route.query.id == undefined) {
      this.mandatory = true
    } else {
      this.mandatory = false
      this.chat = Number(this.$route.query.id)
      // this.$nextTick(() => {
      //   setInterval(() => {
      //     this.getSelected(this.chat)
      //   }, 1000)
      // })
    }
  },
}
</script>

<style>
#myDIV {
  height: 530px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#myDIV2 {
  height: 450px;
  overflow: auto;
}
</style>