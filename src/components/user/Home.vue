<template>
  <div class="p-0">
    <!-- Video BG Start -->
    <header class="container-fluid" style="z-index: -1;">
      <div class="overlay"></div>
      <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
        <source src="../../../public/bg.mp4" type="video/mp4" />
      </video>

      
    </header>
    <!-- Video BG End -->
  <div class="container shadow border rounded bg-white"  style="width: 900px; margin-top: -125px;">
    <div class="row rounded" >
      <div class="col-2 p-0 border-right rounded">
        <div class="bg-light rounded" id="sidebar-wrapper">
          <div class="list-group list-group-flush">
            <a
              href="#"
              class="list-group-item list-group-item-action bg-primary text-light p-3 rounded"
              >Kereta</a
            >
            <a
              href="#"
              class="list-group-item list-group-item-action bg-light p-3 rounded"
              >Hotel</a
            >
            <a
              href="#"
              class="list-group-item list-group-item-action bg-light p-3 rounded"
              >Pesawat</a
            >
            <a
              href="#"
              class="list-group-item list-group-item-action bg-light p-3 rounded"
              >Bus</a
            >
          </div>
        </div>
      </div>    
      <div class="col m-3 p-auto m-0">
        <form class="row me-0">
          <!-- <div class="col-6 pe-0">
            <label for="keretaBerangkat" class="form-label"
              >Keberangkatan</label
            >
            <input
              class="form-control"
              list="keretaStasiun"
              id="keretaBerangkat"
              placeholder="Stasiun Keberangkatan"
            />
            <datalist id="keretaStasiun">
              <option value="Jakarta"></option>
              <option value="Bandung"></option>
              <option value="Ngawi"></option>
              <option value="Wakanda"></option>
              <option value="New Zealand"></option>
            </datalist>
          </div>
          <div class="col-6">
            <label for="keretaTujuan" class="form-label">Tujuan</label>
            <input
              class="form-control"
              list="keretaStasiun"
              id="keretaTujuan"
              placeholder="Stasiun Tujuan"
            />
            <datalist id="keretaStasiun">
              <option value="Jakarta"></option>
              <option value="Bandung"></option>
              <option value="Ngawi"></option>
              <option value="Wakanda"></option>
              <option value="New Zealand"></option>
            </datalist>
          </div>

          <div class="col-md-6 pe-0">
            <label for="keretaTanggal" class="form-label">Tanggal</label>
            <input
              class="form-control"
              type="date"
              name="keretaTanggal"
              id="keretaTanggal"
            />
          </div>
          <br />
          <br />
          <div class="col-md-2 ps-4">
            <label for="jumlahPenumpang" class="form-label">Jumlah</label>
            <input
              class="form-control"
              type="number"
              name="jumlahPenumpang"
              id="jumlahPenumpang"
              placeholder="0"
            />
          </div> -->

          <div class="col-12 mt-3">
            <b-form-input
              type="text"
              v-on:keyup.enter="searching"
              v-model="stasiun_keberangkatan"
              placeholder="Stasiun Keberangkatan..."
              style="width: 300px;"
            ></b-form-input>
            <b-form-input
              type="text"
              v-on:keyup.enter="searching"
              v-model="stasiun_tujuan"
              placeholder="Stasiun Tujuan..."
              class="mt-3"
              style="width: 300px;"
            ></b-form-input>
            <br />

          </div>
        </form>
      </div>

    </div>
       <b-modal id="modalOrder" @ok="Save">
      <template v-slot:modal-title> Form Order </template>
      <form ref="form">
        <div class="form-group">
          <!-- <label for="id_transportation" class="col-form-label">Id Transportation</label> -->
          <input
            type="numeric"
            name="id_transportation"
            class="form-control"
            id="id_transportation"
            placeholder=""
            v-model="id_transportation"
            hidden
          />
        </div>
        <div class="form-group">
          <!-- <label for="id_transportation" class="col-form-label">Id Transportation</label> -->
          <input
            type="numeric"
            name="id_category"
            class="form-control"
            id="id_category"
            placeholder=""
            v-model="id_category"
            hidden
          />
        </div>
        <div class="form-group">
          <label for="chek_in" class="col-form-label">Check In</label>
          <input
            type="datetime-local"
            name="check_in"
            class="form-control"
            id="check_in"
            placeholder=""
            v-model="check_in"
          />
        </div>
        <div class="form-group">
          <label for="jumlah" class="col-form-label">Jumlah Penumpang</label>
          <input
            type="number"
            max="100"
            min="0"
            name="jumlah"
            class="form-control"
            id="jumlah"
            placeholder=""
            v-model="jumlah"
          />
        </div>
      </form>
    </b-modal>
  </div>
  <div class="container mt-5 shadow rounded p-0">

            <span v-if="findtransportations.length">
              <b-table
                class="mt-5"
                striped
                hover
                :items="findtransportations"
                :fields="fields"
              >
                <template v-slot:cell(action)="data">
                  <b-button
                    size="sm"
                    variant="success"
                    v-on:click="Order(data.item)"
                    v-b-modal.modalOrder
                    ><i class="mdi mdi-train"></i> Order</b-button
                  >
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                align="center"
                v-on:input="pagination"
                class="pb-4"
              >
              </b-pagination>
            </span>
  </div>

                  <!-- Top Picks Start -->
    <section id="whyTripket">
      <div class="container" style="margin-top: 200px;">
        <div class="row">
          <div class="col text-center">
            <h2><span class="text-white bg-primary p-3 font-weight-bold">TripkeT</span> is the <span class="text-warning font-weight-bold">best</span></h2>
            <h5><span class="text-white bg-warning px-3 py-2">forget the rest!</span></h5>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-md-6">
            <h3 class="mb-5 " style="margin-top: 150px"><span class="bg-warning text-white p-2">Section Title</span></h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe eligendi obcaecati facere itaque, veritatis amet voluptatem ab, vero quos a ad eaque minus architecto sit sapiente, commodi inventore doloribus accusantium alias
              corporis neque odio reprehenderit.
            </p>
          </div>
          <div class="col-md">
            <img class="img-fluid" src="../../../public/make_it_rain.svg" alt="" />
          </div>
        </div>
        <div class="row mt-0">
          <div class="col-md pl-5 pr-0">
            <img class="img-fluid" src="../../../public/travelers.svg" alt="" style="height:500px; width: auto;" />
          </div>
          <div class="col-md-6">
            <h3 class="mb-5 " style="margin-top: 150px"><span class="bg-primary text-white p-2">Section Title</span></h3>
            <p class="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe eligendi obcaecati facere itaque, veritatis amet voluptatem ab, vero quos a ad eaque minus architecto sit sapiente, commodi inventore doloribus accusantium alias
              corporis neque odio reprehenderit.
            </p>
          </div>
        </div>
      </div>
      <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#007bff"
          fill-opacity="1"
          d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,122.7C840,128,960,192,1080,213.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </section>
    <!-- Top Picks End -->

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: "Home",
      search: "",
      // id: "",
      id_category: "",
      transportation_type: "",
      id_transportation: "",
      transportation_name: "",
      stasiun_tujuan: "",
      stasiun_keberangkatan: "",
      price: "",
      departure: "",
      jumlah: "",
      check_in: "",
      till: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      category: "",
      findtransportations: [],
      transportations: [],
      user: "",
      fields: [
        // "id_transportation",
        // "transportation_type",
        "transportation_name",
        "stasiun_keberangkatan",
        "stasiun_tujuan",
        "price",
        "departure",
        "till",
        "action",
      ],
    };
  },
  methods: {
    getData: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/transportation", conf)
        .then((response) => {
          if (response.data.status) {
            this.$bvToast.hide("loadingToast");
            this.transportations = response.data.data.transportations;
            this.category = response.data.data.transportations.category;
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
    getOrder: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      // let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/transaction", conf)
        .then((response) => {
          if (response.data.status) {
            this.$bvToast.hide("loadingToast");
            this.transactions = response.data.data.transactions;
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
    searching: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      let form = {
        stasiunkeberangkatan: this.stasiun_keberangkatan,
        stasiuntujuan: this.stasiun_tujuan,
      };
      this.axios
        .post("/findTransportation/" + this.perPage + "/" + offset, form, conf)
        .then((response) => {
          if (response.data.status == 1) {
            this.$bvToast.hide("loadingToast");
            this.findtransportations = response.data.data.transportations;
            this.rows = response.data.count;
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Kereta yang anda cari tidak ada";
            this.$bvToast.show("message");
            // this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Order: function (item) {
      this.action = "insert";
      this.id_transportation = item.id_transportation;
      this.id_category = item.id_category;
      this.id_user = "";
      this.jumlah = "";
      this.check_in = "";
      // this.check_out = "";
      this.status = "";
    },
    Save: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.$bvToast.show("loadingToast");
      this.action === "insert";
      let form = new FormData();
      // form.append("id", this.id);
      form.append("id", this.id);
      form.append("id_transportation", this.id_transportation);
      form.append("id_category", this.id_category);
      form.append("jumlah", this.jumlah);
      form.append("check_in", this.check_in);
      // form.append("check_out", this.check_out);
      form.append("status", this.status);

      this.axios
        .post("/transaction", form, conf)
        .then((response) => {
          this.$bvToast.hide("loadingToast");
          this.$router.push("/transaksi");
          this.message = response.data.message;
          this.$bvToast.show("message");
          this.getOrder();
          console.log(this.id_transportation);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    pagination: function () {
      if (this.search == "") {
        this.getData();
      } else {
        this.searching();
      }
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getData();
  },
};
</script>