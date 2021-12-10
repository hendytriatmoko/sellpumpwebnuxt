<template>
  <div>
    <section id="info-tb" class="mt-2">
      <v-row>
        <v-col cols="12" sm="4">
          <v-carousel
            v-model="carousel"
            hide-delimiters
            hide-delimiter-background
            show-arrows
            show-arrows-on-hover
            height="400"
          >
            <v-carousel-item
              v-for="(item, index) in fotos"
              :key="index"
              :src="getImage(item.src)"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>

          <div class="d-flex flex-wrap justify-space-between mt-2">
            <v-card
              rounded="lg"
              hover
              v-for="(item, index) in fotos"
              :key="index"
              @click="carousel = index"
            >
              <v-img :src="getThumb(item.src)" width="65" height="65"></v-img>
            </v-card>
          </div>
          <div class="mx-4 my-2">
            <v-tooltip bottom v-if="!guest">
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  height="47"
                  class="white"
                  v-on="on"
                  @click="doFavorit"
                >
                  <v-icon left v-if="favorit == undefined || favorit.length == 0">
                    mdi-heart-outline
                  </v-icon>
                  <v-icon color="red" left v-else>mdi-heart</v-icon>
                  Favorit
                </v-btn>
              </template>
              <span>Favorit</span>
            </v-tooltip>

            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text height="47" class="white" v-bind="attrs" v-on="on">
                  <v-icon left>mdi-share-variant-outline</v-icon> Bagikan
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(network, index) in networks" :key="index">
                  <ShareNetwork
                    :network="network.network"
                    :key="network.network"
                    :style="{ backgroundColor: network.color }"
                    :url="sharing.url"
                    :title="sharing.title"
                    :description="sharing.description"
                    :quote="sharing.quote"
                    :hashtags="sharing.hashtags"
                    :twitterUser="sharing.twitterUser"
                  >
                    <i :class="network.icon"></i>
                    <span>{{ network.name }}</span>
                  </ShareNetwork>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-tooltip
              bottom
              v-if="
              iklan.id_app_user == user.id && iklan.id_mst_iklan_status != 2
            "
            >
              <template v-slot:activator="{ on }">
                <v-btn text height="47" class="white" v-on="on" @click="edit">
                  <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>
          </div>
        </v-col>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Iklan</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="judul"
                  label="Judul Iklan"
                  outlined
                  dense
                  :rules="formRules"
                ></v-text-field>

                <v-text-field
                  v-model="deskripsi"
                  label="Deskripsi Iklan"
                  outlined
                  dense
                  :rules="formRules"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#20929D"
                :disabled="!valid"
                class="white--text"
                @click="updateIklan"
              >
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-col cols="12" sm="5">
          <v-row>
            <v-col cols="5">Jenis Iklan:</v-col>

            <v-col cols="7" align="right">
              {{ iklan.mst_iklan_jenis }} {{ iklan.mst_iklan_type }}
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <h2>{{ iklan.judul }}</h2>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6">
              <div class="d-flex">
                <div class="flex-column">
                  <div v-if="liveBid.length == 0">
                    <div>Harga Awal:</div>
                    <h2 class="#20929D--text">
                      Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}
                    </h2>
                  </div>

                  <div v-else>
                    <div>Harga Saat Ini:</div>
                    <h2 class="#20929D--text">
                      Rp {{ Number(liveBid[0].Bid).toLocaleString('id-ID') }}
                    </h2>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="6">
              <div class="d-flex align-center justify-end">
                {{
                  iklan.log_iklan_view == undefined ? 1 : iklan.log_iklan_view
                }}x <v-icon>mdi-eye</v-icon>
              </div>
                 <div class="d-flex align-center justify-end" style="color: #20929D">  ID Iklan: {{ productid }} </div>
            </v-col>
          </v-row>

          <v-row>
             <v-col cols="12">
              <h3>Deskripsi</h3>
              <div class="text-justify " style="white-space: pre-wrap;" v-html="iklan.deskripsi"> </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <h3>Tanggal Mulai</h3>
              <div>
                {{
                  moment
                    .utc(iklan.tanggal_mulai)
                    .add(utc, 'h')
                    .format('DD MMM YYYY, HH:mm')
                }}
                {{ timezone }}
              </div>
            </v-col>

            <v-col cols="6">
              <h3>Tanggal Selesai</h3>
              <div>
                {{
                  moment
                    .utc(iklan.tanggal_selesai)
                    .add(utc, 'h')
                    .format('DD MMM YYYY, HH:mm')
                }}
                {{ timezone }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <h3>Tiket dibutuhkan</h3>
              <div>{{ iklan.jumlah_tiket > 0 ? 'Ya' : 'Tidak' }}</div>
            </v-col>

            <v-col cols="6">
              <h3>Jumlah Tiket</h3>
              <div>{{ iklan.jumlah_tiket }} Tiket</div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="3">
          <div :class="$vuetify.breakpoint.xs ? '' : ''">
            <v-card rounded="lg">
              <div
                class="tbt d-flex align-center justify-center"
                style="color: white; background-color: #20929d"
              >
                <div>
                  <img src="/img/Terbuka.png" class="pt-2" width="30" alt="" />
                </div>
                &nbsp;&nbsp;
                <div>Tawar Bersama Terbuka</div>
              </div>
              <v-row>
                <v-col cols="6" sm="6">
                  <center>
                    Harga saat ini <br />
                    <span style="color: #e45528">
                      <h4 v-if="liveBid.length == 0">
                        Rp
                        {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}
                      </h4>
                      <h4 v-else>
                        Rp {{ Number(liveBid[0].Bid).toLocaleString('id-ID') }}
                      </h4>
                    </span>
                  </center>
                </v-col>
                <v-divider vertical class="my-4"></v-divider>
                <v-col cols="5" sm="5">
                  <div v-if="start == false && end == false">
                    <center>
                      Mulai dalam <br />
                      <!-- <span style="color:grey"> -->
                      <div class="pt-1 pb-1 pl-1 pr-1 d-inline-flex">
                        <countdown
                          :time="countdown < 0 ? 0 : countdown"
                          v-slot="{ days, hours, minutes, seconds }"
                          style="font-size: 14px"
                        >
                          {{ days }} h : {{ hours }} j : {{ minutes }} m :
                          {{ seconds }} d
                        </countdown>
                      </div>
                    </center>
                  </div>
                  <div v-if="start == true && end == false">
                    <center>
                      Berlangsung <br />
                      <div
                        class="
                          pt-1
                          pb-1
                          pl-1
                          pr-1
                          d-inline-flex
                          teal
                          white--text
                        "
                      >
                        <countdown
                          :time="countdown2 < 0 ? 0 : countdown2"
                          v-slot="{ days, hours, minutes, seconds }"
                          style="font-size: 10px"
                        >
                          {{ days }} h : {{ hours }} j : {{ minutes }} m :
                          {{ seconds }} d
                        </countdown>
                      </div>
                    </center>
                  </div>
                  <div v-if="start == true && end == true">
                    <center>Tawaran Selesai</center>
                  </div>
                </v-col>
              </v-row>

              <div style="background: #d2e9eb">
                <table style="width: 290px">
                  <tr>
                    <td style="width: 30px">
                      <center>
                        <div
                          style="
                            color: white;
                            width: 25px;
                            background: #20929d;
                            border-radius: 100%;
                          "
                        >
                          ?
                        </div>
                      </center>
                    </td>
                    <td>
                      <center>
                        <div @click="tez" class="stb">
                          Selengkapnya tentang tawar bersama
                        </div>
                      </center>
                    </td>
                    <td><v-icon>mdi-chevron-right</v-icon></td>
                  </tr>
                </table>
              </div>

              

              <v-card-subtitle align="center">
                <div v-if="liveBid.length == 0">
                  <b>Harga awal</b>
                  <div>
                    Kelipatan Tawaran: Rp
                    {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}
                  </div>
                </div>

                <div v-else>
                  <b>Harga saat ini:</b>
                  <div>
                    Kelipatan Tawaran: Rp
                    {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}
                  </div>
                </div>
              </v-card-subtitle>

              <v-card-text align="center">
                <div
                  class="pa-2 mt-2 d-inline-flex grey white--text"
                  v-if="start == false && end == false"
                >
                  <countdown
                    :time="countdown < 0 ? 0 : countdown"
                    v-slot="{ days, hours, minutes, seconds }"
                  >
                    {{ days }} h : {{ hours }} j : {{ minutes }} m :
                    {{ seconds }} d
                  </countdown>
                </div>

                <div
                  class="pa-2 mt-2 d-inline-flex teal white--text"
                  v-if="start == true && end == false"
                >
                  <countdown
                    :time="countdown2 < 0 ? 0 : countdown2"
                    v-slot="{ days, hours, minutes, seconds }"
                  >
                    {{ days }} h : {{ hours }} j : {{ minutes }} m :
                    {{ seconds }} d
                  </countdown>
                </div>
              </v-card-text>

              <hr />

              <v-card-text>
                <div align="center" class="red lighten-4" v-if="guest">
                  <b>Anda harus masuk untuk menawar.</b>
                  <div>
                    Penawaran dibatasi hanya untuk pengguna yang masuk.
                    <nuxt-link to="/login">Masuk</nuxt-link> atau
                    <nuxt-link to="/register">Daftar</nuxt-link> sekarang
                  </div>
                </div>

                <div v-else>
                  <div v-if="iklan.id_app_user != user.id">
                    <div v-if="start == true && end == false">
                      <div align="center" v-if="check == undefined">
                        <v-btn color="#20929D" dark small @click="ikutTB()">
                          Ikut Tawar Bersama
                        </v-btn>
                      </div>

                      <div align="center" v-else>
                        <v-btn-toggle
                          v-model="toggle"
                          mandatory
                          dense
                          class="mb-2"
                        >
                          <v-btn small outlined color="#20929D">Manual</v-btn>

                          <v-btn small outlined color="#20929D"
                            >Auto Tawar</v-btn
                          >
                        </v-btn-toggle>

                        <div v-if="toggle == 0">
                          <div
                            class="d-flex align-center justify-space-between"
                          >
                            <v-btn icon small @click="minus">
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>

                            <div class="flex-column">
                              <h3>Nominal Penawaran</h3>
                              <h2 class="font-weight-bold red--text" >
                                Rp {{ Number(bid).toLocaleString('id-ID') }}
                              </h2>
                            </div>

                            <v-btn icon small @click="bid += iklan.kelipatan">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>

                          <v-btn
                            block
                            small
                            dark
                            color="#20929D"
                            class="mt-2"
                            @click="bidding"
                          >
                            Konfirmasi Penawaran
                          </v-btn>
                        </div>

                        <div v-if="toggle == 1">
                          <div v-if="!KonfirmasiAuto && isAuto == null">
                            <h3>Setuju untuk menggunakan fitur Auto Tawar?</h3>

                            <v-btn
                              small
                              color="green"
                              dark
                              class="mt-2"
                              @click="KonfirmasiAuto = true"
                            >
                              Ya, Setuju
                            </v-btn>
                            <nuxt-link to="/tentang?tab=autotawar"
                              >Auto Tawar</nuxt-link
                            >
                          </div>

                          <div v-else>
                            <v-text-field
                              v-model="amountAuto"
                              outlined
                              readonly
                              maxlength="11"
                              hide-details
                              style="width: 170px; display: none"
                              prepend-icon="mdi-minus"
                              @click:prepend="minAuto()"
                              append-outer-icon="mdi-plus"
                              @click:append-outer="addAuto()"
                            ></v-text-field>

                            <div v-if="reactivated">
                              <h3>Harga maksimal tawaran anda:</h3>

                              <div
                                class="d-flex align-center justify-space-between"
                              >
                                <v-btn
                                  small
                                  icon
                                  color="red"
                                  @click="minAuto()"
                                >
                                  <v-icon>mdi-minus</v-icon>
                                </v-btn>

                                <h2 class="font-weight-bold red--text">
                                  Rp
                                  {{
                                    Number(amountAuto).toLocaleString('id-ID')
                                  }}
                                </h2>

                                <v-btn
                                  small
                                  icon
                                  color="green"
                                  @click="addAuto()"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </div>

                              <v-btn
                                small
                                color="#20929D"
                                dark
                                class="mt-2"
                                @click="autoBid"
                                v-if="isAuto == null"
                              >
                                Aktifkan Auto Tawar
                              </v-btn>

                              <div class="mt-4" v-else>
                                <v-btn
                                  small
                                  color="#20929D"
                                  block
                                  @click="autoBid"
                                  class="white--text"
                                  :disabled="
                                    isAuto.max_bid >= liveBid[0].Bid
                                      ? true
                                      : false
                                  "
                                >
                                  Ubah Penawaran
                                </v-btn>

                                <v-btn
                                  small
                                  color="red"
                                  dark
                                  block
                                  @click="offBid"
                                  class="mt-2"
                                >
                                  Non Aktifkan
                                </v-btn>
                              </div>
                            </div>

                            <div v-else>
                              <div v-if="isAuto != null">
                                <v-alert
                                  outlined
                                  type="error"
                                  prominent
                                  border="left"
                                  dense
                                >
                                  Harga saat ini sudah mencapai harga maksimal
                                  tawaran Anda. Apakah Anda ingin mengaktifkan
                                  kembali Auto Tawar?

                                  <v-btn
                                    color="#20929D"
                                    dark
                                    small
                                    class="mt-2"
                                    @click="reactivated = true"
                                  >
                                    Aktifkan Kembali
                                  </v-btn>
                                </v-alert>
                              </div>
                            </div>
                          </div>

                          <br />

                          <div class="red--text">
                            Catatan: <br />
                            Fitur Tawar Otomatis tidak menjamin anda akan
                            memenangkan iklan Tawar Bersama.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="start == true && end == true">
                      <div v-if="check != undefined">
                        <div v-if="check.id_mst_status_pemenang == 2">
                          <div align="center">
                            <v-icon color="#20929D" x-large>
                              mdi-emoticon-cool
                            </v-icon>

                            <br />

                            Selamat ya, kamu menang pada iklan ini, segera
                            hubungi penjual atau lihat transaksi kamu.

                            <br />
                            <br />

                            <v-btn
                              small
                              color="#20929D"
                              dark
                              block
                              :to="'/message?id=' + iklan.id_app_user"
                            >
                              Tanya penjual
                            </v-btn>

                            <v-btn
                              small
                              outlined
                              color="#20929D"
                              block
                              class="mt-2"
                              :to="'/invoice/unit/' + orders.id"
                            >
                              Lihat Transkasi
                            </v-btn>
                          </div>
                        </div>

                        <div v-else>
                          <div align="center">
                            <v-icon color="yellow" x-large>
                              mdi-emoticon-sad
                            </v-icon>

                            <br />

                            Sayang sekali kamu kalah dalam tawaran kali ini, ayo
                            ikuti iklan lainnya untuk memenangkan iklan Tawar
                            Bersama.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div v-if="start == true && end == true">
                      <div align="center" v-if="liveBid.length > 0">
                        <v-icon color="#20929D" x-large
                          >mdi-emoticon-cool</v-icon
                        >

                        <br />

                        Ada pemenang nih.

                        <br />
                        <br />

                        <v-btn
                          small
                          color="#20929D"
                          dark
                          block
                          :to="'/message?id=' + orders.id_pembeli"
                        >
                          Tanya Pembeli
                        </v-btn>

                        <br />

                        <v-btn
                          small
                          outlined
                          color="#20929D"
                          block
                          class="mt-2"
                          :to="'/invoice/unit/' + orders.id_order"
                        >
                          Lihat Transkasi
                        </v-btn>
                      </div>

                      <div align="center" v-else>
                        <v-icon color="yellow" x-large>mdi-emoticon-sad</v-icon>

                        <br />

                        Maaf, sepertinya iklan ini belum ada penawar.
                      </div>
                    </div>
                  </div>
                </div>

                <br />

                <div>
                  selengkapnya tentang
                  <nuxt-link to="/tentang?tab=tawarbersama">Tawar Bersama</nuxt-link>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </section>

    <hr class="my-3" />

    <section id="info-paket">
      <v-row>
        <v-col cols="12" sm="9">
          <h2>Daftar Paket Motor</h2>

          <div class="d-flex flex-nowrap mt-2" style="overflow-x: auto">
            <v-card
              rounded="lg"
              v-for="(item, index) in motorBekas"
              :key="index"
              class="mx-2"
              :to="'/unit/' + item.id"
            >
              <v-img
                :src="getThumb(item.foto_1)"
                width="200"
                height="200"
              ></v-img>

              <v-card-title>{{ item.type }}</v-card-title>
              <v-card-subtitle>{{ item.tahun }}</v-card-subtitle>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </section>

    <hr class="my-3" />

    <section id="info-penjual">
      <info-penjual
        :hits="iklan"
        :seller="seller"
        :avg="avg"
        :catatan="catatan"
        :kebijakan="kebijakan"
      />
    </section>

    <hr class="my-3" />

    <section id="penawaran">
      <list-penawaran :liveBid="liveBid" :user="user" :guest="guest" />
    </section>

    <v-dialog v-model="noTiket" persistent width="500">
      <v-card>
        <v-card-title
          class="d-flex align-center justify-space-between red--text"
        >
          <div>Oops!</div>

          <v-btn icon @click="noTiket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai
          peserta iklan ini meskipun Anda tidak melakukan penawaran
          <br />Apakah Anda setuju?
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="success"
            class="my-4"
            @click="dialogKonfirmasi = true"
            v-on:click="noTiket = false"
          >
            Setuju, mengikuti Tawar Bersama
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogKonfirmasi" width="460">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div>Konfirmasi Mengikuti Tawar Bersama</div>

          <v-btn icon @click="dialogKonfirmasi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai
          peserta iklan ini meskipun Anda tidak melakukan penawaran. Apakah Anda
          setuju?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" dark @click="dialogKonfirmasi = false">
            Tidak
          </v-btn>

          <v-btn color="primary" dark @click="konfirmasiNonTiket()">
            Ya, Setuju
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="useTiket" persistent width="500">
      <v-card>
        <v-card-title
          class="d-flex align-center justify-space-between red--text"
        >
          <div>{{ iklan.jumlah_tiket }} Tiket dibutuhkan</div>

          <v-btn icon @click="useTiket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          Untuk dapat mengikuti iklan ini perlu memakai tiket. Gunakan Tiket
          Tawar Bersama pada iklan ini?
          <br />Catatan: <br />1. Pastikan masa kadaluarsa tiket Anda melebihi
          waktu selesai tawar bersama iklan ini. <br />2. Tiket Anda akan tetap
          terpakai untuk mengikuti iklan Tawar Bersama ini meskipun Anda tidak
          melakukan penawaran

          <h2 class="mt-3 green--text">
            Jumlah tiket tersedia milik Anda:
            {{ ticket.tersedia }} Tiket
          </h2>
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="primary"
            @click="dialogKonfirmasiTiket = true"
            v-on:click="useTiket = false"
            :disabled="ticket.tersedia > 0 ? false : true"
          >
            Gunakan Tiket Anda
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogKonfirmasiTiket" persistent width="420">
      <v-card>
        <v-card-title
          class="d-flex align-center justify-space-between headline"
        >
          <div>Konfirmasi Penggunaan Tiket</div>

          <v-btn icon @click="dialogKonfirmasiTiket = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          {{ iklan.jumlah_tiket }} Tiket Anda akan tetap terpakai untuk
          mengikuti iklan Tawar Bersama ini meskipun Anda tidak melakukan
          penawaran, <br />
          Apakah Anda Setuju?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            dark
            @click="dialogKonfirmasiTiket = false"
          >
            Batalkan
          </v-btn>

          <v-btn dark color="green darken-3" @click="konfirmasiTiket()">
            Ya, Gunakan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'tb-paketan',
  props: ['items'],
  components: {
    InfoPenjual: () =>
      import(
        /* webpackChunkName: "info-penjual" */ '@/components/InfoPenjual.vue'
      ),
    ListPenawaran: () =>
      import(
        /* webpackChunkName: "list-penawaran" */ '@/components/ListPenawaran.vue'
      ),
  },
  data: () => ({
    tab: 0,
    iklan: [],
    carousel: 0,
    motorBekas: [],
    fotos: [],
    seller: [],
    avg: [],
    catatan: [],
    kebijakan: [],
    minBid: 0,
    penawaran: 0,
    bid: 0,
    liveBid: [],
    time: '',
    countdown: 0,
    countdown2: 0,
    check: [],
    toggle: 0,
    noTiket: false,
    dialogKonfirmasi: false,
    KonfirmasiAuto: false,
    isAuto: [],
    amountAuto: 0,
    reactivated: false,
    useTiket: false,
    dialogKonfirmasiTiket: false,
    tiket: [],
    orders: [],
    sharing: {},
    networks: [
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'fab fah fa-lg fa-whatsapp',
        color: '#25d366',
      },
    ],
    judul: '',
    deskripsi: '',
    valid: true,
    dialog: false,
    formRules: [(v) => !!v || 'Field is required'],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      productid: 'product/productid',
      unitid: 'product/unitid',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      ticket: 'ticket/ticket',
    }),
    now: function () {
      return this.time
    },
    start: function () {
      return this.moment.utc(this.now).isAfter(this.iklan.tanggal_mulai)
    },
    end: function () {
      return this.moment.utc(this.now).isAfter(this.iklan.tanggal_selesai)
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setSellertId: 'product/setSeller',
      setAuth: 'auth/set',
    }),
    tez() {
      console.log('selengkapnya')
    },
    async getTB() {
      await this.$axios
        .get('/iklan/v3/iklan_tb_mokas', {
          params: {
            id: this.productid,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.iklan = data

          let now = this.moment
            .utc(data.server_time)
            .add(this.utc, 'h')
            .toDate()
          now.setDate(now.getDate() - 1)

          let s = this.moment
            .utc(data.tanggal_mulai)
            .add(this.utc, 'h')
            .toDate()
          s.setDate(s.getDate() - 1)

          let d = this.moment
            .utc(data.tanggal_selesai)
            .add(this.utc, 'h')
            .toDate()
          d.setDate(d.getDate() - 1)

          this.countdown2 = d - now
          this.countdown = s - now

          if (this.iklan.harga_saat_ini == null) {
            this.penawaran =
              Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan)
            this.bid = this.penawaran
          } else {
            this.penawaran =
              Number(this.hits.harga_saat_ini) + Number(this.iklan.kelipatan)
            this.bid = this.penawaran
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async paketMokas() {
      let params = new URLSearchParams()

      for (let index = 0; index < this.iklan.motor_bekas.length; index++) {
        const element = this.iklan.motor_bekas[index].id_motor_bekas
        params.append('id', element)
      }

      params.set('limit', this.iklan.motor_bekas.length)

      var request = {
        params: params,
      }

      await this.$axios
        .get('/produk/v3/unit_mokas_iklan', request)
        .then((response) => {
          let { data } = response.data
          this.motorBekas = data

          for (let i = 0; i < this.motorBekas.length; i++) {
            const e = this.motorBekas[i].foto_1

            this.fotos.push({ src: e })
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doFavorit() {
      let formData = new FormData()
      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)
      await this.$axios
        .post('/iklan/v3/iklan_favorit', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getFavorit()
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
    edit() {
      this.dialog = true
      this.judul = this.iklan.judul
      this.deskripsi = this.iklan.deskripsi
    },
    async updateIklan() {
      let formData = new FormData()
      formData.set('judul', this.judul.trim())
      formData.set('deskripsi', this.deskripsi.trim())
      formData.set('id', this.productid)
      if (this.iklan.id_mst_iklan_jenis == 1) {
        await this.$axios
          .put('/iklan/v3/iklan_hp_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
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
        await this.$axios
          .put('/iklan/v3/iklan_tb_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
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
      }
    },
    async getPenjual() {
      await this.$axios
        .get('/user/v3/user', {
          params: {
            id: this.iklan.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.seller = data[0]
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
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    go(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-')  +'-'+id+ '?tgl=' + date)
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
    async getBid() {
      await this.$fire.firestore
        .collection('tawar_bersama')
        .doc('iklan')
        .collection(String(this.productid))
        .limit(5)
        .orderBy('Bid', 'desc')
        .onSnapshot((querySnapshot) => {
          let bidder = []
          querySnapshot.forEach((doc) => {
            bidder.push(doc.data())
            this.minBid = bidder[0].Bid
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan)
            this.bid = this.penawaran
          })
          this.liveBid = bidder
        })
    },
    async checkTB() {
      await this.$axios
        .get('/bid/v3/iklan_tb_peserta', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.productid,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.check = data[0]

          this.getAutoBid()
          this.getTiket()
          this.getOrder()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async ikutTB() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/bid/v3/iklan_tb_peserta', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then(() => {})
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })

          if (responses.api_status == 2) {
            this.useTiket = !this.useTiket
          }
          if (responses.api_status == 4) {
            this.noTiket = true
          }
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
    async konfirmasiNonTiket() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/bid/v3/konfirmasi_penggunaan_nontiket', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.dialogKonfirmasi = false
          this.checkTB()
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
    minus() {
      if (this.bid > this.penawaran) {
        this.bid -= this.iklan.kelipatan
      }
    },
    async bidding() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('bid', this.bid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/bid/v3/iklan_tb_bid', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.playSound('/audio/bid.mpeg')
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
    playSound(sound) {
      if (sound) {
        let audio = new Audio(sound)
        audio.play()
      }
    },
    addAuto() {
      let max = this.bid + 20000000
      if (this.amountAuto < max) {
        this.amountAuto += this.iklan.kelipatan
      }
    },
    minAuto() {
      if (this.amountAuto > this.bid) {
        this.amountAuto -= this.iklan.kelipatan
      }
    },
    async autoBid() {
      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('id_iklan', this.productid)
      formData.set('max_bid', this.amountAuto)

      await this.$axios
        .post('/bid/v3/konfirmasi_auto_tawar ', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getAutoBid()
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
    async offBid() {
      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('id_iklan', this.productid)

      await this.$axios
        .post('/bid/v3/off_auto_tawar ', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getAutoBid()
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
    async getAutoBid() {
      await this.$axios
        .get('/bid/v3/pembeli_auto_tawar', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.productid,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          if (data.length == 0) {
            this.isAuto = null
            this.amountAuto = this.bid
            this.reactivated = true
          } else {
            this.isAuto = data[0]
            this.amountAuto = this.isAuto.max_bid
            if (this.isAuto.max_bid <= this.minBid) {
              this.reactivated = false
            } else {
              this.reactivated = true
            }
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTiket() {
      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.tiket = data[0]
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Anda tidak memiliki tiket',
          })
        })
    },
    async konfirmasiTiket() {
      let formData = new FormData()

      formData.set('id_iklan', this.productid)
      formData.set('id_app_user', this.user.id)
      formData.set('id_tiket', this.tiket.id)

      await this.$axios
        .post('/bid/v3/konfirmasi_penggunaan_tiket', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.checkTB()
          this.dialogKonfirmasiTiket = !this.dialogKonfirmasiTiket
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
    async getOrder() {
      await this.$axios
        .get('/transaksi/v3/order', {
          params: {
            id_iklan: this.productid,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          if (data.length > 0) {
            this.orders = data[0]
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getTB()
    await this.paketMokas()
    await this.getPenjual()
    await this.reviewAvg()
    await this.getCatatan()
    await this.getKebijakan()
    await this.getBid()

    if (!this.guest) {
      await this.checkTB()
    }

    let app = this
    setInterval(() => {
      app.time = this.moment().add(this.utc, 'h').format('YYYY-MM-DD HH:mm:ss'),
        this.sharing = {
          url: 'https://simotor.id/iklan/' + this.productid,
          title: this.hits.judul,
          description: this.hits.deskripsi,
          quote: this.hits.judul,
          hashtags: 'nuxtjs,simotor',
          twitterUser: 'simotor',
        }
    }, 1000)
  },
}
</script>

<style>
a:link {
  /* color: #20929D; */
  text-decoration: none;
}

div.sticky {
  overflow: hidden;
  position: sticky;
  top: 12.6%;
  z-index: 1;
}

div.fixed {
  position: fixed;
  top: 30%;
  width: 290px;
  z-index: 1;
}
</style>
