<template>
  <div>
    <h2>List Penawaran</h2>

    <v-row>
      <v-col cols="12" sm="8">
        <v-list v-if="liveBid.length > 0">
          <v-list-item v-for="(item, i) in liveBid.slice(0, 5)" :key="item.Bid">
            <v-list-item-icon class="mx-0" v-if="i + 1 == 1">
              <v-icon large color="orange">mdi-star</v-icon>
            </v-list-item-icon>

            <v-list-item-icon class="mr-2" v-else>
              <v-chip color="green" dark>{{ i + 1 }}</v-chip>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <span>
                  Oleh:
                  {{
                    !guest && user.id == item.IdAppUser ? 'Anda' : item.IdUniq
                  }}
                </span>

                <v-avatar
                  v-if="
                    !guest && item.IdTypeBid == 2 && item.IdAppUser == user.id
                  "
                  size="28"
                >
                  <v-img src="/img/icons/autotawar.png"></v-img>
                </v-avatar>
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ moment(item.CreatedAt.toDate()).from() }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-chip color="red" dark>
                Rp {{ Number(item.Bid).toLocaleString('id-ID') }}
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-card
          class="d-flex align-center justify-center"
          flat
          height="100"
          tile
          v-else
        >
          <h2>Belum ada Penawaran</h2>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'list-penawaran',
  props: ['liveBid', 'user', 'guest'],
}
</script>

<style>
</style>