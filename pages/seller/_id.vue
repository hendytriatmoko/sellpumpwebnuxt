<template>
  <div>
    <app-bar />
    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <br />
    <div
      style="max-width: 1240px; margin: 0 auto !important"
      v-if="$vuetify.breakpoint.xs"
    >
      <v-card rounded="t-xl" raised>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-list>
              <v-list-item>
                <v-list-item-avatar
                  :size="$vuetify.breakpoint.xs == true ? 50 : 70"
                >
                  <v-img
                    src="/img/icons/people.webp"
                    contain
                    v-if="seller.photo == 'null'"
                  ></v-img>

                  <v-img :src="getImage(seller.photo)" v-else></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="d-flex flex-nowrap align-center">
                    <v-avatar
                      size="24"
                      item
                      class="mr-1"
                      v-if="seller.id_mst_user_type == 2"
                    >
                      <v-img
                        src="/img/verified.png"
                        alt="verified"
                        width="15"
                        height="15"
                        contain
                      ></v-img>
                    </v-avatar>

                    <div class="text-sm-h5 text-subtitle-1">
                      {{ seller.nama }}
                    </div>
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-avatar size="24" item class="mr-1">
                      <v-img :src="gbrRatting" alt="verified" contain></v-img>
                    </v-avatar>
                    <span v-if="avg.ratting_user == 0">Belum Ada Ulasan</span>
                    <span v-if="avg.ratting_user == 1">Cukup Memuaskan</span>
                    <span v-if="avg.ratting_user == 2">Memuaskan</span>
                    <span v-if="avg.ratting_user == 3">Sangat Memuaskan</span>
                  </v-list-item-title>
                  <v-list-item-title>
                    <v-icon>mdi-map-marker</v-icon>
                    {{
                      seller.kota == null
                        ? 'Belum Set Lokasi'
                        : seller.kota == ''
                        ? 'Belum Set Lokasi'
                        : seller.kota
                    }}
                  </v-list-item-title>
                  <v-list-item-title
                    class="d-flex align-center justify-space-between"
                  >
                    <div>Terverifikasi</div>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.email_verified == true
                                ? '/img/penilaian/mail_active.webp'
                                : '/img/penilaian/mail_active.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.email_verified == true"
                        >Email Terverifikasi</span
                      >
                      <span v-if="seller.email_verified == false"
                        >Email Belum Terverifikasi</span
                      >
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.nomor_hp_verified == true
                                ? '/img/penilaian/phone_active.webp'
                                : '/img/penilaian/phone_inactive.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.nomor_hp_verified == true"
                        >Nomor Hp Terverifikasi</span
                      >
                      <span v-if="seller.nomor_hp_verified == false"
                        >Nomor Hp Belum Terverifikasi</span
                      >
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.alamat_verified == true
                                ? '/img/penilaian/loc_active.webp'
                                : '/img/penilaian/loc_inactive.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.alamat_verified == true"
                        >Alamat Terverifikasi</span
                      >
                      <span v-if="seller.alamat_verified == false"
                        >Alamat Belum Terverifikasi</span
                      >
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.status_dokumen_ktp == 'Verifikasi'
                                ? '/img/penilaian/ktp_active.webp'
                                : '/img/penilaian/ktp_inactive.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.status_dokumen_ktp == 'Verifikasi'"
                        >KTP Terverifikasi</span
                      >
                      <span v-if="seller.status_dokumen_ktp != 'Verifikasi'"
                        >KTP Belum Terverifikasi</span
                      >
                    </v-tooltip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-divider> </v-divider>
          <v-col cols="12" sm="3">
            <!-- <v-card-actions style="margin-right: 2%">
              <v-spacer></v-spacer>
              <v-btn color="white" style="color: #20929d" @click="dialogInfo = true">
                Info Penjual
              </v-btn>
            </v-card-actions> -->
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="d-flex align-center justify-space-between">
          <h4>
            <span style="color: #ffd200">
              Ulasan: &nbsp; {{ avg.ratting_iklan }}/5.0
            </span>
          </h4>
          <h4>
            Produk Terjual: &nbsp;
            <span style="color: #20929d">
              {{ pembayaranTerverifikasi.total }}
            </span>
          </h4>
          <h4>
            Dibatalkan Penjual:&nbsp;
            <span style="color: #eb5757">
              {{ dibatalkanPenjual.total }}
            </span>
          </h4>
        </div>
        <v-card-actions class="mx-10">
          <center>
            <v-btn
              color="#20929D"
              small
              class="white--text"
              :to="'/message?id=' + sellerid"
            >
              Chat
            </v-btn>
            <v-btn
              color="#20929D"
              small
              class="white--text"
              @click="dialogHubungi = true"
            >
              Hubungi
            </v-btn>
            <v-btn
              small
              color="white"
              style="color: #20929d"
              @click="dialogInfo = true"
            >
              Info Penjual
            </v-btn>
          </center>
        </v-card-actions>
      </v-card>
    </div>
    <div style="max-width: 1240px; margin: 0 auto !important" v-else>
      <v-card rounded="t-xl" raised>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-list>
              <v-list-item>
                <v-list-item-avatar
                  :size="$vuetify.breakpoint.xs == true ? 50 : 70"
                >
                  <v-img
                    src="/img/icons/people.webp"
                    contain
                    v-if="seller.photo == 'null'"
                  ></v-img>

                  <v-img :src="getImage(seller.photo)" v-else></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="d-flex flex-nowrap align-center">
                    <v-avatar
                      size="24"
                      item
                      class="mr-1"
                      v-if="seller.id_mst_user_type == 2"
                    >
                      <v-img
                        src="/img/verified.png"
                        alt="verified"
                        width="15"
                        height="15"
                        contain
                      ></v-img>
                    </v-avatar>

                    <div class="text-sm-h5 text-subtitle-1">
                      {{ seller.nama }}
                    </div>
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-avatar size="24" item class="mr-1">
                      <v-img :src="gbrRatting" alt="verified" contain></v-img>
                    </v-avatar>
                    <span v-if="avg.ratting_user == 0">Belum Ada Ulasan</span>
                    <span v-if="avg.ratting_user == 1">Cukup Memuaskan</span>
                    <span v-if="avg.ratting_user == 2">Memuaskan</span>
                    <span v-if="avg.ratting_user == 3">Sangat Memuaskan</span>
                    <v-icon>mdi-circle-medium</v-icon>
                    {{
                      seller.kota == null
                        ? 'belum set lokasi'
                        : seller.kota == ''
                        ? 'belum set lokasi'
                        : seller.kota
                    }}
                  </v-list-item-title>
                  <v-list-item-title
                    class="d-flex align-center justify-space-between"
                  >
                    <div>Terverifikasi</div>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.email_verified == true
                                ? '/img/penilaian/mail_active.webp'
                                : '/img/penilaian/mail_active.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.email_verified == true"
                        >Email Terverifikasi</span
                      >
                      <span v-if="seller.email_verified == false"
                        >Email Belum Terverifikasi</span
                      >
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.nomor_hp_verified == true
                                ? '/img/penilaian/phone_active.webp'
                                : '/img/penilaian/phone_inactive.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.nomor_hp_verified == true"
                        >Nomor Hp Terverifikasi</span
                      >
                      <span v-if="seller.nomor_hp_verified == false"
                        >Nomor Hp Belum Terverifikasi</span
                      >
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.alamat_verified == true
                                ? '/img/penilaian/loc_active.webp'
                                : '/img/penilaian/loc_inactive.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.alamat_verified == true"
                        >Alamat Terverifikasi</span
                      >
                      <span v-if="seller.alamat_verified == false"
                        >Alamat Belum Terverifikasi</span
                      >
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        style="background: red"
                      >
                        <v-btn
                          text
                          height="47"
                          style="background: red"
                          class="white"
                          v-on="on"
                        >
                          <v-img
                            :src="
                              seller.status_dokumen_ktp == 'Verifikasi'
                                ? '/img/penilaian/ktp_active.webp'
                                : '/img/penilaian/ktp_inactive.webp'
                            "
                            alt="verified"
                            style="width: 20px"
                            contain
                          ></v-img>
                        </v-btn>
                      </template>

                      <span v-if="seller.status_dokumen_ktp == 'Verifikasi'"
                        >KTP Terverifikasi</span
                      >
                      <span v-if="seller.status_dokumen_ktp != 'Verifikasi'"
                        >KTP Belum Terverifikasi</span
                      >
                    </v-tooltip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card-actions style="margin-right: 2%">
              <v-spacer></v-spacer>
              <v-btn
                color="#20929D"
                class="white--text"
                :to="'/message?id=' + sellerid"
              >
                Chat
              </v-btn>
              <v-btn
                color="#20929D"
                class="white--text"
                @click="dialogHubungi = true"
              >
                Hubungi
              </v-btn>
            </v-card-actions>
            <v-card-actions style="margin-right: 2%">
              <v-spacer></v-spacer>
              <v-btn
                color="white"
                style="color: #20929d"
                @click="dialogInfo = true"
              >
                Info Penjual
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="d-flex align-center justify-space-between mx-5">
          <h4>
            Ulasan :&nbsp;
            <span style="color: #ffd200"> {{ avg.ratting_iklan }}/5.0 </span>
          </h4>
          <h4>
            Produk Terjual :&nbsp;
            <span style="color: #20929d">
              {{ pembayaranTerverifikasi.total }}
            </span>
          </h4>
          <h4>
            Dibatalkan Penjual :&nbsp;
            <span style="color: #eb5757">
              {{ dibatalkanPenjual.total }}
            </span>
          </h4>
        </div>
      </v-card>
    </div>

    <br />
    <div style="max-width: 1240px; margin: 0 auto !important">
      <!-- <v-card rounded="t-xl" raised>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-list>
              <v-list-item>
                <v-list-item-avatar
                  :size="$vuetify.breakpoint.xs == true ? 50 : 70"
                >
                  <v-img
                    src="/img/icons/people.webp"
                    contain
                    v-if="seller.photo == 'null'"
                  ></v-img>

                  <v-img :src="getImage(seller.photo)" v-else></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="d-flex flex-nowrap align-center">
                    <v-avatar
                      size="24"
                      item
                      class="mr-1"
                      v-if="seller.id_mst_user_type == 2"
                    >
                      <v-img
                        src="/img/verified.png"
                        alt="verified"
                        width="15"
                        height="15"
                        contain
                      ></v-img>
                    </v-avatar>

                    <div class="text-sm-h5 text-subtitle-1">
                      {{ seller.nama }}
                    </div>
                  </v-list-item-title>

                  <v-list-item-subtitle class="teal--text">
                    <v-icon>mdi-map-marker</v-icon>
                    {{
                      seller.kota == null
                        ? 'belum set lokasi'
                        : seller.kota == ''
                        ? 'belum set lokasi'
                        : seller.kota
                    }}
                  </v-list-item-subtitle>
                  <v-list-item-title class="d-flex align-center justify-space-between">
                    <div>Terverifikasi</div>
                    <v-tooltip
                      bottom
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn text height="47" class="white" v-on="on" @click="edit">
                          <v-icon left>mdi-pencil</v-icon> Mail
                        </v-btn>
                      </template>

                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip
                      bottom
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn text height="47" class="white" v-on="on" @click="edit">
                          <v-icon left>mdi-pencil</v-icon> Mail
                        </v-btn>
                      </template>

                      <span>Edit</span>
                    </v-tooltip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-row justify="space-around" class="my-1">
              <v-btn small color="#20929D" dark @click="dialogHubungi = true">
                Hubungi
              </v-btn>

              <v-btn small color="#20929D" dark :to="'/message?id=' + sellerid">
                Chat
              </v-btn>

              <v-btn small color="#20929D" outlined @click="dialogInfo = true">
                Info
              </v-btn>
            </v-row>

            
          </v-col>

          <v-col cols="12" sm="6">
            <v-row>
              <v-col cols="12" sm="6" align="center">
                <div class="text-h6">Ulasan Penjual</div>
                <div class="text" v-if="avg.ratting_user == 0">
                  Belum ada ulasan
                </div>

                <div v-if="avg.ratting_user == 1">
                  <v-avatar size="32" item>
                    <v-img
                      src="/img/icons/emoji_tidakpuas.png"
                      alt="rating"
                    ></v-img>
                  </v-avatar>

                  <div>Cukup memuaskan</div>
                </div>

                <div v-if="avg.ratting_user == 2">
                  <v-avatar size="32" item>
                    <v-img
                      src="/img/icons/emoji_netral.png"
                      alt="rating"
                    ></v-img>
                  </v-avatar>

                  <div>Memuaskan</div>
                </div>

                <div v-if="avg.ratting_user == 3">
                  <v-avatar size="32" item>
                    <v-img src="/img/icons/emoji_puas.png" alt="rating"></v-img>
                  </v-avatar>

                  <div>Sangat Memuaskan</div>
                </div>
              </v-col>

              <v-col cols="12" sm="6" align="center">
                <div class="text-h6">Nilai Kualitas Unit</div>

                <div class="d-flex align-center justify-center">
                  <h3 class="mr-1">{{ avg.ratting_iklan }}</h3>

                  <v-rating
                    v-model="avg.ratting_iklan"
                    color="yellow"
                    dense
                    readonly
                  ></v-rating>
                </div>

                ( {{ totalReview }} Ulasan )
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <br /> -->

      <v-tabs
        v-model="tab"
        background-color="#ffffff"
        slider-color="#008693"
        show-arrows
        class="mt-2"
      >
        <v-tab>Iklan</v-tab>
        <v-tab>Ulasan</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <br />

            <v-row>
              <v-col cols="12" sm="3">
                <v-card outlined class="ml-2">
                  <v-list subheader>
                    <v-subheader>Etalase</v-subheader>

                    <v-list-item-group v-model="menu" color="#20929D">
                      <v-list-item @click="allUnit">
                        <v-list-item-title>Semua Iklan</v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        @click="tbHariIni"
                        v-show="tglHariIni == false ? false : true"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            Tawar Bersama hari ini
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ tanggal_hari_ini }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item @click="daftarIB">
                        <v-list-item-title>Iklan Baris</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="daftarAS">
                        <v-list-item-title
                          >Aksesoris & Suku Cadang</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="daftarTaBer">
                        <v-list-item-title>Tawar Bersama</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>

              <v-col cols="12" sm="9">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  flat
                  label="Cari Judul Iklan"
                  prepend-inner-icon="mdi-magnify"
                  v-model="keyword"
                  @keyup="daftarTB"
                ></v-text-field>

                <!-- <v-bottom-sheet v-model="sheet">
                  <v-sheet height="170">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <h3>Filter</h3>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Urutkan Berdasarkan
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-radio-group v-model="order" row dense>
                          <v-radio
                            label="Postingan Terbaru"
                            value="posting_terbaru"
                          ></v-radio>
                          <v-radio
                            label="Tawar Bersama dimulai"
                            value="tanggal_mulai"
                          ></v-radio>
                        </v-radio-group>
                      </v-list-item>

                      <v-list-item>
                        <v-btn block shaped color="success" @click="saveFilter">
                          Simpan
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-sheet>
                </v-bottom-sheet> -->

                <br />

                <v-row v-if="hits != null">
                  <v-col
                    cols="6"
                    sm="3"
                    v-for="item in hits"
                    :key="item._source.id"
                  >
                    <list-iklan :item="item" />
                  </v-col>
                </v-row>
                <div v-else>
                  <h2>Belum ada iklan</h2>
                </div>

                <br />
                <v-pagination
                  v-model="page"
                  @input="daftarTB"
                  :length="lengthPage"
                  :total-visible="5"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <div v-if="ulasanSaya.length > 0" class="ml-4">
            <v-card
              outlined
              class="mt-2 mb-4 rounded-lg"
              v-for="item in ulasanSaya"
              :key="item.id"
            >
              <v-row no-gutters>
                <!-- <v-col cols="12" sm="2" align="center">
                  <v-card flat class="pa-2" :href="'/iklan/' + item.id_iklan">
                    <v-img
                      :src="getImage(item.foto_iklan)"
                      height="110"
                    ></v-img>

                    <div class="teal--text">{{ item.judul_iklan }}</div>
                  </v-card>
                </v-col> -->

                <v-col cols="12" sm="12" class="d-flex">
                  <v-divider vertical></v-divider>

                  <div class="flex-column flex-grow-1 ml-4">
                    <v-list>
                      <v-list-item flat :href="'/iklan/' + item.id_iklan">
                        <v-img
                          :src="getImage(item.foto_iklan)"
                          max-height="60"
                          max-width="60"
                        ></v-img>
                        &nbsp; &nbsp;
                        <v-list-item-content>
                          <v-list-item-title class="d-flex align-center">
                            <b> {{ item.judul_iklan }} </b>
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-card-actions style="margin-right: 2%">
                            <v-spacer></v-spacer>
                            <v-btn dark color="#E9554B" small>
                              Keterangan
                            </v-btn>
                          </v-card-actions>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-avatar size="60">
                          <v-img
                            src="/img/icons/people.webp"
                            contain
                            v-if="item.app_user_foto_pembeli == ''"
                          ></v-img>

                          <v-img
                            class="rounded-lg"
                            :src="getImage(item.app_user_foto_pembeli)"
                            v-else
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title class="d-flex align-center">
                            <b>{{ item.app_user_name_pembeli }}</b>
                          </v-list-item-title>
                          <v-rating
                            v-model="item.ratting_iklan"
                            color="yellow"
                            dense
                          ></v-rating>

                          <div class="d-flex text-caption">
                            <div v-if="item.ratting_user == 0">
                              <v-avatar size="25" item>
                                <v-img
                                  src="/img/penilaian/ic_tdk_nilai.webp"
                                ></v-img>
                              </v-avatar>

                              Belum ada ulasan
                            </div>
                            <div v-if="item.ratting_user == 1">
                              <v-avatar size="25" item>
                                <v-img
                                  src="/img/penilaian/ic_tdk_puas.webp"
                                  alt="kecewa"
                                ></v-img>
                              </v-avatar>

                              Kurang Memuaskan
                            </div>

                            <div v-if="item.ratting_user == 2">
                              <v-avatar size="25" item>
                                <v-img
                                  src="/img/penilaian/ic_ckp_puas.webp"
                                  alt="netral"
                                ></v-img>
                              </v-avatar>

                              Cukup Memuaskan
                            </div>

                            <div v-if="item.ratting_user == 3">
                              <v-avatar size="25" item>
                                <v-img
                                  src="/img/penilaian/ic_sngt_puas.webp"
                                  alt="puas"
                                ></v-img>
                              </v-avatar>

                              Sangat Memuaskan
                            </div>
                            &nbsp;
                            <div>
                              <span class="grey--text">
                                {{
                                  moment(item.created_at)
                                    .add(utc, 'h')
                                    .format('YYYY-MM-DD HH:mm')
                                }}
                                {{ timezone }}
                              </span>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item class="ml-16">
                        <v-list-item-content>
                          <!-- <v-list-item-title class="d-flex align-center">
                            <b>{{ item.app_user_name_pembeli }}</b>
                       
                          </v-list-item-title> -->

                          <div class="ml-3">{{ item.review }}</div>

                          <div
                            v-viewer="{ movable: false }"
                            class="d-flex flex-wrap mt-2"
                          >
                            <v-card flat class="mx-1" v-if="item.foto_1 != ''">
                              <img
                                :src="getImage(item.foto_1)"
                                contain
                                width="130"
                                height="80"
                                style="cursor: pointer"
                              />
                            </v-card>

                            <v-card flat class="mx-1" v-if="item.foto_2 != ''">
                              <img
                                :src="getImage(item.foto_2)"
                                contain
                                width="130"
                                height="80"
                                style="cursor: pointer"
                              />
                            </v-card>

                            <v-card flat class="mx-1" v-if="item.foto_3 != ''">
                              <img
                                :src="getImage(item.foto_3)"
                                contain
                                width="130"
                                height="80"
                                style="cursor: pointer"
                              />
                            </v-card>

                            <v-card flat class="mx-1" v-if="item.foto_4 != ''">
                              <img
                                :src="getImage(item.foto_4)"
                                contain
                                width="130"
                                height="80"
                                style="cursor: pointer"
                              />
                            </v-card>

                            <v-card flat class="mx-1" v-if="item.foto_5 != ''">
                              <img
                                :src="getImage(item.foto_5)"
                                contain
                                width="130"
                                height="80"
                                style="cursor: pointer"
                              />
                            </v-card>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <div class="mx-4"></div>

                    <v-divider></v-divider>

                    <div v-if="item.Reply != null">
                      <v-list>
                        <v-list-item>
                          <v-list-item-avatar tile>
                            <v-icon v-if="item.app_user_foto_penjual == ''">
                              mdi-account-circle
                            </v-icon>

                            <v-img
                              class="rounded-lg"
                              :src="getImage(item.app_user_foto_penjual)"
                              v-else
                            ></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.app_user_name_penjual }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                              <span
                                class="green pa-1 white--text text-caption mr-1"
                              >
                                Penjual
                              </span>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>

                      <div class="mx-4 mb-2">
                        {{ item.Reply[0].reply }}
                      </div>
                    </div>

                    <div v-else>
                      <span class="font-italic ml-4 mt-4">belum diulas penjual </span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <v-pagination
              v-model="page"
              @input="myReview"
              :length="lengthPageReview"
              :total-visible="5"
            ></v-pagination>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="dialogHubungi" persistent max-width="400px">
      <v-card>
        <v-card-title class="teal">
          <div class="white--text">Hubungi</div>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="dialogHubungi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container> Tanyakan lebih lanjut kepada penjual </v-container>

        <div class="d-flex justify-space-around pb-2">
          <v-btn color="teal" dark :href="'tel:' + seller.nomor_hp">
            Telepon
          </v-btn>

          <v-btn color="teal" dark :href="'sms:' + seller.nomor_hp">
            SMS
          </v-btn>

          <v-btn
            color="teal"
            dark
            :href="
              'https://api.whatsapp.com/send?phone=' +
              seller.nomor_hp +
              '&text=Hai, saya dari aplikasi SiMotor'
            "
          >
            WhatsApp
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogInfo" persistent max-width="600px">
      <v-card>
        <v-card-title class="teal">
          <div class="white--text">Info Penjual</div>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="dialogInfo = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <div><b> Deskripsi Toko: </b></div>
              <div>
                {{
                  seller.deskripsi == ''
                    ? 'belum ada deskripsi'
                    : seller.deskripsi == null
                    ? 'belum ada deskripsi'
                    : seller.deskripsi
                }}
              </div>

              <br />

              <div><b> Slogan Toko: </b></div>
              <div>
                {{ slogan == '' ? 'belum ada slogan' : slogan }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div><b> Catatan & Kebijakan Penjual </b></div>

              <div v-if="catatan.length > 0 && kebijakan != undefined">
                <v-expansion-panels focusable inset>
                  <v-expansion-panel v-for="item in catatan" :key="item.id">
                    <v-expansion-panel-header>
                      <b>{{ item.judul }}</b>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div v-html="item.deskripsi"></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <br />

                <v-expansion-panels
                  focusable
                  inset
                  v-if="kebijakan != undefined"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header class="font-weight-bold">
                      Kebijakan:
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div v-html="kebijakan.deskripsi"></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>

              <div v-else>belum ada catatan dan kebijakan</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'

Vue.use(Viewer)

export default {
  name: 'seller',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
    Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    seller: [],
    title: '',
    slogan: '',
    catatan: [],
    kebijakan: [],
    ulasanSaya: [],
    avg: [],
    totalReview: 0,
    dialogHubungi: false,
    dialogInfo: false,
    tab: 0,
    menu: 0,
    iklan_jenis: null,
    tanggal_mulai: null,
    keyword: '',
    tglHariIni: false,
    tanggal_hari_ini: '',
    hits: [],
    page: 1,
    limit: 20,
    total: 0,
    lengthPage: 0,
    gbrRatting: '',
    dataverifikasi: [
      {
        active: '/img/penilaian/mail_active.webp',
        inactive: '/img/penilaian/mail_inactive.webp',
        spanactive: 'Email Terverifikasi',
        spaninactive: 'Email Belum Terverifikasi',
      },
      {
        active: '/img/penilaian/phone_active.webp',
        inactive: '/img/penilaian/phone_inactive.webp',
        spanactive: 'Nomor Terverifikasi',
        spaninactive: 'Nomor Belum Terverifikasi',
      },
      {
        active: '/img/penilaian/loc_active.webp',
        inactive: '/img/penilaian/loc_inactive.webp',
        spanactive: 'Alamat Terverifikasi',
        spaninactive: 'Alamat Belum Terverifikasi',
      },
      {
        active: '/img/penilaian/ktp_active.webp',
        inactive: '/img/penilaian/ktp_inactive.webp',
        spanactive: 'KTP Terverifikasi',
        spaninactive: 'KTP Belum Terverifikasi',
      },
    ],
    statistik: [],
    pembayaranTerverifikasi: [],
    dibatalkanPenjual: [],
    menungguPembayaran: [],
    idPenjual: '',
  }),
  computed: {
    ...mapGetters({
      sellerid: 'product/sellerid',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    async sellerInfo() {
      await this.$axios
        .get('/user/v3/user', {
          params: {
            id: this.idPenjual,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.seller = data[0]

          this.title = this.seller.nama
          console.log('seller info', this.seller)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async statistikPenjual() {
      await this.$axios
        .get('/transaksi/v3/statistik_penjual', {
          params: {
            id_penjual: this.idPenjual,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.statistik = data
          for (let i = 0; i < this.statistik.length; i++) {
            if (this.statistik[i].id_mst_pembayaran_status == 1) {
              this.menungguPembayaran = this.statistik[i]
            }
            if (this.statistik[i].id_mst_pembayaran_status == 2) {
              this.pembayaranTerverifikasi = this.statistik[i]
            }
            if (this.statistik[i].id_mst_pembayaran_status == 11) {
              this.dibatalkanPenjual = this.statistik[i]
            }
          }

          console.log('data menungguPembayaran', this.menungguPembayaran)
          console.log(
            'data pembayaranTerverifikasi',
            this.pembayaranTerverifikasi
          )
          console.log('data dibatalkanPenjual', this.dibatalkanPenjual)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getSlogan() {
      await this.$axios
        .get('/user/v3/user/slogan_penjual', {
          params: {
            id_app_user: this.seller.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          if (data.length > 0) {
            this.slogan = data[0].slogan
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getCatatan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.seller.id,
            type_catatan: 2,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.catatan = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getKebijakan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.seller.id,
            type_catatan: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.kebijakan = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async myReview() {
      let offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/transaksi/v3/review', {
          params: {
            id_penjual: this.seller.id,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.ulasanSaya = data

          this.totalReview = response.data.count
          this.lengthPageReview = Math.ceil(this.totalReview / this.limit)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async reviewAvg() {
      await this.$axios
        .get('/transaksi/v3/review_avg', {
          params: {
            id_penjual: this.seller.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.avg = data[0]
          if (this.avg.ratting_user == 0) {
            this.gbrRatting = '/img/penilaian/ic_tdk_nilai.webp'
          }
          if (this.avg.ratting_user == 1) {
            this.gbrRatting = '/img/penilaian/ic_tdk_puas.webp'
          }
          if (this.avg.ratting_user == 2) {
            this.gbrRatting = '/img/penilaian/ic_ckp_puas.webp'
          }
          if (this.avg.ratting_user == 3) {
            this.gbrRatting = '/img/penilaian/ic_sngt_puas.webp'
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async daftarTB() {
      var offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/search/v4/search_home', {
          params: {
            id_app_user: this.seller.id,
            tanggal_mulai: this.tanggal_mulai,
            id_mst_iklan_status: 1,
            id_mst_iklan_jenis: this.iklan_jenis,
            sort: this.order,
            search: this.keyword,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits = hits

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async allUnit() {
      this.iklan_jenis = null
      this.tanggal_mulai = null
      this.daftarTB()
    },
    async daftarIB() {
      this.iklan_jenis = 1
      this.tanggal_mulai = null
      this.daftarTB()
    },
    async daftarAS() {
      this.iklan_jenis = 5
      this.tanggal_mulai = null
      this.daftarTB()
    },
    async daftarTaBer() {
      this.iklan_jenis = 2
      this.tanggal_mulai = null
      this.daftarTB()
    },
    async tbHariIni() {
      this.iklan_jenis = 2
      this.tanggal_mulai = this.$route.query.tgl
      this.daftarTB()
    },
  },
  async created() {
    if (this.$route.query.tgl == undefined) {
      this.tanggal_mulai = null
      this.tglHariIni = false
      this.rute = this.$route.params.id.replace(/-/g, ' ')
      this.rute = this.rute.split(' ')
      this.idPenjual = this.rute[this.rute.length - 1]
      console.log('idPenjual', this.idPenjual)
    } else {
      this.rute = this.$route.params.id.replace(/-/g, ' ')
      this.rute = this.rute.split(' ')
      this.idPenjual = this.rute[this.rute.length - 1]
      console.log('idPenjual', this.idPenjual)
      this.tanggal_mulai = this.$route.query.tgl
      this.tglHariIni = true
      this.tanggal_hari_ini = this.$route.query.tgl
    }
    await this.sellerInfo()
    await this.statistikPenjual()
    await this.getSlogan()
    await this.getCatatan()
    await this.getKebijakan()
    await this.reviewAvg()
    await this.daftarTB()
    // if (this.menu == 1) {
    //   await this.daftarTB()
    // }
    // if (this.menu == 0) {
    //   await this.allUnit()
    // }
    await this.myReview()

    this.menu = this.$route.query.tgl == undefined ? 0 : 1
    console.log('avg', this.avg)
    console.log('query tanggal', this.$route.query.tgl)
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>

<style>
</style>