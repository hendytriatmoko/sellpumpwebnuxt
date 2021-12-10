<template>
  <v-container>
    <v-card
    rounded="lg"  
    color="transparent"
    elevation="2"
      width="170"
      @click="
        go(
          item._source.id,
          item._source.judul,
        )
      "
    >
      <v-img :src="getImage(item._source.photo)" height="150">
        <v-card-title>
          <v-chip
            small
            color="#20929D"
            dark
            v-if="item._source.highlight == true"
          >
            Highlight
          </v-chip>
        </v-card-title>
      </v-img>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="teal--text">
              <!-- <h5 v-if="item._source.id_mst_iklan_jenis == 1">
                {{ item._source.mst_iklan_jenis }}
              </h5>
              <h5 v-else>
                {{ item._source.mst_iklan_jenis }}
                {{ item._source.mst_iklan_type }} {{ item._source.mst_type_tb }}
              </h5> -->
              <h5>
                {{ item._source.mst_iklan_jenis }}
              </h5>
            </v-list-item-subtitle>

            <h5 class="d-flex align-center">
              <v-list-item-avatar size="40">
                <v-img
                  src="/img/icons/people.webp"
                  contain
                  v-if="item.photo == 'null'"
                ></v-img>

                <v-img
                  :src="getImage(item._source.app_user_photo)"
                  v-else
                ></v-img>
              </v-list-item-avatar>
              <v-icon
                color="blue"
                class="mr-1"
                small
                v-if="item._source.id_mst_user_type == 2"
              >
                mdi-check-decagram
              </v-icon>
              {{ item._source.app_user }}
            </h5>

            <!-- <h4 class="my-4">
              {{ item._source.judul }}
            </h4> -->
            <h4 class="my-4" v-if="item._source.judul.length < 25">
              {{ item._source.judul }}
            </h4>
            <h4 class="my-4" v-else>
              {{ item._source.judul.substring(0, 25) + '..' }}
            </h4>

            <v-divider class="mb-2"> </v-divider>

            <div class="d-flex">
              <v-list-item-title> Harga </v-list-item-title>

              <v-list-item-title align="right" class="red--text">
                Rp
                {{ Number(item._source.harga).toLocaleString('id-ID') }}
              </v-list-item-title>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'iklan-terkait',
  props: ['item'],
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    go(id, name, unit) {
      this.setProductId(id)
      this.setUnitID(unit)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
  },
}
</script>