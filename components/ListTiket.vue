<template>
  <div>
    <v-item-group>
      <v-row>
        <v-col cols="12" sm="4" v-for="item in items" :key="item.id">
          <v-item v-slot:default="{ active }">
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle> Kode Tiket </v-list-item-subtitle>
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
                    <v-list-item-subtitle> Harga </v-list-item-subtitle>
                    <v-list-item-title class="teal--text">
                      Rp
                      {{ Number(item.harga_beli).toLocaleString('id-ID') }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle> Masa Berlaku </v-list-item-subtitle>
                    <v-list-item-title class="red--text text-caption">
                      {{
                        moment(item.expired_at)
                          .add(utc, 'h')
                          .format('DD MMM YYYY, HH:mm')
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list-tiket',
  props: ['items'],
  data: () => ({
    listRefund: [],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    async selectAll() {
      if (this.checkbox) {
        await this.$axios
          .get('/tiket/v3/tiket', {
            params: {
              id_app_user: this.user.id,
              id_mst_tiket_status: 1,
            },
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response.data
            this.listRefund = data
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses)
          })
      } else {
        this.listRefund = []
      }
    },
  },
}
</script>

<style>
</style>