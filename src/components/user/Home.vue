<template>
  <div class="p-0">
    <!-- Video BG Start -->
    <div class="container-fluid vidheader" style="z-index: -1">
      <div class="overlay"></div>
      <video
        playsinline="playsinline"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source src="../../../public/bg.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Video BG End -->
    <div
      class="container shadow border rounded bg-white"
      style="width: 900px; margin-top: -125px"
    >
      <div class="row rounded">
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
          <form class="row me-0" @submit.prevent="searching">
            <div class="col-12 mt-3">
              <b-form-input
                type="text"
                v-model="p_depart"
                placeholder="Stasiun Keberangkatan..."
                style="width: 300px"
              ></b-form-input>
              <b-form-input
                type="text"
                v-model="p_till"
                placeholder="Stasiun Tujuan..."
                class="mt-1"
                style="width: 300px"
              ></b-form-input>
              <br />
              <button class="btn btn-outline-primary" type="submit">
                Search
              </button>
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
          <template v-slot:cell(transportation_type)="data">
            {{ data.item.category.transportation_type }}
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
      <div class="container" style="margin-top: 200px">
        <div class="row">
          <div class="col text-center">
            <h2>
              <span class="text-white bg-primary p-3 font-weight-bold"
                >TripkeT</span
              >
              is the <span class="text-warning font-weight-bold">best</span>
            </h2>
            <h5>
              <span class="text-white bg-warning px-3 py-2"
                >forget the rest !</span
              >
            </h5>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-md-6">
            <h3 class="mb-5" style="margin-top: 150px">
              <span class="bg-warning text-white p-2">Section Title</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
              eligendi obcaecati facere itaque, veritatis amet voluptatem ab,
              vero quos a ad eaque minus architecto sit sapiente, commodi
              inventore doloribus accusantium alias corporis neque odio
              reprehenderit.
            </p>
          </div>
          <div class="col-md">
            <img
              class="img-fluid"
              src="../../../public/make_it_rain.svg"
              alt=""
            />
          </div>
        </div>
        <div class="row mt-0">
          <div class="col-md pl-5 pr-0">
            <img
              class="img-fluid"
              src="../../../public/travelers.svg"
              alt=""
              style="height: 500px; width: auto"
            />
          </div>
          <div class="col-md-6">
            <h3 class="mb-5" style="margin-top: 150px">
              <span class="bg-primary text-white p-2">Section Title</span>
            </h3>
            <p class="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
              eligendi obcaecati facere itaque, veritatis amet voluptatem ab,
              vero quos a ad eaque minus architecto sit sapiente, commodi
              inventore doloribus accusantium alias corporis neque odio
              reprehenderit.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Top Picks End -->

    <!-- Second Filler -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="mt-5">
      <path
        fill="#ffc107 "
        fill-opacity="1"
        d="M0,128L0,96L75.8,96L75.8,192L151.6,192L151.6,192L227.4,192L227.4,0L303.2,0L303.2,128L378.9,128L378.9,224L454.7,224L454.7,32L530.5,32L530.5,224L606.3,224L606.3,160L682.1,160L682.1,32L757.9,32L757.9,96L833.7,96L833.7,192L909.5,192L909.5,32L985.3,32L985.3,128L1061.1,128L1061.1,96L1136.8,96L1136.8,256L1212.6,256L1212.6,160L1288.4,160L1288.4,160L1364.2,160L1364.2,160L1440,160L1440,320L1364.2,320L1364.2,320L1288.4,320L1288.4,320L1212.6,320L1212.6,320L1136.8,320L1136.8,320L1061.1,320L1061.1,320L985.3,320L985.3,320L909.5,320L909.5,320L833.7,320L833.7,320L757.9,320L757.9,320L682.1,320L682.1,320L606.3,320L606.3,320L530.5,320L530.5,320L454.7,320L454.7,320L378.9,320L378.9,320L303.2,320L303.2,320L227.4,320L227.4,320L151.6,320L151.6,320L75.8,320L75.8,320L0,320L0,320Z"
      ></path>
    </svg>

    <section class="bg-warning pb-5 shadow-lg">
      <div class="container bg-warning mt-0">
        <div class="row m-0">
          <div class="col text-center">
            <h2>
              <span class="bg-primary text-white p-3">Our Top Picks</span> for
              <span class="text-white font-weight-bold">you</span>
            </h2>
            <h5>
              <span class="bg-white text-warning px-3 py-2"
                >because you deserve it !</span
              >
            </h5>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col p-0 m-0">
            <button class="btn btn-default">
              <img
                class="rounded shadow-lg"
                src="../../../public/hotel1.jpg"
                width="250"
                height="150"
                alt=""
              />
            </button>
          </div>
          <div class="col p-0 m-0">
            <button class="btn btn-default">
              <img
                class="rounded shadow-lg"
                src="../../../public/hotel2.jpg"
                width="250"
                height="150"
                alt=""
              />
            </button>
          </div>
          <div class="col p-0 m-0">
            <button class="btn btn-default">
              <img
                class="rounded shadow-lg"
                src="../../../public/hotel3.jpg"
                width="250"
                height="150"
                alt=""
              />
            </button>
          </div>
          <div class="col p-0 m-0">
            <button class="btn btn-default">
              <img
                class="rounded shadow-lg"
                src="../../../public/hotel4.jpg"
                width="250"
                height="150"
                alt=""
              />
            </button>
          </div>
        </div>
        <div class="row mt-5 mb-5">
          <div class="col text-center">
            <p class="font-weight-bold text-white h6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              perspiciatis eos debitis dolorem veritatis? Ad culpa corrupti
              perferendis iure quasi dolor, alias velit molestiae porro, rerum
              voluptatem consectetur nulla atque?
            </p>
          </div>
        </div>
      </div>
    </section>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#ffc107"
        fill-opacity="1"
        d="M0,160L0,0L65.5,0L65.5,128L130.9,128L130.9,192L196.4,192L196.4,288L261.8,288L261.8,96L327.3,96L327.3,192L392.7,192L392.7,32L458.2,32L458.2,224L523.6,224L523.6,32L589.1,32L589.1,192L654.5,192L654.5,320L720,320L720,224L785.5,224L785.5,192L850.9,192L850.9,224L916.4,224L916.4,128L981.8,128L981.8,96L1047.3,96L1047.3,96L1112.7,96L1112.7,32L1178.2,32L1178.2,256L1243.6,256L1243.6,224L1309.1,224L1309.1,256L1374.5,256L1374.5,32L1440,32L1440,0L1374.5,0L1374.5,0L1309.1,0L1309.1,0L1243.6,0L1243.6,0L1178.2,0L1178.2,0L1112.7,0L1112.7,0L1047.3,0L1047.3,0L981.8,0L981.8,0L916.4,0L916.4,0L850.9,0L850.9,0L785.5,0L785.5,0L720,0L720,0L654.5,0L654.5,0L589.1,0L589.1,0L523.6,0L523.6,0L458.2,0L458.2,0L392.7,0L392.7,0L327.3,0L327.3,0L261.8,0L261.8,0L196.4,0L196.4,0L130.9,0L130.9,0L65.5,0L65.5,0L0,0L0,0Z"
      ></path>
    </svg>
    <!-- Second filler end -->

    <!-- GPlay Start -->
    <section>
      <div class="b-contianer">
        <div class="b-row" style="margin-right: 200px">
          <div class="b-col">
            <p class="h1 text-right">
              <span class="bg-primary text-white p-3">Be Portable !</span>
            </p>
            <p class="h4 text-right">
              <span class="bg-warning text-white px-3 py-1"
                >Get the App now !</span
              >
            </p>
            <a href="#" class="mt-5">
              <img
                class="float-right m-0"
                width="200px"
                src="../../../public/gplay.png"
                alt=""
              />
            </a>
          </div>
          <div class="b-col">
            <img
              class="img ml-0"
              height="600"
              src="../../../public/phone.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>

    <!-- GPlay end -->

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
export default {
  data: function () {
    return {
      name: "Home",
      search: "",
      // id: "",
      id_category: "",
      transportation_type: "",
      id_transportation: "",
      p_depart: "",
      p_till: "",
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
        "p_depart",
        "p_till",
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
        .get("/train", conf)
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
        pdepart: this.p_depart,
        p_till: this.p_till,
      };
      this.axios
        .post("/findTrain/" + this.perPage + "/" + offset, form, conf)
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
