<template>
  <div class="container-fluid">
    <b-modal id="modalRegister" @ok="Save" class="">
      <template v-slot:modal-title> Form Register </template>
      <form ref="form">
        <div class="form-group">
          <label for="nik" class="col-form-label">NIK</label>
          <input type="number" name="nik" class="form-control" id="nik" placeholder="nik" v-model="nik" />
        </div>
        <div class="form-group">
          <label for="name" class="col-form-label">Name</label>
          <input type="text" name="name" class="form-control" id="name" placeholder="name" v-model="name" />
        </div>
        <div class="form-group">
          <label for="email" class="col-form-label">Username</label>
          <input type="text" name="email" class="form-control" id="email" placeholder="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password" class="col-form-label">Password</label>
          <input type="password" name="password" class="form-control" id="password" placeholder="password" v-model="password" />
        </div>
        <div class="form-group">
          <label for="phone_number" class="col-form-label">Phone Number</label>
          <input type="number" name="phone_number" class="form-control" id="phone_number" placeholder="telepon" v-model="phone_number" />
        </div>
        <div class="form-group">
          <label for="location" class="col-form-label">Location</label>
          <input type="text" name="location" class="form-control" id="location" placeholder="location" v-model="location" />
        </div>
      </form>
    </b-modal>

    <div class="row no-gutter">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div class="col-md-8 col-lg-6">
        <div class="login d-flex align-items-center py-0 ">
          <div class="container ">
            <div class="row ">
              <div class="col-md-9 col-lg-8 mx-auto" style="postion: absolute">
                <form v-on:submit.prevent="Login" class="p-5 border border-warning rounded bg-warning" style="position: relative;">
                  <div class="form-label-group mt-2">
                    <input id="input_email" v-model="email" class="form-control border border-warning" placeholder="Email address" required autofocus style="border-width: 4px !important" />
                    <label for="input_email">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input type="password" id="input_password" v-model="password" placeholder="Kata sandi" class="form-control" required trim />
                    <label for="input_password">Password</label>
                  </div>

                  <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Log in</button>
                </form>

                <h2 class="login-heading mb-4"><span class="bg-primary text-white shadow rounded" style="padding: 30px; margin-right: 40px; font-weight: bold; position: relative; top: -325px; left: -30px;">Welcome back!</span></h2>

                <div class="text-center bg-primary text-white shadow rounded p-3 mx-auto" style="font-size: 14px; width: 300px; position: relative; bottom: 100px">
                  <a style="font-weight: 400; ">Doesn't have an account? </a>
                  <button class="btn btn-sm btn-warning shadow-lg text-white font-weight-bold" data-bs-toggle="modal" v-b-modal.modalRegister v-on:click="Add">Register here</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            <b-modal id="modalRegister" @ok="Save">
        <template v-slot:modal-title> Form Register </template>
        <form ref="form">
          <div class="form-group">
            <label for="nik" class="col-form-label">NIK</label>
            <input type="number" name="nik" class="form-control" id="nik" placeholder="nik" v-model="nik" />
          </div>
          <div class="form-group">
            <label for="name" class="col-form-label">Name</label>
            <input type="text" name="name" class="form-control" id="name" placeholder="name" v-model="name" />
          </div>
          <div class="form-group">
            <label for="email" class="col-form-label">Username</label>
            <input type="text" name="email" class="form-control" id="email" placeholder="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password" class="col-form-label">Password</label>
            <input type="password" name="password" class="form-control" id="password" placeholder="password" v-model="password" />
          </div>
          <div class="form-group">
            <label for="phone_number" class="col-form-label">Phone Number</label>
            <input type="number" name="phone_number" class="form-control" id="phone_number" placeholder="telepon" v-model="phone_number" />
          </div>
          <div class="form-group">
            <label for="location" class="col-form-label">Location</label>
            <input type="text" name="location" class="form-control" id="location" placeholder="location" v-model="location" />
          </div>
        </form>
      </b-modal>
    </div>

    <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
      <b-spinner label="Spinning" variant="secondary"></b-spinner>
      <strong class="text-secondary">Loading...</strong>
    </b-toast>

    <b-toast id="message" title="Message">
      <strong class="text-success">{{ message }}</strong>
    </b-toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      nik: "",
      name: "",
      email: "",
      password: "",
      phone_number: "",
      location: "",
      message: "",
    };
  },
  methods: {
    Login: function () {
      this.$bvToast.show("loadingToast");
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((response) => {
          localStorage.setItem("name", response.data.data.user.name);
          this.message = response.data.message;
          this.$bvToast.hide("loadingToast");
          this.$bvToast.show("message");
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
    Add: function () {
      this.action = "insert";
      this.nik = "";
      this.name = "";
      this.email = "";
      this.password = "";
      this.phone_number = "";
      this.location = "";
      this.role = "";
    },
    Save: function () {
      this.$bvToast.show("loadingToast");
      if (this.action === "insert") {
        let form = new FormData();
        form.append("id", this.id);
        form.append("nik", this.nik);
        form.append("name", this.name);
        form.append("email", this.email);
        form.append("password", this.password);
        form.append("phone_number", this.phone_number);
        form.append("location", this.location);

        this.axios
          .post("/register", form)
          .then((response) => {
            this.$bvToast.hide("loadingToast");
            this.$router.push("/login");
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        let form = {
          nik: this.nik,
          name: this.name,
          email: this.email,
          password: this.password,
          phone_number: this.phone_number,
          location: this.location,
        };
        this.axios
          .post("/login" + this.id, form)
          .then((response) => {
            this.$bvToast.hide("loadingToast");
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
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
    this.name = localStorage.setItem("name");
  },
};
</script>