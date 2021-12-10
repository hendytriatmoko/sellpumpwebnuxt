<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- <v-app-bar app color="#20929D" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar> -->
    <br />
    <div v-if="detail_kategori == ''">
      <div id="display" style="max-width: 1000px; margin: 0 auto !important">
        <v-card class="rounded-lg">
          <div class="ml-5 pt-3 pb-3">
            <h2 style="color: #4c4c4c">Pilih Kategori</h2>
            <div style="color: #a2a2a2">
              Pilih kategori iklan yang kamu inginkan
            </div>
          </div>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6" sm="6">
              <div
                v-for="(item, index) in jenisIklan"
                :key="item"
                @click="data(item, index)"
                
                class="
                  satu
                  d-flex
                  align-center
                  justify-space-between
                  pl-8
                  pt-2
                  pb-2
                "
                :style=" user.id_mst_user_type == 1 & index == 2 ? 'border: 1px solid #e5e5e5; cursor: pointer;background:#C7C7C7' : 'border: 1px solid #e5e5e5; cursor: pointer;'"
              >
                <div >
                  <v-chip
                  small
                  color="#F9DB1D"
                  dark
                  style="position:absolute;left:38%;color:#20929D"
                  v-if="user.id_mst_user_type == 1 & index == 2"
                  >
                    premium
                  </v-chip>
                  <div style="color: #4c4c4c">
                    <b> {{ item.name }}</b>
                  </div>
                  <div style="color: #a2a2a2">{{ item.desc }}</div>
                </div>
                <div>
                  <v-icon size="40">mdi-chevron-right</v-icon>
                </div>
              </div>
            </v-col>
            <v-col cols="6" sm="6">
              <div v-if="this.kategori == 1" style="margin-left: -5%">
                <div
                  v-for="(item, index) in ass"
                  :key="item"
                  @click="data_detail(item, index)"
                  class="
                    dua
                    d-flex
                    align-center
                    justify-space-between
                    pl-8
                    pt-2
                    pb-2
                  "
                  style="border: 1px solid #e5e5e5; cursor: pointer"
                >
                  <div>
                    <div style="color: #4c4c4c">
                      <b> {{ item.name }}</b>
                    </div>
                    <div style="color: #a2a2a2">{{ item.desc }}</div>
                  </div>
                  <div>
                    <v-icon size="40">mdi-chevron-right</v-icon>
                  </div>
                </div>
              </div>
              <div v-if="this.kategori == 2" style="margin-left: -5%">
                <div
                  v-for="(item, index) in ib"
                  :key="item"
                  @click="data_detail(item, index)"
                  class="
                    dua
                    d-flex
                    align-center
                    justify-space-between
                    pl-8
                    pt-2
                    pb-2
                  "
                  style="border: 1px solid #e5e5e5; cursor: pointer"
                >
                  <div>
                    <div style="color: #4c4c4c">
                      <b> {{ item.name }}</b>
                    </div>
                    <div style="color: #a2a2a2">{{ item.desc }}</div>
                  </div>
                  <div>
                    <v-icon size="40">mdi-chevron-right</v-icon>
                  </div>
                </div>
              </div>
              <div v-if="this.kategori == 3" style="margin-left: -5%">
                <div
                  v-for="(item, index) in tb"
                  :key="item"
                  @click="data_detail(item, index)"
                  class="
                    dua
                    d-flex
                    align-center
                    justify-space-between
                    pl-8
                    pt-2
                    pb-2
                  "
                  style="border: 1px solid #e5e5e5; cursor: pointer"
                >
                  <div>
                    <div style="color: #4c4c4c">
                      <b> {{ item.name }}</b>
                    </div>
                    <div style="color: #a2a2a2">{{ item.desc }}</div>
                  </div>
                  <div>
                    <v-icon size="40">mdi-chevron-right</v-icon>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="d-flex pl-8 pt-3" style="color: #20929d; font-size: 20px">
            <div>{{ this.breadcrumb1 }}</div>
            <v-icon color="#20929D">mdi-chevron-right</v-icon>
            <div>{{ this.breadcrumb2 }}</div>
          </div>
          <!-- <div
            v-if="this.breadcrumb2 != ''"
            class="rounded-lg pt-2 pb-2"
            style="background:#20929D;width:10%;cursor:pointer;color:white;margin-left:85%"
          >
            <center> Lanjut</center>
          </div>
          <div
            v-else
            class="rounded-lg pt-2 pb-2"
            style="background:grey;width:10%;cursor:pointer;color:white;margin-left:85%"
          >
            <center> Lanjut</center>
          </div> -->
          <br />
        </v-card>
      </div>
    </div>

    <!-- satu satu iklan aksesoris -->
    <div v-if="kategori == 1" >
      <div id="satusatu"
        v-if="
          (detail_kategori == 1) |
            (detail_kategori == 2) |
            (detail_kategori == 3)
        "
        class="mt-2"
      >
                 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
        <v-card
          rounded="lg"
          style="max-width: 950px; margin: 0 auto !important"
          
        >
          <center>
            <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
          </center>
          <v-card-title style="margin-top: -10px"
            >Detail Iklan Anda</v-card-title
          >
          <v-card-subtitle> Isi detail iklan Anda </v-card-subtitle>
          <v-divider></v-divider>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <b> Foto Produk </b>
                  <v-list-item-subtitle style="color:red">
                  Masukkan minimal 2(dua) foto
                </v-list-item-subtitle>
                </v-list-item-title>                
              </v-list-item>
              <v-list-item-action>
                <div
                  class="pl-2 d-flex flex-wrap justify-space-around text-center"
                >
                  <div
                    v-for="item in list"
                    :key="item.id"
                    class="required ml-3"
                  >
                    <image-uploader
                      v-model="item.foto"
                      :quality="0.7"
                      :scaleRatio="0.5"
                      accept="image/*"
                      :preview="false"
                      :className="[
                        'fileinput',
                        { 'fileinput--loaded': hasImage },
                      ]"
                      :autoRotate="true"
                      outputFormat="blob"
                      @input="setImage('foto' + item.id)"
                      :id="'foto' + item.id"
                    >
                    
                      <label :for="'foto' + item.id" slot="upload-label">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-img
                              :src="item.previewUrl"
                              contain
                              :width="$vuetify.breakpoint.xsOnly ? 130 : 100"
                              :height="$vuetify.breakpoint.xsOnly ? 130 : 100"
                              v-on="on"
                              style="position:relative"
                            >
                              <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                @click="hapusgambar(item.id)"
                                v-if="item.foto != null"
                                style="width:25px;height:25px;position:absolute;right:-5px;top:1px;"
                                color="primary"
                              >
                                <div dark>
                                  x
                                </div>
                              </v-btn>
                            </v-img>
                          </template>
                          <span>Pilih Foto</span>
                        </v-tooltip>
                      </label>
                    </image-uploader>
                    {{ item.label }}
                  </div>
                </div>
              </v-list-item-action>
  
              <v-col cols="12">
                <v-text-field
                  label="Judul Iklan"
                  solo
                  dense
                  v-model="judul_iklan"
                  :counter="70"
                  :rules="judulRules"
                >
                </v-text-field>
              </v-col>
              <v-col style="margin-top: -23px" cols="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Deskripsikan iklan anda"
                  v-model="deskripsi_iklan"
                  :counter="350"
                  :rules="descRules"
                ></v-textarea>
              </v-col>
              <v-list-item-title class="mx-4" style="margin-top: -10px">
                <b> Kondisi </b>
              </v-list-item-title>
              <v-list-item>
                <v-radio-group v-model="id_mst_kondisi" row>
                  <v-radio label="Baru" value="1"></v-radio>
                  <v-radio label="Bekas" value="2"></v-radio>
                </v-radio-group>
              </v-list-item>
              <v-list-item-title class="mx-4">
                <b> Informasi Harga </b>
              </v-list-item-title>
              <v-col cols="12">
                <v-text-field
                  v-model.lazy="amount"
                  outlined
                  solo
                  dense
                  :rules="amountRules"
                  maxlength="11"
                  v-money="money"
                ></v-text-field>
              </v-col>
              <div class="ml-4" >
                <v-list-item-title
                    ><b> Jual Lebih Cepat </b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Jual lebih cepat unit Anda dengan pasang highlight dan sundul.

                    <NuxtLink to="/tentang?tab=highlight" style="color: #20929D">
                      Selengkapnya tentang highlight dan sundul iklan.
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-list-item-subtitle>
                <v-col cols="12" v-for="(item, index) in listsubs" :key="index">
                  <v-item-group>
                    <div class="">
                      <v-row>
                        <v-col
                          cols="12"
                          sm="3"
                          v-for="(pasanglangganan, i) in item.data"
                          :key="i"
                        >
                          <v-card
                            color="#20929D"
                            dark
                            @click="functest(pasanglangganan, i)"
                          >
                            <v-list-item>
                              <v-list-item-title>
                                 <b>{{ pasanglangganan.nama_langganan }} </b>
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-subtitle class="white--text">
                                  Berlaku hingga
                                  {{
                                    moment
                                      .utc(pasanglangganan.expired_at)
                                      .format('DD MMM YYYY')
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item>
                            <!-- <v-list-item>
                              <v-list-item-title>
                                Tersedia:
                                {{ pasanglangganan.total }}</v-list-item-title
                              >
                            </v-list-item> -->
                            <v-list-item>
                              <div class="ml-1 row">
                                <div class="lingluar">
                                  <div class="check"></div>
                                </div>
                                &nbsp;&nbsp;&nbsp;Pakai
                              </div>
                            </v-list-item>
                          </v-card>
                        </v-col>
                      </v-row>
                    </div>
                  </v-item-group>
                </v-col>
              </div>
              
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="back">
                  Sebelumnya
                </v-btn>
                <v-btn color="#20929D" class="white--text" :disabled="countRules.length >= 2 && valid == true ? false : true " @click="storeItemAs" :loading="loading"> 
                  Iklankan
                </v-btn>
              </v-card-actions>
              <br />
            </v-list>
          </v-card>
        </v-card>
 </v-form>
      </div>
    </div>

    <!-- dua satu iklan baris iklankan secara cepat -->
    <div v-if="kategori == 2">
      <div v-if="detail_kategori == 1">
        <div id="duasatu" class="mt-2">
          <v-card
            rounded="lg"
            style="max-width: 950px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -10px"
              >Detail Iklan Anda</v-card-title
            >
            <v-card-subtitle> Isi detail iklan Anda </v-card-subtitle>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <b> Pilih Foto Motor Anda </b>
                    <v-list-item-subtitle style="color:red">
                      Masukkan minimal 2(dua) foto
                    </v-list-item-subtitle>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item-action>
                  <div
                    class="
                      pl-2
                      d-flex
                      flex-wrap
                      justify-space-around
                      text-center
                    "
                  >
                    <div
                      v-for="item in list"
                      :key="item.id"
                      class="required ml-3"
                    >
                      <image-uploader
                        v-model="item.foto"
                        :quality="0.7"
                        :scaleRatio="0.5"
                        accept="image/*"
                        :preview="false"
                        :className="[
                          'fileinput',
                          { 'fileinput--loaded': hasImage },
                        ]"
                        :autoRotate="true"
                        outputFormat="blob"
                        @input="setImage('foto' + item.id)"
                        :id="'foto' + item.id"
                      >
                        <label :for="'foto' + item.id" slot="upload-label">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-img
                                :src="item.previewUrl"
                                contain
                                :width="$vuetify.breakpoint.xsOnly ? 130 : 100"
                                :height="$vuetify.breakpoint.xsOnly ? 130 : 100"
                                v-on="on"
                              >
                              <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                @click="hapusgambar(item.id)"
                                v-if="item.foto != null"
                                style="width:25px;height:25px;position:absolute;right:-5px;top:1px;"
                                color="primary"
                              >
                                <div dark>
                                  x
                                </div>
                              </v-btn>
                              </v-img>
                            </template>
                            <span>Pilih Foto</span>
                          </v-tooltip>
                        </label>
                      </image-uploader>
                      {{ item.label }}
                    </div>
                  </div>
                </v-list-item-action>

                <v-col cols="12">
                  <v-text-field
                    v-model="motor"
                    label="Motor"
                    solo
                    dense
                    readonly
                    @click="dialogduasatu = true"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -3%">
                  <v-text-field
                    label="Judul Iklan"
                    solo
                    dense
                    v-model="judul_iklan"
                    :counter="70"
                    :rules="judulRules"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" style="margin-top: -3%">
                  <v-textarea
                    v-model="deskripsi_iklan"
                    :counter="350"
                    :rules="descRules"
                    solo
                    name="input-7-4"
                    label="Deskripsikan iklan anda"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" style="margin-top: -3%">
                  <div class="pb-2"><b> Informasi Harga </b></div>
                  <v-text-field
                    v-model.lazy="amount"
                    outlined
                    solo
                    dense
                    :rules="amountRules"
                    maxlength="11"
                    v-money="money"
                  ></v-text-field>
                </v-col>
                <v-list style="margin-top: -3%">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        ><b> Gunakan Garansi</b></v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Isikan jumlah garansi dalam satuan hari
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="garansi"
                        input-value="true"
                        color="success"
                        @change="useGaransi"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="garansi">
                    <v-text-field
                      v-model="harigaransi"
                      label="Garansi dalam satuan hari"
                      outlined
                      dense
                    ></v-text-field>
                  </v-list-item>
                </v-list>
                <div class="ml-4" v-if="listsubs.length > 0">
                  <v-list-item-title
                    ><b> Jual Lebih Cepat </b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Jual lebih cepat unit Anda dengan pasang highlight dan sundul.

                    <NuxtLink to="/tentang?tab=highlight" style="color: #20929D" >
                      Selengkapnya tentang highlight dan sundul iklan.
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-list-item-subtitle>
                  <v-col
                    cols="12"
                    v-for="(item, index) in listsubs"
                    :key="index"
                    style="margin-top: -1.5%"
                  >
                    <v-item-group>
                      <div class="">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="3"
                            v-for="(pasanglangganan, i) in item.data"
                            :key="i"
                          >
                            <v-card
                              color="#20929D"
                              dark
                              @click="functest(pasanglangganan, i)"
                            >
                              <v-list-item>
                                <v-list-item-title>
                                 <b> {{ pasanglangganan.nama_langganan }} </b>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-subtitle class="white--text">
                                  Berlaku hingga
                                  {{
                                    moment
                                      .utc(pasanglangganan.expired_at)
                                      .format('DD MMM YYYY')
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item>
                              <!-- <v-list-item>
                                <v-list-item-subtitle class="white--text">
                                  Tersedia:
                                  {{ pasanglangganan.total }}</v-list-item-subtitle>
                              </v-list-item> -->
                              <v-list-item>
                                <div class="ml-1 row">
                                  <div class="lingluar">
                                    <div class="check"></div>
                                  </div>
                                  &nbsp;&nbsp;&nbsp;Pakai
                                </div>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                      </div>
                    </v-item-group>
                  </v-col>
                </div>
                <div v-else></div>
                <div>
                  <label class="mx-4 my-4">
                    <input type="checkbox" v-model="dokumen" :value="true" /> Motor yang Anda jual memiliki
                    dokumen dan surat yang lengkap
                  </label>
                </div>
                <label class="mx-4 my-4">
                  <input type="checkbox" v-model="syarat" :value="true" /> Saya sudah membaca dan memahami
                  <nuxt-link to="/tentang?tab=iklanbaris" style="color: #20929D"
                    >syarat dan ketentuan</nuxt-link
                  >
                  iklan baris
                </label>
                <v-card-actions style="margin-right: 2%">
                  <v-spacer></v-spacer>
                  <v-btn color="white" style="color: #20929d" @click="back">
                    Sebelumnya
                  </v-btn>
                  <v-btn
                    color="#20929D"
                    @click="storeItemIbs"
                    class="white--text"
                    :disabled="countRules.length >= 2 && dokumen == true && syarat == true && tipeid != ''? false : true"
                  >
                    Iklankan
                  </v-btn>
                </v-card-actions>
                <br />

                <v-dialog v-model="dialogduasatu" max-width="500">
                  <v-card>
                    <div class="mx-4 my-4">
                      <h3 class="pt-4" style="color: #4c4c4c">Detail Motor</h3>
                      <div style="color: #a2a2a2">
                        <v-text-field
                          dense
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="Cari"
                          slot="extension"
                          v-model="pencarian"
                          v-if="(merk == '') | ((merk != '') & (tahun != ''))"
                        >
                        </v-text-field>
                        <div class="d-flex" style="color: #20929d">
                          <div
                            class="d-flex"
                            @click="hapusmerk"
                            style="cursor: pointer"
                            v-if="merk != ''"
                          >
                            <div class="pt-2">{{ merk }}</div>
                            <v-icon color="#20929D" size="25" class="pt-2"
                              >mdi-chevron-right</v-icon
                            >
                          </div>
                          <div
                            class="d-flex"
                            @click="hapustahun"
                            style="cursor: pointer"
                            v-if="tahun != ''"
                          >
                            <div class="pt-2">{{ tahun }}</div>
                            <v-icon color="#20929D" size="25" class="pt-2"
                              >mdi-chevron-right</v-icon
                            >
                          </div>
                        </div>
                        <v-row>
                          <v-col cols="12" sm="12">
                            <div v-if="merk == ''">
                              <div
                                v-for="item in brands"
                                :key="item"
                                @click="pilihmerk(item)"
                                style="cursor: pointer"
                              >
                                <div
                                  class="
                                    d-flex
                                    align-center
                                    justify-space-between
                                    my-4
                                  "
                                  v-if="
                                    item.merk.includes(pencarian.toUpperCase())
                                  "
                                >
                                  <div style="color: #4c4c4c">
                                    {{ item.merk }}
                                  </div>
                                  <v-icon size="30">mdi-chevron-right</v-icon>
                                </div>
                              </div>
                            </div>

                            <div v-if="(merk != '') & (tahun == '')">
                              <div
                                v-for="item in years"
                                :key="item"
                                @click="pilihtahun(item)"
                                style="cursor: pointer"
                              >
                                <div
                                  class="
                                    d-flex
                                    align-center
                                    justify-space-between
                                    my-4
                                  "
                                >
                                  <div style="color: #4c4c4c">
                                    {{ item.tahun }}
                                  </div>
                                  <v-icon size="30">mdi-chevron-right</v-icon>
                                </div>
                              </div>
                            </div>

                            <div v-if="(merk != '') & (tahun != '')">
                              <div
                                v-for="item in types"
                                :key="item"
                                @click="pilihtype(item)"
                                style="cursor: pointer"
                              >
                                <div
                                  class="
                                    d-flex
                                    align-center
                                    justify-space-between
                                    my-4
                                  "
                                  v-if="
                                    item.type.includes(pencarian.toUpperCase())
                                  "
                                >
                                  <div style="color: #4c4c4c">
                                    {{ item.type }}
                                  </div>
                                  <v-icon size="30">mdi-chevron-right</v-icon>
                                </div>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </v-card>
                </v-dialog>
              </v-list>
            </v-card>
          </v-card>
        </div>
      </div>
    </div>

    <!-- dua dua iklan baris pilih dari garasi -->
    <div v-if="kategori == 2">
      <div v-if="detail_kategori == 2">
        <div id="frontduadua">
          <v-card
            rounded="lg"
            style="max-width: 900px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -1%"
              >Pilih Unit Motor</v-card-title
            >
            <v-card-subtitle>
              Pilih Unit Motor yang diinginkan
            </v-card-subtitle>
            <v-card>
              <v-list>
                <v-col cols="12">
                  <v-text-field
                    dense
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Cari"
                    slot="extension"
                    @keyup="getUnitMokas"
                    v-model="pencarianmotor"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <v-alert border="left" color="#20929D" dark>
                    Unit motor yang ditampilkan hanya yang memiliki
                    dokumen-dokumen yang lengkap

                    <NuxtLink to="/tentang?tab=iklanbaris" style="color: #20929D">
                      selengkapnya tentang iklan baris disini
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-alert>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <div v-if="unitMokas.length > 0">
                    <v-card
                      class="mt-2"
                      v-for="item in unitMokas"
                      elevation="3"
                      rounded="lg"
                      @click="endduadua(item)"
                      :key="item.id"
                      :value="item"
                    >
                      <v-list
                      >
                        <v-list-item>
                          <v-list-item-avatar class="rounded" size="100" tile>
                            <v-img :src="getImage(item.foto_1)" contain></v-img>
                          </v-list-item-avatar>

                          <v-list-item-title>
                            <div class="ml-10">
                              <div>{{ item.type }}</div>

                              <div>{{ item.nomor_polisi }}</div>
                              <div class="pt-2">{{ item.tahun }}</div>
                            </div>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </div>
                  <div v-else>
                    <v-alert
                      border="left"
                      color="#20929D"
                      colored-border
                      elevation="2"
                    >
                      Anda belum memiliki unit motor.

                      <a href="/garage/add-unit" class="primary--text">
                        Tambah unit disini
                      </a>
                      <v-icon> mdi-chevron-right </v-icon>
                    </v-alert>
                  </div>
                  <br />
                  <v-pagination
                    v-model="page"
                    @input="getUnitMokas"
                    :length="lengthPage"
                    :total-visible="7"
                  ></v-pagination>
                </v-col>
              </v-list>
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="back">
                  Sebelumnya
                </v-btn>
              </v-card-actions>
              <br />
            </v-card>
          </v-card>
        </div>

        <div id="endduadua" style="display: none">
          <v-card
            rounded="lg"
            style="max-width: 950px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -2%"
              >Detail iklan anda</v-card-title
            >
            <v-card-subtitle> Isi detail iklan anda </v-card-subtitle>
            <v-card>
              <v-list>
                <v-col cols="12">
                  <v-text-field
                    label="Judul Iklan"
                    solo
                    dense
                    v-model="judul_iklan"
                    :counter="70"
                    :rules="judulRules"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Deskripsikan iklan anda"
                    v-model="deskripsi_iklan"
                    :counter="350"
                    :rules="descRules"
                  ></v-textarea>
                  <v-btn outlined color="#20929D" @click="setDeskripsi">
                    Gunakan deskripsi unit
                  </v-btn>
                </v-col>

                <v-col cols="12" style="margin-top: -1%">
                  <div class="pb-2"><b> Informasi Harga </b></div>
                  <v-text-field
                    v-model.lazy="amount"
                    outlined
                    solo
                    dense
                    :rules="amountRules"
                    maxlength="11"
                    v-money="money"
                  ></v-text-field>
                </v-col>
                <v-list style="margin-top: -3%">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        ><b> Gunakan Garansi</b></v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Isikan jumlah garansi dalam satuan hari
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="garansi"
                        input-value="true"
                        color="success"
                        @change="useGaransi"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item >
                    <v-text-field
                      v-model="harigaransi"
                      label="Garansi dalam satuan hari"
                      outlined
                      dense
                    ></v-text-field>
                  </v-list-item>
                </v-list>

                <div class="ml-4" >
                      <v-list-item-title
                    ><b> Jual Lebih Cepat </b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Jual lebih cepat unit Anda dengan pasang highlight dan sundul.

                    <NuxtLink to="/tentang?tab=highlight" style="color: #20929D">
                      Selengkapnya tentang highlight dan sundul iklan.
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-list-item-subtitle>
                  <v-col
                    cols="12"
                    v-for="(item, index) in listsubs"
                    :key="index"
                    style="margin-top: -1.5%"
                  >
                  
                    <v-item-group>
                      <div class="">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="3"
                            v-for="(pasanglangganan, i) in item.data"
                            :key="i"
                          >
                            <v-card
                              color="#20929D"
                              dark
                              @click="functest(pasanglangganan, i)"
                            >
                              <v-list-item>
                                <v-list-item-title>
                                 <b> {{ pasanglangganan.nama_langganan }} </b>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-subtitle class="white--text">
                                  Berlaku hingga
                                  {{
                                    moment
                                      .utc(pasanglangganan.expired_at)
                                      .format('DD MMM YYYY')
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item>
                              <!-- <v-list-item>
                                <v-list-item-title>
                                  Tersedia:
                                  {{ pasanglangganan.total }}</v-list-item-title
                                >
                              </v-list-item> -->
                              <v-list-item>
                                <div class="ml-1 row">
                                  <div class="lingluar">
                                    <div class="check"></div>
                                  </div>
                                  &nbsp;&nbsp;&nbsp;Pakai
                                </div>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                      </div>
                    </v-item-group>
                  </v-col>
                </div>
               
              </v-list>
              <label class="mx-4 my-4">
                <input type="checkbox" v-model="syarat" :value="true" /> Saya sudah membaca dan memahami
                <nuxt-link to="/tentang?tab=iklanbaris"
                  >syarat dan ketentuan</nuxt-link
                >
                iklan baris
              </label>
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="backduadua">
                  Sebelumnya
                </v-btn>
                <v-btn
                  color="#20929D"
                  class="white--text"
                  @click="storeItemIbg"
                  :disabled=" syarat == true ? false : true"
                >
                  Iklankan
                </v-btn>
              </v-card-actions>
              <br />
            </v-card>
          </v-card>
        </div>
      </div>
    </div>

    <!-- tiga satu  tawar bersama satuan-->
    <div v-if="kategori == 3">
      <div v-if="detail_kategori == 1">
        <div id="fronttigasatu">
          <v-card
            rounded="lg"
            style="max-width: 900px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -1%"
              >Pilih Unit Motor</v-card-title
            >
            <v-card-subtitle>
              Pilih Unit Motor yang diinginkan
            </v-card-subtitle>
            <v-card>
              <v-list>
                <v-col cols="12">
                  <v-text-field
                    dense
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Cari"
                    slot="extension"
                    @keyup="getUnitMokas"
                    v-model="pencarianmotor"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <v-alert border="left" color="#20929D" dark>
                    Tawar bersama adalah fitur dimana pembeli dapat melakukan
                    aktivitas penawaran pada iklan yang sedang tayang.
                    <NuxtLink to="/tentang?tab=tawarbersama" style="color: #20929D">
                      Selengkapnya tentang tawar bersama disini
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-alert>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <div v-if="unitMokas.length > 0">
                  <v-card
                    class="mt-2"
                    v-for="item in unitMokas"
                    elevation="3"
                    rounded="lg"
                    @click="endduadua(item)"
                    :key="item.id"
                    :value="item"
                  >
                    <v-list
                    >
                      <v-list-item>
                        <v-list-item-avatar class="rounded" size="100" tile>
                          <v-img :src="getImage(item.foto_1)" contain></v-img>
                        </v-list-item-avatar>

                        <v-list-item-title>
                          <div class="ml-10">
                            <div>{{ item.type }}</div>
                            <div>{{ item.nomor_polisi }}</div>
                            <div class="pt-2">{{ item.tahun }}</div>
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                  </div>
                   <div v-else>
                    <v-alert
                      border="left"
                      color="#20929D"
                      colored-border
                      elevation="2"
                    >
                      Anda belum memiliki unit motor.

                      <a href="/garage/add-unit" class="primary--text">
                        Tambah unit disini
                      </a>
                      <v-icon> mdi-chevron-right </v-icon>
                    </v-alert>
                  </div>
                  <br />
                  <v-pagination
                    v-model="page"
                    @input="getUnitMokas"
                    :length="lengthPage"
                    :total-visible="7"
                  ></v-pagination>
                </v-col>
              </v-list>
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="back">
                  Sebelumnya
                </v-btn>
              </v-card-actions>
              <br />
            </v-card>
          </v-card>
        </div>

        <div id="endtigasatu" style="display: none">
          <v-card
            rounded="lg"
            style="max-width: 950px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -2%"
              >Detail iklan anda</v-card-title
            >
            <v-card-subtitle> Isi detail iklan anda </v-card-subtitle>
            <v-card>
              <v-list>
                <v-col id="tipeTb" style="margin-top: -1%">
                  <div class="pb-2"><b> Tipe Tawar Bersama </b></div>

                  <v-item-group v-model="tipetb" mandatory>
                    <v-row>
                      <v-col cols="12" sm="3">
                        <v-item v-slot:default="{ active, toggle }" value="1">
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Terbuka</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="3">
                        <v-item v-slot:default="{ active, toggle }" value="2">
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Tertutup</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Judul Iklan"
                    solo
                    dense
                    v-model="judul_iklan"
                    :counter="70"
                    :rules="judulRules"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Deskripsikan iklan anda"
                    v-model="deskripsi_iklan"
                    :counter="350"
                    :rules="descRules"
                  ></v-textarea>
                  <v-btn outlined color="#20929D" @click="setDeskripsi">
                    Gunakan deskripsi unit
                  </v-btn>
                </v-col>

                <v-col cols="12" style="margin-top: -1%">
                  <div class="pb-2"><b> Informasi Harga </b></div>
                  <v-text-field
                    v-model.lazy="amount"
                    outlined
                    solo
                    dense
                    :rules="amountRules"
                    maxlength="11"
                    v-money="money"
                  ></v-text-field>
                </v-col>
                <v-col v-if="tipetb == 2">
                  <v-list-item style="margin-left:-15px">
                    <v-list-item-content>
                      <v-list-item-title
                        ><b> Penawaran di bawah Harga Awal</b></v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Dengan mengaktifkan penawaran dibawah harga awal, 
                        penawar dapat melakukan <br> penawaran dibawah harga awal yang telah dipasang
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="underbid"
                        input-value="true"
                        color="success"
                        @change="useUnderbid"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>
                </v-col>
                <v-col>
                  <div class="pb-2"><b> Kelipatan Tawaran </b></div>

                  <v-item-group v-model="kelipatan" mandatory>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="50000"
                        >
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 50.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="100000"
                        >
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 100.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="150000"
                        >
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 150.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-col>

                <v-list id="tiket" style="margin-top: -1%">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        ><b> Gunakan Tiket</b></v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Isikan jumlah tiket untuk iklan ini, minimal 1 Tiket
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="tiket"
                        input-value="true"
                        color="success"
                        @change="useTiket"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="tiket">
                    <v-text-field
                      v-model="jumlahtiket"
                      label="Jumlah Tiket"
                      outlined
                      dense
                      :autofocus="tiket ? true : false"
                      :rules="jumlahRules"
                      v-mask="mask"
                    ></v-text-field>
                  </v-list-item>
                </v-list>
                <v-col id="tglTb">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <div><b> Tanggal Mulai Tawar Bersama</b></div>

                      <v-datetime-picker
                        v-model="tglMulaiTB"
                        :datePickerProps="{
                          min: today,
                        }"
                        @input="dateTimeRange"
                        :textFieldProps="suffix"
                        :timePickerProps="{ format: '24hr' }"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>

                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>

                        <template slot="actions" slot-scope="{ parent }">
                          <v-btn
                            color="success darken-1"
                            @click="parent.okHandler"
                          >
                            OK
                          </v-btn>
                        </template>
                      </v-datetime-picker>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <div><b> Tanggal Selesai Tawar Bersama</b></div>

                      <v-datetime-picker
                        v-model="tglSelesaiTB"
                        :datePickerProps="datePickerProps"
                        :textFieldProps="textFieldProps"
                        :timePickerProps="{ format: '24hr' }"
                        @input="checkDateTB"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>

                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>

                        <template slot="actions" slot-scope="{ parent }">
                          <v-btn
                            color="success darken-1"
                            @click="parent.okHandler"
                          >
                            OK
                          </v-btn>
                        </template>
                      </v-datetime-picker>
                    </v-col>
                  </v-row>
                </v-col>

                

                <div class="ml-4">
                  <v-list-item-title
                    ><b> Jual Lebih Cepat </b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Jual lebih cepat unit Anda dengan pasang highlight dan sundul.

                    <NuxtLink to="/tentang?tab=highlight" style="color: #20929D">
                      Selengkapnya tentang highlight dan sundul iklan.
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-list-item-subtitle>
                  <v-col
                    cols="12"
                    v-for="(item, index) in listsubs"
                    :key="index"
                    style="margin-top: -1.5%"
                  >
                    <v-item-group>
                      <div class="">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="3"
                            v-for="(pasanglangganan, i) in item.data"
                            :key="i"
                          >
                            <v-card
                              color="#20929D"
                              dark
                              @click="functest(pasanglangganan, i)"
                            >
                              <v-list-item>
                                <v-list-item-title>
                                  <b> {{ pasanglangganan.nama_langganan }} </b>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-subtitle class="white--text">
                                  Berlaku hingga
                                  {{
                                    moment
                                      .utc(pasanglangganan.expired_at)
                                      .format('DD MMM YYYY')
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item>
                              <!-- <v-list-item>
                                <v-list-item-title>
                                  Tersedia:
                                  {{ pasanglangganan.total }}</v-list-item-title
                                >
                              </v-list-item> -->
                              <v-list-item>
                                <div class="ml-1 row">
                                  <div class="lingluar">
                                    <div class="check"></div>
                                  </div>
                                  &nbsp;&nbsp;&nbsp;Pakai
                                </div>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                      </div>
                    </v-item-group>
                  </v-col>
                </div>
              </v-list>
              <label class="mx-4 my-4">
                <input type="checkbox" v-model="syarat" :value="true" /> Saya sudah membaca dan memahami
                <nuxt-link to="/tentang?tab=tawarbersama"
                  >syarat dan ketentuan</nuxt-link
                >
                tawar bersama
              </label>
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="backduadua">
                  Sebelumnya
                </v-btn>
                <v-btn
                  color="#20929D"
                  class="white--text"
                  @click="storeItemTbs"
                  :disabled="syarat == true ? false : true"
                >
                  Iklankan
                </v-btn>
              </v-card-actions>
              <br />
            </v-card>
          </v-card>
        </div>
      </div>
    </div>

    <!-- tiga dua  tawar bersama paketan-->
    <div v-if="kategori == 3">
      <div v-if="detail_kategori == 2">
        <div id="fronttigadua">
          <v-card
            rounded="lg"
            style="max-width: 900px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -1%"
              >Pilih Unit Motor</v-card-title
            >
            <v-card-subtitle>
              Pilih Unit Motor yang diinginkan
            </v-card-subtitle>
            <v-card>
              <v-list>
                <v-col cols="12">
                  <v-text-field
                    dense
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Cari"
                    slot="extension"
                    @keyup="getUnitMokas"
                    v-model="pencarianmotor"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <v-alert border="left" color="#20929D" dark>
                    Tawar bersama adalah fitur dimana pembeli dapat melakukan
                    aktivitas penawaran pada iklan yang sedang tayang.
                    <NuxtLink to="/tentang?tab=tawarbersama" style="color: #20929D">
                      Selengkapnya tentang tawar bersama disini
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-alert>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <div v-if="unitMokas.length > 0">
                  <v-list-item-group >
                    <v-card v-for="item in unitMokas" :key="item" class="mt-2" @click="pilihunit(item)">
                      <v-list-item
                        color="indigo"
                      >
                        <template>
                          <v-list-item-avatar
                            class="rounded-lg"
                            size="100"
                            tile
                          >
                            <img :src="getImage(item.foto_1)" alt="" />
                            <!-- <v-img :src="getImage(item.foto_1)" contain></v-img> -->
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              v-html="item.type"
                              style="color: #000000"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              v-html="item.nomor_polisi"
                              style="color: #282828"
                            ></v-list-item-subtitle>
                            <v-list-item-subtitle
                              v-html="item.tahun"
                              class="pt-2"
                              style="color: #282828"
                            ></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-action v-if="selected.length > 0">
                            <!-- <v-icon  color="grey lighten-1" large>
                              mdi-star
                            </v-icon> -->
                            <div >
                              <v-icon v-for="data in selected" :key="data" 
                               :color="data == item.id ? 'yellow' : ''" 
                               :style="data == item.id ? '' : 'display:none'" large>
                                mdi-star
                              </v-icon>
                            </div>
                          </v-list-item-action>
                          
                        </template>
                      </v-list-item>
                    </v-card>
                  </v-list-item-group>
                  </div>
                  <div v-else>
                    <v-alert
                      border="left"
                      color="#20929D"
                      colored-border
                      elevation="2"
                    >
                      Anda belum memiliki unit motor.

                      <a href="/garage/add-unit" class="primary--text">
                        Tambah unit disini
                      </a>
                      <v-icon> mdi-chevron-right </v-icon>
                    </v-alert>
                  </div>
                  <br />
                  <v-pagination
                    v-model="page"
                    @input="getUnitMokas"
                    :length="lengthPage"
                    :total-visible="7"
                  ></v-pagination>
                  <!-- <div align="center" v-if="unitMokas != null">
                    <v-btn
                      color="#20929D"
                      dark
                      outlined
                      @click="getTB"
                      v-if="unitMokas.length < 40 & unitMokas.length < total"
                    >
                      Muat Lebih Banyak
                    </v-btn>
                  </div> -->
                </v-col>
              </v-list>
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="back">
                  Sebelumnya
                </v-btn>
                <v-btn
                  v-if="selected.length > 1"
                  color="#20929D"
                  class="white--text"
                  @click="endduadua"
                >
                  Selanjutnya
                </v-btn>
                <v-btn
                  icon
                  color="#20929D"
                  v-if="selectedIklan == 3 && selected.length > 1"
                >
                  <v-icon large>mdi-arrow-right-circle</v-icon>
                </v-btn>
              </v-card-actions>
              <br />
            </v-card>
          </v-card>
        </div>

        <div id="endtigadua" style="display: none">
          <v-card
            rounded="lg"
            style="max-width: 950px; margin: 0 auto !important"
          >
            <center>
              <h2 class="pt-3">{{ this.breadcrumb2 }}</h2>
            </center>
            <v-card-title style="margin-top: -2%"
              >Detail iklan anda</v-card-title
            >
            <v-card-subtitle> Isi detail iklan anda </v-card-subtitle>
            <v-card>
              <v-list>
                <v-col id="tipeTb" style="margin-top: -1%">
                  <div class="pb-2"><b> Tipe Tawar Bersama </b></div>

                  <v-item-group v-model="tipetb" mandatory>
                    <v-row>
                      <v-col cols="12" sm="3">
                        <v-item v-slot:default="{ active, toggle }" value="1">
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Terbuka</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="3">
                        <v-item v-slot:default="{ active, toggle }" value="2">
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Tertutup</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Judul Iklan"
                    solo
                    dense
                    v-model="judul_iklan"
                    :counter="70"
                    :rules="judulRules"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="margin-top: -2%">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Deskripsikan iklan anda"
                    v-model="deskripsi_iklan"
                    :counter="350"
                    :rules="descRules"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" style="margin-top: -1%">
                  <div class="pb-2"><b> Informasi Harga </b></div>
                  <v-text-field
                    v-model.lazy="amount"
                    outlined
                    solo
                    dense
                    :rules="amountRules"
                    maxlength="11"
                    v-money="money"
                  ></v-text-field>
                </v-col>
                <v-col v-if="tipetb == 2">
                  <v-list-item style="margin-left:-15px">
                    <v-list-item-content>
                      <v-list-item-title
                        ><b> Penawaran di bawah Harga Awal</b></v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Dengan mengaktifkan penawaran dibawah harga awal, 
                        penawar dapat melakukan <br> penawaran dibawah harga awal yang telah dipasang
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="underbid"
                        input-value="true"
                        color="success"
                        @change="useUnderbid"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>
                </v-col>
                <v-col>
                  <div class="pb-2"><b> Kelipatan Tawaran </b></div>

                  <v-item-group v-model="kelipatan" mandatory>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="50000"
                        >
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 50.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="100000"
                        >
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 100.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="150000"
                        >
                          <v-card
                            :color="active ? '#20929D' : ''"
                            :style="active ? 'color:white' : ''"
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 150.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-col>

                <v-list id="tiket" style="margin-top: -1%">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        ><b> Gunakan Tiket</b></v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Isikan jumlah tiket untuk iklan ini, minimal 1 Tiket
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="tiket"
                        input-value="true"
                        color="success"
                        @change="useTiket"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="tiket">
                    <v-text-field
                      v-model="jumlahtiket"
                      label="Jumlah Tiket"
                      outlined
                      dense
                      :autofocus="tiket ? true : false"
                      :rules="jumlahRules"
                      v-mask="mask"
                    ></v-text-field>
                  </v-list-item>
                </v-list>
                <v-col id="tglTb">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <div><b> Tanggal Mulai Tawar Bersama</b></div>

                      <v-datetime-picker
                        v-model="tglMulaiTB"
                        :datePickerProps="{
                          min: today,
                        }"
                        @input="dateTimeRange"
                        :textFieldProps="suffix"
                        :timePickerProps="{ format: '24hr' }"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>

                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>

                        <template slot="actions" slot-scope="{ parent }">
                          <v-btn
                            color="success darken-1"
                            @click="parent.okHandler"
                          >
                            OK
                          </v-btn>
                        </template>
                      </v-datetime-picker>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <div><b> Tanggal Selesai Tawar Bersama</b></div>

                      <v-datetime-picker
                        v-model="tglSelesaiTB"
                        :datePickerProps="datePickerProps"
                        :textFieldProps="textFieldProps"
                        :timePickerProps="{ format: '24hr' }"
                        @input="checkDateTB"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>

                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>

                        <template slot="actions" slot-scope="{ parent }">
                          <v-btn
                            color="success darken-1"
                            @click="parent.okHandler"
                          >
                            OK
                          </v-btn>
                        </template>
                      </v-datetime-picker>
                    </v-col>
                  </v-row>
                </v-col>

                

                <div class="ml-4">
                   <v-list-item-title
                    ><b> Jual Lebih Cepat </b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Jual lebih cepat unit Anda dengan pasang highlight dan sundul.

                    <NuxtLink to="/tentang?tab=highlight" style="color: #20929D">
                      Selengkapnya tentang highlight dan sundul iklan.
                    </NuxtLink>
                    <v-icon> mdi-chevron-right </v-icon>
                  </v-list-item-subtitle>
                  <v-col
                    cols="12"
                    v-for="(item, index) in listsubs"
                    :key="index"
                    style="margin-top: -1.5%"
                  >
                    <v-item-group>
                      <div class="">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="3"
                            v-for="(pasanglangganan, i) in item.data"
                            :key="i"
                          >
                            <v-card
                              color="#20929D"
                              dark
                              @click="functest(pasanglangganan, i)"
                            >
                              <v-list-item>
                                <v-list-item-title>
                                  <b> {{ pasanglangganan.nama_langganan }} </b>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-subtitle class="white--text">
                                  Berlaku hingga
                                  {{
                                    moment
                                      .utc(pasanglangganan.expired_at)
                                      .format('DD MMM YYYY')
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item>
                              
                              <!-- <v-list-item>
                                <v-list-item-title>
                                  Tersedia:
                                  {{ pasanglangganan.total }}</v-list-item-title
                                >
                              </v-list-item> -->
                              <v-list-item>
                                <div class="ml-1 row">
                                  <div class="lingluar">
                                    <div class="check"></div>
                                  </div>
                                  &nbsp;&nbsp;&nbsp;Pakai
                                </div>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                      </div>
                    </v-item-group>
                  </v-col>
                </div>
              </v-list>
              <label class="mx-4 my-4">
                <input type="checkbox" v-model="syarat" :value="true" /> Saya sudah membaca dan memahami
                <nuxt-link to="/tentang?tab=iklanbaris"
                  >syarat dan ketentuan</nuxt-link
                >
                iklan baris
              </label>
              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="white" style="color: #20929d" @click="backduadua">
                  Sebelumnya
                </v-btn>
                <v-btn
                  color="#20929D"
                  class="white--text"
                  @click="storeItemTbp"
                  :disabled="syarat == true ? false : true"
                >
                  Iklankan
                </v-btn>
              </v-card-actions>
              <br />
            </v-card>
          </v-card>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
import { VMoney } from 'v-money'
Vue.use(VueGeolocation)
export default {
  name: 'add',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  directives: { money: VMoney, mask },
  data: () => ({
    breadcrumb1: '',
    breadcrumb2: '',
    kategori: '',
    detail_kategori: '',
    dokumen: false,
    syarat: false,
    lanjut: false,
    ass: [
      {
        id: 1,
        name: 'Aksesoris',
        desc: 'Ex: Spion, handgrip, dll',
      },
      {
        id: 2,
        name: 'Suku Cadang',
        desc: 'Ex: Busi, Kampas Rem, dll',
      },
      {
        id: 3,
        name: 'Lainnya',
        desc: 'Ex: Helm, Sarung tangan, dll',
      },
    ],
    ib: [
      {
        id: 1,
        name: 'Iklankan Secara Cepat',
        desc: 'Jual motor secara satuan dengan cepat tanpa input unit terlebih dahulu',
      },
      {
        id: 2,
        name: 'Pilih dari Garasi',
        desc: 'Jual motor secara satuan pilih dari garasimu',
      },
    ],
    tb: [
      {
        id: 1,
        name: 'Tawar Bersama Satuan',
        desc: 'Dengan skema tawar bersama, jual motor kamu secara satuan',
      },
      {
        id: 2,
        name: 'Tawar Bersama Paketan',
        desc: 'Dengan skema tawar bersama, jual motor kamu secara Paketan',
      },
    ],
    jenisIklan: [
      {
        id: 1,
        name: 'Aksesoris & Sparepart',
        desc: 'Jual aksesoris & sparepart kamu disini',
      },
      {
        id: 2,
        name: 'Iklan Baris',
        desc: 'Jual motor kamu secara satuan dengan iklan baris',
      },
      {
        id: 3,
        name: 'Tawar Bersama',
        desc: 'Jual motor kamu dengan skema tawar bersama, ',
      },
    ],
    // satusatu
    column: null,
    countRules: [],
    valid: true,
    list: [
      {
        id: 1,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 1',
        required: '*',
      },
      {
        id: 2,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 2',
        required: '*',
      },
      {
        id: 3,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 3',
        required: '',
      },
      {
        id: 4,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 4',
        required: '',
      },
      {
        id: 5,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 5',
        required: '',
      },
    ],
    listtemp:[],
    listfix: [
      {foto: null,},
      {foto: null,},
      {foto: null,},
      {foto: null,},
      {foto: null,},
    ],
    row: null,
    deskripsi_iklan: '',
    descRules: [
      (v) => !!v || 'deskripsi unit harus diisi',
      (v) => v.length >= 2 || 'Min 2 karakter',
      (v) => v.length <= 350 || 'Max 350 karakter',
    ],
    judul_iklan: '',
    judulRules: [
      (v) => !!v || 'judul iklan harus diisi',
      (v) => v.length >= 2 || 'Min 2 karakter',
      (v) => v.length <= 70 || 'Max 70 karakter',
    ],
    amount: 0,
    amountRules: [
      (v) => v != 0 || 'Field is required',
      (v) => v.length <= 11 || 'Max 11 karakter',
    ],
    jumlahRules: [
      (v) => v.length >= 1 || 'Min 1 Tiket',
      (v) => v.length <= 9 || 'Max 9 Tiket',
    ],
    mask: '#',
    money: {
      precision: 0,
      thousands: '.',
      masked: true,
    },
    hasImage: false,
    listsubs: [],
    id_iklan_langganan: null,
    // semua
    judul_iklan: '',
  
    deskripsi_iklan: '',
    userid: '',
    harga: '',
      loading: false,
    // aksesoris dan sparepart
    longitude: 0,
    latitude: 0,
    id_mst_kondisi: '',
      valid: true,
    id_mst_iklan_produk: '',
    // iklan baris secara cepat
    dialogduasatu: false,
    motor: '',
    brands: [],
    merk: '',
    merkid: '',
    years: [],
    tahun: '',
    types: [],
    tipe: '',
    countRules: [],
    tipeid: '',
    garansi: false,
    harigaransi: 0,
    pencarian: '',
    pencarianmotor: '',
    // pilih dari garasi ib
    lembar_stnk: true,
    lembar_bpkb: true,
    lembar_pajak: true,
    // iklan baris garasi
    unitMokas: [],
    total: 0,
    lengthPage: 1,
    keyword: '',
    limit: 10,
    page: 1,
    selectedUnit: [],
    tampilan: 1,
    // tb satuan
    kelipatan: '',
    tipetb: '1',
    tiket: false,
    jumlahtiket: 1,
    tglMulaiTB: '',
    datePickerProps: {},
    today: '',
    suffix: {},
    textFieldProps: {},
    menu2: false,
    tglSelesaiTB: null,
    formRules: [(v) => !!v || 'Field is required'],
    tbDateRules: [],
    underbid: false,
    //tb paketan
    selected: [],
    multiple: true,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    async getListSubs() {
      await this.$axios
        .get('/produk/v3/langganan_pemilik_group', {
          params: {
            id_app_user: this.user.id,
            id_mst_langganan_tipe: 7,
            id_mst_langganan_status:1,
            limit: 99,
            offset: 0,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.listsubs = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    functest(pasanglangganan, i) {
      if (this.id_iklan_langganan == pasanglangganan.id_iklan_langganan) {
        this.id_iklan_langganan = null
        const topads = document.querySelectorAll('.check')
        for (let t = 0; t < topads.length; t++) {
          if (t == i) {
            topads[i].classList.remove('lingdalam')
          }
        }
      } else {
        this.id_iklan_langganan = pasanglangganan.id_iklan_langganan
        const topads = document.querySelectorAll('.check')
        for (let t = 0; t < topads.length; t++) {
          if (t == i) {
            topads[i].classList.add('lingdalam')
          } else {
            topads[t].classList.remove('lingdalam')
          }
        }
        // document.querySelectorAll(".check").classList.add('lingdalam')
      }
      // document.querySelector(".mute").checked = true;
      console.log('test pasanglangganan ', this.id_iklan_langganan)
      // console.log('test i ', i)
    },
    async data(item, index) {
      const warna1 = document.querySelectorAll('.satu')
      // warna1[index].classList.add('pilih')
      if (warna1.length > 0) {
        for (let t = 0; t < warna1.length; t++) {
          if (t == index) {
            warna1[index].classList.add('pilih')
          } else {
            warna1[t].classList.remove('pilih')
          }
        }
      } else {
      }
      const warna2 = document.querySelectorAll('.dua')
      if (warna2.length > 0) {
        for (let t = 0; t < warna2.length; t++) {
          warna2[t].classList.remove('pilih')
        }
      } else {
      }
      if (this.user.id_mst_user_type == 1 & index == 2) {
        this.kategori = ''
      }else{
        this.kategori = item.id
      }
      this.breadcrumb1 = item.name
      this.breadcrumb2 = ''
      this.getUnitMokas()
      console.log('kategori', this.kategori)
      console.log('kelas', index)
      console.log('kirim data', this.kirim_data)
    },
    async data_detail(item, index) {
      const warna1 = document.querySelectorAll('.dua')
      // warna1[index].classList.add('pilih')
      if (warna1.length > 0) {
        for (let t = 0; t < warna1.length; t++) {
          if (t == index) {
            warna1[index].classList.add('pilih')
          } else {
            warna1[t].classList.remove('pilih')
          }
        }
      } else {
      }
      this.detail_kategori = item.id
      this.breadcrumb2 = item.name
      console.log('kategori', this.kategori)
      console.log('detail kategori', this.detail_kategori)
      console.log('kirim data', this.kirim)
    },
    async link() {
      if (this.kategori == 1) {
        // this.$router.push('/seller/add-iklanas')
        document.getElementById('display').style.display = 'none'
        document.getElementById('satusatu').style.display = ''
      }
      if ((this.kategori == 2) & (this.detail_kategori == 1)) {
        // this.$router.push('/seller/add-iklanas')
        document.getElementById('display').style.display = 'none'
        document.getElementById('duasatu').style.display = ''
      }
    },
    async back() {
      // document.getElementById("satusatu").style.display = "none";
      // document.getElementById("duasatu").style.display = "none";
      // document.getElementById("display").style.display = "";
      this.judul_iklan = ''
      this.deskripsi_iklan = ''
      this.amount = 0
      this.id_mst_kondisi = ''
      this.id_iklan_langganan = null
      this.detail_kategori = ''
      this.kategori = ''
      this.breadcrumb1 = ''
      this.breadcrumb2 = ''
      // ib cepat
      this.motor = ''
      this.merk = ''
      this.merkid = ''
      this.tahun = ''
      this.tipe = ''
      this.tipeid = ''
      this.garansi = false
      this.selected = []
      // ib garasi
      // css subs
      const lingdalam = document.querySelectorAll('.lingdalam')
      if (lingdalam > 0) {
        lingdalam[0].classList.remove('lingdalam')
      }
    },
    // satu satu
    setImage(file) {
      this.hasImage = true
      this.image = file
      this.onFileChange(file)
    },
    onFileChange(foto) {
      const reader = new FileReader()
      if (foto == 'foto1') {
        reader.onload = (e) => {
          this.list[0].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[0].foto)
        this.countRules.push(this.list[0].foto)
      }
      if (foto == 'foto2') {
        reader.onload = (e) => {
          this.list[1].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[1].foto)
        this.countRules.push(this.list[1].foto)
      }
      if (foto == 'foto3') {
        reader.onload = (e) => {
          this.list[2].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[2].foto)
        this.countRules.push(this.list[2].foto)
      }
      if (foto == 'foto4') {
        reader.onload = (e) => {
          this.list[3].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[3].foto)
        this.countRules.push(this.list[3].foto)
      }
      if (foto == 'foto5') {
        reader.onload = (e) => {
          this.list[4].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[4].foto)
        this.countRules.push(this.list[4].foto)
      }
    },
    async storeItemAs() {
      if (this.breadcrumb2 == 'Aksesoris') {
        this.id_mst_iklan_produk = '9'
      }
      if (this.breadcrumb2 == 'Suku Cadang') {
        this.id_mst_iklan_produk = '10'
      }
      if (this.breadcrumb2 == 'Lainnya') {
        this.id_mst_iklan_produk = '11'
      }
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].foto != null) {
          this.listtemp.push(this.list[i].foto)
        }
      }
      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listtemp[i] != undefined) {
          this.listfix[i].foto = this.listtemp[i]
        }else{
          this.listfix[i].foto = null
        }        
      }
      let formData = new FormData()
      formData.set('id_app_user', this.user.id)
      if (this.listfix[0].foto != null) {
        formData.set('foto_1', this.listfix[0].foto, 'foto1.jpg')
      }
      if (this.listfix[1].foto != null) {
        formData.set('foto_2', this.listfix[1].foto, 'foto2.jpg')
      }
      if (this.listfix[2].foto != null) {
        formData.set('foto_3', this.listfix[2].foto, 'foto3.jpg')
      }
      if (this.listfix[3].foto != null) {
        formData.set('foto_4', this.listfix[3].foto, 'foto4.jpg')
      }
      if (this.listfix[4].foto != null) {
        formData.set('foto_5', this.listfix[4].foto, 'foto5.jpg')
      }
      formData.set('judul', this.judul_iklan.trim())
      formData.set('deskripsi', this.deskripsi_iklan.trim())
      formData.set('latitude', this.latitude)
      formData.set('longitude', this.longitude)
      formData.set('harga', String(this.amount).replaceAll('.', ''))
      formData.set('id_mst_kondisi', this.id_mst_kondisi)
      formData.set('id_mst_iklan_produk', this.id_mst_iklan_produk)
      if (this.id_iklan_langganan != null) {
        formData.set('id_iklan_langganan', this.id_iklan_langganan)        
      }
      await this.$axios
        .post('/iklan/v3/iklan_as', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setProductId(data.data.id)
          // this.setUnitID(this.selected.id)
          // this.$router.push('/detail-iklan/'+this.judul_iklan.toLowerCase().replace(/ /g, '-'))
          this.$router.push('/account/profile/iklan-garasi')
          // this.$router.push(
          //   '/detail-iklan/' +
          //     data.data.judul.toLowerCase().replace(/ /g, '-')
          // )
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            // text: data.api_message,            
            text: 'Field harus diisi ',
          })
          this.loading = false
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
      console.log('ini foto', this.list)
      console.log('ini judul', this.judul_iklan)
      console.log('ini deskripsi', this.deskripsi_iklan)
      console.log('ini user', this.user.id)
      console.log('ini kondisi', this.id_mst_kondisi)
      console.log('ini iklan produk', this.id_mst_iklan_produk)
      console.log('ini harga', this.amount)
    },
    async hps(){
      console.log('list foto', this.list)
    },
    async hapusgambar(id){
      console.log('gambar sebelum', this.list)
      if (id == 1) {
        this.list[id-1].foto = null
        this.list[id-1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 2) {
        this.list[id-1].foto = null
        this.list[id-1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 3) {
        this.list[id-1].foto = null
        this.list[id-1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 4) {
        this.list[id-1].foto = null
        this.list[id-1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 5) {
        this.list[id-1].foto = null
        this.list[id-1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      console.log('gambar', this.list)
    },
    // dua satu
    async getMerk() {
      await this.$axios
        .get('/produk/v3/mst_motor_merk')
        .then((response) => {
          let { data } = response.data
          this.brands = data
          console.log('brand', this.brands)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async pilihmerk(item) {
      this.merk = item.merk
      this.merkid = item.id
      this.pencarian = ''
      console.log('merkid', this.merkid)
      this.getTahun()
    },
    async hapusmerk() {
      this.merk = ''
      this.merkid = ''
      this.tahun = ''
      console.log('merkid', this.merkid)
      this.getTahun()
    },
    async getTahun() {
      await this.$axios
        .get('/produk/v3/mst_motor_type_tahun', {
          params: {
            id_mst_motor_merk: this.merkid,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.years = data
          console.log('years', this.years)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async pilihtahun(item) {
      this.tahun = item.tahun
      this.pencarian = ''
      console.log('tahun', this.tahun)
      this.getTipe()
    },
    async hapustahun() {
      this.tahun = ''
      this.getTipe()
    },
    async getTipe() {
      await this.$axios
        .get('/produk/v3/mst_motor_type', {
          params: {
            id_mst_motor_merk: this.merkid,
            tahun: this.tahun,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.types = data
          console.log('types', this.types)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async pilihtype(item) {
      this.tipe = item.type
      this.tipeid = item.id
      console.log('merk', this.merk)
      console.log('tahun', this.tahun)
      console.log('type', this.tipe)
      console.log('typeid', this.tipeid)
      this.dialogduasatu = false
      this.motor = this.merk + ' / ' + this.tahun + ' / ' + this.tipe
      this.pencarian = ''
    },
    async useGaransi() {
      if (this.garansi) {
        this.harigaransi = 1
      } else {
        this.harigaransi = 0
      }
    },
    async useUnderbid() {
      // if (this.garansi) {
      //   this.harigaransi = 1
      // } else {
      //   this.harigaransi = 0
      // }
      console.log('under bid', this.underbid)
    },
    async storeItemIbs() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].foto != null) {
          this.listtemp.push(this.list[i].foto)
        }
      }
      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listtemp[i] != undefined) {
          this.listfix[i].foto = this.listtemp[i]
        }else{
          this.listfix[i].foto = null
        }        
      }
      let formData = new FormData()
      formData.set('id_mst_motor_type', this.tipeid)
      
      formData.set('tahun', this.tahun)
      formData.set('id_app_user', this.user.id)
      if (this.listfix[0].foto != null) {
        formData.set('foto_1', this.listfix[0].foto, 'foto1.jpg')
      }
      if (this.listfix[1].foto != null) {
        formData.set('foto_2', this.listfix[1].foto, 'foto2.jpg')
      }
      if (this.listfix[2].foto != null) {
        formData.set('foto_3', this.listfix[2].foto, 'foto3.jpg')
      }
      if (this.listfix[3].foto != null) {
        formData.set('foto_4', this.listfix[3].foto, 'foto4.jpg')
      }
      if (this.listfix[4].foto != null) {
        formData.set('foto_5', this.listfix[4].foto, 'foto5.jpg')
      }
      formData.set('judul', this.judul_iklan.trim())
      formData.set('deskripsi', this.deskripsi_iklan.trim())
      formData.set('latitude', this.latitude)
      formData.set('longitude', this.longitude)
      
      formData.set('harga', String(this.amount).replaceAll('.', ''))      
      
      if (this.id_iklan_langganan != null) {
      formData.set('id_iklan_langganan', this.id_iklan_langganan)
      }
      formData.set('garansi', this.harigaransi)
      await this.$axios
        .post('/iklan/v3/iklan_ib_mokas_satuan_quick', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setProductId(data.data.id)
          // this.setUnitID(this.selected.id)
          // this.$router.push('/detail-iklan/'+this.judul_iklan.toLowerCase().replace(/ /g, '-'))
          this.$router.push('/account/profile/iklan-garasi')
          // this.$router.push(
          //   '/detail-iklan/' +
          //     data.data.judul.toLowerCase().replace(/ /g, '-')
          // )
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Field harus diisi',
          })
          this.loading = false
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
      console.log('ini mst motor type', this.tipeid)
      console.log('ini tahun', this.tahun)
      console.log('ini id app user', this.user.id)
      console.log('ini judul', this.judul_iklan)
      console.log('ini deskripsi', this.deskripsi_iklan)
      console.log('ini user', this.user.id)
      console.log('ini harga', this.amount)
      console.log('ini garansi', this.harigaransi)
      console.log('ini langganan', this.id_iklan_langganan)
      console.log('ini formdata', formData)
    },
    // dua dua
    async endduadua(item) {
      if ((this.kategori == 2) & (this.detail_kategori == 2)) {
        document.getElementById('frontduadua').style.display = 'none'
        document.getElementById('endduadua').style.display = ''
        this.pencarianmotor = ''
      }
      if ((this.kategori == 3) & (this.detail_kategori == 1)) {
        document.getElementById('fronttigasatu').style.display = 'none'
        document.getElementById('endtigasatu').style.display = ''
        this.pencarianmotor = ''
      }
      if ((this.kategori == 3) & (this.detail_kategori == 2)) {
        document.getElementById('fronttigadua').style.display = 'none'
        document.getElementById('endtigadua').style.display = ''
        this.pencarianmotor = ''
      } else {
        console.log('ini bukan tiga satu')
      }
      this.selectedUnit = item
      console.log('selected unit', this.selectedUnit)
    },
    async backduadua() {
      const lingdalam = document.querySelector('.lingdalam')
      if (lingdalam != null) {
        lingdalam.classList.remove('lingdalam')
      }
      if ((this.kategori == 2) & (this.detail_kategori == 2)) {
        this.judul_iklan = ''
        this.deskripsi_iklan = ''
        this.amount = 0
        this.id_iklan_langganan = null
        this.garansi = false
        document.getElementById('endduadua').style.display = 'none'
        document.getElementById('frontduadua').style.display = ''
      }
      if ((this.kategori == 3) & (this.detail_kategori == 1)) {
        this.judul_iklan = ''
        this.deskripsi_iklan = ''
        this.amount = 0
        this.id_iklan_langganan = null
        this.garansi = false
        this.tiket = false
        this.kelipatan = ''
        this.tipetb = '1'
        ;(this.tglMulaiTB = ''),
          (this.tglSelesaiTB = null),
          (this.datePickerProps = {})
        this.today = ''
        this.suffix = {}
        this.textFieldProps = {}
        this.underbid = false
        document.getElementById('endtigasatu').style.display = 'none'
        document.getElementById('fronttigasatu').style.display = ''
      }
      if ((this.kategori == 3) & (this.detail_kategori == 2)) {
        this.judul_iklan = ''
        this.deskripsi_iklan = ''
        this.amount = 0
        this.id_iklan_langganan = null
        this.garansi = false
        this.tiket = false
        this.kelipatan = ''
        this.tipetb = '1'
        ;(this.tglMulaiTB = ''),
          (this.tglSelesaiTB = null),
          (this.datePickerProps = {})
        this.today = ''
        this.suffix = {}
        this.textFieldProps = {}
        this.selected = []
        this.underbid = false
        document.getElementById('endtigadua').style.display = 'none'
        document.getElementById('fronttigadua').style.display = ''
      } else {
        console.log('ini bukan ')
      }
    },
    async setDeskripsi() {
      if (this.selectedUnit.deskripsi) {
        this.deskripsi_iklan = this.selectedUnit.deskripsi
      } else {
        this.deskripsi_iklan = ''
      }
    },
    async getUnitMokas() {
      let offset = (this.page - 1) * this.limit
      if (this.kategori == 2) {
        this.lembar_stnk = true
        this.lembar_pajak = true
        this.lembar_bpkb = true
      } else {
        this.lembar_stnk = null
        this.lembar_pajak = null
        this.lembar_bpkb = null
      }
      await this.$axios
        .get('/produk/v3/unit_mokas', {
          params: {
            id_app_user: this.user.id,
            id_mst_motor_bekas_status: 1,
            search: this.pencarianmotor,
            offset: offset,
            limit: this.limit,
            lembar_stnk: this.lembar_stnk,
            lembar_bpkb: this.lembar_bpkb,
            lembar_pajak: this.lembar_pajak,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.unitMokas = data
          this.total = response.data.count
          this.lengthPage = Math.ceil(this.total / this.limit)
          console.log('unit mokas', this.unitMokas)
          console.log('unit total', this.total)
          console.log('unit limit', this.limit)
          console.log('unit length page', this.lengthPage)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async storeItemIbg() {
      let formData = new FormData()
      formData.set('id_motor_bekas', this.selectedUnit.id)
      formData.set('photo', this.selectedUnit.foto_1)
      formData.set('judul', this.judul_iklan.trim())
      formData.set('deskripsi', this.deskripsi_iklan.trim())
      formData.set('harga', String(this.amount).replaceAll('.', ''))
      formData.set('latitude', this.latitude)
      formData.set('longitude', this.longitude)
      formData.set('id_app_user', this.user.id)
      formData.set('garansi', this.harigaransi)
      if (this.id_iklan_langganan != null) {
        formData.set('id_iklan_langganan', this.id_iklan_langganan)        
      }
      await this.$axios
        .post('/iklan/v3/iklan_hp_mokas_satuan', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setProductId(data.data.id)
          // this.setUnitID(this.selected.id)
          // this.$router.push('/detail-iklan/'+this.judul_iklan.toLowerCase().replace(/ /g, '-'))
          this.$router.push('/account/profile/iklan-garasi')
          // this.$router.push(
          //   '/detail-iklan/' +
          //     data.data.judul.toLowerCase().replace(/ /g, '-')
          // )
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Field harus diisi',
          })
          this.loading = false
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
      console.log('ini mst motor type', this.selectedUnit.id_motor_type)
      console.log('ini tahun', this.selectedUnit.tahun)
      console.log('ini id app user', this.selectedUnit.id_app_user)
      console.log('ini foto_1', this.selectedUnit.foto_1)
      console.log('ini foto_2', this.selectedUnit.foto_2)
      console.log('ini foto_3', this.selectedUnit.foto_3)
      console.log('ini foto_4', this.selectedUnit.foto_4)
      console.log('ini foto_5', this.selectedUnit.foto_5)
      console.log('ini judul', this.judul_iklan)
      console.log('ini deskripsi', this.deskripsi_iklan)
      console.log('ini latitude', this.latitude)
      console.log('ini longitude', this.longitude)
      console.log('ini harga', this.amount)
      console.log('ini garansi', this.harigaransi)
      console.log('ini langganan', this.id_iklan_langganan)
      console.log('ini user', this.user.id)
    },
    // tiga satu
    useTiket() {
      if (this.tiket) {
        this.jumlahtiket = '1'
      } else {
        this.jumlahtiket = 0
      }
    },
    dateTimeRange() {
      this.tglMulaiTB = this.moment(this.tglMulaiTB).format('YYYY-MM-DD HH:mm')
      this.tglSelesaiTB = this.tglMulaiTB
      let maxdate = this.moment(this.tglMulaiTB)
        .add(7, 'd')
        .format('YYYY-MM-DD')
      this.datePickerProps = {
        min: this.tglMulaiTB,
        max: maxdate,
      }
    },
    checkDateTB() {
      this.tglSelesaiTB = this.moment(this.tglSelesaiTB).format(
        'YYYY-MM-DD HH:mm'
      )
      let check = this.moment(this.tglSelesaiTB).isBefore(this.tglMulaiTB)
      var x = this.moment(this.tglSelesaiTB)
      var y = this.moment(this.tglMulaiTB)
      var duration = this.moment.duration(x.diff(y))
      var h = duration._data.hours
      var m = duration._data.minutes
      if (check == true) {
        this.textFieldProps = {
          rules: [
            h < 0 || 'Tanggal Selesai harus lebih besar dari Tanggal Mulai',
            m < 0 || 'Tanggal Selesai harus lebih besar dari Tanggal Mulai',
          ],
          suffix: this.timezone,
        }
      } else {
        this.textFieldProps = {
          rules: [],
          suffix: this.timezone,
        }
      }
    },
    async storeItemTbs() {
      let formData = new FormData()
      formData.set('id_motor_bekas', this.selectedUnit.id)
      formData.set('photo', this.selectedUnit.foto_1)
      formData.set('judul', this.judul_iklan)
      formData.set('deskripsi', this.deskripsi_iklan)
      formData.set('harga_awal', String(this.amount).replaceAll('.', ''))
      formData.set('kelipatan', this.kelipatan)
      if (this.tipetb == 2) {
        formData.set('opsi_harga_limit', this.underbid)
      }      
      formData.set(
        'tanggal_mulai',
        this.moment(this.tglMulaiTB)
          .add(this.serverTime, 'h')
          .format('YYYY-MM-DD HH:mm:ss')
      )
      formData.set(
        'tanggal_selesai',
        this.moment(this.tglSelesaiTB)
          .add(this.serverTime, 'h')
          .format('YYYY-MM-DD HH:mm:ss')
      )
      formData.set('latitude', this.latitude)
      formData.set('longitude', this.longitude)
      formData.set('is_verified', this.tiket)
      formData.set('id_mst_type_tb', this.tipetb)
      formData.set('id_app_user', this.user.id)
      formData.set('jumlah_tiket', this.jumlahtiket)
      if (this.id_iklan_langganan != null) {
        formData.set('id_iklan_langganan', this.id_iklan_langganan)        
      }
      await this.$axios
        .post('/iklan/v3/iklan_tb_mokas_satuan', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setProductId(data.data.id)
          // this.setUnitID(this.selected.id)
          // this.$router.push(
          //   '/detail-iklan/' +
          //     data.data.judul.toLowerCase().replace(/ /g, '-')
          // )
          this.$router.push('/account/profile/iklan-garasi')
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Field harus diisi semua',
          })
          this.loading = false
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
    // tiga dua
    async storeItemTbp() {
      let formData = new FormData()
      var i = 0
      for (i = 0; i < this.selected.length; i++) {
        formData.append('id_motor_bekas', this.selected[i])
      }
      formData.set('judul', this.judul_iklan)
      formData.set('deskripsi', this.deskripsi_iklan)
      formData.set('harga_awal', String(this.amount).replaceAll('.', ''))
      formData.set('kelipatan', this.kelipatan)
      if (this.tipetb == 2) {
        formData.set('opsi_harga_limit', this.underbid)
      }  
      formData.set(
        'tanggal_mulai',
        this.moment(this.tglMulaiTB)
          .add(this.serverTime, 'h')
          .format('YYYY-MM-DD HH:mm:ss')
      )
      formData.set(
        'tanggal_selesai',
        this.moment(this.tglSelesaiTB)
          .add(this.serverTime, 'h')
          .format('YYYY-MM-DD HH:mm:ss')
      )
      formData.set('latitude', this.latitude)
      formData.set('longitude', this.longitude)
      formData.set('is_verified', this.tiket)
      formData.set('id_mst_type_tb', this.tipetb)
      formData.set('id_app_user', this.user.id)
      formData.set('jumlah_tiket', this.jumlahtiket)
      if (this.id_iklan_langganan != null) {
        formData.set('id_iklan_langganan', this.id_iklan_langganan)        
      }
      await this.$axios
        .post('/iklan/v3/iklan_tb_mokas_paketan', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setProductId(data.data.id)
          // this.setUnitID(this.selected.id)
          // this.$router.push(
          //   '/detail-iklan/' +
          //     data.data.judul.toLowerCase().replace(/ /g, '-')
          // )
          this.$router.push('/account/profile/iklan-garasi')
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Field harus diisi',
          })
          this.loading = false
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
      // var i = 0
      // for (i = 0; i < this.selected.length; i++) {
      //   console.log('id_motor_bekas' + i , this.selected[i].id)
      // }
      // console.log('judul', this.judul_iklan)
      // console.log('deskripsi', this.deskripsi_iklan)
      // console.log('hargaawal', this.amount)
      // console.log('kelipatan', this.kelipatan)
      // console.log('tgl mulai', this.tglMulaiTB)
      // console.log('tgl selesai', this.tglSelesaiTB)
      // console.log('tipetb' ,this.tipetb)
      // console.log('is verified' ,this.tiket)
      // console.log('jumlah tiket' ,this.jumlahtiket)
    },
    async pilihunit(item){
      
      
      if (this.selected.length < 1) {
        // this.selected.push( {idmotor: item.id} ) 
        this.selected.push( item.id ) 
      }else{
        
        const cek = this.selected.includes(item.id);
        if (cek) {
          for (let i = 0; i < this.selected.length; i++) {
            if (this.selected[i] == item.id) {
              this.selected.splice( this.selected.indexOf(item.id), 1 );
            }          
          }
          // console.log("sama")
        }else{
          this.selected.push( item.id )
        }
      }
      

      const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
      const citrus = fruits.includes("Banana");
      // fruits.splice( fruits.indexOf('Banana'), 1 );
      console.log('cek select', citrus)

      // item.merk.includes(pencarian.toUpperCase())
      // this.selected.push( {idmotor: item.id} ) 
      // console.log('cek select', item.id)
      // console.log('cek selectted nih', this.selected)
    },
    async cekselected() {
      console.log('cek select', this.selected)
    },
  },
  async created() {
    await this.getListSubs()
    await this.getMerk()
    this.userid = this.user.id
    this.tglMulaiTB = this.moment()
      .add(this.utc, 'h')
      .format('YYYY-MM-DD HH:mm')
    this.today = this.moment().add(this.utc, 'h').format('YYYY-MM-DD HH:mm')
    this.suffix = { suffix: this.timezone }
    if (this.utc == 0) {
      this.serverTime = 0
    }
    if (this.utc == 1) {
      this.serverTime = -1
    }
    if (this.utc == 2) {
      this.serverTime = -2
    }
    this.dateTimeRange()
  },
}
</script>

<style>
.pilih {
  background: rgba(32, 146, 157, 0.1);
}
#foto1 {
  display: none;
}
#foto2 {
  display: none;
}
#foto3 {
  display: none;
}
#foto4 {
  display: none;
}
#foto5 {
  display: none;
}
.lingluar {
  width: 20px;
  height: 20px;
  background: #20929d;
  border-radius: 50%;
  border: 2px solid white;
}
.lingdalam {
  width: 10px;
  height: 10px;
  margin-left: 2.6px;
  margin-top: 2.6px;
  background: white ;
  border: 1px solid white;
  border-radius: 50%;
}
.sdank {
  color: #20929d;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.scrolling-wrapper-flexbox {
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>