<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title float-left"><b>Jadwal Kereta</b></p>

            <div class="table-responsive">
              <b-table striped hover :items="transportations" :fields="fields">
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
</template>

<script>
module.exports = {
  data: function () {
    return {
      search: "",
      // id: "",
      id_category: "",
      transportation_type: "",
      id_transportation: "",
      transportation_name: "",
      price: "",
      departure: "",
      jumlah: "",
      check_in: "",
      till: "",
      action: "",
      message: "",
      pagination: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      category: "",
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
        // "action",
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
      this.action === "insert" 
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
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getData();
  },
};
</script>