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
              <v-img :src="getImage(item.src)" width="65" height="65"></v-img>
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
                  <v-icon
                    left
                    v-if="favorit == undefined || favorit.length == 0"
                  >
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

        <v-col cols="12" sm="4">
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
              <div
                class="d-flex align-center justify-end"
                style="color: #20929d"
              >
                ID Iklan: {{ id }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3>Deskripsi</h3>
              <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="iklan.deskripsi"
              ></div>
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

        <v-col cols="12" sm="4">
          <div
            :class="$vuetify.breakpoint.xs ? '' : ''"
            style="position: relative; top: 0; left: 10%; width: 355px"
          >
            <v-card rounded="lg">
              <div
                class="tbt d-flex align-center justify-center"
                style="color: white; background-color: #20929d"
              >
                <div>
                  <img src="/img/Tertutup.png" class="pt-2" width="30" alt="" />
                </div>
                &nbsp;&nbsp;
                <div>Tawar Bersama Tertutup</div>
              </div>
              <v-row>
                <v-col cols="6" sm="4" style="font-size: 13px">
                  <center>
                    Harga Awal <br />
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
                <v-col cols="6" sm="4" style="font-size: 14px">
                  <div v-if="start == false && end == false">
                    <center>
                      Mulai dalam <br />
                      <!-- <span style="color:grey"> -->
                      <div
                        class="
                          pt-1
                          pb-1
                          pl-1
                          pr-1
                          d-inline-flex
                          grey
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
                  <!-- </span> -->
                </v-col>
                <v-col cols="6" sm="4" style="font-size: 13px">
                  <center>
                    Jumlah Penawar <br />
                    <div style="color: #e45528" v-if="jumlahpenawar == 0">
                      0
                    </div>
                    <div style="color: #e45528" v-if="jumlahpenawar < 5 && jumlahpenawar > 0 ">
                      &#60; 5
                    </div>

                    <div style="color: #e45528" v-if="jumlahpenawar > 5 && jumlahpenawar < 10 ">
                      &#60; 10
                    </div>
                    <div style="color: #e45528" v-if="jumlahpenawar > 10 && jumlahpenawar < 15">
                      &#60; 15
                    </div>
                    <div style="color: #e45528" v-if="jumlahpenawar > 15">
                      15++
                    </div>
                  </center>
                </v-col>
              </v-row>

              <div style="background: #d2e9eb">
                <table
                  style="width: 355px; padding-top: 3px; padding-bottom: 3px"
                >
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
                    <td style="width: 300px">
                      <center>
                        <div @click="tez" class="stb">
                          Selengkapnya tentang Tawar Bersama Tertutup
                        </div>
                      </center>
                    </td>
                    <td><v-icon>mdi-chevron-right</v-icon></td>
                  </tr>
                </table>
              </div>

              <div v-if="!guest">
                <div align="center" v-if="check == undefined">
                  <v-btn
                    class="mt-5"
                    color="#20929D"
                    dark
                    small
                    @click="catkeb = true"
                  >
                    Ikut Tawar Bersama
                  </v-btn>
                </div>
                <div v-else>
                  <div class="d-flex align-center justify-space-around mt-5">
                    <v-btn icon small @click="bid -= iklan.kelipatan" v-if="iklan.opsi_harga_limit == true">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn icon small @click="minus" v-else>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <div class="flex-column">
                      <h2 class="font-weight-bold" style="color: #4c4c4c">
                        Rp {{ Number(bid).toLocaleString('id-ID') }}
                      </h2>
                    </div>
                    <v-btn icon small @click="bid += iklan.kelipatan">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <center>
                      <h6 style="color: #eb5757">
                        Minimal kelipatan penawaran Rp.
                        {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}
                      </h6>
                    </center>
                  </div>
                  <div>
                    <center>
                      <v-btn
                        small
                        dark
                        color="#20929D"
                        class="mt-2"
                        @click="bidding"
                      >
                        Konfirmasi Penawaran
                      </v-btn>
                    </center>
                  </div>
                  <div class="mx-2 mt-4" style="color:#4C4C4C;font-size:12px"
                    v-if="iklan.opsi_harga_limit == true">
                    *Anda dapat melakukan penawaran dibawah atau diatas harga awal
                  </div>
                </div>
              </div>
              <div v-else>
                <center>
                  <h6 class="mt-3">Login Untuk Melakukan Penawaran</h6>
                  <nuxt-link to="/login">
                    <v-btn class="mt-1" color="#20929D" dark small>
                      Login
                    </v-btn>
                  </nuxt-link>
                </center>
              </div>
              <br />
            </v-card>
            <br />

            <v-card v-if="!guest">
              <div v-if="iklan.id_app_user == this.userid">
                <div v-if="start == false && end == false">
                  <div class="pt-2 pb-2 pl-6"><b>List Penawar</b></div>
                  <v-divider></v-divider>
                  <center>
                    <img
                      class="mt-4"
                      width="50px"
                      src="/img/NoBid.png"
                      alt=""
                    />
                    <p class="mt-4">Belum Dimulai</p>
                  </center>
                </div>
                <div v-if="start == true && end == false">
                  <div class="pt-2 pb-2 pl-6"><b>List Penawar</b></div>
                  <v-divider></v-divider>
                  <center>
                    <img
                      class="mt-4"
                      width="50px"
                      src="/img/NoBid.png"
                      alt=""
                    />
                    <p class="mt-4">Sedang Berlangsung</p>
                  </center>
                </div>
                <div v-if="start == true && end == true">
                  <div class="pt-2 pb-2 pl-6"><b>List Penawar</b></div>
                  <v-divider></v-divider>
                  <div class="list_penawaran">
                    <div v-if="riwayats.length < 1">
                      <center>
                        <img
                          class="mt-4"
                          width="50px"
                          src="/img/NoBid.png"
                          alt=""
                        />
                        <h3>Belum Ada Penawaran</h3>
                      </center>
                    </div>
                    <div v-else>
                      <div
                        v-for="(item, index) in riwayats"
                        :key="index"
                        class="d-flex align-center justify-space-around mt-3"
                      >
                        <div style="float: left">
                          <div style="font-size: 14px">
                            Oleh : {{ item.id_uniq }}
                          </div>
                          <div style="font-size: 10px">
                            {{
                              moment(item.created_at).format(
                                'DD-MMM-YYYY, hh:mm:ss'
                              )
                            }}
                            {{ timezone }}
                          </div>
                        </div>
                        <div>
                          <div
                            class="
                              menang
                              list_harga
                              rounded
                              pl-1
                              pt-1
                              pr-1
                              pb-1
                            "
                            style="
                              font-size: 12px;
                              background: #e9f4f5;
                              color: #20929d;
                            "
                          >
                            Rp {{ Number(item.bid).toLocaleString('id-ID') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="check == undefined">
                  <div class="pt-2 pb-2 pl-6"><b>List Penawar</b></div>
                  <v-divider></v-divider>
                  <center>
                    <p class="mt-4">Anda Belum Menjadi Peserta</p>
                  </center>
                </div>
                <div v-else>
                  <div class="pt-2 pb-2 pl-6"><b>List Penawar</b></div>
                  <v-divider></v-divider>
                  <div class="nullpenawaran" v-if="riwayat.length < 1">
                    <center>
                      <img
                        class="mt-4"
                        width="50px"
                        src="/img/NoBid.png"
                        alt=""
                      />
                      <h3>Belum Ada Penawaran</h3>
                    </center>
                  </div>
                  <div v-else class="list_penawaran">
                    <div
                      v-for="(item, index) in riwayat"
                      :key="index"
                      class="d-flex align-center justify-space-around mt-3"
                    >
                      <div style="float: left">
                        <div style="font-size: 14px">{{ user.nama }}</div>
                        <div style="font-size: 10px">04 Mar 2021 10:20 WIB</div>
                      </div>
                      <div>
                        <div
                          class="
                            bidding
                            line
                            list_harga
                            rounded
                            pl-1
                            pt-1
                            pr-1
                            pb-1
                          "
                          style="
                            font-size: 12px;
                            background: #e9f4f5;
                            color: #20929d;
                          "
                        >
                          Rp {{ Number(item.bid).toLocaleString('id-ID') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </v-card>
            <br />
            <v-card
              v-if="
                !guest && start == true && end == true && tawaranSelesai == true
              "
            >
              <div class="pt-2 pb-2 pl-6"><b>Tawaran Selesai</b></div>
              <v-divider></v-divider>
              <center>
                <v-img
                  class="pt-3"
                  src="/img/pemenang.png"
                  width="80"
                  height="80"
                ></v-img>
              </center>
              <center>
                <v-btn
                  small
                  color="#20929D"
                  dark
                  class="mt-2"
                  @click="pemenangpenjual = true"
                  v-if="iklan.id_app_user == this.userid"
                >
                  Lihat Pemenang
                </v-btn>
              </center>
              <br />
            </v-card>
            <v-card
              v-if="
                !guest &&
                start == true &&
                end == true &&
                iklan.id_app_user != this.userid
              "
            >
              <div class="pt-2 pb-2 pl-6"><b>Tawaran Selesai</b></div>
              <v-divider></v-divider>
              <center>
                <v-img
                  class="pt-3"
                  src="/img/pemenang.png"
                  width="80"
                  height="80"
                ></v-img>
              </center>
              <center>
                <v-btn
                  small
                  color="#20929D"
                  dark
                  class="mt-2"
                  @click="listbidselesai"
                >
                  Lihat Pemenang
                </v-btn>
              </center>
              <br />
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
                :src="getImage(item.foto_1)"
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
        :gbrRatting="gbrRatting"
        :pembayaranTerverifikasi="pembayaranTerverifikasi"
        :dibatalkanPenjual="dibatalkanPenjual"
        :menungguPembayaran="menungguPembayaran"
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
            color="#20929D"
            class="my-4"
            @click="dialogKonfirmasi = true"
            v-on:click="noTiket = false"
          >
            Setuju, mengikuti Tawar Bersama
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="catkeb" persistent width="600">
      <v-card>
        <v-card-title>Catatan dan Kebijakan Penjual</v-card-title>
        <v-card-text >
          <div style="border: 2px solid #EEEEEE;">
            <div class="ml-2 my-2" style="color:color: #4C4C4C;font-size:20px"><b> Catatan</b></div>
            <v-divider></v-divider>
            <div v-if="catatan.length > 0">              
              <div v-for="item in catatan" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <v-icon color="black" class="mr-1"> mdi-circle-medium </v-icon>
                    <b>{{ item.judul }}</b>
                  </v-list-item-title>

                  <v-list-item-subtitle class="ml-6">
                    <div v-html="item.deskripsi"></div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </div>        
            </div>
            <div v-else>
                <div class="ml-6 my-3" >Belum ada catatan</div>
            </div> 
          </div>
        </v-card-text>
        <v-card-text >
          <div style="border: 2px solid #EEEEEE;">
            <div class="ml-2 my-2" style="color:color: #4C4C4C;font-size:20px"><b> Kebijakan</b></div>
            <v-divider></v-divider>
            <div class="ml-6" v-html="kebijakan.deskripsi" v-if="kebijakan != undefined"></div>
            <div class="ml-6 my-3" v-else>Belum ada kebijakan</div>
          </div>
        </v-card-text>
        <label class="mx-4 my-4 pl-3">
          <input type="checkbox" v-model="catatankebijakan" :value="true" /> Saya menyetujui catatan dan kebijakan dari penjual
        </label>
        <v-card-actions style="margin-right: 2%">
          <v-spacer></v-spacer>
          <v-btn color="white" style="color: #20929d" @click="catkeb = false">
            Batalkan
          </v-btn>
          <v-btn
            color="#20929D"
            class="white--text"
            :disabled="catatankebijakan == true ? false : true"
            v-on:click="catkeb = false"
            @click="ikutTB()"
          >
            Selanjutnya
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

          <v-btn
            color="#20929D"
            text
            outlined
            @click="dialogKonfirmasi = false"
          >
            Tidak
          </v-btn>

          <v-btn color="#20929D" dark @click="konfirmasiNonTiket()">
            Ya, Setuju
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="useTiket" persistent width="500">
      <v-card>
        <div width="450" class="ml-3 mr-3">
          <div
            class="pt-3 d-flex align-center justify-space-between black--text"
          >
            <div>
              <b>Konfirmasi Penggunaan Tiket </b>
            </div>
            <div>
              <v-btn icon @click="useTiket = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div style="background: #d2e9eb" class="rounded-lg">
            <table style="width: 450px; padding-top: 3px; padding-bottom: 3px">
              <tr>
                <td style="width: 10%">
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
                <td style="width: 89%">
                  <center>
                    <div @click="tez" class="stb">
                      Selengkapnya tentang Tawar Bersama {{ iklan.mst_type_tb }}
                    </div>
                  </center>
                </td>
                <td><v-icon>mdi-chevron-right</v-icon></td>
              </tr>
            </table>
          </div>
          <div
            class="mt-2 pt-2 pb-2 d-flex rounded-lg"
            style="border: 1.5px solid #20929d"
          >
            <div
              class=""
              style="
                width: 50%;
                border-right: 1.5px solid #20929d;
                color: #4c4c4c;
              "
            >
              <center>Tiket Dibutuhkan : {{ iklan.jumlah_tiket }}</center>
            </div>
            <div
              style="
                width: 50%;
                border-left: 1.5px solid #20929d;
                color: #4c4c4c;
              "
            >
              <center>Tiket Tersedia : {{ ticket.tersedia }}</center>
            </div>
          </div>
          <div class="mt-2" style="color: #4c4c4c">
            Untuk dapat mengikuti iklan ini perlu menggunakan tiket. Gunakan
            Tiket Tawar Bersama pada iklan ini?
          </div>
          <div class="mt-2 rounded-lg d-flex" style="background: #fefaed">
            <div
              class="mt-4 mb-4 ml-3"
              style="
                color: white;
                width: 50px;
                background: #f2c94c;
                border-radius: 100%;
              "
            >
              <center class="pt-1">!</center>
            </div>
            <div class="pl-3 pt-2 pb-2">
              Tiket kamu akan tetap terpakai untuk mengikuti iklan tawar bersama
              ini meskipun kamu tidak melakukan penawaran
            </div>
          </div>
          <div class="mt-4 pb-3">
            <div class="d-flex" style="width: 250px; margin-left: 47%">
              <div
                @click="useTiket = false"
                class="pl-5 pr-5 pt-1 pb-1 rounded-lg"
                style="
                  border: 1.5px solid #20929d;
                  color: #20929d;
                  cursor: pointer;
                "
              >
                <center>Batalkan</center>
              </div>
              <div
                @click="dialogKonfirmasiTiket = true"
                v-if="ticket.tersedia > 0"
                v-on:click="useTiket = false"
                class="pl-5 pr-5 pt-1 pb-1 ml-3 rounded-lg"
                style="background: #20929d; color: white; cursor: pointer"
              >
                <center>Ya, Gunakan</center>
              </div>
              <div
                v-else
                class="pl-5 pr-5 pt-1 pb-1 ml-3 rounded-lg"
                style="background: grey; color: white; cursor: pointer"
              >
                <center>Ya, Gunakan</center>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="lengkapiprofile" width="500">
      <v-card>
        <center>
          <br />
          <v-img
            class="pt-3"
            src="/img/profilelengkapi.png"
            width="80"
            height="80"
          ></v-img>
          <h3>Lengkapi Profile Anda!</h3>
          <p>
            Untuk mengikuti tawar bersama, mohon <br />
            lengkapi data <b> email</b> di akun anda
          </p>

          <v-spacer></v-spacer>
          <v-btn
            color="white"
            style="color: #20929d"
            @click="lengkapiprofile = false"
          >
            Batal
          </v-btn>
          &nbsp;&nbsp;&nbsp;
          <nuxt-link to="/account/profile/umum">
            <v-btn color="#20929D" class="white--text">
              Lengkapi Profile
            </v-btn>
          </nuxt-link>
          <br />
        </center>
        <br />
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

          <v-btn color="#20929D" dark @click="dialogKonfirmasiTiket = false">
            Tidak
          </v-btn>

          <v-btn dark color="green darken-3" @click="konfirmasiTiket()">
            Ya, Gunakan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="pemenangpembeli" width="450">
      <v-card v-if="congratsid != ''">
        <center>
          <br />

          <div v-if="riwayats[0].id_app_user == user.id">
            <v-img
              class="pt-3"
              src="/img/pemenang.png"
              width="80"
              height="80"
            ></v-img>
            <h3>Selamat!</h3>
            <p>
              Selamat anda memenangkan tawar <br />
              bersama terbuka '{{ iklan.judul }}'
            </p>
            <v-spacer></v-spacer>
            <nuxt-link :to="'/message?id=' + seller.id">
              <v-btn color="#20929D" class="white--text">
                Hubungi Penjual
              </v-btn>
            </nuxt-link>
          </div>
          <div v-else>
            <h3>Maaf anda kalah!</h3>
            <p class="mx-4">
              Sayang sekali Anda kalah dalam tawaran pada iklan '{{
                iklan.judul
              }}', ayo ikuti iklan lainnya untuk memenangkan iklan Tawar
              Bersama.
            </p>
          </div>

          <br />
        </center>
        <br />
      </v-card>
      <v-card v-else>
        <center>
          <br />
          <v-img
            class="pt-3"
            src="/img/pemenang.png"
            width="80"
            height="80"
          ></v-img>

          <div>
            <h3>Iklan Tawar Bersama Berakhir</h3>
            <p>
              Tawar bersama tertutup '{{ iklan.judul }}' <br />
              tidak memiliki penawaran
            </p>
          </div>

          <br />
        </center>
        <br />
      </v-card>
    </v-dialog>
    <v-dialog v-model="pemenangpenjual" width="450">
      <v-card v-if="congratsid != ''">
        <center>
          <br />
          <v-img
            class="pt-3"
            src="/img/pemenang.png"
            width="80"
            height="80"
          ></v-img>
          <div v-if="riwayats.length > 0">
            <h3>Iklan Tawar Bersama Berakhir</h3>
            <p>
              Selamat Tawar bersama tertutup '{{ iklan.judul }}' <br />
              memiliki pemenang
            </p>
            <nuxt-link :to="'/message?id=' + riwayats[0].id_app_user">
              <v-btn color="#20929D" class="white--text">
                Hubungi Pemenang
              </v-btn>
            </nuxt-link>
            <br />
          </div>
          <div v-else>
            <h3>Iklan Tawar Bersama Berakhir</h3>
            <p>
              Sayangnya Tawar bersama tertutup '{{ iklan.judul }}' <br />
              tidak memiliki penawaran
            </p>
          </div>

          <v-spacer></v-spacer>
        </center>
        <br />
      </v-card>
      <v-card v-else>
        <center>
          <br />
          <v-img
            class="pt-3"
            src="/img/pemenang.png"
            width="80"
            height="80"
          ></v-img>

          <div>
            <h3>Iklan Tawar Bersama Berakhir</h3>
            <p>
              Sayangnya Tawar bersama tertutup '{{ iklan.judul }}' <br />
              tidak memiliki penawaran
            </p>
          </div>
        </center>
        <br />
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
  props: ['items','id'],
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
    tawar_bersamas: [],
    pemenangpembeli: false,
    pemenangpenjual: false,
    catatankebijakan: false,
    catkeb: false,
    congratsuniq: '',
    congratsid: '',
    tawaranSelesai: false,
    tab: 0,
    iklan: [],
    carousel: 0,
    motorBekas: [],
    riwayat: [],
    riwayats: [],
    fotos: [],
    seller: [],
    avg: [],
    catatan: [],
    kebijakan: [],
    userid: '',
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
    lengkapiprofile: false,
    isAuto: [],
    amountAuto: 0,
    reactivated: false,
    useTiket: false,
    dialogKonfirmasiTiket: false,
    tiket: [],
    orders: [],
    sharing: {},
    favorit: [],
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
    jumlahpenawar: [],
    gbrRatting: '',
    statistik:[],
    pembayaranTerverifikasi:[],
    dibatalkanPenjual:[],
    menungguPembayaran:[],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
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
    async gettawarbersama() {
      await this.$fire.firestore
        .collection('tawar_bersama')
        .doc('iklan')
        .collection(String(this.id))

        // .collection('5825')
        .orderBy('CreatedAt', 'desc')
        .onSnapshot((querySnapshot) => {
          let tawar_bersama = []
          querySnapshot.forEach((doc) => {
            tawar_bersama.push(doc.data())
          })

          this.tawar_bersamas = tawar_bersama
        })
    },
    async getTB() {
      await this.$axios
        .get('/iklan/v3/iklan_tb_mokas', {
          params: {
            id: this.id,
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
    async getFavorit() {
      await this.$axios
        .get('/iklan/v3/iklan_favorit', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.id,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.favorit = hits[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doFavorit() {
      let formData = new FormData()
      formData.set('id_iklan', this.id)
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
      formData.set('id', this.id)
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
          if (this.avg.ratting_user==0) {
            this.gbrRatting = '/img/penilaian/ic_tdk_nilai.webp'
          }
          if (this.avg.ratting_user==1) {
            this.gbrRatting = '/img/penilaian/ic_tdk_puas.webp'
          }
          if (this.avg.ratting_user==2) {
            this.gbrRatting = '/img/penilaian/ic_ckp_puas.webp'
          }
          if (this.avg.ratting_user==3) {
            this.gbrRatting = '/img/penilaian/ic_sngt_puas.webp'
          }
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
          console.log('ini catatan', this.catatan)
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
          console.log('ini kebijakan', this.kebijakan)
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
        .collection(String(this.id))
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
    async listbidselesai() {
      // console.log('listbidselesai')
      await this.$axios
        .get('/bid/v3/listbid', {
          params: {
            id_iklan: this.id,
            limit: '300',
          },
        })
        .then((response) => {
          let { data } = response.data
          this.riwayats = data
          if (this.riwayats.length > 0) {
            this.congratsid = this.riwayats[0].id_app_user
            this.congratsuniq = this.riwayats[0].id_uniq
          }

          if (this.iklan.id_app_user != this.user.id) {
            this.pemenangpembeli = true
          } else {
            this.tawaranSelesai = true
          }

          console.log('ini lisbidselesais', this.riwayats)
          setInterval(() => {
            const menang = document.querySelectorAll('.menang')

            if (menang.length > 0) {
              menang[0].style.color = '#F2994A'
              menang[0].style.background = '#FEF5ED'
            } else {
            }
          }, 1000)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async checkTB() {
      await this.$axios
        .get('/bid/v3/iklan_tb_peserta', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.id,
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
      if (this.user.email == '') {
        this.lengkapiprofile = true
      } else {
      
        let formData = new FormData()
  
        formData.set('id_iklan', this.id)
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
      }
    },
    async konfirmasiNonTiket() {
      let formData = new FormData()

      formData.set('id_iklan', this.id)
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

      formData.set('id_iklan', this.id)
      formData.set('bid', this.bid)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/bid/v3/iklan_tb_bid_tertutup', formData, {
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
          this.getRiwayatTB()
          this.listbid()
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
    async getRiwayatTB() {
      await this.$axios
        .get('/bid/v3/riwayat_penawaran_tb_tertutup', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.riwayat = data
          console.log('ini riwayat', this.riwayat)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
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
      formData.set('id_iklan', this.id)
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
      formData.set('id_iklan', this.id)

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
            id_iklan: this.id,
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
    async listbid() {
      const topads = document.querySelectorAll('.list_harga')
      const bidding = document.querySelectorAll('.line')
      const menang = document.querySelectorAll('.menang')

      if (topads.length > 0) {
        topads[0].style.color = '#F2994A'
        topads[0].style.background = '#FEF5ED'
      } else {
      }

      if (menang.length > 0) {
        menang[0].style.color = '#F2994A'
        menang[0].style.background = '#FEF5ED'
      } else {
      }

      if (bidding.length > 0) {
        bidding[0].classList.remove('line')
      } else {
      }
    },
    async cekpenawar() {
      console.log('cek penawar', jumlah_penawar)
    },
    async getTotalPenawar() {
      await this.$fire.firestore
        .collection('tawar_bersama_tertutup')
        .doc('iklan')
        .collection(String(this.id))
        // .collection('5849')
        .doc('data')
        .onSnapshot((querySnapshot) => {
          let jumlah_penawar = []
          jumlah_penawar.push(querySnapshot.data())

          this.jumlahpenawar = jumlah_penawar[0].TotalPenawar
          console.log('jumlah penawar', this.jumlahpenawar)
        })
    },
    async konfirmasiTiket() {
      let formData = new FormData()

      formData.set('id_iklan', this.id)
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
            id_iklan: this.id,
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
    async statistikPenjual() {
      await this.$axios
        .get('/transaksi/v3/statistik_penjual', {
          params: {
            id_penjual: this.seller.id,
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

          console.log('data menungguPembayaran',this.menungguPembayaran)
          console.log('data pembayaranTerverifikasi',this.pembayaranTerverifikasi)
          console.log('data dibatalkanPenjual',this.dibatalkanPenjual)
          
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
    await this.gettawarbersama()
    await this.getRiwayatTB()
    await this.listbid()
    await this.getTotalPenawar()
    await this.statistikPenjual()
    

    console.log('countdown', this.countdown)
    console.log('countdown2', this.countdown2)

    this.userid = this.user.id
    this.usernama = this.user.nama
    this.idiklan = this.iklan.id

    if (!this.guest) {
      await this.checkTB()
    }
    let app = this
    setInterval(() => {
      app.time = this.moment().add(this.utc, 'h').format('YYYY-MM-DD HH:mm:ss')
    }, 1000)

    const menang = document.querySelectorAll('.menang')

    if (menang.length > 0) {
      menang[0].style.color = '#F2994A'
      menang[0].style.background = '#FEF5ED'
    } else {
    }
    this.sharing = {
      url: 'https://simotor.id/detail-iklan/' + this.iklan.judul.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+this.id,
      title: this.iklan.judul,
      description: this.iklan.deskripsi,
      quote: this.iklan.judul,
      hashtags: 'nuxtjs,simotor',
      twitterUser: 'simotor',
    }
  },
  async mounted() {
    // await this.listbidselesai()
    console.log('mounted')
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
.stb {
  font-size: 12px;
  cursor: pointer;
}
div.fixed {
  position: relative;
  top: 0%;
  width: 290px;
  /* z-index: 1; */
}
.list_penawaran {
  height: 140px;
  overflow-y: scroll;
}
.nullpenawaran h3 {
  margin-left: auto;
  margin-right: auto;
}
.line {
  text-decoration: line-through;
}
/* .list_harga:nth-child(1){
  color: #F2994A;
  background: #FEF5ED;
} */
</style>
