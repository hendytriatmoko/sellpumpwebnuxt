<template>
  <div>
    <h2>Performa Pembelian</h2>
    <div 
      @click="verifikasiFoto=true" 
      class="d-flex align-center justify-space-between px-4 py-2" 
      style="border:2px solid #E5E5E5;cursor:pointer;" 
      v-if="pengguna.id_mst_verifikasi_alamat_doc == 2
        || pengguna.id_mst_verifikasi_alamat_doc == 5
        || pengguna.id_mst_verifikasi_alamat_doc == 1">
        <div> <v-icon color="red" class="pr-2">mdi-map-marker-radius</v-icon> Alamat anda sedang dalam proses verifikasi. <span v-if="pengguna.id_mst_verifikasi_alamat_doc == 2"> Masukkan kode verifikasi</span></div>
        <v-icon>mdi-chevron-right</v-icon>
    </div>
    <br />
    <div 
       :style="pengguna.id_type_pinalti == 0 ? 'border-left:10px solid green;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px'
       : pengguna.id_type_pinalti == 1 ? 'border-left:10px solid #F2C94C;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px'
       : pengguna.id_type_pinalti == 2 ? 'border-left:10px solid #F2994A;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px'
       : pengguna.id_type_pinalti == 3 ? 'border-left:10px solid #EB5757;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px' : ''"
      rounded="lg" 
      elevation="6" 
      raised >

      <v-card-title  class="d-flex align-center justify-space-between">
        <div style="cursor:pointer" @click="pelanggaranDetail = true" class="d-flex align-center"> 
          <v-avatar size="40" class="mx-4 my-2">
            <v-img
              src="/img/icons/akun_aman.webp"
              contain
              v-if="pengguna.id_type_pinalti == 0"
            ></v-img>

            <v-img
             src="/img/icons/akun_wanprestasi1.webp"
              contain
              v-if="pengguna.id_type_pinalti == 1"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi2.webp"
              contain
              v-if="pengguna.id_type_pinalti == 2"
            ></v-img>

            <v-img
               src="/img/icons/akun_blokir.webp"
              contain
              v-if="pengguna.id_type_pinalti == 3"
            ></v-img>
          </v-avatar>
          <h2>Harap Diperhatikan!</h2>     
        </div>

        <v-btn icon >
          <v-icon @click="pelanggaran = true" color="black">mdi-help-circle</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text style="cursor:pointer" @click="pelanggaranDetail = true" class="pl-5 pr-10">        
        <h4 v-if="pengguna.id_type_pinalti == 0">
          Akun Anda tidak pernah melakukan pembatalan transaksi. Hindari
          pembatalan transaksi agar akun anda tidak diblokir.
        </h4>

        <h4 v-if="pengguna.id_type_pinalti == 1">
          Anda telah melakukan 1x pembatalan transaksi pembelian. Hindari pembatalan kembali
          agar akun anda tidak terkena suspend ( tidak dapat melakukan penawaran selama 7 hari )
        </h4>

        <h4 v-if="pengguna.id_type_pinalti == 2">
          Anda telah melakukan 2x pembatalan transaksi pembelian. Hindari pembatalan kembali
          agar akun anda tidak terkena suspend ( tidak dapat melakukan penawaran selama 14 hari )
        </h4>

        <h4 v-if="pengguna.id_type_pinalti == 3">
          Anda telah melakukan 3x atau lebih pembatalan transaksi pembelian. Hindari pembatalan kembali
          agar akun anda tidak terkena suspend ( tidak dapat melakukan penawaran selama 14 hari )
        </h4>
      </v-card-text>
    </div>

    <!-- <br />

    <v-card outlined rounded="lg" :color="color" elevation="6" raised>
      <v-card class="ma-2">
        <div class="d-flex align-center">
          <v-avatar size="40" class="mx-4 my-2">
            <v-img
              src="/img/icons/akun_aman.webp"
              contain
              v-if="pengguna.id_type_pinalti == 0"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi1.webp"
              contain
              v-if="pengguna.id_type_pinalti == 1"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi2.webp"
              contain
              v-if="pengguna.id_type_pinalti == 2"
            ></v-img>

            <v-img
              src="/img/icons/akun_blokir.webp"
              contain
              v-if="pengguna.id_type_pinalti == 3"
            ></v-img>
          </v-avatar>

          <h2>Harap Diperhatikan!</h2>
        </div>

        <div class="mx-2">
          <h4 v-if="pengguna.id_type_pinalti == 0">
            Akun Anda tidak pernah melakukan pembatalan transaksi. Hindari
            pembatalan transaksi agar akun anda tidak diblokir.
          </h4>

          <h4 v-if="pengguna.id_type_pinalti == 1">
            Anda telah melakukan 1x pembatalan transaksi. Hindari melakukan
            pembatalan transaksi karena dapat mengakibatkan Tiket anda hangus.
          </h4>

          <h4 v-if="pengguna.id_type_pinalti == 2">
            Anda telah melakukan 2x pembatalan transaksi. Hindari melakukan
            pembatalan transaksi karena dapat mengakibatkan akun anda di
            blokir selama 14 hari.
          </h4>

          <h4 v-if="pengguna.id_type_pinalti == 3">
            Anda telah melakukan 3x pembatalan transaksi yang mengakibatkan
            akun anda di blokir selamanya.
          </h4>

          <p class="my-2">
            Untuk informasi tentang kebijakan, silahkan kunjungi Bantuan
            <NuxtLink to="/bantuan">disini</NuxtLink>
          </p>

          <flip-countdown
            :deadline="
              moment
                .utc(pengguna.end_time_beku)
                .add(utc, 'h')
                .format('YYYY-MM-DD HH:mm:ss')
            "
            v-if="
              pengguna.id_mst_user_status == 3 &&
              pengguna.id_type_pinalti == 3
            "
          ></flip-countdown>
        </div>
      </v-card>
    </v-card> -->

    <!-- <br />

    <div>
      Keterangan:
      <ul class="red--text">
        <li>
          <strong> Melakukan 1x pembatalan transaksi </strong>
          <p>
            Anda melakukan pembatalan transaksi 1x yang mengakibatkan Tiket
            anda hangus.
          </p>
        </li>

        <li>
          <strong> Melakukan 2x pembatalan transaksi </strong>
          <p>
            Anda melakukan pembatalan transaksi 2x yang mengakibatkan akun
            anda di blokir selama 14 hari.
          </p>
        </li>

        <li>
          <strong> Melakukan 3x pembatalan transaksi </strong>
          <p>
            Anda melakukan pembatalan transaksi 3x yang mengakibatkan akun
            anda di blokir selamanya.
          </p>
        </li>
      </ul>

      <div class="text-justify ml-2 ml-lg-2">
        Selengkapnya mengenai pelanggaran Tawar Bersama dapat dilihat
        <nuxt-link to="/tentang?tab=tbrules">disini</nuxt-link>
      </div>
    </div> -->

    <br />

    <h2>Profil Umum</h2>

    <br />

    <v-form ref="form" v-model="valid">
      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Nama Akun</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahNama"
          >
            <div>{{ user.nama }}</div>

            <v-btn
              text
              @click="ubahNama = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="formNama"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNama = false"
            @click:append="saveData('nama', formNama)"
            :rules="namaRules"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
            <div class="teal--text">Nomor Handphone</div>
            <div>{{ user.nomor_hp }}</div>
          </v-container>
          <v-icon
            color="#008693"
            medium
            class="mr-4 ml-1"
            v-if="pengguna.nomor_hp_verified == true"
          >
            mdi-check-decagram
          </v-icon>
        </div>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Nomor Whatsapp</div>
          <div class="d-flex align-center justify-space-between" v-if="!ubahWA">
            <div>{{ user.nomor_whatsapp }}</div>

            <v-btn
              text
              @click="ubahWA = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="formNomorWA"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahWA = false"
            @click:append="saveData('nomor_whatsapp', formNomorWA)"
            :rules="waRules"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
            <div class="teal--text">Alamat Email</div>
            <div v-if="formEmail !== null">{{ user.email }}</div>
            <div v-else>
              <section id="firebaseui-auth-container"></section>
            </div>
          </v-container>
          <v-icon
            color="#008693"
            medium
            class="mr-4 ml-1"
            v-if="pengguna.nomor_hp_verified == true"
          >
            mdi-check-decagram
          </v-icon>
        </div>
      </v-card>
      <br />

      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Alamat</div>
          <div
            class="d-flex align-center justify-space-between"
            
          >
            <div v-if="pengguna.id_mst_verifikasi_alamat_doc == 4 || pengguna.id_mst_verifikasi_alamat_doc == 5 || pengguna.id_mst_verifikasi_alamat_doc == 2 || pengguna.id_mst_verifikasi_alamat_doc == 1">
              Belum Diatur
            </div>
            <div v-if="pengguna.id_mst_verifikasi_alamat_doc == 3">
              {{ pengguna.alamat }}
            </div>
            <div>
              <v-btn
                text
                color="#EB5757"
                style="text-transform: none"
                to="/account/verifikasi-alamat"
                v-if="pengguna.id_mst_verifikasi_alamat_doc == 4"
              >
                Verifikasi
              </v-btn>
              <div style="color: #219653" v-if="pengguna.id_mst_verifikasi_alamat_doc == 5">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#219653"
                      text
                      dark
                      v-bind="attrs"
                      v-on="on"
                      to="/account/verifikasi-alamat"
                    >
                      Proses Verifikasi Pengajuan
                    </v-btn>
                  </template>
                  <span>Ubah Alamat</span>
                </v-tooltip>
              </div>
              <div style="color: #219653" v-if="pengguna.id_mst_verifikasi_alamat_doc == 2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#219653"
                      text
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="verifikasiFoto=true"
                    >
                      Proses Verifikasi Alamat
                    </v-btn>
                  </template>
                  <span>Unggah Kode Verifikasi</span>
                </v-tooltip>
              </div>
              <div style="color: #219653" v-if="pengguna.id_mst_verifikasi_alamat_doc == 1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#219653"
                      text
                      dark
                      v-bind="attrs"
                      v-on="on"
                      to="/account/verifikasi-alamat"
                    >
                      Alamat Ditolak
                    </v-btn>
                  </template>
                  <span>Ajukan Ulang Alamat ?</span>
                </v-tooltip>
              </div>
              
            </div>
            <v-icon
              color="#008693"
              medium
              class="mr-1 ml-1"
              v-if="pengguna.alamat_verified == true"
            >
              mdi-check-decagram
            </v-icon>
          </div>
        </v-container>
      </v-card>
      <br />
      
      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Deskripsi</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahDeskripsi"
          >
            <div>{{ user.deskripsi }}</div>

            <v-btn
              text
              @click="ubahDeskripsi = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="formDeskripsi"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahDeskripsi = false"
            @click:append="saveData('deskripsi', formDeskripsi)"
            :rules="deskripsiRules"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>
      <br />
      <v-card
        rounded="lg"
        elevation="6"
        raised
        v-if="user.id_verifikasi_ktp == 3"
      >
        <v-container>
          <div class="teal--text">Kode Referal</div>
          <div>{{ user.code_referral }}</div>
        </v-container>
      </v-card>

      <br />

      
    </v-form>
    <v-dialog v-model="pelanggaran" width="700">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div>Pelanggaran Tawar Bersama</div>

          <v-btn icon @click="pelanggaran = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div v-for="item in InfoPelanggaran" :key="item">
          <div class="d-flex align-center"> 
            <v-avatar size="40" class="ml-4 mr-1 my-2">
              <v-img
                :src="item.img"
                contain
              ></v-img>
            </v-avatar>
            <h4>Pelanggaran {{item.warning}} <span v-if="item.warning == '3x'">atau lebih</span></h4>            
          </div>
          <h4 class="ml-15 mr-15" v-if="item.warning == '1x'">
            Anda telah melakukan 1x pembatalan transaksi pembelian yang
            mengakibatkan tiket anda hangus ( * jika iklan tawar bersama menggunakan tiket)
          </h4>
          <h4 class="ml-15 mr-15" v-if="item.warning == '2x'">
            Anda telah melakukan 2x pembatalan transaksi pembelian yang 
            mengakibatkan tiket anda hangus ( * jika iklan tawar bersama menggunakan tiket)
            dan akun kamu akan dibekukan selama <span style="color:#F2994A;">7 hari</span> yang mengakibatkan akun anda
            tidak dapat mengikuti tawar bersama selama waktu tersebut, namun masih dapat masuk ke
            aplikasi SiMotor
          </h4>
          <h4 class="ml-15 mr-15" v-if="item.warning == '3x'">
            Anda telah melakukan 3x atau lebih pembatalan transaksi pembelian yang 
            mengakibatkan tiket anda hangus ( * jika iklan tawar bersama menggunakan tiket)
            dan akun kamu akan dibekukan selama <span style="color:#EB5757;">14 hari</span> yang mengakibatkan akun anda
            tidak dapat mengikuti tawar bersama selama waktu tersebut, namun masih dapat masuk ke
            aplikasi SiMotor
          </h4>
        </div>
        <v-divider></v-divider>
        <div class="my-4 ">
          <center>
            Untuk informasi pelanggaran, silahkan <br> kunjungi
            <nuxt-link to="/tentang?tab=tbrules">Bantuan</nuxt-link>
          </center>
        </div>
        <br>
      </v-card>
    </v-dialog>
    <v-dialog v-model="pelanggaranDetail" width="700">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div>Pelanggaran Tawar Bersama</div>

          <v-btn icon @click="pelanggaranDetail = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <br>
        <div 
          :style="pengguna.id_type_pinalti == 0 ? 'border-left:10px solid green;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px'
          : pengguna.id_type_pinalti == 1 ? 'border-left:10px solid #F2C94C;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px'
          : pengguna.id_type_pinalti == 2 ? 'border-left:10px solid #F2994A;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px'
          : pengguna.id_type_pinalti == 3 ? 'border-left:10px solid #EB5757;border-top:2px solid #E5E5E5;border-right:2px solid #E5E5E5;border-bottom:2px solid #E5E5E5;border-radius:10px' : ''"
          rounded="lg" 
          elevation="6" 
          raised class="mx-6" >

          <v-card-title  class="d-flex align-center justify-space-between">
            <div class="d-flex align-center"> 
              <v-avatar size="40" class="mr-1">
                  <v-img
              src="/img/icons/akun_aman.webp"
              contain
              v-if="pengguna.id_type_pinalti == 0"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi1.webp"
              contain
              v-if="pengguna.id_type_pinalti == 1"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi2.webp"
              contain
              v-if="pengguna.id_type_pinalti == 2"
            ></v-img>

            <v-img
              src="/img/icons/akun_blokir.webp"
              contain
              v-if="pengguna.id_type_pinalti == 3"
            ></v-img>
              </v-avatar>
              <h3>Harap Diperhatikan!</h3>     
            </div>
          </v-card-title>
          <v-card-text class="pl-15">
            <h4 v-if="pengguna.id_type_pinalti == 1">
              Anda telah melakukan 1x pembatalan transaksi pembelian. Hindari pembatalan kembali
              agar akun anda tidak terkena suspend ( tidak dapat melakukan penawaran selama 7 hari )
            </h4>

            <h4 v-if="pengguna.id_type_pinalti == 2">
              Anda telah melakukan 2x pembatalan transaksi pembelian. sementara anda tidak bisa menawar
              dan akan kembali normal setelah 
              <span style="color:#F2994A;"> 
                <countdown
                  :time="countdownBeku < 0 ? 0 : countdownBeku"
                  v-slot="{ days, hours, minutes, seconds }"
                  style="font-size: 10px"
                >
                  {{ days }} h : {{ hours }} j : {{ minutes }} m :
                  {{ seconds }} d
                </countdown>
            </span>
            </h4>

            <h4 v-if="pengguna.id_type_pinalti > 2">
              Anda telah melakukan 3x atau lebih pembatalan transaksi pembelian. sementara anda tidak bisa menawar
              dan akan kembali normal setelah
              <span style="color:#EB5757">
                <countdown
                  :time="countdownBeku < 0 ? 0 : countdownBeku"
                  v-slot="{ days, hours, minutes, seconds }"
                  style="font-size: 10px"
                >
                  {{ days }} h : {{ hours }} j : {{ minutes }} m :
                  {{ seconds }} d
                </countdown>
              </span>
            </h4>
          </v-card-text>
        </div>
        <v-card-title>
          <h3>Riwayat Pelanggaran</h3>  
        </v-card-title>
        <div id="riwayat">
          <div style="border:2px solid #E5E5E5;border-radius:5px;cursor:pointer" v-for="item in wanprestasi" :key="item" class="mx-6 my-2" >
            <v-list >
              <v-list-item :to="'/detail-transaksi/unit/' + item.id_order">
                <v-list-item-avatar rounded="lg" size="70">
                  <v-img :src="getImage(item.photo)" contain></v-img>
                </v-list-item-avatar>
                <v-list-item-title>
                  <div class="ml-10">
                    <div class="pb-2" style="color:#4C4C4C"> <b> {{ item.judul }}</b></div>
                    <div style="color:#828282">
                      {{
                        moment
                          .utc(item.created_at)
                          .add(utc, 'h')
                          .format('DD MMM YYYY HH:mm:ss')
                      }}
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </div>
        <br>
        <v-divider></v-divider>
        <div class="my-2 ">
          <center>
            Untuk informasi pelanggaran, silahkan <br> kunjungi
            <nuxt-link to="/tentang?tab=tbrules">Bantuan</nuxt-link>
          </center>
        </div>
        <br>
      </v-card>
      
    </v-dialog>
    <v-dialog v-model="verifikasiFoto" width="600">
      <v-card v-if="pengguna.id_mst_verifikasi_alamat_doc == 5
        || pengguna.id_mst_verifikasi_alamat_doc == 1">
        <v-card-title class="d-flex align-center justify-space-between">
          <div>Log Verifikasi Alamat</div>

          <v-btn icon @click="verifikasiFoto = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-timeline dense >
          <v-timeline-item color="#008693" v-for="item in logVerifikasi" :key="item" >
            <div class="d-flex">
              <div class="flex-column">
                <div class="pr-1">
                  <b v-if="item.id_mst_verifikasi_doc == 1"> Ditolak </b>
                  <b v-if="item.id_mst_verifikasi_doc == 5"> Menunggu Persetujuan Admin Simotor </b>
                </div>
                <div class="text-caption pr-1">{{ item.deskripsi }}</div>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card>
      <v-card v-if="pengguna.id_mst_verifikasi_alamat_doc == 2">
        <v-card-title class="d-flex align-center justify-space-between">
          <div>Verifikasi Alamat</div>

          <v-btn icon @click="verifikasiFoto = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-text-field
          label="Masukkan Kode Verifikasi"
          class="mt-4 mx-4"
          solo
          v-model="kodeVerifikasi"
        ></v-text-field>
        <v-card-subtitle>Surat Verifikasi Alamat</v-card-subtitle>
        <center>
          <image-uploader
            v-model="fotoVerifikasi"
            :quality="0.7"
            :scaleRatio="0.5"
            accept="image/*"
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            :autoRotate="true"
            outputFormat="blob"
            @input="onFileChange"
            id="foto"
            :style="previewUrl == '/img/icons/thumbnail/ic_upload_image.webp' ? 'width:80%;border:3px dashed #20929D;' : 'width:40%'"
          >
            <label for="foto" slot="upload-label" >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }" >
                  <v-img
                    :src="previewUrl"
                    contain
                    :width="$vuetify.breakpoint.xsOnly ? 100 : 200"
                    :height="$vuetify.breakpoint.xsOnly ? 100 : 200"
                    v-on="on"
                    style="position: relative"
                    align="center"
                  >
                  </v-img>
                  <span style="color:#20929D" v-if="previewUrl == '/img/icons/thumbnail/ic_upload_image.webp'">
                    <u> Unggah Surat Verifikasi Alamat</u>
                  </span>
                </template>
                <span>Pilih Foto</span>
              </v-tooltip>
            </label>            
          </image-uploader>
        </center>
        <br>
        <v-card-actions style="margin-right: 2%">
          <v-spacer></v-spacer>
          <v-btn color="#20929D" class="white--text" @click="verifikasiAlamat" :disabled="kodeVerifikasi.length < 4 || fotoVerifikasi == null ? true : false"> 
            Verifikasi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import FlipCountdown from 'vue2-flip-countdown'
