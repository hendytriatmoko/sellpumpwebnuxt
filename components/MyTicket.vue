<template>
  <v-container>
    <v-card>
      <v-card-subtitle class="pb-0">Kode Tiket</v-card-subtitle>
      <v-card-title class="py-0">{{ item.code }}</v-card-title>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Harga</v-list-item-subtitle>
            <v-list-item-title class="teal--text">
              Rp {{ Number(item.harga_beli).toLocaleString('id-ID') }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text>Masa Berlaku</v-list-item-action-text>
            <div class="red--text">
              {{
                moment(item.expired_at)
                  .add(utc, 'h')
                  .format('DD MMM YYYY, HH:mm')
              }}
              {{ timezone }}
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'my-ticket',
  props: ['item'],
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
}
</script>