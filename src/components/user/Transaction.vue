<template>
  <div class="">
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Riwayat Transaksi</b></p>
              <div class="table-responsive">
                <b-table striped hover :items="transactions" :fields="fields">
                  <template v-slot:cell(action)="data">
                    <b-button
                      size="sm"
                      variant="success"
                      @click="generateReport(data.item.id)"
                      ><i class="mdi mdi-file-document btn-icon-prepend"></i>
                      Ticket</b-button
                    >&ensp; <br />
                    <br />
                    <b-button
                      size="sm"
                      variant="danger"
                      v-on:click="Drop(data.item.id)"
                      class="mdi mdi-cancel"
                    >
                      Cancel</b-button
                    >
                  </template>
                  <template v-slot:cell(price)="data">
                    {{ data.item.transportation.price | currency }}
                  </template>
                  <template v-slot:cell(name)="data">
                    {{ data.item.user.name }}
                  </template>
                  <template v-slot:cell(transportation)="data">
                    {{ data.item.transportation.transportation_name }}
                  </template>
                  <template v-slot:cell(keberangkatan)="data">
                    {{ data.item.transportation.p_depart }}
                  </template>
                  <template v-slot:cell(tujuan)="data">
                    {{ data.item.transportation.p_till }}
                  </template>
                  <template v-slot:cell(departure)="data">
                    {{ data.item.transportation.departure }}
                  </template>
                  <template v-slot:cell(till)="data">
                    {{ data.item.transportation.till }}
                  </template>

                  <template v-slot:cell(status)="data">
                    <b-badge
                      variant="warning"
                      style="text-transform: uppercase"
                      >{{ data.item.status }}</b-badge
                    >
                  </template>
                </b-table>
                <div>
                  <vue-html2pdf
                    :show-layout="false"
                    :float-layout="true"
                    :enable-download="false"
                    :preview-modal="true"
                    :paginate-elements-by-height="1400"
                    filename="E-TICKET"
                    :pdf-quality="1"
                    :manual-pagination="false"
                    pdf-format="a3"
                    pdf-orientation="landscape"
                    pdf-content-width="1400px"
                    @progress="onProgress($event)"
                    @hasStartedGeneration="hasStartedGeneration()"
                    @hasGenerated="hasGenerated($event)"
                    ref="html2Pdf"
                  >
                    <section slot="pdf-content">
                      <div class="invoice-box">
                        <table>
                          <tr class="top">
                            <td colspan="2">
                              <table>
                                <tr>
                                  <td class="title">
                                    <img
                                      src="../../../public/logo.png"
                                      alt="Company logo"
                                      style="width: 100%; max-width: 500px"
                                    />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr class="information">
                            <td colspan="2">
                              <table>
                                <tr>
                                  <td>
                                    Invoice # :
                                    {{ tiketT.transportation_name }}<br />
                                    Check In : {{ tiket.check_in | format
                                    }}<br />
                                    Departure : {{ tiketT.departure }}<br />
                                    Till : {{ tiketT.till }}<br />
                                  </td>

                                  <td>
                                    Name : {{ tiketU.name }}<br />
                                    Email : {{ tiketU.email }} <br />
                                    Phone : {{ tiketU.phone_number }}<br />
                                    Type : {{ tiketT.transportation_type }}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr class="heading">
                            <td>Payment Method</td>

                            <td>Check #</td>
                          </tr>

                          <tr class="details">
                            <td>Harga</td>
                            <td>{{ tiketT.price }}</td>
                          </tr>

                          <tr class="details">
                            <td>Jumlah Penumpang</td>
                            <td>{{ tiket.jumlah }}</td>
                          </tr>

                          <tr class="heading">
                            <td>Item</td>

                            <td>#</td>
                          </tr>

                          <tr class="item">
                            <td>Transportation Name</td>

                            <td>{{ tiketT.transportation_name }}</td>
                          </tr>

                          <tr class="item">
                            <td>Stasiun Keberangkatan</td>

                            <td>{{ tiketT.p_depart }}</td>
                          </tr>

                          <tr class="item">
                            <td>Stasiun Tujuan</td>

                            <td>{{ tiketT.p_till }}</td>
                          </tr>

                          <tr class="item last">
                            <td>Status</td>

                            <td>{{ tiket.status }}</td>
                          </tr>

                          <tr class="total">
                            <td></td>

                            <td>Total: {{ tiketT.price }}</td>
                          </tr>
                          <barcode
                            v-bind:value="barcodeValue"
                            class="height: 50px;"
                          >
                            <!-- Show this if the rendering fails. -->
                          </barcode>
                        </table>
                      </div>
                    </section>
                  </vue-html2pdf>
                </div>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination"
                >
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="secondary"></b-spinner>
                  <strong class="text-secondary"> Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SVG footer -->
    <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#007bff"
        fill-opacity="1"
        d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,122.7C840,128,960,192,1080,213.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";
import VueBarcode from "vue-barcode";
export default {
  data: function () {
    return {
      search: "",
      id: "",
      id_user: "",
      name: "",
      id_category: "",
      id_transportation: "",
      transportation_name: "",
      price: "",
      departure: "",
      till: "",
      jumlah: "",
      action: "",
      message: "",
      pagination: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      transportations: "",
      tiket: "",
      tiketT: "",
      tiketU: "",
      transactions: [],
      transportation: [],
      user: [],
      fields: [
        // "id",
        // "id_user",
        // "id_category",
        // "id_transportation",
        "name",
        "transportation",
        "keberangkatan",
        "tujuan",
        "price",
        "departure",
        "till",
        "check_in",
        "status",
        "action",
      ],
    };
  },

  methods: {
    getData: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      // let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/transaction", conf)
        .then((response) => {
          if (response.data.status) {
            this.$bvToast.hide("loadingToast");
            this.$bvToast.show("message");
            this.transactions = response.data.data.transactions;
            this.transportation =
              response.data.data.transactions.transportation;
            this.user = response.data.data.transactions.user;
            // this.transportation = response.data.data.transportation
            this.rows = response.data.data.count;
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan data petugas.";
            this.$bvToast.show("message");
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    generateReport(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/transaction/" + id, conf)
        .then((response) => {
          if (response.data.status) {
            this.$bvToast.hide("loadingToast");
            this.tiket = response.data.data.transactions[0];
            this.tiketT = response.data.data.transactions[0].transportation;
            this.tiketU = response.data.data.transactions[0].user;
            this.rows = response.data.data.count;
            this.$refs.html2Pdf.generatePdf();
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan data laporan.";
            this.$bvToast.show("message");
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Drop: function (id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      if (confirm("Apakah anda yakin ingin membatalkan pesanan ini?")) {
        this.$bvToast.show("loadingToast");
        this.axios
          .delete("transaction/" + id, conf)
          .then((response) => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getData();
  },
  components: {
    VueHtml2pdf,
    barcode: VueBarcode,
  },
};
</script>
<style scoped>
body {
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #777;
}

body h1 {
  font-weight: 300;
  margin-bottom: 0px;
  padding-bottom: 0px;
  color: #000;
}

body h3 {
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 20px;
  font-style: italic;
  color: #555;
}

body a {
  color: #06f;
}

.invoice-box {
  max-width: 800px;
  margin: 0;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: rgb(0, 0, 0);
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
  border-collapse: collapse;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: -20px;
}

.invoice-box table tr.top table td.title {
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background-color: brown;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  color: #fff;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}
</style>