import VueCountdown from '@chenfengyuan/vue-countdown'
Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'profil-umum',
  props: ['user'],
  components: { FlipCountdown },
  data: () => ({
    valid: true,
    ubahNama: false,
    ubahDeskripsi: false,
    formNama: '',
    formDeskripsi: '',
    namaRules: [(v) => !!v || 'Nama harus diisi!'],
    deskripsiRules: [(v) => v.length >= 5 || 'Min. 5 karakter',],
    ubahWA: false,
    formNomorWA: '',
    waRules: [
      (v) => v.length >= 10 || 'Min. 10 karakter',
      (v) =>
        /^[+]?[(]?[0-9]{3,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{1,8}$/im.test(v) ||
        'Nomor hp varus valid',
    ],
    formEmail: '',
    pengguna: [],
    color: '',
    verifikasialamat: false,
    pelanggaran: false,
    pelanggaranDetail: false,
    wanprestasi:[],
    InfoPelanggaran: [
      {
        img: '/img/onecancel.png',
        warning: '1x',
      },
      {
        img: '/img/twocancel.png',
        warning: '2x',
      },
      {
        img: '/img/threecancel.png',
        warning: '3x',
      },
    ],
    verifikasiFoto:false,
    kodeVerifikasi:'',
    fotoVerifikasi: null,
    previewUrl: '/img/icons/thumbnail/ic_upload_image.webp',
    idGetCountdown: '',
    countdownBeku:'',
    logVerifikasi: [],
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
    }),
    async saveData(param, value) {
      if (this.valid) {
        let formData = new FormData()

        formData.set(param, value)
        formData.set('id', this.user.id)

        await this.$axios
          .put('/user/v3/user', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            if (param === 'nama') this.ubahNama = false
            if (param === 'nomor_whatsapp') this.ubahWA = false
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.setAuth(data.data[0])
            this.$cookies.set('user', JSON.stringify(data.data[0]))
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })

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
      } else {
        this.setAlert({
          status: true,
          color: 'error',
          text: 'Terdapat kesalahan pengisian',
        })
      }
    },
    async googleLogin(tokenGoogle, email) {
      let formData = new FormData()
      formData.set('email', email)
      formData.set('id_token', tokenGoogle)
      formData.set('id', this.user.id)

      await this.$axios
        .put('/user/v3/user', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.formEmail = this.user.email
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setAuth(data.data[0])
          this.$cookies.set('user', JSON.stringify(data.data[0]))
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

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
    async getUsers() {
      await this.$axios
        .get('/user/v3/user', {
          params: {
            id: this.user.id,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.pengguna = data[0]
          if (
            this.pengguna.id_type_pinalti == 1 ||
            this.pengguna.id_type_pinalti == 2
          ) {
            this.color = 'deep-orange darken-4'
          } else if (this.pengguna.id_type_pinalti == 3) {
            this.color = 'red darken-4'
          } else {
            this.color = 'green'
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getWanprestasi(){
      await this.$axios
        .get('/transaksi/v3/riwayat_wanprestasi', {
          params: {
            id_app_user: this.user.id,
            limit: 30,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.wanprestasi = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    onFileChange() {
      if (!this.fotoVerifikasi) {
        return false
      }
      if (!this.fotoVerifikasi.type.match('image.*')) {
        return false
      }

      this.hasImage = true

      const reader = new FileReader()

      reader.onload = (e) => {
        this.previewUrl = e.target.result
      }
      reader.readAsDataURL(this.fotoVerifikasi)
      console.log(this.previewUrl)
    },
    async verifikasiAlamat(){
      

      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('foto', this.fotoVerifikasi)
      formData.set('pin', this.kodeVerifikasi)

      await this.$axios
        .post('/user/v3/user/user_confirm_verifikasi_alamat', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.verifikasiFoto = false
          this.getUsers()
          this.getWanprestasi()
          console.log('kode verifikasi',this.kodeVerifikasi)
          console.log('foto',this.fotoVerifikasi)
          console.log('id_app_user',this.user.id)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
          this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
        })
    },
    async getCountdownBeku(){
      await this.$axios
        .get('/iklan/v3/iklan_tb_mokas', {
          params: {
            id: this.idGetCountdown,
          },
        })
        .then((response) => {
          let { data } = response.data
          console.log('server time', data)
          let now = this.moment
            .utc(data.server_time)
            .add(this.utc, 'h')
            .toDate()
          now.setDate(now.getDate() - 1)
          console.log('data', data)

          let d = this.moment
            .utc(this.pengguna.end_time_beku)
            .add(this.utc, 'h')
            .toDate()
          d.setDate(d.getDate() - 1)

          this.countdownBeku = d - now
          console.log('countdown beku', this.countdownBeku)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getLogVerifikasiAlamat(){
      await this.$axios
        .get('/log/v3/log/user/moderasi_verifikasi_alamat', {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.logVerifikasi = data
          console.log('data', this.logVerifikasi)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    this.formNama = this.user.nama
    this.formDeskripsi = this.user.deskripsi
    this.formNomorWA = this.user.nomor_whatsapp
    this.formEmail = this.user.email

    await this.getUsers()
    await this.getWanprestasi()
    this.idGetCountdown = this.wanprestasi[0].id_iklan
    await this.getCountdownBeku()
    await this.getLogVerifikasiAlamat()
    console.log(this.wanprestasi)
    console.log(this.pengguna)
    this.sekarang = new Date()
    this.d = this.moment
              .utc(this.pengguna.end_time_beku)
              .add(this.utc, 'h')
              .toDate()
            this.d.setDate(this.d.getDate() - 1)
    // this.d = this.pengguna.end_time_beku
    // this.dm = this.moment
    //   .utc(this.pengguna.end_time_beku)
    //   .toDate()
    // this.dm.setDate(this.dm.getDate())
    // console.log('now', this.now)
    // console.log('d', this.d)
    // this.countdown = this.pengguna.end_time_beku - this.sekarang
    // console.log('now', this.now)
    console.log('detail user', this.user)
    console.log('detail pengguna', this.pengguna)
    console.log('countdown beku', this.countdownBeku)
    console.log('wanprestasi ke 0', this.idGetCountdown)
    // console.log('dm', this.dm)
    // console.log('countdown', this.countdown)
  },
  async mounted() {
    if (this.user.email === null) {
      var uiConfig = {
        signInOptions: [
          {
            provider: this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
          },
        ],
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            if (authResult) {
              var user = authResult.user
              var credential = authResult.credential
              this.googleLogin(credential.idToken, user.email)
            }
            return false
          },
        },
      }
      var ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(this.$fireModule.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  },
}
</script>

<style>
#riwayat{
  height: 200px;
  overflow-y: scroll;
}
#foto{
  display: none;
}
</style>