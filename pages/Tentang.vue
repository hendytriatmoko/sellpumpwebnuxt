<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-tabs
        v-model="tab"
        :vertical="$vuetify.breakpoint.xs ? false : true"
        show-arrows
      >
        <v-tab href="#about"> Tentang </v-tab>
        <v-tab href="#faq"> FAQ </v-tab>
        <v-tab href="#ketentuan"> Ketentuan Penggunaan </v-tab>
        <v-tab href="#larangan"> Larangan Iklan </v-tab>
        <v-tab href="#kebijakan"> Kebijakan Privasi </v-tab>
        <v-tab href="#videotutorial"> Video Tutorial </v-tab>
        <v-tab href="#panduanpembeli"> Panduan Pembeli </v-tab>
        <v-tab href="#panduanpenjual"> Panduan Penjual </v-tab>
        <v-tab href="#kodeetik"> Kode Etik Pengguna </v-tab>
        <!-- <v-tab href="#tbrules"> Tawar Bersama </v-tab> -->
        <v-tab href="#autotawar"> Auto Tawar </v-tab>
        <v-tab href="#bantuan"> Bantuan </v-tab>
        <v-tab href="#highlight"> Highlight & Sundul </v-tab>
        <v-tab href="#tiket"> Tiket Tawar Bersama </v-tab>
        <v-tab href="#iklanbaris"> Iklan Baris </v-tab>
        <v-tab href="#tawarbersama"> Tawar Bersama </v-tab>
        <v-tab href="#aksesoris"> Aksesoris dan Suku Cadang </v-tab>
        <v-tab-item value="about">
          <v-card flat>
            <v-card-text class="black--text">
              <p>
                Griya Sell Pump adalah Perusahaan yang menjual berbagai macam pompa air yang
                berkualitas dan memiliki daya saing yang tinggi. 
              </p>
              <p>Versi Aplikasi Anda saat ini adalah 1.1.0</p>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="iklanbaris">
          <v-card flat>
            <img src="/img/BannerIB.webp" height="315" width="100%" />
            <v-card-text class="black--text">
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Apa itu Iklan Baris
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Iklan baris adalah iklan motor yang dijual dengan kondisi
                      siap pakai.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Keunggulan Iklan Baris
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      1. Tidak ada biaya pemasangan Iklan (Gratis) <br />
                      2. Iklan terpasang selama 3 bulan <br />
                      3. Calon pembeli tersebar di seluruh Indonesia <br />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Peraturan Iklan Baris
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      1. Unit yang diiklankan adalah unit yang siap pakai <br />
                      2. Unit yang diiklankan memilki dokumen lengkap (STNK,
                      Pajak dan BPKB) <br />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tawarbersama">
          <v-card flat>
            <img src="/img/BannerTB.webp" height="315" width="100%" />
            <v-card-text class="black--text">
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Apa itu Tawar Bersama
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Tawar Bersama adalah fitur dimana pembeli dapat melakukan
                      aktivitas penawaran pada iklan yang sedang tayang. Tawar
                      bersama terdiri dari 2 (dua) jenis yaitu: <br />
                      <b> 1. Tawar Bersama Terbuka </b> <br />
                      Tawar Bersama Terbuka adalah tawar bersama dengan nominal
                      tawaran yang dapat dilihat oleh penjual dan pembeli selama
                      tawar bersama berlangsung hingga berakhir. Pada Tawar
                      Bersama Terbuka nominal yang dimasukan untuk melakukan
                      penawaran tidak bisa sama dengan penawar lainnya,
                      melainkan harus di atas penawar lainnya sesuai dengan
                      kelipatan yang ditentukan oleh penjual. Pemenang Tawar
                      Bersama Terbuka ditentukan dari penawaran tertinggi pada
                      akhir iklan. Penjual dapat menghubungi pembeli setelah
                      iklan berakhir untuk konfirmasi pemenang dan begitupun
                      sebaliknya, pembeli dapat menghubungi penjual untuk
                      konfirmasi kemenangan.
                      <br />
                      <b> 2. Tawar Bersama Tertutup </b> <br />
                      Tawar Bersama Tertutup adalah tawar bersama dengan nominal
                      tawaran yang disembunyikan atau tidak dapat dilihat oleh
                      penjual selama tawar bersama berlangsung. Untuk pembeli
                      sendiri, nominal yang ditampilkan hanya nominal penawaran
                      yang dilakukan oleh pembeli tersebut. Pada Tawar Bersama
                      Tertutup nominal yang dimasukan untuk melakukan penawaran
                      memilki kemungkinan sama dengan penawar lainnya. Nominal
                      yang dimasukan bisa lebih besar dari harga awal atau bisa
                      di bawah harga awal sesuai dengan kebijakan penjual.
                      Pemenang Tawar Bersama Tertutup ditentukan dari penawar
                      tertinggi pada akhir iklan. Jika terdapat nominal yang
                      sama, maka pemenang Tawar Beesama tersebut ditentukan dari
                      yang paling tercepat melakukan penawaran. Penjual dapat
                      menghubungi pembeli setelah iklan berakhir untuk
                      konfirmasi pemenang dan begitupun sebaliknya, pembeli
                      dapat menghubungi penjual untuk konfirmasi kemenangan.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Keunggulan Tawar Bersama
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      1. Motor yang dijual pada fitur tawar bersama harganya
                      dibawah pesanan <br />
                      2. Terdapat tawar bersama paket dimana motor yang dijual
                      dalam bentuk paket dan tentunya dengan harga grosir <br />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Cara Mengikuti Tawar Bersama
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      1. Pilih iklan Tawar Bersama yang ingin anda ikuti. <br />
                      2. Tinjau detail iklan tersebut. <br />
                      3. Jika anda ingin mengikuti sesi penawaran pada iklan
                      Tawar Bersama tersebut, klik tombol dibawahnya yang
                      berlabel 'Ikut Tawar Bersama'. <br />
                      4. Jika anda tidak memiliki tiket, anda hanya bisa
                      memasang penawaran pada iklan Tawar Bersama yang tidak
                      memiliki syarat dalam penggunaan tiket. Anda dapat membeli
                      tiket di Menu 'Tiket Tawar Bersama'. <br />
                      5. Setelah tiket anda berhasil digunakan masukkan nominal
                      bidding yang ingin anda tawar dengan menekan tombol +/-
                      sebanyak yang anda inginkan dengan kelipatan nominal yang
                      ditentukan iklan Tawar Bersama tersebut. <br />
                      6. Klik tombol 'Konfirmasi Penawaran' untuk memasukkan
                      penawaran anda.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Peraturan Tawar Bersama
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="ml-3 ml-lg-3">
                        <p>
                          1. Iklan Tawar Bersama bisa mempersyaratkan penggunaan
                          tiket atau tanpa tiket.
                        </p>

                        <p>
                          2. Pada Iklan Tawar Bersama yang menggunakan tiket,
                          jumlah tiket dapat ditentukan oleh pemasang iklan.
                        </p>

                        <p>
                          3. Pada Iklan Tawar Bersama yang menggunakan tiket,
                          ketika calon penawar menyetujui mengikuti Tawar
                          Bersama maka jumlah tiket yang tersedia akan berkurang
                          sesuai dengan yang dipersyaratkan dalam Iklan Tawar
                          Bersama meskipun belum melakukan penawaran.
                        </p>

                        <p>
                          4. Calon penawar menawarkan harga di atas harga
                          terakhir pada iklan yang berlangsung.
                        </p>

                        <p>
                          5. Harga yang ditawarkan pada poin 3 mengikuti
                          kelipatan kenaikan harga yang diatur oleh pemasang
                          iklan.
                        </p>
                        <p>
                          6. Calon pembeli yang berhak melakukan pembayaran
                          terhadap Iklan Tawar Bersama adalah yang penawaranya
                          tertinggi pada saat iklan berakhir.
                        </p>
                        <p>
                          7. Tiket yang terpakai dalam Iklan Tawar Bersama akan
                          dikembalikan jika calon pembeli bukan penawar
                          tertinggi ketika Iklan Tawar Bersama berakhir.
                        </p>
                        <p>
                          8. Penawar tertinggi harus menunggu persetujuan proses
                          selanjutnya dari pihak pemasang Iklan Tawar Bersama
                          sebelum bisa melakukan pembayaran.
                        </p>
                        <p>
                          9. Apabila pemasang Iklan Tawar Bersama tidak
                          menyetujui proses selanjutnya atau tidak konfirmasi
                          sampai batas waktu yang telah ditentukan, maka secara
                          otomatis tiket akan dikembalikan jika Iklan Tawar
                          Bersama tersebut menggunakan tiket.
                        </p>
                        <p>
                          10. Jika pemasang Iklan Tawar Bersama telah menyetujui
                          proses pembayaran, maka penawar tertinggi harus
                          melakukan pembayaran sesuai dengan nominal yang
                          tertera pada form penawaran.
                        </p>
                        <p>
                          11. Pembayaran dilakukan langsung ke rekening pemasang
                          Iklan Tawar Bersama sebelum waktu yang telah
                          ditentukan dan mengunggah bukti pembayaran di menu
                          transaksi pada Iklan Tawar Bersama tersebut.
                        </p>
                        <p>
                          12. Setelah pembayaran dikonfirmasi oleh pemasang
                          Iklan Tawar Bersama maka tiket yang terpakai di Iklan
                          Tawar Bersama tersebut otomatis dikembalikan.
                        </p>
                        <p>
                          13. Pemasang iklan berhak untuk menolak bukti
                          pembayaran jika bukti pembayaran tersebut tidak sesuai
                          dengan yang tertera pada form penawaran.
                        </p>
                        <p>
                          14. Apabila pembayaran dibatalkan atau tidak dilakukan
                          oleh penawar tertinggi dalam waktu yang telah
                          ditentukan maka tiket hangus dan penawar tertinggi
                          menerima peringatan pelanggaran.
                        </p>
                        <p>
                          15. Apabila transaksi dibatalkan oleh pemasang iklan,
                          maka secara otomatis tiket akan dikembalikan jika
                          Iklan Tawar Bersama tersebut menggunakan tiket.
                        </p>

                        <p>
                          16. Apabila transaksi dibatalkan oleh pemasang iklan
                          setelah penawar tertinggi melakukan pembayaran, maka
                          pemasang iklan wajib untuk mengembalikan dana tersebut
                          kepada penawar tertinggi sesuai dengan kesepakatan
                          antara pemasang iklan dan penawar tertinggi.
                        </p>
                      </div>
                      <h3 class="text-justify font-weight-bold ml-2 ml-lg-2">
                        Peraturan Pelanggaran Tawar Bersama ‘Untuk Penawar’
                      </h3>
                      <div class="ml-3 ml-lg-3">
                        <p>
                          Berikut adalah peraturan mengenai tawar bersama untuk
                          penawar:
                        </p>
                        <p>
                          1. Maksimum pelanggaran penawar Tawar Bersama adalah 3
                          (tiga) kali.
                        </p>

                        <p>2. Penawar dianggap melanggar jika:</p>
                        <p class="ml-4 ml-lg-4">
                          a. Saat penawar/pengguna memenangkan Iklan Tawar
                          Bersama, penawar/pengguna membatalkan transaksi
                          pembelian Tawar Bersama di aplikasi SiMotor.
                        </p>
                        <p class="ml-4 ml-lg-4">
                          b. Saat penawar/pengguna memenangkan Iklan Tawar
                          Bersama dan sudah disetujui oleh penjual namun tidak
                          melakukan transaksi pembayaran di aplikasi SiMotor
                          hingga batas waktu yang telah ditentukan.
                        </p>
                        <p>3. Akibat dari pelanggaran:</p>
                        <p class="ml-4 ml-lg-4 font-weight-bold">
                          a. 1 (satu) kali pelanggaran:
                        </p>
                        <p class="ml-4 ml-lg-4">
                          Tiket Anda hangus (*jika Iklan Tawar Bersama
                          menggunakan tiket)
                        </p>
                        <p class="ml-4 ml-lg-4 font-weight-bold">
                          b. 2 (dua) kali pelanggaran:
                        </p>

                        <p class="ml-4 ml-lg-4">
                          Tiket Anda hangus (*jika Iklan Tawar Bersama
                          menggunakan tiket) dan akun Anda akan dibekukan selama
                          2 (dua) minggu yang mengakibatkan akun Anda tidak
                          dapat mengikuti Tawar Bersama selama waktu tersebut,
                          namun masih dapat masuk ke aplikasi SiMotor.
                        </p>
                        <p class="ml-4 ml-lg-4 font-weight-bold">
                          c. 3 (tiga) kali pelanggaran:
                        </p>
                        <p class="ml-4 ml-lg-4">
                          Tiket Anda hangus (*jika Iklan Tawar Bersama
                          menggunakan tiket) dan akun anda diblokir secara
                          permanen yang mengakibatkan akun Anda tidak dapat
                          mengakses SiMotor hingga ada ketentuan baru.
                        </p>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="faq">
          <v-card flat>
            <v-card-text class="black--text">
              <b> Q: Bagaimana cara mencari motor bekas di SiMotor? </b>
              <p>
                A: Anda bisa mencari kendaraan dengan menggunakan kotak
                pencarian di halaman utama Carmudi, cukup dengan memilih merk
                dan model yang Anda inginkan dan klik tombol "Cari". Anda juga
                bisa menggunakan kota pencarian "kata kunci" jika Anda mencari
                secara spesifik (seperti warna, fitur, dll).
              </p>
              <b>
                Q: Bagaimana mengetahu jika motor yang saya suka masih ada?
              </b>
              <p>
                A: Untuk memastikan kendaraan yang Anda inginkan belum terjual,
                silahkan hubungi penjual atau customer service kami.
              </p>
              <b
                >Q: Bagaimana cara menghubungi penjual motor yang ingin saya
                beli?
              </b>
              <p>
                A: Anda dapat menghubungi penjual melalui fitur “chat” yang ada
                di aplikasi SiMotor
              </p>
              <b>
                Q: Bagaimana cara saya mengetahui kendaraan masih dalam kondisi
                yang layak?
              </b>
              <p>
                A: Anda dapat melihat foto dari kendaraan tersebut untuk
                mengetahui kondisinya. Anda juga bisa menghubungi atau bertemu
                langsung dengan penjualnya untuk memastikan kondisi sebenarnya
                dari kendaraan tersebut dan juga mencobanya langsung. Sebaiknya
                Anda membawa orang yang mengerti dengan kendaraan sehingga bisa
                mengecek kondisi mekanikan dan mesin kendaran dengan teliti.
              </p>
              <b> Q: Bagaimana cara jual motor di SiMotor? </b>
              <p>A: - Download Aplikasi SiMotor yang ada di Playstore.</p>
              <p class="ml-4">
                - Pilih jenis iklan motor apa yang akan anda iklankan,contoh
                seperti ‘satuan atau paketan’
              </p>
              <p class="ml-4">- Lengkapi Form jual motor seperti:</p>
              <p class="ml-6">a. Identitas pemilik motor (nama dan alamat)</p>
              <p class="ml-6">b. Data kendaraan (STNK, BPKB dan faktur)</p>
              <p class="ml-6">c. Foto unit motor</p>
              <p class="ml-6">d. Kilometer motor</p>
              <p class="ml-6">e. Harga jual yang diinginkanr</p>
              <b> Q: Bagaimana cara membeli motor di SiMotor? </b>
              <p>A: - Download Aplikasi SiMotor yang ada di Playstore</p>
              <p class="ml-4">
                - Daftar akun SiMotor dan lakukan verifikasi akun
              </p>
              <p class="ml-4">
                - Pilih motor yang Anda inginkan di aplikasi SiMotor :
              </p>
              <p class="ml-6">a. Tipe motor yang ingin dibeli</p>
              <p class="ml-6">b. Domisili (kota tempat tinggal)</p>
              <p class="ml-6">
                c. Cara pembayaran motor (tunai/kredit) (jika kredit, pembeli
                diminta menyerahkan data untuk pengajuan kredit)
              </p>
              <b> Q: Bagaimana Cara Mendapatkan Tiket Tawar Bersama? </b>
              <p>A: - Pastikan akun Anda sudah ter-verifikasi</p>
              <p class="ml-4">- Pilih menu Tiket Tawar Bersama</p>
              <p class="ml-4">- Pilih dapatkan tiket</p>
              <p class="ml-4">
                - Pilih jumlah tiket yang dibutuhkan, kemudian dapatkan
              </p>
              <p class="ml-4">- Pilih Lanjutkan</p>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="ketentuan">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Ketentuan Penggunaan
            </v-card-title>

            <v-container class="text-justify">
              <p>Selamat datang di SiMotor.</p>

              <p>
                Syarat dan Ketentuan ini adalah perjanjian antara pengguna
                (“Anda”) dan PT. Digital Nayaka Abhinaya (“Kami”), sebuah
                perseroan terbatas yang didirikan dan beroperasi secara sah
                berdasarkan hukum negara Republik Indonesia dan berdomisili di
                DKI Jakarta, Indonesia.
              </p>

              <p>
                Syarat dan Ketentuan ini mengatur akses dan penggunaan Anda atas
                aplikasi, situs web (SiMotor.id, SiMotor.co.id, SiMotorku.com
                dan carimotor.online, dan situs web lain yang kami kelola),
                konten dan produk yang disediakan oleh kami (selanjutnya, secara
                bersama-sama disebut sebagai “Aplikasi SiMotor”) dan penggunaan
                layanan yang tersedia pada Aplikasi SiMotor (“Layanan”).
              </p>

              <p>
                Dengan menyetujui Syarat dan Ketentuan ini Anda juga menyetujui
                Kebijakan Privasi termasuk Ketentuan Penggunaan pada setiap
                Layanan, dan perubahannya yang merupakan bagian yang tidak
                terpisahkan dari Syarat dan Ketentuan ini. Dengan mengakses atau
                menggunakan situs SiMotor, informasi, atau aplikasi lainnya
                dalam bentuk aplikasi mobile yang disediakan oleh atau dalam
                Situs, berarti Anda telah memahami dan menyetujui serta terikat
                dan tunduk dengan segala Syarat dan Ketentuan yang berlaku di
                situs ini. Apabila Anda tidak setuju dengan Syarat dan Ketentuan
                ini, kami persilakan Anda untuk tidak melanjutkan penggunaan
                Layanan.
              </p>

              <p class="ml-2 font-weight-bold">1. Ketentuan Umum</p>

              <p class="ml-2">
                Aplikasi dan Layanan ini disediakan kepada Anda dengan tunduk
                kepada Syarat dan Ketentuan Umum ini. Penggunaan istilah “Anda”
                atau “pengguna” berarti setiap orang yang menggunakan atau
                mengakses layanan di dalam aplikasi mobile atau situs baik
                secara manual maupun melalui sistem otomatis, termasuk setiap
                orang yang melihat‐lihat layanan dan materi di dalamnya,
                memberikan komentar terhadap materi atau merespon terhadap iklan
                yang dipasang di dalam Aplikasi, Situs atau Layanan SiMotor.
              </p>

              <p class="ml-2 font-weight-bold">2. Deskripsi Layanan</p>

              <p class="ml-2">
                SiMotor mempunyai bisnis utama menjalankan (“Layanan”) aplikasi
                dan situs iklan baris online (classifieds ads) untuk barang
                sepeda motor dan bertindak sebagai penyedia jasa penyelenggara
                dengan sistem user generated content dimana para pengguna
                aplikasi kami bisa membuat, mengunggah dan memodifikasi konten
                yang ingin diiklankan. Tujuan aplikasi ini adalah menyediakan
                berbagai informasi dan layanan yang berkaitan dengan sepeda
                motor dan juga mempertemukan antara pembeli dan penjual secara
                online di sebuah aplikasi mobile bernama SiMotor, termasuk
                situs‐situs dengan domain SiMotor.id, SiMotor.co.id,
                SiMotorku.com dan carimotor.online. Setiap rujukan terhadap
                SiMotor dalam Syarat & Ketentuan Umum ini, apabila relevan,
                adalah termasuk afiliasinya (perusahaan berdasarkan kendali dan
                kepemilikan bersama), sebagian ataupun seluruh karyawannya,
                termasuk para direksi dan komisaris.
              </p>

              <p class="ml-2 font-weight-bold">3. Batasan Tanggung Jawab</p>

              <p class="ml-3">
                3.1 SiMotor tidak bertanggung jawab atas kebenaran informasi,
                gambar dan keterangan, termasuk namun tidak terbatas pada
                perincian mengenai judul iklan, deskripsi, harga, alamat, nomor
                telepon yang diberikan oleh pemasang iklan. Anda disarankan
                untuk berhubungan langsung dengan pemasang iklan untuk
                memastikan informasi yang dicari.
              </p>

              <p class="ml-3">
                3.2 Setiap informasi yang dibuat oleh pemasang iklan di aplikasi
                SiMotor mengenai perusahaan, perorangan atau badan lainnya,
                dan/atau mengenai produk atau layanan mereka, bukan merupakan
                bentuk dukungan atau sokongan, ataupun mengimplikasikan dukungan
                atau sokongan, terhadap kualitas atau kelayakan dari perorangan,
                perusahaan atau badan tersebut, atau terhadap layanan atau
                produknya. Tanggung jawab isi dan/atau materi iklan yang
                dipasang oleh pemasang iklan (“Materi”) merupakan tanggung jawab
                sepenuhnya dari pemasang iklan.
              </p>

              <p class="ml-3">
                3.3 SiMotor tidak memiliki hak milik atas iklan yang dipasang
                oleh pengguna, maupun terlibat dalam proses kesepakatan,
                pembayaran, pengiriman serta proses purna jual di antara penjual
                dan pembeli. Perikatan untuk penyerahan barang atau jasa yang
                terjadi melalui Layanan atau sebagai hasil dari kunjungan dan
                keberhasilan penawaran yang diajukan oleh pengguna dibuat dengan
                bebas antara penjual dan pembeli.
              </p>

              <p class="ml-3">
                3.4 Informasi, gambar dan keterangan lainnya yang terdapat atau
                diterbitkan dalam aplikasi SiMotor juga dapat mengandung
                ketidakakuratan atau kesalahan tipografis. Para pemasang iklan
                mungkin akan melakukan perubahan atau perbaikan, dan/atau
                memperbarui informasi yang tertera di dalam Situs dari waktu ke
                waktu. SiMotor tidak menanggung kewajiban untuk memperbaharui
                Materi yang telah menjadi kedaluwarsa atau tidak akurat.
              </p>

              <p class="ml-3">
                3.5 SiMotor tidak bertanggung jawab atas semua jaminan dan
                kondisi, termasuk segala implikasi dari jaminan, kualitas,
                kelayakan atas informasi yang disampaikan pemasang iklan. Dalam
                keadaan apapun, SiMotor tidak bertanggung jawab atas kerugian,
                baik khusus, langsung, tidak langsung ataupun yang bersifat
                konsekuensial, maupun kerugian atau kerusakan apapun sebagai
                akibat dari kerugian atas pemakaian, data atau keuntungan, baik
                dalam tindakan perikatan, kelalaian atau tindakan kesalahan
                lainnya, yang muncul dari atau berkaitan dengan penggunaan atau
                kinerja dari informasi dan/atau gambar yang disediakan oleh
                pemasang iklan.
              </p>

              <p class="ml-3">
                3.6 SiMotor tidak bertanggung jawab atas akibat langsung atau
                tidak langsung dari keputusan pengguna/calon pembeli dalam
                mengajukan penawaran atau tidak mengajukan penawaran kepada
                pemasang iklan, melakukan jual beli atau tidak melakukan jual
                beli dengan pemasang iklan.
              </p>

              <p class="ml-3">
                3.7 SiMotor tidak bertanggung jawab atau berkewajiban atas
                penyerahan barang atau jasa, termasuk kepatuhan pembeli dan
                pemasang iklan dengan ketentuan perundang‐undangan yang berlaku
                di Republik Indonesia baik dalam hal penawaran ataupun penjualan
                barang dan jasa ataupun transaksi lainnya.
              </p>

              <p class="ml-3">
                3.8 SiMotor tidak bertanggung jawab dan tidak berkewajiban
                terhadap Layanan yang tidak tersedia untuk sementara waktu
                sehubungan dengan masalah teknis yang berada di luar kendali
                kami. Melalui Layanan, Anda dapat terhubung ke situs‐situs web
                lain yang tidak berada di bawah kontrol kami. Penyertaan suatu
                tautan (hyperlink) bukan berarti merupakan rekomendasi atau
                dukungan atas pandangan yang ditegaskan di dalam tautan
                (hyperlink) tersebut. Setiap upaya dilakukan untuk menjaga agar
                Layanan tetap berjalan lancar.
              </p>

              <p class="ml-3">
                3.9 Layanan yang diberikan SiMotor adalah “sebagaimana adanya”,
                "dengan segala kekurangan", dan "sebagaimana tersedia" tanpa
                jaminan apapun juga. SiMotor dengan tegas menolak setiap jaminan
                mengenai keamanan, keandalan, dan pelaksanaan kegiatan‐kegiatan
                yang dilakukan oleh para pengguna di Layanan dan jaminan atau
                ketentuan mengenai tidak ada pelanggaran, dapat diperdagangkan
                dan kelayakan untuk suatu tujuan tertentu. Dalam hal apapun
                SiMotor tidak berkewajiban atas suatu kerugian langsung, khusus,
                tidak langsung, yang merupakan contoh atau yang dapat dihukum,
                baik dalam suatu perikatan, perbuatan melawan hukum atau teori
                hukum lain, sekalipun kami telah diberitahu tentang kemungkinan
                kerugian tersebut.
              </p>

              <p class="ml-3">
                3.10 Pengguna memahami dan menyetujui bahwa penggunaan dan
                pelaksanaan kegiatan sehubungan dengan Situs dan Layanan oleh
                pengguna adalah atas kebijakan dan risiko pengguna sendiri dan
                bahwa pengguna sendiri bertanggung jawab penuh atas materi
                pengguna,dan/atau atas kerusakan/kehilangan atas sistem
                elektronik Anda dan/atau atas kerusakan/kehilangan atas
                informasi elektronik yang mungkin saja diakibatkan oleh
                pelaksanaan kegiatan tersebut.
              </p>

              <p class="ml-3">
                3.11 Pengguna secara khusus mengakui bahwa SiMotor tidak akan
                bertanggung jawab atas Materi atau tindakan pencemaran nama
                baik, tindakan yang melanggar, atau tindakan yang melawan hukum
                apapun dari pihak ketiga manapun yang berhubungan dengan SiMotor
                dan Layanan ini. Segala resiko atas kerugian atau kerusakan dari
                hal‐hal tersebut adalah seluruhnya tanggung jawab pengguna.
              </p>

              <p class="ml-2 font-weight-bold">4. Kewajiban Pengguna</p>

              <p class="ml-2">
                Pengguna wajib menjaga data pribadi miliknya dari
                kerusakan/kehilangan, termasuk tapi tidak terbatas pada upaya
                mencegah agar data pribadi miliknya tidak disalahgunakan oleh
                pihak lain. Pengguna dengan ini mengetahui dan menyetujui bahwa
                SiMotor tidak dapat dimintai pertanggungjawaban oleh pengguna
                dan/atau pihak manapun atas hal-hal yang terjadi, termasuk tapi
                tidak terbatas pada:
              </p>

              <p class="ml-3">4.1 Kehilangan data pribadi;</p>

              <p class="ml-3">4.2 Pemalsuan data pribadi pengguna;</p>

              <p class="ml-3">4.3 Kehilangan penghasilan atau pendapatan;</p>

              <p class="ml-3">4.4 Kehilangan bisnis;</p>

              <p class="ml-3">4.5 Kehilangan laba atau suatu perikatan;</p>

              <p class="ml-3">
                4.6 Kehilangan penghematan yang telah diantisipasi sebelumnya;
              </p>

              <p class="ml-3">4.7 Kehilangan data;</p>

              <p class="ml-3">4.8 Kehilangan itikad baik;</p>

              <p class="ml-3">
                4.9 Waktu manajemen atau kantor yang tersia-siakan;
              </p>

              <p class="ml-3">
                4.10 Kehilangan atau kerugian lain apapun jenisnya, terlepas
                dari bagaimana hal itu timbul dan apakah disebabkan oleh
                kelalaian, pelanggaran terhadap suatu perikatan atau lainnya,
                meskipun dapat diperkirakan sebelumnya;
              </p>

              <p class="ml-3">
                Segala kerugian sebagai akibat dari penggunaan data pribadi atau
                akun milik pengguna yang terindikasi melanggar hukum dan/atau
                penyalahgunaan oleh pihak yang tidak berwenang; dan
              </p>

              <p class="ml-3">
                4.11 Segala kerugian dan atau kerusakan karena tidak
                beroperasinya dan/atau terdapat gangguan terhadap layanan
                SiMotor akibat terjadinya force majeure, yang termasuk tapi
                tidak terbatas pada:
              </p>

              <p class="ml-4">4.11.1 Bencana alam;</p>

              <p class="ml-4">4.11.2 Peristiwa kebakaran;</p>

              <p class="ml-4">4.11.3 Pemogokan;</p>

              <p class="ml-4">4.11.4 Perang;</p>

              <p class="ml-4">4.11.5 Huru-hara;</p>

              <p class="ml-4">
                4.11.6 Pemberontakan atau tindakan militer lainnya;
              </p>

              <p class="ml-3">
                4.12 Tindakan pihak yang berwenang yang mempengaruhi
                kelangsungan penyelenggaraan Layanan;
              </p>

              <p class="ml-3">
                4.13 Tindakan pihak ketiga yang menyebabkan SiMotor tidak dapat
                menyediakan Layanan;
              </p>

              <p class="ml-3">
                4.14 Segala kerugian sebagai akibat dari penggunaan data pribadi
                atau akun milik pengguna yang terindikasi melanggar hukum
                dan/atau penyalahgunaan oleh pihak yang tidak berwenang; dan
              </p>

              <p class="ml-3">
                4.15 Adanya keputusan atau perubahan keputusan dari instansi
                terkait termasuk pemerintah yang berdampak pada pelaksanaan
                Layanan ini.
              </p>

              <p class="ml-2">
                Pengguna pada saat memasang iklan wajib memastikan bahwa setiap
                produk dan/atau jasa yang diiklankan serta Materi iklan telah:
                (i) memperoleh persetujuan dan/atau perizinan yang
                dipersyaratkan, (ii) persetujuan dan/atau perizinan yang
                dipersyaratkan tersebut masih berlaku dan (iii) produk dan/atau
                jasa yang diiklankan bukan merupakan produk dan/atau jasa yang
                dilarang untuk diperjualbelikan secara umum berdasarkan
                ketentuan peraturan perundang- undangan.
              </p>

              <p class="ml-2">
                Dengan mengakses Layanan, pengguna menerima tanpa batasan atau
                kualifikasi, dan setuju untuk menggunakan Situs dan Layanan
                hanya untuk tujuan yang sah dan sesuai dengan syarat dan
                ketentuan ini, dan pengguna setuju untuk tidak:
              </p>

              <p class="ml-3">
                1. Menggunakan Layanan dengan cara apapun yang akan melumpuhkan,
                membebani, atau merusak, atau mengganggu penggunaan lainnya dari
                Layanan, termasuk, namun tidak terbatas pada, kemampuan setiap
                pengguna untuk terlibat dalam kegiatan real-time melalui
                Layanan;
              </p>

              <p class="ml-3">
                2. Menggunakan robot, spider atau perangkat otomatis lainnya,
                proses atau sarana untuk mengakses Layanan; untuk tujuan apapun,
                termasuk untuk memantau atau menyalin setiap bahan yang ada di
                Layanan;
              </p>

              <p class="ml-3">
                3. Menggunakan proses manual untuk memonitor atau menyalin
                setiap materi pada Layanan untuk terlibat dalam tujuan tidak sah
                lainnya tanpa persetujuan tertulis sebelumnya dari kami;
              </p>

              <p class="ml-3">
                4. Menggunakan perangkat apapun, perangkat lunak atau routine
                yang dapat mengganggu kinerja Layanan;
              </p>

              <p class="ml-3">
                5. Mengganggu, turut campur, menghalangi, merintangi kerja
                Layanan;
              </p>

              <p class="ml-3">
                6. Menyalin, mereproduksi, mengubah, memodifikasi, menciptakan
                karya turunan, atau menampilkan setiap konten secara publik dari
                Layanan atau Layanan tanpa izin tertulis dari SiMotor; atau
                melakukan reverse engineering atau mencoba untuk menemukan kode
                sumber yang berkaitan dengan Layanan atau alat di dalamnya,
                kecuali sejauh kegiatan tersebut secara tegas diizinkan oleh
                hukum yang berlaku walaupun ada pembatasan terkait hal ini; atau
              </p>

              <p class="ml-3">
                7. Mencoba untuk mengakses setiap area Layanan atau Situs dimana
                Anda tidak mempunyai kewenangan atas akses tersebut;
              </p>

              <p class="ml-3">
                8. Melakukan upaya apapun yang sekiranya dapat menimbulkan
                kerugian baik materiil atau immateriil bagi kami ataupun
                pengguna lain dari SiMotor;
              </p>

              <p class="ml-3">
                9. Membuat akun baru dan/atau membeli dan/atau menjual akun
                untuk menghindari pembatasan yang mungkin kami kenakan pada
                pengguna kami;
              </p>

              <p class="ml-3">
                10. Melakukan pelaporan palsu terhadap pengguna lainnya. Karena
                setiap laporan pelanggaran kebijakan layanan kami haruslah benar
                dan disampaikan dengan itikad baik dan dengan maksud mengatasi
                pelanggaran yang diketahui atau diduga melanggar kebijakan kami;
              </p>

              <p class="ml-3">
                11. Melanggar atau menghindari hukum, hak pihak ketiga atau
                sistem kami, kebijakan, atau penentuan status akun Anda;
              </p>

              <p class="ml-3">
                12. Memanipulasi harga barang, termasuk dan tidak terbatas pada
                penyembunyian harga;
              </p>

              <p class="ml-3">
                13. Melakukan pemasangan iklan palsu, tidak akurat, menyesatkan,
                memfitnah, atau konten mencemarkan nama baik;
              </p>

              <p class="ml-3">14. Memasang iklan duplikasi/ Double post;</p>

              <p class="ml-3">
                15. Memindahtangankan ID termasuk namun tidak terbatas pada
                username dan password Anda ke pihak lain tanpa persetujuan kami;
              </p>

              <p class="ml-3">
                16. Mendistribusikan atau mengirim spam, komunikasi elektronik
                yang tidak diminta atau massal, surat berantai, atau skema
                piramida;
              </p>

              <p class="ml-3">
                17. Mendistribusikan virus atau teknologi lainnya yang dapat
                membahayakan kami, atau kepentingan atau properti dari pengguna
                kami;
              </p>

              <p class="ml-3">
                18. Mengkomersialkan aplikasi kami atau informasi atau perangkat
                lunak yang terkait dengan aplikasi tersebut;
              </p>

              <p class="ml-3">
                19. Mengumpulkan informasi tentang pengguna kami tanpa
                persetujuan;
              </p>

              <p class="ml-3">
                20. Menghindari langkah-langkah teknis yang kami gunakan untuk
                menyediakan Layanan;
              </p>

              <p class="ml-3">
                21. Memasang iklan menggunakan tautan (hyperlink) dalam bentuk
                apapun.
              </p>

              <p class="ml-2">
                Setiap upaya untuk memanipulasi layanan kami atau kebijakan kami
                dapat mengakibatkan tindakan terhadap akun Anda. Selain
                penghapusan, Anda mungkin akan dikenakan berbagai tindakan
                lainnya, termasuk hak memasang iklan atau penangguhan akun Anda,
                bahkan termasuk dan tidak terbatas pada tindakan hukum.
              </p>

              <p class="ml-2">
                Karena penggunaan Layanan memerlukan sambungan Internet, Anda
                mungkin harus membayar biaya yang terkait dengan akses Internet
                saat menggunakan Layanan atau Situs. Pengguna bertanggung jawab
                melaksanakan semua pengaturan yang diperlukan guna mengakses
                Layanan atau Situs.
              </p>

              <p class="ml-2">
                Pengguna bertanggung jawab memastikan bahwa semua orang yang
                mengakses Layanan atau Situs melalui hubungan internet milik
                pengguna, mengetahui Syarat & Ketentuan Umum ini dan
                mematuhinya.
              </p>

              <p class="ml-2 font-weight-bold">5. Ganti Rugi</p>

              <p class="ml-2">
                Pengguna setuju untuk melepaskan, membela dan membebaskan
                SiMotor, perusahaan terafiliasinya dan para direkturnya,
                komisarisnya, pejabatnya, karyawannya dan agennya dari dan
                terhadap suatu dan semua tuntutan, kewajiban, kerugian dan biaya
                (termasuk biaya hukum, penggantian kerusakan dan jumlah
                penyelesaian yang wajar) yang timbul dari atau berkaitan dengan
                atau yang mungkin timbul dari penggunaan dan/atau pengaksesan
                Layanan; pelanggaran atas suatu syarat dalam Syarat & Ketentuan
                Umum ini, Kebijakan Privasi dan Larangan Iklan oleh pengguna;
                pelanggaran terhadap suatu hak pihak ketiga manapun, termasuk
                namun tidak terbatas pada hak atas kekayaan intelektual, aset
                baik yang berupa harta bergerak ataupun harta tidak bergerak,
                hak privasi; dan/atau tuntutan apapun sehubungan dengan Materi
                pengguna yang menyebabkan kerugian terhadap pihak ketiga. Dalam
                hal ini SiMotor juga dapat turut serta dalam suatu pembelaan
                bersama dengan penasihat hukum pilihannya.
              </p>

              <p class="ml-2 font-weight-bold">
                6. Keterangan Isi/Materi Layanan
              </p>

              <p class="ml-2">
                Materi yang ditayangkan di Layanan disediakan tanpa ketentuan
                atau jaminan apapun dalam hal isi, materi dan ketepatannya.
                Sejauh diizinkan oleh hukum yang berlaku di Republik Indonesia,
                SiMotor dengan ini secara tegas mengecualikan:
              </p>

              <p class="ml-3">
                6.1 Semua ketentuan, jaminan dan syarat lain yang dapat
                dinyatakan secara langsung maupun tidak langsung oleh
                undang-undang sebagai isi, materi dan ketepatannya; dan
              </p>

              <p class="ml-3">
                6.2 Kewajiban atas kehilangan atau kerugian langsung, tidak
                langsung atau yang merupakan akibat yang ditanggung oleh
                pengguna dalam hubungannya dengan Layanan atau dalam hubungannya
                dengan penggunaan, ketidakmampuan menggunakan, atau akibat dari
                penggunaan Layanan, setiap situs web yang terkait dengannya dan
                setiap materi yang ditempatkan padanya.
              </p>

              <p class="ml-2">
                Materi yang ditayangkan di Layanan adalah semata-mata untuk
                informasi guna membangun hubungan antara pemasang iklan dengan
                pengguna Layanan lainnya serta membantu pengguna Layanan untuk
                memutuskan mengajukan penawaran atau tidak mengajukan penawaran
                untuk barang atau jasa yang ditawarkan oleh Pemasang Iklan di
                Layanan.
              </p>

              <p class="ml-2">
                Apabila sebagai pengguna Anda menggunakan informasi yang ada
                pada Layanan untuk kepentingan selain daripada yang dinyatakan
                pada paragraf di atas, maka kami dapat membatasi akses Anda
                terhadap Layanan serta mengambil langkah hukum yang diperlukan
                atas tindakan Anda.
              </p>

              <p class="ml-2 font-weight-bold">7. Pelaksanaan Aktivitas</p>

              <p class="ml-2">
                Pelaksanaan aktivitas akses ke Layanan tersedia untuk umum,
                walaupun begitu untuk memasang iklan Anda diwajibkan untuk
                menjadi pengguna terdaftar, untuk setiap pengguna terdaftar
                hanya dapat mendaftarkan 1 (satu) nomor telepon dan nomor
                telepon tersebut harus sama dengan nomor telepon pada profile
                Anda.
              </p>

              <p class="ml-2">
                SiMotor berhak menarik dan/atau mengubah Layanan yang disediakan
                tanpa pemberitahuan terlebih dahulu. Dari waktu ke waktu,
                SiMotor dapat membatasi akses ke beberapa bagian dari situs
                dan/atau keseluruhan dari Layanan kepada pengguna.
              </p>

              <p class="ml-2">
                Apabila pengguna memilih atau diberi password (kode identifikasi
                pengguna) atau bagian informasi lainnya sebagai bagian dari
                prosedur keamanan Layanan, maka pengguna wajib menjaga
                kerahasiaan informasi tersebut dan tidak diperbolehkan
                mengungkapkannya kepada pihak ketiga.
              </p>

              <p class="ml-2">
                SiMotor berhak mematikan fungsi password (kode identifikasi
                pengguna), terlepas apakah dipilih oleh pengguna atau ditentukan
                oleh SiMotor dalam keadaan apapun dan dalam waktu kapanpun.
              </p>

              <p class="ml-2">
                Sebagai pengguna terdaftar, Anda dapat kami berikan suatu tanda
                khusus termasuk namun tidak terbatas pada tujuan memvalidasi
                kebenaran informasi yang Anda berikan kepada kami. Validasi ini
                bersifat gratis, tidak wajib dan tidak dikenakan biaya apapun
                akan tetapi Anda diharapkan untuk berpartisipasi dalam kegiatan
                ini. Setelah kami memvalidasi kebenaran informasi yang Anda
                berikan, kami akan memberikan tanda khusus di akun Anda yang
                berlaku selama kami pandang patut, oleh karena itu kami harap
                Anda secara berkala dapat melakukan validasi ulang pada saat
                sistem kami memintanya. Berkenaan dengan tanda khusus tersebut
                kami juga dapat mengubah, menghapus, ataupun menambahkan tanda
                khusus tersebut. Tentunya apabila Anda melakukan pelanggaran
                pada sebagian atau seluruh ketentuan yang ada di SiMotor tanda
                tersebut dapat kami hilangkan dari akun Anda.
              </p>

              <p class="ml-2">
                Pemberian tanda khusus terhadap pengguna maupun iklan yang
                dipasang oleh pengguna bukan merupakan bentuk dukungan,
                rekomendasi maupun pendapat dari SiMotor terhadap pengguna,
                barang/jasa yang ditawarkan, serta bagaimana pengguna
                mengekspresikan barang/jasa yang mereka tawarkan.
              </p>

              <p class="ml-2 font-weight-bold">8. Perubahan Layanan</p>

              <p class="ml-2">
                SiMotor berhak memperbarui dan/atau mengubah tampilan dan/atau
                Layanan dan/atau isi Layanan secara rutin dan setiap saat, demi
                memberi pelayanan yang lebih baik kepada setiap penggunanya.
              </p>

              <p class="ml-2">
                Apabila dibutuhkan, SiMotor dapat menangguhkan akses ke Layanan,
                atau menutupnya untuk sementara waktu untuk jangka waktu yang
                tidak tertentu.
              </p>

              <p class="ml-2">
                Berkenaan dengan informasi mengenai pengguna dan kunjungan
                pengguna ke Layanan, SiMotor berhak mengolah informasi mengenai
                pengguna sesuai dengan kebijakan yang tercantum di dalam
                <a href>Kebijakan Privasi.</a> Dengan menggunakan Layanan,
                pengguna setuju atas pemrosesan tersebut dan menjamin semua data
                yang diberikan adalah benar.
              </p>

              <p class="ml-2 font-weight-bold">
                9. Mengunggah Materi ke Layanan
              </p>

              <p class="ml-2">
                Anda mengakui dan setuju bahwa Anda bertanggung jawab atas
                Materi yang Anda pasang, transmisikan melalui maupun tautkan
                kepada Layanan dan setiap konsekuensi yang timbul dari tindakan
                tersebut. Secara khusus Anda bertanggung jawab atas setiap
                Materi yang Anda unggah seperti email atau yang Anda sediakan
                melalui Layanan atau Situs. Sehubungan dengan Materi yang
                dipasang, ditransmisikan melalui maupun tautkan kepada Layanan
                oleh Anda, Anda menyatakan secara tegas bahwa:
              </p>

              <p class="ml-3">
                9.1 Anda mempunyai dan akan tetap mempunyai hak atas Materi
                tersebut selama Materi tersebut masih tersedia di Layanan atau
                Situs; Anda mempunyai ijin, hak dan persetujuan untuk
                menggunakan Materi tersebut dan memberikan kewenangan kepada
                SiMotor untuk menggunakan Materi tersebut di dalam Layanan atau
                Situs atau untuk kepentingan promosi SiMotor atau untuk
                kepentingan lainnya sepanjang tidak bertentangan dengan
                Undang-Undang dan Syarat dan Ketentuan Umum ini; dan
              </p>

              <p class="ml-3">
                9.2 Anda mempunyai persetujuan tertulis, pelepasan dan/atau ijin
                dari setiap dan seluruh individu yang dapat diidentifikasi
                maupun usaha yang terdapat di dalam Materi untuk menggunakan
                nama atau kemiripan dari setiap dan seluruh individu dan usaha
                tersebut di dalam Layanan atau Situs sesuai dengan Syarat dan
                Ketentuan Umum ini. Anda tetap memiliki hak milik atas setiap
                Materi; namun dengan memasukkan Materi ke dalam Layanan, Anda
                memberikan hak yang tidak dapat dibatalkan, tidak dapat dicabut
                kembali, berlaku terus menerus, di seluruh dunia, tidak
                eksklusif, bebas royalty dan dapat disublisensikan, dapat
                dipindahkan, untuk menggunakan, mereproduksi, mendistribusikan,
                membuat pekerjaan derivatif, memasang dan menampilkan Materi
                sehubungan dengan Layanan dan usaha SiMotor, termasuk namun
                tidak terbatas pada tujuan promosi dan redistribusi sebagian
                maupun seluruh dari Layanan dan Materi yang terdapat di
                dalamnya. Hak-hak ini diperlukan oleh SiMotor untuk dapat
                menyediakan Layanan dan memasang Materi Anda. Selanjutnya,
                dengan memasang Materi ke dalam area publik di dalam Layanan,
                Anda setuju untuk dan dengan ini memberikan kepada SiMotor
                seluruh hak yang diperlukan untuk melarang atau memperbolehkan
                pengumpulan, pemasangan, penyalinan, duplikasi, reproduksi atau
                eksploitasi Materi di dalam Layanan oleh pihak manapun untuk
                tujuan apapun. Anda juga dengan ini memberikan kepada setiap
                pengguna Layanan dan Situs sebuah hak non-eksklusif untuk
                mengakses Materi Anda melalui Layanan atau Situs. Hak ini akan
                tetap berlaku dan dengan segera berakhir pada saat Anda atau
                SiMotor menghapus atau menarik Materi dari Situs.
              </p>

              <p class="ml-2">
                SiMotor dapat memberlakukan batasan-batasan terhadap sebagian
                atau seluruh aktivitas Anda atau mengenakan biaya terhadap iklan
                yang dipasang oleh pengguna di dalam bagian-bagian tertentu dari
                Layanan termasuk namun tidak terbatas pada penggunaan Fitur
                Promosi Iklan yang harus dilakukan sesuai dengan Syarat dan
                Ketentuan Umum ini, serta Syarat dan Ketentuan Fitur Promosi
                Iklan.
              </p>

              <p class="ml-2">
                Apabila pengguna memasang iklan di kategori iklan berbayar dan
                menggunakan fitur promosi iklan, pengguna memberikan hak kepada
                SiMotor untuk mengenakan biaya atas aktivitas tersebut.
              </p>

              <p class="ml-2">
                SiMotor berhak untuk menghapus setiap isi, materi atau bagian
                lain dari iklan, baik sebagian maupun keseluruhan, yang dipasang
                pengguna di Layanan atau Situs tanpa pemberitahuan terlebih
                dahulu kepada pengguna. Hal ini termasuk tapi tidak terbatas
                apabila iklan tersebut mengandung isi, materi atau bagian yang
                bersifat sensitif, ofensif, dapat memicu kebencian, mencemarkan
                nama baik, memuat materi yang memicu perpecahan suku, agama,
                ras, antar golongan, pornografi, perjudian, ataupun bertentangan
                dengan norma etika kesusilaan dan hukum yang berlaku di Republik
                Indonesia serta tidak sesuai dengan aturan yang berlaku di
                Layanan.
              </p>

              <p class="ml-2 font-weight-bold">10. Durasi Iklan</p>

              <p class="ml-2">
                Masa aktif iklan adalah sebagaimana tertera di halaman
                pemasangan iklan Setelah masa aktif iklan habis maka iklan
                secara otomatis dan permanen terhapus.
              </p>

              <p class="ml-2 font-weight-bold">
                11. Tautan (hyperlink) dari Layanan
              </p>

              <p class="ml-2">
                Layanan dapat mengandung tautan (hyperlink) ke situs dan/atau
                sumber daya lain yang disediakan oleh pihak ketiga, dimana
                SiMotor menegaskan bahwa tautan (hyperlink) tersebut disediakan
                hanya sebagai informasi bagi pengguna. SiMotor melepaskan diri
                dari kewajiban untuk mengontrol isi dari situs dan/atau sumber
                daya yang terjadi karena tautan (hyperlink) yang ada di Layanan.
              </p>

              <p class="ml-2">
                SiMotor tidak bertanggung jawab atas kehilangan dan/atau
                kerugian yang dapat timbul akibat penggunaan Layanan.
              </p>

              <p class="ml-2 font-weight-bold">
                12.Hubungan dengan Pihak Ketiga
              </p>

              <p class="ml-2">
                Anda mengakui dan setuju bahwa SiMotor tidak akan bertanggung
                jawab atas interaksi Anda dengan pihak ketiga di dalam Situs
                maupun melalui Layanan. Hal ini termasuk, namun tidak terbatas
                pada, pembayaran dan pengiriman barang dan jasa, serta syarat,
                kondisi, jaminan atau pernyataan lain yang terkait dengan
                interaksi antara Anda dengan pihak ketiga. Hubungan ini adalah
                antara Anda dengan pihak ketiga tersebut. Anda mengakui dan
                setuju bahwa SiMotor tidak akan bertanggung jawab atas setiap
                kerugian atau kerusakan yang timbul dari hubungan atau interaksi
                tersebut.
              </p>

              <p class="ml-2">
                Dalam hal terjadi perselisihan antara pengguna dengan pihak
                ketiga, Anda mengerti dan setuju bahwa SiMotor tidak bertanggung
                jawab untuk melibatkan diri dalam perselisihan tersebut dan Anda
                dengan ini membebaskan SiMotor, karyawannya, petugasnya dan
                agennya dari setiap tuntutan dan kerugian yang timbul dalam
                bentuk apapun sehubungan dengan Layanan kami.
              </p>

              <p class="ml-2 font-weight-bold">
                13. Yurisdiksi dan Hukum yang Berlaku
              </p>

              <p class="ml-2">
                Syarat & Ketentuan Umum ini, Kebijakan Privasi dan Larangan
                Iklan serta hubungan pengguna dengan SiMotor tunduk, diatur dan
                patuh menurut hukum Republik Indonesia, dan pengguna sepakat
                untuk terikat pada yurisdiksi hukum Republik Indonesia. Apabila
                terjadi perselisihan dalam penafsiran dan pelaksanaan Syarat &
                Ketentuan Umum ini,
                <nuxt-link to="/tentang?tab=kebijakan"
                  >Kebijakan Privasi</nuxt-link
                >
                dan
                <nuxt-link to="/tentang?tab=larangan">Larangan Iklan</nuxt-link
                >, para pihak sepakat untuk menyelesaikannya secara musyawarah
                untuk mufakat
              </p>

              <p class="ml-2 font-weight-bold">14. Perubahan‐Perubahan</p>

              <p class="ml-3">
                14.1 Setiap syarat dan ketentuan serta petunjuk lain yang
                berlaku untuk Layanan dapat diubah atau diperbarui oleh SiMotor
                dari waktu ke waktu atas kebijakannya sendiri.
              </p>

              <p class="ml-3">
                14.2 Pengguna diharapkan untuk memeriksa halaman ini dari waktu
                ke waktu untuk memperhatikan setiap perubahan, karena hal
                tersebut mengikat pengguna.
              </p>

              <p class="ml-3">
                14.3 Sebagian dari ketentuan yang terdapat dalam Syarat &
                Ketentuan Umum ini dapat digantikan oleh ketentuan-ketentuan
                atau pemberitahuan lain yang dipublikasi di bagian lain Layanan.
              </p>

              <p class="ml-2 font-weight-bold">15. Lain‐Lain</p>

              <p class="ml-2">
                Dengan menjadi pengguna Layanan, Anda dapat memilih apakah Anda
                berkeinginan untuk menerima informasi‐informasi terkait Layanan,
                penggunaanya, serta hal‐hal lain sehubungan dengan penggunaan
                akun Anda, adapun informasi‐informasi tersebut akan kami
                kirimkan atas dasar itikad baik melalui notifikasi baik berupa
                email ataupun notifikasi aplikasi ataupun bentuk‐bentuk lain.
                Jika Anda memilih untuk tidak menerima informasi, Anda dapat
                memberitahu kami dengan menghubungi layanan dukungan pelanggan
                kami.
              </p>

              <p class="ml-2">
                Apabila pengguna memiliki hal lain yang ingin disampaikan atau
                komentar maupun keprihatinan mengenai materi yang tampak di
                Situs dan layanan, silakan menghubungi layanan dukungan
                pelanggan kami
              </p>

              <p>Terima kasih atas kunjungan Anda ke Situs dan Layanan kami.</p>

              <br />

              <br />
              <p>Salam sukses,</p>

              <br />

              <br />
              <p>SiMotor</p>

              <p class="font-italic">
                *Syarat dan Ketentuan Umum ini terakhir diperbaharui 03 Desember
                2019
              </p>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="larangan">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Larangan Iklan
            </v-card-title>

            <v-container class="text-justify">
              <p class="ml-2">
                Pada dasarnya di dalam Layanan aplikasi atau pun situs Simotor
                barang yang diperbolehkan untuk diiklankan adalah sepeda motor
                dan/atau yang berkaitan dengan sepeda motor. Berikut ini adalah
                daftar barang dan jasa yang dilarang untuk dijual di Layanan
                aplikasi atau pun situs Simotor. Daftar barang dan jasa ini
                adalah bagian yang tak terpisahkan dari Syarat dan Ketentuan
                Layanan Simotor. Oleh karena itu apabila pengguna melakukan
                penjualan atas barang dan jasa yang dilarang sebagaimana
                dinyatakan dalam halaman ini, berarti juga telah melanggar
                Syarat dan Ketentuan Layanan Simotor, termasuk namun tidak
                terbatas pada penjelasan di bawah ini.
              </p>

              <p class="ml-3 font-weight-bold">1. Umum</p>

              <p class="ml-3">
                Pada dasarnya Anda dilarang untuk mengiklankan:
              </p>

              <p class="ml-3">
                Barang atau jasa yang tergolong berbahaya, melanggar hukum,
                mengancam, melecehkan, menghina, memfitnah, mengintimidasi,
                menginvasi privasi orang lain atau hak‐hak lainnya, meremehkan,
                berkaitan atau dengan cara apapun atau melanggar hukum dengan
                cara apapun:
              </p>

              <p class="ml-4">
                1. Iklan yang merugikan pihak ketiga dalam bentuk apapun.
              </p>

              <p class="ml-4">
                2. Benda‐benda atau jasa yang tergolong sensitif dan salah
                secara moral.
              </p>

              <p class="ml-4">3. Barang hasil kejahatan.</p>

              <p class="ml-4">
                4. Produk yang belum dirilis / diluncurkan secara resmi di
                Indonesia oleh pemilik sah merek tersebut dan atau belum
                terdaftar di TKDN Kemenperin baik penjualan secara langsung
                ataupun secara preorder.
              </p>

              <p class="ml-3">
                Selain hal‐hal yang dinyatakan diatas, Anda juga dilarang untuk
                mengiklankan:
              </p>

              <p class="ml-4 font-weight-bold">
                1.1 IKLAN YANG MELANGGAR PERATURAN PEMASANGAN IKLAN
              </p>

              <p class="ml-4">
                Demi menjaga konten SiMotor agar tetap berkualitas, kami
                membatasi dengan ketentuan sebagai berikut:
              </p>

              <p class="ml-5">
                1. Iklan yang menduplikasi iklan lain yang sudah aktif.
              </p>

              <p class="ml-5">
                2. Iklan yang mengarahkan ke website kompetitor.
              </p>

              <p class="ml-5">3. Iklan dengan kategori yang tidak sesuai.</p>

              <p class="ml-5">
                4. Iklan dengan foto terdapat kontak pribadi, foto buram, foto
                produk terbalik.
              </p>

              <p class="ml-5">
                5. Iklan dengan beberapa produk di deksripsi dan judul yang
                tidak sesuai dengan produk/jasa yang dijual.
              </p>

              <p class="ml-4 font-weight-bold">
                1.2 IKLAN DENGAN MATERI DEWASA
              </p>

              <p class="ml-4">
                Pemasang Iklan tidak diizinkan menempatkan iklan yang mengandung
                pornografi, bersifat dewasa, atau materi yang hanya bisa
                dikonsumsi oleh orang dewasa, seperti misalnya:
              </p>

              <p class="ml-5">
                1. Benda atau gambar yang mengandung pornografi secara
                terang‐terangan, terutama yang menampilkan jenis kelamin
                pria/wanita dan/atau pornografi yang melibatkan orang‐orang di
                bawah usia dewasa.
              </p>

              <p class="ml-5">
                2. Benda‐benda terkait dengan kekerasan seksual.
              </p>

              <p class="ml-5">
                3. Alat bantu seks, vibrator, obat seks, obat kuat, enlargement
                pill (obat pembesar kelamin), perangsang, pemerah puting,
                pemutih selangkangan, boneka seks.
              </p>

              <p class="ml-5">
                4. Jasa lady escort/ ladies club, ladies night /wanita sewaan.
              </p>

              <p class="ml-5">5. Jasa seks komersial.</p>

              <p class="ml-5">
                6. Iklan‐iklan yang cabul, atau bersifat atau bahkan secara
                implisit maupun eksplisit merupakan pornografi, atau bersifat
                atau bahkan secara implisit maupun eksplisit merupakan materi
                pedofilia.
              </p>

              <p class="ml-4 font-weight-bold">
                1.3 IKLAN DENGAN MATERI YANG MENYUDUTKAN SESEORANG, KELOMPOK,
                ATAU ORGANISASI
              </p>

              <p class="ml-4">
                SiMotor sangat meyakini kebebasan berekspresi, tetapi juga
                mengakui kebutuhan untuk melindungi kualitas iklan SiMotor bagi
                para penggunanya. Anda tidak diizinkan untuk mengunggah materi
                yang bersifat melecehkan atau intimidasi, atau yang menghasut
                kebencian atau mempromosikan kekerasan terhadap individu atau
                kelompok berdasarkan ras atau asal etnis, agama, kecacatan,
                jenis kelamin, usia, status veteran, atau orientasi
                seksual/identitas gender ataupun menghasut atau untuk mendukung
                bahaya terhadap individu atau kelompok, antara lain:
              </p>

              <p class="ml-5">
                1. Benda atau gambar atau jasa yang yang melecehkan,
                mendegradasi, atau mengandung muatan kebencian terhadap individu
                atau kelompok individu atas dasar agama, jenis kelamin,
                orientasi seksual, ras, etnis, usia, atau cacat tubuh.
              </p>

              <p class="ml-5">
                2. Iklan yang menganjurkan/membenarkan kekerasan atau membuat
                ancaman bahaya terhadap individu atau kelompok.
              </p>

              <p class="ml-5">
                3. Iklan yang menghasut atau mempromosikan kebencian terhadap
                kelompok atau individu.
              </p>

              <p class="ml-5">
                4. Iklan yang mendorong orang lain untuk percaya bahwa suatu
                kelompok atau individu adalah tidak manusiawi atau lebih rendah
              </p>

              <p class="ml-5">
                5. Iklan yang menyerang seseorang atau kelompok atas dasar
                orientasi seksual atau identitas
              </p>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="kebijakan">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Kebijakan Privasi
            </v-card-title>

            <v-container class="text-justify">
              <p class="font-weight-bold">SiMotor ‐ Pernyataan Privasi</p>

              <p>
                Kami peduli dengan privasi Anda dan berkomitmen untuk melindungi
                data pribadi Anda. Pernyataan privasi ini akan memberitahu Anda
                bagaimana kami menangani data pribadi Anda, hak privasi Anda dan
                bagaimana hukum melindungi Anda. Silakan baca pernyataan privasi
                ini dengan seksama sebelum menggunakan layanan kami.
              </p>

              <p>Dalam pernyataan privasi ini:</p>

              <p>
                Layanan berarti setiap produk, konten, fitur, teknologi, atau
                fungsi, serta layanan terkait yang kami sediakan dan tawarkan
                kepada anda. Platform berarti wadah berupa situs web, aplikasi
                seluler, situs seluler, atau hal online lainnya yang kami miliki
                dan melalui itu kami menawarkan layanan kami.
              </p>

              <p class="ml-2 font-weight-bold">1. Siapa kami?</p>

              <p class="ml-2">
                Pengelola utama data Anda untuk tujuan layanan kami adalah
                Digital Nayaka Abhinaya, sebuah perusahaan yang berlokasi di
                Ruko Sentra Komersil (Rsk) Blok 7/96 Grand Galaxy City,
                Kelurahan Jakasetia, Kecamatan Bekasi Selatan, Kota Bekasi, Jawa
                Barat, Indonesia. Digital Nayaka Abhinaya adalah perusahaan
                pengelola dan pembuat dari aplikasi SiMotor (selanjutnya secara
                bersama disebut sebagai “SiMotor”, “kami”, “kita” atau “milik
                kami” dalam pernyataan privasi ini). yang menyediakan layanan
                kepada Anda sesuai dengan
                <a href="/tentang?tab=ketentuan">Syarat & Ketentuan</a> kami.
              </p>

              <p class="ml-2font-weight-bold">
                2. Data apa yang kami kumpulkan tentang Anda?
              </p>

              <p class="ml-3 font-italic font-weight-bold">
                2.1.1 Data disediakan melalui interaksi langsung
              </p>

              <p class="ml-3 font-weight-bold">
                Pendaftaran dan informasi akun lainnya
              </p>

              <p class="ml-3">
                Ketika Anda mendaftar untuk menggunakan Layanan kami, kami dapat
                mengumpulkan informasi berikut tentang Anda:
              </p>

              <p class="ml-5">
                1. jika Anda mendaftar menggunakan akun Google Anda: nama depan,
                nama belakang dan alamat email; dan
              </p>

              <p class="ml-5">
                2. jika Anda mendaftar menggunakan nomor ponsel Anda: nomor
                ponsel.
              </p>

              <p class="ml-3">
                Bergantung pada pilihan yang Anda buat selama proses masuk ke
                Layanan kami atau selama proses melibatkan Layanan kami, Anda
                dapat memilih untuk memberikan data pribadi tambahan berikut:
              </p>

              <p class="ml-5">1. Nama Anda;</p>

              <p class="ml-5">2. Alamat e‐mail;</p>

              <p class="ml-5">3. Nomor ponsel;</p>
              <p class="ml-5">4. Alamat fisik Anda;</p>
              <p class="ml-5">5. Kartu Identitas;</p>

              <p class="ml-3 font-weight-bold">
                Komunikasi melalui fitur chat di Platform kami
              </p>

              <p class="ml-3">
                Saat Anda menggunakan fitur obrolan kami untuk berkomunikasi
                dengan pengguna lain, kami mengumpulkan informasi yang Anda
                pilih untuk diberikan kepada pengguna lain melalui fitur ini.
              </p>

              <p class="ml-3 font-italic font-weight-bold">
                2.1.2 Data yang kami kumpulkan secara otomatis saat Anda
                menggunakan Layanan kami
              </p>

              <p class="ml-3">
                Ketika Anda berinteraksi dengan Platform kami atau menggunakan
                Layanan kami, kami secara otomatis mengumpulkan informasi
                berikut tentang Anda:
              </p>

              <p class="ml-5 font-weight-bold">Informasi Perangkat</p>

              <p class="ml-5">
                Kami mengumpulkan informasi khusus perangkat seperti versi
                sistem operasi, tanda pengenal unik. Contohnya, nama jaringan
                seluler yang Anda gunakan. Kami mengaitkan pengenal perangkat
                dengan akun SiMotor Anda.
              </p>

              <p class="ml-5 font-weight-bold">Informasi lokasi</p>

              <p class="ml-5">
                Tergantung pada izin perangkat Anda, jika Anda memposting suatu
                hal/barang di Platform kami, kami secara otomatis mengumpulkan
                dan memproses informasi tentang lokasi Anda yang sebenarnya.
                Kami menggunakan berbagai teknologi untuk menentukan lokasi,
                termasuk IP address, GPS, titik akses Wi‐Fi, dan menara seluler.
                Data lokasi Anda memungkinkan Anda melihat item pengguna di
                dekat Anda dan membantu Anda dalam memposting suatu hal/barang
                di dalam lokasi Anda. Jika kami membutuhkan data lokasi Anda,
                pertama‐tama kami akan menampilkan pop‐up yang akan meminta Anda
                memilih untuk mengizinkan atau tidak mengizinkan kami mengakses
                data lokasi Anda. Jika Anda tidak mengizinkan kami untuk
                memiliki akses ke data lokasi Anda, Anda masih dapat menggunakan
                Layanan kami namun dengan fungsionalitas terbatas. Jika Anda
                mengizinkan kami untuk mengakses data lokasi Anda, Anda selalu
                dapat mengubahnya setelah itu dengan membuka pengaturan di situs
                web kami atau aplikasi platform kami dan menonaktifkan izin yang
                terkait dengan berbagi lokasi. Untuk mengetahui lebih lanjut
                tentang tujuan penggunaan data lokasi Anda dan cara data itu
                diproses, silakan merujuk ke Bagian 4.2 (ii) Pernyataan Privasi
                ini.
              </p>

              <p class="ml-5 font-weight-bold">Klien dan Data Log</p>

              <p class="ml-5">
                Detail teknis, termasuk alamat Internet Protocol (IP) perangkat
                Anda, zona waktu dan sistem operasi. Kami juga akan menyimpan
                informasi login Anda (tanggal pendaftaran, tanggal perubahan
                kata sandi terakhir, tanggal login terakhir yang berhasil),
                jenis dan versi browser Anda.
              </p>

              <p class="ml-5 font-weight-bold">Data Clickstream</p>

              <p class="ml-5">
                Kami mengumpulkan informasi tentang aktivitas Anda di Platform
                kami yang mencakup situs darimana Anda mengakses Platform kami,
                stempel tanggal dan waktu setiap kunjungan, penelusuran yang
                telah Anda lakukan, listings atau iklan yang Anda klik,
                interaksi Anda dengan iklan atau listings seperti itu, durasi
                kunjungan Anda dan urutan dimana Anda mengunjungi konten di
                Platform kami.
              </p>

              <p class="ml-4 font-italic font-weight-bold">
                2.1.3 Data dari pihak ketiga atau data yang tersedia dari sumber
                publik.
              </p>

              <p class="ml-4">
                Kami menerima data pribadi tentang Anda dari berbagai pihak
                ketiga dan dan sumber umum sebagaimana disebutkan di bawah ini:
              </p>

              <p class="ml-5">
                Informasi teknis dan penggunaan tertentu dari penyedia analisis
                seperti Google;
              </p>

              <p class="ml-4">Apakah kami mengumpulkan data dari anak‐anak?</p>

              <p class="ml-5">
                Layanan kami tidak ditujukan untuk anak di bawah 18 tahun dan
                kami tidak secara sengaja mengumpulkan data dari siapa pun yang
                berusia dibawah 18 tahun. Jika kami mengetahui bahwa orang yang
                berusia dibawah 18 tahun telah memberi kami data pribadi mereka,
                kami akan segera menghapusnya.
              </p>

              <p class="ml-2font-weight-bold">
                3. Mengapa kami memproses informasi pribadi Anda?
              </p>

              <p class="ml-3">
                Kami hanya akan menggunakan data pribadi Anda saat hukum
                mengizinkan kami. Umumnya, kami akan menggunakan data pribadi
                Anda dalam situasi berikut:
              </p>

              <p class="ml-4">
                1. Di mana kita perlu melakukan kontrak yang akan kita ikuti
                atau telah ikuti dengan Anda.
              </p>

              <p class="ml-4">
                2. Di mana diperlukan untuk kepentingan sah kami untuk
                meningkatkan Layanan kami dan untuk menyediakan Anda sebuah
                Platform yang aman dan terjamin.
              </p>

              <p class="ml-4">
                3. Di mana kita harus mematuhi kewajiban hukum atau peraturan.
              </p>

              <p class="ml-3">
                Dalam keadaan tertentu, kami juga dapat memproses data pribadi
                Anda berdasarkan pada persetujuan Anda. Jika kami melakukan ini,
                kami akan memberitahu Anda tujuan dan kategori data pribadi
                manakah yang akan diproses pada saat kami meminta persetujuan
                Anda.
              </p>

              <p class="ml-3 font-weight-bold">
                3.1 Untuk menyediakan akses dan memberikan Layanan melalui
                Platform kami
              </p>

              <p class="ml-4">
                3.1.1 Jika Anda masuk menggunakan nomor ponsel atau ID email
                Anda, kami menggunakan nama depan dan nama belakang Anda, nomor
                ponsel dan / atau alamat e‐mail untuk mengidentifikasi Anda
                sebagai pengguna dan memberikan akses ke Platform kami.
              </p>

              <p class="ml-4">
                3.1.2 Data log‐informasi di atas juga digunakan oleh kami untuk
                mengirimkan Layanan kami kepada Anda sesuai dengan Syarat &
                Ketentuan kami.
              </p>

              <p class="ml-4">
                3.1.3 Kami menggunakan alamat e‐mail dan nomor ponsel Anda
                (melalui SMS) untuk membuat saran dan rekomendasi kepada Anda
                tentang Layanan kami yang mungkin menarik bagi Anda.
              </p>

              <p class="ml-3">
                Kami memproses informasi di atas untuk kinerja yang baik dari
                persetujuan kami dengan Anda dan atas dasar kepentingan sah kami
                dalam melakukan kegiatan pemasaran untuk menawarkan Layanan yang
                mungkin menarik bagi Anda.
              </p>

              <p class="ml-3 font-italic font-weight-bold">
                3.2 Untuk meningkatkan pengalaman Anda di Platform
              </p>

              <p class="ml-4">3.2.1 Kami menggunakan data clickstream untuk:</p>

              <p class="ml-5">
                i. menawarkan konten yang disesuaikan, seperti memberi Anda
                hasil pencarian yang lebih relevan saat menggunakan layanan
                kami.
              </p>

              <p class="ml-5">
                ii. untuk menentukan berapa banyak waktu yang Anda habiskan di
                Platform kami dan dengan cara apa Anda menavigasi melalui
                Platform kami untuk memahami minat Anda dan untuk meningkatkan
                Layanan kami berdasarkan data ini. Contohnya, kami dapat memberi
                Anda saran tentang konten yang dapat Anda kunjungi berdasarkan
                konten yang Anda klik.
              </p>

              <p class="ml-5">
                iii. untuk memantau dan melaporkan efektivitas campaign delivery
                kepada mitra bisnis kami dan untuk analisis bisnis internal.
              </p>

              <p class="ml-4">
                3.2.2 Kami menggunakan data lokasi Anda untuk tujuan berikut:
              </p>

              <p class="ml-5">
                i. untuk mengumpulkan informasi anonim dan agregat tentang
                karakteristik dan perilaku pengguna SiMotor, termasuk untuk
                keperluan analisis bisnis, segmentasi dan pengembangan profil
                anonim.
              </p>

              <p class="ml-5">
                ii. untuk meningkatkan kinerja Layanan kami dan mempersonalisasi
                konten yang kami arahkan ke Anda. Contohnya ‐ dengan bantuan
                data lokasi, kami menampilkan daftar iklan yang ada di sekitar
                Anda untuk meningkatkan pengalaman pembelian Anda. Untuk tujuan
                ini, layanan Google Maps diintegrasikan ke dalam Platform kami.
                Google Maps disediakan oleh kami dan Google bertindak sebagai
                pengontrol independen. Ini berarti Google dan kami bertanggung
                jawab atas pemrosesan data lokasi Anda dalam konteks Google
                Maps. Bagaimanapun, kami tidak akan memproses data lokasi Anda
                untuk tujuan lainnya selain yang dijelaskan di dalam Pernyataan
                Privasi ini. Namun, Google dapat memproses data lokasi tersebut
                untuk tujuan mereka sendiri sebagaimana dijelaskan dalam
                Kebijakan Privasi Google yang dapat ditinjau di sini. Penggunaan
                Google Maps melalui Platform kami tunduk pada Ketentuan Layanan
                Google Maps.
              </p>

              <p class="ml-5">
                iii. untuk mengukur dan memantau interaksi Anda dengan iklan
                banners pihak ketiga yang kami tempatkan di Platform kami.
              </p>

              <p class="ml-4">
                3.2.3 Dengan bantuan informasi login Anda yang mencakup id email
                dan nomor telepon Anda, kami memetakan perangkat yang berbeda
                (seperti desktop, ponsel, tablet) yang digunakan oleh Anda untuk
                mengakses Platform kami. Ini memungkinkan kami mengaitkan
                aktivitas Anda di Platform kami di seluruh perangkat dan
                membantu kami memberikan pengalaman yang baik tanpa peduli
                perangkat apa yang Anda gunakan.
              </p>

              <p class="ml-5">
                Kami memproses informasi di atas berdasarkan kepentingan sah
                kami untuk meningkatkan pengalaman Anda di Platform kami dan
                untuk kinerja yang memadai dari kontrak kami dengan Anda.
              </p>

              <p class="ml-3 font-italic font-weight-bold">
                3.3. Untuk memberi Anda Platform yang aman dan nyaman
              </p>

              <p class="ml-4">
                3.3.1 Kami menggunakan nomor ponsel Anda, data log dan pengenal
                perangkat unik untuk mengelola dan melindungi Platform kami
                (termasuk pemecahan masalah, analisis data, pengujian,
                pencegahan penipuan, pemeliharaan sistem, dukungan, pelaporan
                dan hosting data).
              </p>

              <p class="ml-4">
                3.3.2 Kami menganalisis komunikasi Anda yang dilakukan melalui
                fitur obrolan kami untuk pencegahan penipuan dan untuk
                meningkatkan keamanan dengan memblokir spam atau pesan kasar dan
                tidak baik yang mungkin telah dikirimkan kepada Anda oleh
                pengguna lain.
              </p>

              <p class="ml-3">
                Kami memproses informasi di atas untuk kinerja yang memadai dari
                kontrak kami dengan Anda, untuk meningkatkan layanan kami dan
                atas dasar kepentingan sah kami untuk mencegah penipuan.
              </p>

              <p class="ml-2font-weight-bold">
                4. Bagaimana kami akan memberitahu Anda tentang perubahan dalam
                pernyataan privasi kami?
              </p>

              <p class="ml-3">
                Kami dapat mengubah pernyataan privasi ini dari waktu ke waktu.
                Kami akan memposting perubahan di halaman ini dan akan
                memberitahu Anda melalui e‐mail atau melalui Platform kami. Jika
                Anda tidak setuju dengan perubahan, Anda dapat menutup akun Anda
                dengan pergi ke pengaturan akun dan pilih hapus akun.
              </p>

              <p class="ml-2font-weight-bold">5. Hak Anda</p>

              <p class="ml-3">
                Dalam keadaan tertentu, Anda memiliki hak di bawah undang‐undang
                perlindungan data yang terkait dengan data pribadi Anda. Jika
                Anda ingin menggunakan hak apa pun yang ditetapkan di bawah ini,
                silakan buka pengaturan akun / privasi Anda atau hubungi kami
                menggunakan Formulir Kontak / id email privasi:
                support@SiMotor.id.
              </p>

              <p class="ml-4">
                5.1 Hak untuk meminta akses ke data pribadi Anda (umumnya
                dikenal sebagai "permintaan akses subjek data"). Ini
                memungkinkan Anda untuk menerima salinan data pribadi yang kami
                simpan tentang Anda dan untuk memeriksa bahwa kami secara sah
                memprosesnya.
              </p>

              <p class="ml-4">
                5.2 Hak untuk meminta koreksi atas data apa pun yang kami miliki
                tentang Anda. Hal ini memungkinkan Anda untuk memiliki data yang
                tidak lengkap atau tidak akurat yang kami miliki tentang Anda
                untuk diperbaiki, meskipun kami mungkin perlu memverifikasi
                keakuratan data baru yang Anda berikan kepada kami.
              </p>

              <p class="ml-4">
                5.3 Hak untuk meminta pembatasan pemrosesan data pribadi Anda.
                Ini memungkinkan Anda meminta kami menangguhkan pemrosesan data
                pribadi Anda dalam skenario berikut: (a) jika Anda ingin kami
                menetapkan keakuratan data; (b) jika penggunaan data kami tidak
                sah; (c) di mana Anda membutuhkan kami untuk menyimpan data
                bahkan jika kami tidak lagi memerlukannya saat Anda
                membutuhkannya untuk menetapkan, menjalankan atau membela klaim
                hukum; atau (d) Anda keberatan dengan penggunaan kami atas data
                Anda, tetapi kami perlu memverifikasi apakah kami telah
                mengesampingkan alasan yang sah untuk menggunakannya.
              </p>

              <p class="ml-4">
                5.4 Hak untuk meminta penghapusan data pribadi Anda. Ini
                memungkinkan Anda meminta kami menghapus atau menghapus data
                pribadi yang tidak ada alasan kuat bagi kami untuk terus
                memprosesnya. Anda juga berhak meminta kami untuk menghapus atau
                memindahkan data pribadi Anda di mana Anda telah berhasil
                melaksanakan hak Anda untuk menolak pemrosesan (lihat di bawah),
                di mana kami mungkin telah memproses informasi Anda secara tidak
                sah atau di mana kami diminta untuk menghapus data pribadi Anda
                ke mematuhi hukum setempat. Harap dicatat bahwa untuk tujuan
                tertentu kami mungkin secara hukum berkewajiban untuk
                mempertahankan data Anda. (Silakan lihat bagian 10.)
              </p>

              <p class="ml-4">
                5.5 Hak untuk menolak pemrosesan data pribadi Anda di mana kami
                mengandalkan pada kepentingan yang sah (atau dari pihak ketiga)
                dan ada sesuatu tentang situasi khusus Anda yang membuat Anda
                ingin menolak pemrosesan atas dasar ini karena Anda merasakannya
                berdampak tentang hak‐hak dasar dan kebebasan Anda. Anda juga
                memiliki hak untuk menolak di mana kami memproses data pribadi
                Anda untuk tujuan pemasaran langsung. Dalam beberapa kasus, kami
                dapat menunjukkan bahwa kami telah memaksakan alasan yang sah
                untuk memproses informasi Anda yang mengesampingkan hak dan
                kebebasan Anda.
              </p>

              <p class="ml-4">
                5.6 Hak untuk meminta transfer data pribadi Anda kepada Anda
                atau kepada pihak ketiga. Kami akan memberikan kepada Anda, atau
                pihak ketiga yang Anda pilih, data pribadi Anda dalam format
                yang terstruktur, umumnya digunakan, dan dapat dibaca oleh
                mesin. Perhatikan bahwa hak ini hanya berlaku untuk informasi
                otomatis yang pada awalnya Anda berikan persetujuan untuk kami
                gunakan atau dimana kami menggunakan informasi tersebut untuk
                melakukan kontrak dengan Anda.
              </p>

              <p class="ml-4">
                5.7 Hak untuk menarik persetujuan Anda untuk memproses data
                pribadi Anda setiap saat. Hal ini tidak mempengaruhi legalitas
                pemrosesan apa pun yang telah kami lakukan berdasarkan pada
                persetujuan yang diberikan sebelumnya. Tidak ada biaya yang akan
                dikenakan: Anda tidak perlu membayar biaya untuk mengakses data
                pribadi Anda (atau menggunakan hak‐hak lainnya). Namun, kami
                dapat mengenakan biaya yang wajar jika permintaan Anda jelas
                tidak berdasar, berulang atau berlebihan. Atau, kami dapat
                menolak untuk mematuhi permintaan Anda dalam situasi seperti
                ini.
              </p>

              <p class="ml-3">
                Batas waktu untuk merespons: Kami mencoba menanggapi semua
                permintaan yang sah dalam waktu satu bulan. Terkadang kami
                membutuhkan waktu lebih dari sebulan jika permintaan Anda sangat
                rumit atau Anda telah membuat beberapa permintaan. Dalam hal
                ini, kami akan memberitahu Anda dan memberitahu perkembangan hal
                ini kepada Anda.
              </p>

              <p class="ml-3">
                Selain itu, Anda memiliki hak untuk mengajukan keluhan kapan
                saja kepada otoritas perlindungan data yang bertanggung jawab
                untuk Anda sebagaimana diuraikan dalam pasal 13.
              </p>

              <p class="ml-3">
                Namun, sebelum Anda mengajukan keluhan kepada otoritas
                perlindungan data, kami akan menghargai kesempatan untuk
                menangani kekhawatiran Anda dalam contoh pertama, silakan
                hubungi Kantor Privasi kami di Ruko Sentra Komersil (Rsk) Blok
                7/96 Grand Galaxy City, Kelurahan Jakasetia, Kecamatan Bekasi
                Selatan, Kota Bekasi, Jawa Barat .
              </p>

              <p class="ml-2 font-weight-bold">6. Komunikasi dan pemasaran</p>

              <p class="ml-2">
                Kami akan berkomunikasi dengan Anda melalui email, SMS atau
                pemberitahuan aplikasi sehubungan dengan Layanan / Platform kami
                untuk mengkonfirmasi pendaftaran Anda, untuk memberitahu Anda
                jika daftar iklan Anda telah menjadi live / kedaluwarsa dan
                untuk pesan transaksional lainnya sehubungan dengan Layanan
                kami. Karena sangat penting bagi kami untuk memberikan Anda
                pesan‐ pesan transaksional seperti itu, Anda mungkin tidak dapat
                memilih keluar dari pesan‐pesan tersebut.
              </p>

              <p class="ml-2">
                Namun, Anda dapat meminta kami untuk berhenti mengirimi Anda
                komunikasi pemasaran kapan saja hubungi kami melalui email ke
                support@SiMotor.id.
              </p>

              <p class="ml-2">
                Anda dapat menerima komunikasi pemasaran dari kami jika Anda:
              </p>

              <p class="ml-3">
                6.1 telah meminta informasi tersebut dari kami;
              </p>

              <p class="ml-3">
                6.2 menggunakan Platform atau Layanan kami; atau
              </p>

              <p class="ml-3">6.3 terdaftar untuk promosi.</p>

              <p class="ml-2 font-weight-bold">
                7. Dengan siapa kami membagikan data Anda?
              </p>

              <p class="ml-2">
                Kami mungkin harus membagikan data pribadi Anda dengan
                pihak‐pihak yang ditetapkan di bawah ini untuk tujuan yang
                ditetapkan dalam bagian 4 di atas:
              </p>

              <p class="ml-3">
                7.1 Afiliasi perusahaan ‐ kami dapat membagikan data Anda dengan
                perusahaan grup SiMotor lainnya yang berlokasi di dalam maupun
                di luar Wilayah Ekonomi Eropa (“EEA”) dan membantu kami dalam
                menyediakan layanan operasi bisnis seperti peningkatan produk,
                dukungan pelanggan, dan mekanisme deteksi penipuan. Setiap
                pembagian data pribadi dalam kelompok perusahaan SiMotor yang
                terletak di luar “EEA” akan selalu menjadi subjek perlindungan
                sebagaimana dijelaskan dalam bagian 9 atau pada perjanjian
                transfer data yang dengan jelas mendefinisikan kewajiban para
                pihak dan memastikan teknis yang sesuai dan langkah‐langkah
                organisasi untuk melindungi data Anda.
              </p>

              <p class="ml-3">
                7.2 Penyedia Layanan Pihak Ketiga: Kami menggunakan penyedia
                layanan pihak ketiga untuk membantu kami memberikan aspek
                tertentu dari Layanan kami, contohnya, fasilitas penyimpanan
                cloud seperti Amazon Web Services dan Microsoft Azure. Penyedia
                layanan dapat ditempatkan di dalam atau di luar “EEA”. Kami
                melakukan pemeriksaan pada penyedia layanan pihak ketiga kami
                dan mengharuskan mereka untuk menghormati keamanan data pribadi
                Anda dan memperlakukannya sesuai dengan hukum. Kami tidak
                mengizinkan mereka untuk menggunakan data pribadi Anda untuk
                tujuan mereka sendiri dan hanya mengizinkan mereka untuk
                memproses data pribadi Anda untuk tujuan tertentu dan sesuai
                dengan instruksi kami.
              </p>

              <p class="ml-3">
                7.3 Penyedia iklan dan analisis: Untuk meningkatkan Layanan
                kami, kami terkadang akan membagikan informasi Anda dengan
                penyedia analitik yang dapat membantu kami untuk menganalisis
                bagaimana seseorang menggunakan Platform / Layanan kami.
                Sebagian besar, kami memberikan informasi Anda kepada mereka
                dalam bentuk yang tidak dapat diidentifikasi untuk memantau dan
                melaporkan efektivitas pengiriman kampanye kepada mitra bisnis
                kami dan untuk analisis bisnis internal. Informasi ini biasanya
                akan mencakup ID cookie, alamat IP (singkat), URL rujukan serta
                informasi browser dan perangkat
              </p>

              <p class="ml-3">
                7.4 Aparat penegak hukum, regulator, dan lainnya: Kami dapat
                mengungkapkan data pribadi Anda kepada pihak penegak hukum,
                regulator, pemerintah, atau badan public dan pihak ketiga
                terkait lainnya untuk mematuhi persyaratan hukum atau peraturan
                apa pun.
              </p>

              <p class="ml-2">
                Kami dapat memilih untuk menjual, mentransfer, atau
                menggabungkan bagian dari bisnis kami atau aset kami. Sebagai
                alternatif, kami mungkin berusaha untuk mendapatkan bisnis lain
                atau bergabung dengan mereka. Jika perubahan terjadi pada bisnis
                kami, maka pemilik baru dapat menggunakan data pribadi Anda
                dengan cara yang sama seperti yang ditetapkan dalam pernyataan
                privasi ini.
              </p>

              <p class="ml-2">
                Informasi yang tersedia untuk publik. Ketika Anda memposting
                barang untuk dijual menggunakan layanan kami, Anda dapat memilih
                untuk membuat informasi pribadi tertentu oleh pengguna SiMotor
                lainnya. Ini mungkin termasuk nama depan Anda, nama belakang,
                alamat email Anda, lokasi Anda, dan nomor kontak Anda. Harap
                diperhatikan, informasi apapun yang Anda berikan kepada pengguna
                lain dapat selalu dibagikan kepada mereka dengan orang lain,
                jadi mohon bijaksana dalam hal ini.
              </p>

              <p class="ml-2 font-weight-bold">
                8. Dimana kami menyimpan data Anda dan untuk berapa lama?
              </p>

              <p class="ml-2">
                Data yang kami kumpulkan tentang Anda akan disimpan dan diproses
                di dalam serta di luar EEA di server aman untuk memberikan
                pengalaman pengguna sebaik mungkin. Misalnya ‐ untuk membangun
                situs web atau aplikasi seluler cepat.
              </p>

              <p class="ml-2">
                Kami hanya akan menyimpan data pribadi Anda selama diperlukan
                untuk memenuhi tujuan yang kami kumpulkan, termasuk untuk tujuan
                memenuhi persyaratan hukum, akuntansi, atau pelaporan apa pun.
              </p>

              <p class="ml-2">
                Untuk menentukan periode retensi yang tepat untuk data pribadi,
                kami mempertimbangkan jumlah, sifat, dan kepekaan data pribadi,
                potensi risiko bahaya dari penggunaan tidak sah atau
                pengungkapan data pribadi Anda, tujuan yang kami gunakan untuk
                memproses data pribadi Anda dan apakah kita dapat mencapai
                tujuan tersebut melalui cara lain, dan persyaratan hukum yang
                berlaku.
              </p>

              <p class="ml-2">
                Jika tidak ada aktivitas di akun Anda untuk jangka waktu lebih
                lama dari 24 bulan, kami akan menghapus akun Anda termasuk semua
                data pribadi yang tersimpan di akun Anda yang berarti bahwa Anda
                tidak akan lagi dapat mengakses dan menggunakannya.
              </p>

              <p class="ml-2">
                Jika Anda memiliki pertanyaan terkait periode retensi data Anda,
                silakan hubungi kami di suport@SiMotor.id
              </p>

              <p class="ml-3 font-weight-bold">
                8.1 Tindakan teknis dan organisasi & pemrosesan keamanan
              </p>

              <p class="ml-3">
                Semua informasi yang kami terima tentang Anda disimpan di server
                aman dan kami telah menerapkan langkah‐langkah teknis dan
                organisasi yang sesuai dan diperlukan untuk melindungi data
                pribadi Anda. SiMotor terus mengevaluasi keamanan jaringannya
                dan kecukupan program keamanan informasi internalnya yang
                dirancang untuk (a) membantu mengamankan data Anda dari
                kehilangan, akses atau pengungkapan yang tidak disengaja atau
                melanggar hukum, (b) mengidentifikasi risiko yang dapat diduga
                secara wajar terhadap keamanan SiMotor jaringan, dan (c)
                meminimalkan risiko keamanan, termasuk melalui penilaian risiko
                dan pengujian rutin. Selain itu, kami memastikan bahwa semua
                data pembayaran dienkripsi menggunakan teknologi SSL.
              </p>

              <p class="ml-3">
                Harap dicatat, meskipun kami telah melakukan langkah‐langkah
                yang kami terapkan untuk melindungi data Anda, transfer data
                melalui Internet atau jaringan terbuka lainnya tidak pernah
                sepenuhnya aman dan ada risiko bahwa data pribadi Anda dapat
                diakses oleh pihak ketiga yang tidak sah.
              </p>

              <p class="ml-3 font-weight-bold">
                8.2 Tautan ke situs web pihak ketiga
              </p>

              <p class="ml-3">
                Platform kami mungkin berisi tautan ke situs web atau aplikasi
                pihak ketiga. Jika Anda mengklik salah satu tautan ini, harap
                diperhatikan bahwa masing‐masing akan memiliki kebijakan
                privasinya sendiri. Kami tidak mengontrol situs web / aplikasi
                seperti ini dan tidak bertanggung jawab atas kebijakan tersebut.
                Ketika Anda meninggalkan Platform kami, kami mendorong Anda
                untuk membaca pemberitahuan privasi dari setiap situs web yang
                Anda kunjungi.
              </p>

              <p class="ml-3 font-weight-bold">8.3 Kontak</p>

              <p class="ml-3">
                Untuk informasi tambahan apa pun atau untuk menggunakan hak
                Anda, silakan hubungi Kantor Privasi kami di Ruko Sentra
                Komersil (Rsk) Blok 7/96 Grand Galaxy City, Kelurahan Jakasetia,
                Kecamatan Bekasi Selatan, Kota Bekasi, Jawa Barat atau melalui
                Bagian Bantuan di Platform kami. Anda juga dapat secara
                alternatif menghubungi pengelola Data untuk layanan lokal Anda
                di support@SiMotor.id.
              </p>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="videotutorial">
          <v-card flat align="center">
            <v-card-title class="d-flex justify-center">
              Video Tutorial Penggunaan Aplikasi
            </v-card-title>

            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/wN3mLU22NAo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-card>
        </v-tab-item>

        <v-tab-item value="panduanpembeli">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Panduan Pembeli
            </v-card-title>

            <v-container class="text-justify">
              <p>
                Panduan Penggunaan bertujuan untuk memudahkan pengguna dalam
                menggunakan aplikasi SiMotor. Panduan penggunaan terdiri dari
                dua (2) yaitu panduan penggunaan aplikasi SiMotor untuk Pembeli
                dan panduan penggunaan aplikasi SiMotor untuk penjual.
              </p>

              <p class="font-weight-bold h4">
                Panduan Penggunaan Aplikasi SiMotor ‘Sebagai Pembeli’
              </p>

              <p>
                <a
                  href="/img/Panduan Penggunaan Aplikasi SiMotor PEMBELI ver1-6-0.pdf"
                  download
                >
                  Download disini
                </a>
              </p>

              <p class="font-weight-bold h6">Video Tutorial SiMotor</p>

              <p>
                <a
                  href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA/videos"
                  target="_blank"
                >
                  Klik disini
                </a>
              </p>
              <p class="font-weight-bold">1. PENDAFTARAN</p>

              <p class="ml-3">1.1. Pendaftaran via nomor handphone (HP).</p>

              <p class="ml-4">
                1.1.1. Pada halaman Login & Sign Up, pilih tab Sign Up
              </p>

              <p class="ml-4">
                1.1.2. Masukkan nama lengkap & nomor HP, lalu klik “Daftar”,
                Anda akan menerima kode OTP (One Time Password) melalui SMS
              </p>

              <p class="ml-4">1.1.3. Masukkan kode OTP yang Anda terima</p>

              <p class="ml-4">
                1.1.4. Jika kode OTP benar, maka Anda akan masuk ke menu halaman
                utama
              </p>

              <v-img src="/img/pembeli1.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="font-weight-bold">2. LOGIN</p>

              <p class="font-weight-bold">
                2.1. Login via nomor handphone (HP)
              </p>

              <p class="ml-4">
                2.1.1. Pada halaman Login & Sign Up, pilih tab Login
              </p>

              <p class="ml-4">2.1.2. Masukkan nomor HP Anda</p>

              <p class="ml-4">2.1.3. Masukan kode OTP yang Anda terima</p>

              <p class="ml-4">
                2.1.4 Jika kode OTP benar, maka Anda akan masuk ke menu halaman
                utama
              </p>

              <p class="ml-2">
                Catatan : Jika nomor Anda belum pernah terdaftar di aplikasi
                SiMotor, maka akan ada pemberitahuan bahwa Anda harus mendaftar
                terlebih dahulu.
              </p>

              <v-img src="/img/pembeli2.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3 font-weight-bold">2.2. Login via email (Gmail)</p>

              <p class="ml-4">
                2.2.1. Pada halaman Login & Sign Up, pilih tab Login
              </p>

              <p class="ml-4">
                2.2.2. Klik button Google yang ada dibawah tab nomor handphone
              </p>

              <p class="ml-4">
                2.2.3. Pilih email yang akan Anda daftarkan untuk SiMotor
              </p>

              <p class="ml-4">
                2.2.4 Jika berhasil, Anda akan masuk ke menu halaman utama
              </p>

              <v-img src="/img/pembeli3.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-2 font-weight-bold">3. PENELUSURAN IKLAN</p>

              <p class="ml-2">
                Anda bisa menelusuri iklan motor yang dijual dengan 2 cara:
              </p>

              <p class="ml-3">3.1. Menelusuri iklan dari halaman utama</p>

              <p class="ml-4">
                Gulung/ scroll ke bawah untuk melihat iklan apa saja yang
                terdapat dalam aplikasi SiMotor, Anda dapat meliat rekomendasi
                untuk iklan motor baru, motor bekas terdekat dan iklan motor
                yang dijual melalui metode Tawar Bersama yang sedang berlangsung
              </p>

              <v-img src="/img/pembeli4.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">
                3.2. Menelusuri iklan dengan menggunakan bar ‘Cari’
              </p>

              <p class="ml-4">
                Ketikkan kata kunci yang ingin Anda cari (contoh: merek motor/
                nama penjual)
              </p>

              <v-img src="/img/pembeli5.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">
                3.3. Menelusuri iklan dengan menggunakan filter lanjutan
              </p>

              <p class="ml-4">
                3.3.1. Buka menu halaman utama dan klik menu ‘Motor Bekas’
              </p>

              <p class="ml-4">
                3.3.2. Klik tombol dengan ikon filter di pojok kanan atas
              </p>

              <p class="ml-4">
                3.3.3. Pilih tombol tipe iklan yang ingin difilter, misalnya
                "Tawar Bersama"
              </p>

              <p class="ml-4">
                3.3.4. Klik tombol ‘Simpan’ untuk menerapkan filter
              </p>

              <v-img src="/img/pembeli6.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-4">
                3.3.5. Jika Anda kemudian ingin memfilter lebih lanjut lagi
                untuk melihat hanya nama penjual tertentu atau kata kunci
                tertentu yang terdapat di dalam judul/ deskripsi iklan, maka
                Anda bisa mengetikkannya pada kotak ‘Cari’ setelah filter
                diterapkan.
              </p>

              <p class="ml-2font-weight-bold">4. BERINTERAKSI DENGAN IKLAN</p>

              <p class="ml-3">
                Ketika Anda tertarik dengan sebuah iklan, maka langkah
                selanjutnya adalah sebagai berikut:
              </p>

              <p class="ml-3">4.1. Interaksi dengan iklan Harga Pas</p>

              <p class="ml-4">
                4.1.1. Pilih salah satu iklan Harga Pas yang ingin lihat
              </p>

              <p class="ml-4">
                4.1.2. Setelah detail iklan tersebut ditampilkan, Anda dapat
                memilih cara untuk menghubungi penjualnya
              </p>

              <p class="ml-4">
                4.1.3. Pilihan menghubungi penjualnya adalah dengan cara Chat/
                Telepon/ SMS/ Whatsapp
              </p>

              <v-img src="/img/pembeli7.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">
                4.2. Interaksi dengan iklan Tawar Bersama (TB) yang sedang
                berlangsung
              </p>

              <p class="ml-4">4.2.1. Pilih iklan TB yang ingin Anda ikuti.</p>

              <p class="ml-4">4.2.2. Tinjau detail iklan tersebut.</p>

              <p class="ml-4">
                4.2.3. Jika Anda ingin mengikuti sesi penawaran pada iklan TB
                tersebut, klik tombol di bawahnya berlabel ‘Ikut Tawar Bersama’.
              </p>

              <p class="ml-4">
                4.2.4. Jika Anda tidak memiliki Tiket, Anda hanya bisa memasang
                penawaran pada iklan TB yang tidak ada syarat penggunaan Tiket.
                Anda bisa membeli tiket di Menu ‘Tiket Tawar Bersama’
              </p>

              <v-img src="/img/pembeli8.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-4">
                4.2.5. Setelah Tiket Anda berhasil digunakan, masukkan nominal
                bidding yang ingin Anda tawar dengan menekan tombol + / -
                sebanyak yang Anda inginkan dengan kelipatan nominal yang
                ditentukan di iklan TB tersebut.
              </p>

              <p class="ml-4">
                4.2.6. Klik tombol ‘Konfirmasi Penawaran’ untuk memasukkan
                penawaran Anda.
              </p>

              <p class="ml-4">
                4.2.7. Jika penawaran Anda berhasil masuk, maka nominal
                penawaran Anda akan muncul pada daftar penawaran di posisi
                paling atas.
              </p>

              <p class="ml-4">
                4.2.8. Jika ada penawar lain yang memasukkan penawaran yang
                lebih tinggi, maka penawaran Anda akan otomatis turun ke bawah
                dan Anda akan menerima pemberitahuan.
              </p>

              <p class="ml-4">
                4.2.9. Jika Anda ingin mengubah posisi penawaran Anda kembali ke
                atas, Anda bisa memasukkan penawaran yang lebih tinggi seperti
                pada langkah 4.2.5 & 4.2.6 di atas.
              </p>

              <p class="ml-4">
                4.2.10. Begitu seterusnya sampai periode iklan TB selesai sesuai
                waktu yang ditentukan.
              </p>

              <p class="ml-4">
                4.2.11. Jika penawaran Anda berada di posisi paling atas pada
                daftar penawaran, maka Anda akan menerima pesan otomatis oleh
                penjual di menu Chat.
              </p>

              <p class="ml-4">
                4.2.12. Berikutnya Anda bisa berkomunikasi melalui fitur chat
                dengan penjual untuk mengonformasi penyelesaian transaksi
                pembeliannya.
              </p>

              <p class="ml-4">
                4.2.13. Anda diberi waktu 3 x 24 jam untuk melakukan pembayaran
                dan mengunggah bukti pembayaran.
              </p>

              <p class="ml-4">
                4.2.14. Penjual akan mengonfirmasi bukti pembayaran yang Anda
                unggah.
              </p>

              <p class="ml-4">
                4.2.15. Setelah waktu 3 x 24 jam berakhir, Tiket yang Anda
                gunakan pada iklan TB ini akan kembali ke stok Tiket Anda.
              </p>

              <p class="ml-4">
                4.2.16. Jika Anda tidak mengunggah bukti pembayaran, maka
                pembelian Anda dianggap batal dan Tiket yang Anda gunakan pada
                iklan TB ini akan menjadi hangus.
              </p>

              <v-img src="/img/pembeli9.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-2 font-weight-bold">5. TIKET</p>

              <p class="ml-3 font-weight-bold">5.1. Cara Membeli Tiket</p>

              <p class="ml-4">
                5.1.1 Klik Menu ‘Tiket Tawar Bersama’ di halaman utama
              </p>

              <p class="ml-4">5.1.2. Klik tombol ‘Beli Tiket’</p>

              <p class="ml-4">
                5.1.3 Klik tombol jumlah tiket atau ketikkan angka jumlah tiket
                yang ingin Anda beli
              </p>

              <p class="ml-4">5.1.4. Klik tombol ‘Lanjutkan’ ke pembayaran</p>

              <v-img src="/img/pembeli10.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-4">
                5.1.5 Tinjau detail transaksi pembayaran tiket Anda dan lakukan
                pembayaran.
              </p>

              <p class="ml-4">
                5.1.6 Setelah melakukan pembayaran, silakan unggah bukti
                pembayaran tiket di aplikasi SiMotor dan menunggu verifikasi
                tiket oleh admin SiMotor.
              </p>

              <p class="ml-4">
                5.1.7 Setelah diverifikasi oleh admin SiMotor, lalu stok tiket
                Anda akan bertambah di halaman tiket Tawar Bersama Anda.
              </p>

              <v-img src="/img/pembeli11.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3 font-weight-bold">5.2. Cara Refund Tiket</p>

              <p class="ml-4">
                5.2.1 Buka menu Tiket Tawar Bersama yang ada di Halaman utama
              </p>

              <p class="ml-4">5.2.2. Klik tombol ‘Refund Tiket”</p>

              <p class="ml-4">
                5.2.3 Klik tombol jumlah tiket atau ketikkan angka jumlah tiket
                yang ingin Anda Refund
              </p>

              <v-img src="/img/pembeli12.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-4">
                5.2.4 Pilih/ tambah baru rekening bank yang menjadi tujuan
                pengembalian dana refund tiket.
              </p>

              <p class="ml-4">5.2.5. Klik tombol ‘Refund’.</p>

              <p class="ml-4">
                5.2.6 Setelah diverifikasi oleh Admin SiMotor, uang akan masuk
                ke rekening Anda ± 2 hari kerja.
              </p>

              <v-img src="/img/pembeli13.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">5.3 Cara Mencari Iklan Dengan Barcode</p>

              <p class="ml-4 d-flex align-center">
                5.3.1 Buka halaman utama, lalu klik gambar
                <img src="/img/barcode.jpg" width="30" />
              </p>

              <p class="ml-4">
                5.3.2 Muncul scan dan persiapkan barcode yang ingin dicari
                iklannya
              </p>

              <p class="ml-4">5.3.3 Anda akan berada di Iklan yang anda cari</p>

              <v-img src="/img/pembeli14.webp" width="600" contain></v-img>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="panduanpenjual">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Panduan Penjual
            </v-card-title>

            <v-container class="text-justify">
              <p>
                Penggunaan bertujuan untuk memudahkan pengguna dalam menggunakan
                aplikasi SiMotor. Panduan penggunaan terdiri dari dua (2) yaitu
                panduan penggunaan aplikasi SiMotor untuk Pembeli dan panduan
                penggunaan aplikasi SiMotor untuk penjual.
              </p>

              <p class="font-weight-bold h4">
                Panduan Penggunaan Aplikasi SiMotor ‘Sebagai Penjual’
              </p>

              <p>
                <a
                  href="/img/Panduan Penggunaan Aplikasi SiMotor PENJUAL ver1-6-0.pdf"
                  download
                >
                  Download disini
                </a>
              </p>

              <p class="font-weight-bold h6">Video Tutorial SiMotor</p>

              <p>
                <a
                  href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA/videos"
                  target="_blank"
                >
                  Klik disini
                </a>
              </p>

              <p class="ml-2font-weight-bold">1. PENDAFTARAN</p>

              <p class="ml-3">1.1. Pendaftaran via nomor handphone (HP).</p>

              <p class="ml-4">
                1.1.1. Pada halaman Login & Sign Up, pilih tab Sign Up
              </p>

              <p class="ml-4">
                1.1.2. Masukkan nama lengkap & nomor HP, lalu klik “Daftar”,
                Anda akan menerima kode OTP (One Time Password) melalui SMS
              </p>

              <p class="ml-4">1.1.3. Masukkan kode OTP yang Anda terima</p>

              <p class="ml-4">
                1.1.4. Jika kode OTP benar, maka Anda akan masuk ke menu halaman
                utama
              </p>

              <v-img src="/img/penjual1.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-2font-weight-bold">2. LOGIN</p>

              <p class="ml-3 font-weight-bold">
                2.1. Login via nomor handphone (HP)
              </p>

              <p class="ml-4">
                2.1.1. Pada halaman Login & Sign Up, pilih tab Login
              </p>

              <p class="ml-4">2.1.2. Masukkan nomor HP Anda</p>

              <p class="ml-4">2.1.3. Masukan kode OTP yang Anda terima</p>

              <p class="ml-4">
                2.1.4 Jika kode OTP benar, maka Anda akan masuk ke menu halaman
                utama
              </p>

              <p class="ml-2">
                Catatan : Jika nomor Anda belum pernah terdaftar di aplikasi
                SiMotor, maka akan ada pemberitahuan bahwa Anda harus mendaftar
                terlebih dahulu.
              </p>

              <v-img src="/img/penjual2.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3 font-weight-bold">2.2. Login via email (Gmail)</p>

              <p class="ml-4">
                2.2.1. Pada halaman Login & Sign Up, pilih tab Login
              </p>

              <p class="ml-4">
                2.2.2. Klik button Google yang ada dibawah tab nomor handphone
              </p>

              <p class="ml-4">
                2.2.3. Pilih email yang akan Anda daftarkan untuk SiMotor
              </p>

              <p class="ml-4">
                2.2.4 Jika berhasil, Anda akan masuk ke menu halaman utama
              </p>

              <v-img src="/img/pembeli3.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-2 font-weight-bold">3. TAMBAH UNIT</p>

              <p class="ml-3">3.1. Masuk ke halaman utama</p>

              <p class="ml-3">
                3.2. Klik tombol + (Tambah) di bar navigasi bagian bawah
              </p>

              <p class="ml-3">
                3.3. Klik ‘Tambah Unit’ untuk memasukkan data unit motor ke
                garasi Anda di aplikasi SiMotor
              </p>

              <v-img src="/img/penjual2.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">
                3.4. Pilih merk motor, tahun motor dan tipe motor, klik tombol
                ‘Selanjutnya’ untuk masuk ke langkah berikutnya
              </p>

              <p class="ml-3">
                3.6. Isi detail motor seperti warna, odometer, kapasitas mesin,
                transmisi dan sebagainya
              </p>

              <v-img src="/img/penjual3.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">
                3.7. Setelah semua detail terisi, Anda bisa klik tombol ‘Simpan’
              </p>

              <p class="ml-3">
                3.8. Setelah unit berhasil disimpan ke garasi, Anda harus
                menunggu proses moderasi oleh Admin SiMotor
              </p>

              <p class="ml-3">
                3.9. Jika sudah berhasil dimoderasi oleh admin, status unit akan
                berubah menjadi tersedia dan akan ada pemberitahuan bahwa unit
                Anda telah tersedia di garasi dan sudah bisa untuk diiklankan
                Gambar 19. Klik tombol simpan Gambar 20. Proses moderasi Gambar
                21. Unit tersedia diiklankan Catatan: Dalam proses moderasi,
                unit akan ditolak apabila gambar dianggap tidak sesuai dengan
                syarat dan ketentuan Aplikasi
              </p>

              <v-img src="/img/penjual4.webp" width="600" contain></v-img>

              <p class="ml-3">
                Catatan: Dalam proses moderasi, unit akan ditolak apabila gambar
                dianggap tidak sesuai dengan syarat dan ketentuan Aplikasi
                SiMotor
              </p>

              <br />

              <br />

              <p class="ml-2 font-weight-bold">4. Tambah Iklan</p>

              <p class="ml-3">4.1. Tambah Iklan Harga Pas</p>

              <p class="ml-4">
                4.1.1. Buka menu Halaman utama, lalu klik tombol + (Tambah) di
                bar navigasi bagian bawah
              </p>

              <p class="ml-4">
                4.1.2. Klik ‘Tambah Iklan’ untuk mengiklankan unit motor yang
                tersedia di garasi Anda
              </p>

              <p class="ml-4">
                4.1.3. Pilih Jenis Iklan ‘Harga Pas’ untuk melanjutkan ke
                langkah berikutnya
              </p>

              <v-img src="/img/penjual5.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-4">
                4.1.4. Pilih unit Motor dari garasi Anda yang ingin diiklankan
              </p>

              <p class="ml-4">
                4.1.5. Isi data iklan motor seperti Judul Iklan, Deskripsi
                Iklan, dan Harga yang ingin ditawarkan, kemudian klik tombol
                ‘Iklankan’
              </p>

              <v-img src="/img/penjual6.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-3">4.2. Tambah Iklan Tawar Bersama</p>

              <p class="ml-4">
                4.2.1. Buka Halaman utama, Klik tombol + (Tambah) di bar
                navigasi bagian bawah
              </p>

              <p class="ml-4">
                4.2.2. Klik ‘Tambah Iklan’ untuk mengiklankan unit motor yang
                tersedia di garasi Anda
              </p>

              <p class="ml-4">
                4.2.3. Pilih jenis iklan Tawar Bersama Satuan atau Tawar Bersama
                Paketan
              </p>

              <v-img src="/img/penjual7-1.webp" width="600" contain></v-img>

              <br />

              <br />

              <p class="ml-4">
                4.2.4. Pilih unit Motor yang ingin Anda iklankan
              </p>

              <p class="ml-4">
                4.2.5. Isi data-data motor seperti Judul Iklan, Deskripsi Iklan,
                Informasi Harga, Kelipatan Tawar dan jadwal sesi Tawar Bersama
                akan dilangsungkan. Lalu kli tombol ‘Iklankan’
              </p>

              <p class="ml-4">
                4.2.6. Setelah itu, iklan akan bisa dilihat di tab iklan pada
                menu Akun Anda
              </p>

              <v-img src="/img/penjual7.webp" width="600" contain></v-img>

              <v-img src="/img/penjual8.webp" width="600" contain></v-img>

              <p class="ml-4 font-weight-bold">Catatan:</p>

              <p class="ml-4">- Anda bisa memilih kelipatan tawar</p>

              <p class="ml-4">
                - Anda bisa menentukan apakah para penawar iklan Anda memerlukan
                tiket atau tidak (Gambar 31)
              </p>

              <p class="ml-4">
                - Pada Tawar Bersama Paketan, Anda bisa memilih unit mana yang
                akan dijadikan gambar utama (thumbnail)
              </p>

              <p class="ml-4">
                - Ketika sesi Tawar Bersama berakhir, penawar yang berada pada
                urutan paling atas dalam daftar penawaran akan menerima pesan
                otomatis dari Anda yang bisa Anda atur di pengaturan
              </p>

              <p class="ml-2 font-weight-bold">5. Menu Aktivitas</p>

              <p class="ml-3 font-weight-bold">
                5.1. Buka halaman utama, Klik tombol Aktivitas di bar navigasi
                bagian bawah
              </p>

              <p class="ml-3">
                5.2. Klik tombol tab ‘Iklan Anda’ untuk melihat iklan apa saja
                yang sudah pernah Anda buat baik itu iklan Tawar Bersama maupun
                iklan Harga Pas (pilih salah satu)
              </p>

              <v-img src="/img/penjual9.webp" width="600" contain></v-img>

              <p class="ml-2font-weight-bold">6. PENGATURAN</p>

              <p class="ml-3 font-weight-bold">
                6.1. Cara tambah rekening baru
              </p>

              <p class="ml-4">
                6.1.1. Buka halaman utama, lalu klik tombol ‘Akun’ di bar
                navigasi bagian bawah
              </p>

              <p class="ml-4">
                6.1.2. Klik tombol Pengaturan di pojok kanan atas
              </p>

              <p class="ml-4">6.1.3. Klik ‘Rekening Bank’</p>

              <p class="ml-4">
                6.1.4. Akan tampil daftar nama dan nomor rekening Anda
              </p>

              <p class="ml-4">
                6.1.5. Klik tombol ‘Tambah’ di pojok kanan atas untuk menambah
                rekening baru
              </p>

              <p class="ml-4">
                6.1.6. Setelah itu pilih nama bank, ketik nama rekening dan
                nomor rekening
              </p>

              <p class="ml-4">6.1.7. Klik tombol ‘tambah’</p>

              <p class="ml-4">
                6.1.8. Anda berhasil menambah rekening bank yang baru
              </p>

              <p class="ml-3 font-weight-bold">
                6.2. Cara membuat Pesan Otomatis yang akan dikirimkan kepada
                pembeli yang berada di urutan paling atas pada daftar penawaran
                dalam sesi Tawar Bersama
              </p>

              <p class="ml-4">
                6.2.1. Buka halaman utama, lalu klik tombol ‘Akun’ di bar
                navigasi bagian bawah
              </p>

              <p class="ml-4">
                6.2.2. Klik tombol pengaturan di pojok kanan atas
              </p>

              <p class="ml-4">6.2.3. Klik ‘Chat Otomatis’</p>

              <p class="ml-4">
                6.2.4. Ketik pesan yang Anda inginkan contoh ‘Selamat kamu telah
                menang Tawar Bersama. Silakan hubungi kami di nomor
                +628111873434’
              </p>

              <p class="ml-4">
                6.2.5. Klik tombol simpan dan Anda telah berhasil menambah chat
                otomatis
              </p>

              <v-img src="/img/penjual10.webp" width="600" contain></v-img>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="kodeetik">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Kode Etik Pengguna
            </v-card-title>

            <v-container fluid>
              <p class="ml-2">
                SiMotor mempunyai kewajiban untuk menjalankan bisnisnya sesuai
                peraturan, undang-undang dan hukum yang berlaku. Kami
                berkomitmen membantu semua Pengguna agar bertindak demi
                terciptanya kepercayaan dan rasa hormat. Kode etik ini
                dimaksudkan sebagai panduan untuk menggunakan Layanan kami baik
                dalam bentuk Aplikasi atau pun Situs SiMotor dengan benar dan
                harus diikuti setiap waktu. Kode etik ini juga bagian yang tak
                terpisahkan dari Syarat dan Ketentuan Layanan SiMotor.
                Pelanggaran Kode Etik ini ditangani sesuai dengan Kebijakan
                Pelanggaran kami yang akan mengakibatkan tindakan pendisiplinan,
                hingga ke, dan termasuk, penutupan akun. Setiap pertanyaan
                mengenai Kode ini harus ditujukan ke Tim Dukungan SiMotor dengan
                mengirimkan email ke support@simotor.id dimana kami bisa
                memberikan Anda informasi tambahan mengenai prosedur yang benar
                untuk diikuti, dan mengatasi setiap permasalahan Anda yang
                berkaitan dengan layanan kami.
              </p>

              <p class="ml-3 font-weight-bold">1. Perilaku Pribadi</p>

              <p class="ml-4">
                1.1 Saya akan bertindak secara etis dan dengan integritas.
              </p>

              <p class="ml-4">
                1.2 Saya akan mematuhi semua kebijakan SiMotor.
              </p>

              <p class="ml-4">1.3 Saya akan menghormati hak semua Pengguna.</p>

              <p class="ml-4">
                1.4 Saya tidak akan menyalahgunakan informasi rahasia, atau
                berpartisipasi dalam praktek ilegal lainnya.
              </p>

              <p class="ml-4">
                1.5 Saya tidak akan melecehkan, menggertak atau mendiskriminasi.
              </p>

              <p class="ml-4">
                1.6 Saya tidak akan memalsukan identitas saya sendiri atau orang
                lain dan saya akan memberikan informasi yang benar dan akurat.
              </p>

              <p class="ml-4">
                1.7 Saya tidak akan mengajukan penawaran pada iklan yang tidak
                mampu saya beli.
              </p>

              <p class="ml-4">
                1.8 Saya tidak akan meminta rilis Pembayaran Tanda Jadi di muka
                sebelum saya mengirim pekerjaan.
              </p>

              <p class="ml-3 font-weight-bold">2. Konten Pengguna</p>

              <p class="ml-3 font-weight-bold">
                Saya bertanggung jawab atas konten yang saya posting di SiMotor
                dan:
              </p>

              <p class="ml-4">
                2.1 Saya tidak akan mengirim konten yang melanggar hak cipta
                atau hak kekayaan intelektual orang lain;
              </p>

              <p class="ml-4">
                2.2 Saya tidak akan mengirimkan konten yang melanggar hukum atau
                peraturan apapun;
              </p>

              <p class="ml-4">
                2.3 Saya tidak akan mengirimkan konten yang memfitnah;
              </p>

              <p class="ml-4">
                2.4 Saya tidak akan mengirimkan konten yang tidak senonoh atau
                mengandung pornografi anak;
              </p>

              <p class="ml-4">
                2.5 Saya tidak akan mengirim konten yang termasuk informasi yang
                setengah-setengah, palsu atau tidak akurat tentang siapa pun,
                produk apa pun atau jasa apa pun;
              </p>

              <p class="ml-4">
                2.6 Saya tidak akan mengirimkan konten yang mengandung virus
                atau rutin program apapun yang bertujuan merusak sistem;
              </p>

              <p class="ml-4">
                2.7 Saya tidak akan mengirim konten yang membuat SiMotor
                menanggung atau membahayakan operasi bisnis atau reputasinya.
              </p>

              <p class="ml-3 font-weight-bold">3. Kerahasiaan</p>

              <p class="ml-4">
                3.1 Saya akan menghormati kerahasiaan dan privasi yang diatur
                dalam SiMotor.
              </p>

              <p class="ml-4">
                3.2 Saya tidak akan mengungkapkan informasi atau dokumen yang
                saya dapatkan, selain yang diperlukan oleh hukum atau dimana
                otorisasi diberikan oleh SiMotor.
              </p>

              <p class="ml-3 font-weight-bold">4. Kontak</p>

              <p class="ml-4">
                4.1 Saya tidak akan meminta pengguna SiMotor lain memberikan
                rincian kontak mereka dan hanya akan berkomunikasi dengan mereka
                melalui fitur obrolan (chat) yang resmi yang disediakan oleh
                SiMotor.
              </p>

              <p class="ml-4">
                4.2 Saya tidak akan mengumpulkan nama-nama dari milis, email
                grup, dll untuk mengirimkan email-email yang tidak dikehendaki
                ("Spam").
              </p>

              <p class="ml-3 font-weight-bold">5. Penipuan</p>

              <p class="ml-4">5.1 Saya tidak akan terlibat dalam penipuan.</p>

              <p class="ml-4">5.2 Saya tidak akan membuat akun-akun ganda.</p>

              <p class="ml-4">
                5.3 Saya tidak akan menggunakan Situs ini untuk mentransfer dana
                secara ilegal.
              </p>

              <p class="ml-4">
                5.4 Saya tidak akan menggunakan Situs untuk membuat umpan balik
                palsu tentang siapa pun, produk atau layanan apa pun.
              </p>

              <p class="ml-3 font-weight-bold">6. Komunikasi</p>

              <p class="ml-4">
                6.1 Saya akan menghindari komentar yang berlebihan, menghina,
                dan referensi yang tidak pantas.
              </p>

              <p class="ml-4">
                6.2 Saya tidak akan terlibat dalam menyinggung pribadi,
                mengkritik negatif atau lainnya yang tidak adil, dan melakukan
                tindakan tidak profesional apapun.
              </p>

              <p class="ml-3 font-weight-bold">7. Menawar</p>

              <p class="ml-4">
                7.1 Saya tidak akan menawar lebih murah dari apa yang sudah
                ditentukan dalam sistem tawar bersama.
              </p>

              <p class="ml-4">
                7.2 Saya tidak akan berpartisipasi dalam iklan-iklan yang
                melibatkan perilaku ilegal.
              </p>

              <p class="ml-4">
                7.3 Saya hanya akan menawar pada iklan yang saya perkirakan bisa
                saya bayar lunas.
              </p>

              <p class="ml-3 font-weight-bold">8. Spam atau Iklan</p>

              <p class="ml-4">
                Saya tidak akan mengirim spam atau iklan situs web atau jasa
                saya kecuali yang sudah diizinkan dan ditentukan SiMotor.
              </p>

              <p class="ml-3 font-weight-bold">9. Pembayaran</p>

              <p class="ml-4">
                Saya tidak akan menggunakan SiMotor untuk memfasilitasi
                pertukaran uang termasuk, namun tidak terbatas pada, mata uang
                digital (seperti bitcoin, ethereum, dll.)
              </p>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="autotawar">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Auto Tawar
            </v-card-title>

            <v-container class="text-justify">
              <p class="font-weight-bold">Persyaratan Auto Tawar</p>

              <p>
                1. Anda tetap dapat menawar secara manual saat
                mengaktifkan/menonaktifkan fitur Auto Tawar.
              </p>

              <p>2. Auto Tawar tidak menjamin Anda menang.</p>

              <p>
                3. Auto Tawar hanya mempermudah Anda untuk melakukan penawaran
                secara otomatis tanpa harus membuka aplikasi.
              </p>

              <p class="font-weight-bold">
                Persyaratan Mengaktifkan dan Menonaktifkan Auto Tawar:
              </p>

              <p>1. Mengaktifkan Auto Tawar</p>

              <p class="ml-4">
                a. Menyetujui persyaratan & ketentuan Tawar Bersama
              </p>

              <p class="ml-4">
                b. Sudah terdaftar sebagai peserta di Iklan Tawar Bersama yang
                akan menggunakan fitur Auto Tawar
              </p>

              <p>2. Menonaktifkan Auto Tawar</p>

              <p class="ml-4">
                a. Menyetujui persyaratan & ketentuan Tawar Bersama
              </p>

              <p class="ml-4">b. 2 (dua) kali pelanggaran:</p>

              <p class="font-weight-bold">
                Persyaratan Nilai Maksimum Nominal Auto Tawar:
              </p>

              <p>
                1. Nominal maksimum auto tawar harus lebih besar dari nominal
                tawaran saat ini/tawaran berlangsung.
              </p>

              <p>
                2. Nominal maksimum auto tawar sesuai dengan harga kelipatan
                pada iklan yang Anda inginkan.
              </p>

              <p class="ml-4 font-weight-bold">Contoh sebagai berikut:</p>

              <p class="ml-4 font-weight-bold">
                (<span class="red--text"> Rp 2.000.000 </span> )+ (
                <span class="blue--text"> Rp 50.000 </span> *
                <span class="green--text"> 2</span> ) = Rp. 2.100.000
              </p>

              <p class="ml-4 font-weight-bold">Ket Warna:</p>

              <p class="ml-4">Merah : Harga Iklan Tawar Bersama saat ini</p>

              <p class="ml-4">Biru : Harga kelipatan Iklan Tawar Bersama</p>

              <p class="ml-4">Hijau : Berapa kali auto tawar yang diinginkan</p>

              <p class="ml-4">
                Maka nominal maksimum auto tawar adalah
                <b> Rp. 2.100.000 </b>
              </p>

              <p class="font-weight-bold">Cara kerja Fitur Auto Tawar:</p>

              <p class="ml-4">
                1. Masukan maksimum nominal Auto Tawar yang Anda tentukan dan
                aktifkan.
              </p>

              <p class="ml-4">
                2. Sistem Auto Tawar akan melakukan tawaran atas nama Anda
                secara otomatis (ditandai dengan warna orange pada tampilan
                penawar).
              </p>

              <p class="ml-4">
                3. Sistem Auto Tawar melakukan penawaran dengan harga kelipatan
                minimal 1 (satu) kali kelipatan dan maksimal 3 (tiga) kali
                kelipatan di atas harga awal / tawaran saat ini dan di bawah
                harga maksimum nominal Auto Tawar Anda.
              </p>

              <p class="font-weight-bold">Contoh Proses Auto Tawar:</p>

              <ul>
                <li>
                  Harga Awal / Harga saat ini Iklan Tawar Bersama = Rp. 500.000
                </li>

                <li>Harga Kelipatan = Rp 100.000</li>

                <li>
                  Total Penawar yang menggunakan Auto Tawar = 3 (pengguna A, B,
                  C)
                </li>

                <li>Maksimum nominal auto tawar:</li>
              </ul>

              <p class="ml-4">1. A = Rp 1.000.000</p>

              <p class="ml-4">2. B = Rp 1.000.000</p>

              <p class="ml-4">3. C = Rp 900.000</p>

              <p class="ml-3">
                Dalam kondisi ini penawaran A, B, C dilakukan oleh Auto Tawar
              </p>

              <ul>
                <li>B melakukan tawaran Rp 600.000</li>

                <li>
                  Pengguna C (secara acak dipilih oleh Auto Tawar pengguna A dan
                  C) melakukan penawaran Rp 800.000 (Min. 1 kali kelipatan,
                  Maks. 3 kali kelipatan)
                </li>

                <li>
                  Pengguna B (secara acak dipilih oleh Auto Tawar pengguna B dan
                  A) melakukan penawaran Rp 900.000 (Min. 1 kali kelipatan,
                  Maks. 3 kali kelipatan)
                </li>

                <li>
                  Pengguna A (pengguna C tidak dipilih oleh Auto Tawar karena
                  sudah mencapai batas maksimum nominal auto tawar) melakukan
                  penawaran Rp 1.000.000 (Min. 1 kali kelipatan, Maks. 3 kali
                  kelipatan)
                </li>

                <li>
                  Jika waktu Iklan Tawar Bersama berakhir, maka pemenang Iklan
                  Tawar Bersama tersebut adalah penawar A.
                </li>
              </ul>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="bantuan">
          <v-card flat align="center">
            <v-card-title class="d-flex justify-center">
              <h2>Bantuan</h2>
            </v-card-title>

            <v-container class="text-justify">
              <div align="center">
                Kami disini untuk membantu Anda menggunakan SiMotor dengan lebih
                baik.
              </div>
              <div align="center">
                Kami aktif setiap hari Senin - Jumat, pukul 09.30 - 17.30
              </div>
              <br />
              <v-card align="center" class="d-inline-block mx-auto">
                <v-list>
                  <v-list-item
                    href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA"
                    target="_blank"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-youtube-tv</v-icon>Video Tutorial
                      </v-list-item-title>

                      <v-list-item-subtitle
                        >Video tutorial pemakaian aplikasi
                        SiMotor</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item href="/tentang?tab=panduanpembeli">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-help-circle-outline</v-icon>Panduan
                      </v-list-item-title>

                      <v-list-item-subtitle
                        >Panduan pemakaian aplikasi
                        SiMotor</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item to="/message?id=1">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-message-text</v-icon>Kirim Pesan
                      </v-list-item-title>

                      <v-list-item-subtitle>@SiMotor</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    href="mailto:support@simotor.id?subject=Pengaduan Customer SiMotor &body=Nama: "
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-email</v-icon>Kirim Email Anda
                      </v-list-item-title>

                      <v-list-item-subtitle
                        >support@simotor.id</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item href="tel:02130490087">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-phone</v-icon>Telepon
                      </v-list-item-title>

                      <v-list-item-subtitle
                        >(021)- 65835839</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-instagram</v-icon>Instagram
                      </v-list-item-title>

                      <v-list-item-subtitle>simotor.id</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    href="https://api.whatsapp.com/send?phone=628111873434"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-whatsapp</v-icon>Whatsapp
                      </v-list-item-title>

                      <v-list-item-subtitle>+628111873434</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>mdi-office-building</v-icon>Office
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        Ruko Sentra Komersil (Rsk) Blok 7/96 Grand Galaxy City,
                        Kelurahan Jakasetia, Kecamatan Bekasi Selatan, Kota
                        Bekasi, Jawa Barat
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider class="mx-4 my-2"> </v-divider>
                <nuxt-link to="/">
                  <v-img
                    src="/img/logo_simotor.jpg"
                    width="200"
                    contain
                  ></v-img>
                </nuxt-link>
              </v-card>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item value="highlight">
          <v-card flat>
            <v-card-text class="black--text text--center">
              <b align="center"> Highlight </b>
              <p>
                Highlight adalah fitur yang membuat iklan menggunakan fitur ini
                menjadi lebih terlihat dengan label Highlight, dan berada pada
                posisi tertentu. Dengan menggunakan fitur ini, iklan Anda akan
                mendapatkan lebih banyak respons dibandingkan iklan biasa yang
                tidak menggunakan fitur Highlight.
              </p>
              <b> Sundul Iklan </b>
              <p>
                Sundul iklan adalah sebuah fitur yang menjadikan posisi iklan
                Anda menjadi paling atas seperti iklan baru. Iklan Anda akan
                berangsur pindah ke bawah sejalan dengan iklan baru lainnya yang
                muncul atau ada iklan sundul lain.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tiket">
          <v-card flat>
            <v-card-title class="d-flex justify-center">
              Tiket Tawar Bersama
            </v-card-title>

            <v-container class="text-justify">
              <div class="col-md-10 text-justify white-gradient">
                <p class="font-weight-bold">Pengertian Umum</p>
                <p class="ml-2 ml-lg-2">
                  a. Tiket digunakan sebagai deposit yang dapat Anda tarik
                  kembali (refund).
                </p>
                <p class="ml-2 ml-lg-2">
                  b. Masa kadaluarsa setiap tiket adalah 3 bulan sejak pembelian
                  tiket dikonfirmasi oleh SiMotor.
                </p>
                <p class="ml-2 ml-lg-2">
                  c. Kami sarankan untuk tarik kembali (refund) tiket yang
                  tersedia sebelum mendekati tanggal kadaluarsa.
                </p>
                <p class="ml-2 ml-lg-2">
                  d. Pengajuan tiket atau kepemilikan tiket maksimal adalah 20
                  tiket per akun (total dari tiket tersedia, terpakai dan
                  refund)
                </p>

                <p class="ml-2 ml-lg-2">
                  e. Tiket yang disetujui oleh SiMotor sesuai dengan sisa kuota
                  yang ada di akun Anda.
                </p>
                <p class="ml-2 ml-lg-2 font-weight-bold">
                  Pengertian Pembagian Status Tiket:
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">1. Tersedia</p>

                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang belum terpakai dan dapat digunakan untuk
                  mengikuti Iklan Tawar Bersama yang membutuhkan tiket.
                  (*Pastikan tanggal kadaluarsa tiket tidak melebihi tanggal
                  berakhir Iklan Tawar Bersama)
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">2. Terpakai</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang digunakan untuk Iklan Tawar Bersama.
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">3. Refund</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang sudah ditarik kembali oleh pengguna
                  (*permohonan menunggu pembayaran oleh SiMotor)
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">4. Hangus</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang tidak berlaku lagi dikarenakan melakukan
                  wanprestasi/pembatalan pembelian. Deposit yang disetorkan
                  tidak dapat ditarik kembali.
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">5. Expired</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang tidak berlaku lagi dikarenakan melewati
                  tanggal kedaluarsa. Deposit yang disetorkan tidak dapat
                  ditarik Kembali.
                </p>
              </div>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item value="aksesoris">
          <v-card flat>
            <img src="/img/BannerAS.webp" height="315" width="100%" />
            <v-card-text class="black--text">
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Aksesoris
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Aksesoris motor merupakan perlengkapan yang diberikan atau
                      ditambahkan pada kendaraan motor agar motor lebih baik,
                      aman dan nyaman saat dikendarai. Beberapa contoh Aksesoris
                      Motor yang dapat Anda iklankan di SiMotor adalah Knalpot,
                      Side Box Speaker Klakson, Lampu LED, Fairing, Cover dan
                      lain sebagainya.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Suku Cadang
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Suku Cadang adalah komponen dari mesin yang dicadangkan
                      untuk perbaikan atau penggantian bagian kendaraan yang
                      mengalami kerusakan. Beberapa contoh Suku Cadang yang
                      dapat Anda iklankan di SiMotor adalah Aki Motor, Bearing
                      Motor, Busi Motor, ECU & Kelistrikan Motor, Filter Udara
                      Motor, Kampas Rem, dan lain sebagainya.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
              <template>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="bold">
                      Lainnya
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Di menu lainnya ini Anda bisa mengiklankan perlengkapan
                      mengendarai motor seperti: <br />
                      1. Helm <br />
                      2. Rompi <br />
                      3. Jaket <br />
                      4. Sarung Tangan <br />
                      5. Dan lain sebagainya
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
<Footer />
  </div>
</template>

<script>
export default {
  name: 'bantuan',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
     Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    tab: 'about',
  }),
  created() {
    this.tab = this.$route.query.tab
  },
}
</script>
<style>
.bold {
  font-weight: bold;
  color: black;
}
</style>