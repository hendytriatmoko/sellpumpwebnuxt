<template>
  <div>
    <h2>Detail Unit</h2>

    <v-row>
      <v-col cols="12" sm="4">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/IdMotor.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>ID Motor</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.id }}</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/Merek.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Merek</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.merk }}</v-list-item-action>
          </v-list-item>


          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/Tipe.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tipe</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.type }}</v-list-item-action>
          </v-list-item>

       

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/Tahun.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tahun</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.tahun }}</v-list-item-action>
          </v-list-item>

         

          <v-list-item  v-if="unitMokas.odometer != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Odo.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Odometer</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.odometer }} KM
            </v-list-item-action>
          </v-list-item>

     

          <v-list-item v-if="unitMokas.warna != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Warna.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Warna</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.warna }}</v-list-item-action>
          </v-list-item>
          

       

          <v-list-item  v-if="unitMokas.cc != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/CC.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>CC Mesin</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.cc }} CC</v-list-item-action>
          </v-list-item>

        

          <v-list-item  v-if="unitMokas.transmisi != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Tranmisi.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Transmisi</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.transmisi }}
            </v-list-item-action>
          </v-list-item>

         

          <v-list-item  v-if="unitMokas.jenis_motor != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Jenis.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jenis Motor</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.jenis_motor }}
            </v-list-item-action>
          </v-list-item>

       
          <v-list-item v-if="unitMokas.lokasi_samsat != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Lok.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lokasi Samsat</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.lokasi_samsat }}
            </v-list-item-action>
          </v-list-item>

        

          <v-list-item v-if="unitMokas.lokasi != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Lok.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lokasi Motor</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>

      <v-divider vertical inset class="mx-4"></v-divider>

      <v-col cols="12" sm="4">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/STNK.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>STNK</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.lembar_stnk ? 'Ada' : 'Tidak' }}
            </v-list-item-action>
          </v-list-item>

          <v-list-item v-if="unitMokas.lembar_stnk != ''" >
            <v-list-item-avatar>
              <v-img src="/img/icons/STNK.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tanggal STNK</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ moment.utc(unitMokas.tanggal_stnk).format('DD MMMM YYYY') }}
            </v-list-item-action>
          </v-list-item>


          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/Pajak.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lembar Pajak</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.lembar_pajak ? 'Ada' : 'Tidak' }}
            </v-list-item-action>
          </v-list-item>

          <v-list-item v-if="unitMokas.tanggal_pajak != null">
            <v-list-item-avatar>
              <v-img src="/img/icons/Pajak.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tanggal Pajak</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ moment.utc(unitMokas.tanggal_pajak).format('DD MMM YYYY') }}
            </v-list-item-action>
          </v-list-item>

        

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/BPKB.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>BPKB</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              {{ unitMokas.lembar_bpkb ? 'Ada' : 'Tidak' }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'spesifikasi',
  props: ['unitMokas', 'unitid'],
}
</script>

<style>
</style>