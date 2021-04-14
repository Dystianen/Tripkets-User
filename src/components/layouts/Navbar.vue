<template>
  <div class="horizontal-menu">
    <nav class="navbar top-navbar col-lg-12 col-12 p-0">
      <div class="nav-top flex-grow-1">
        <div class="container d-flex flex-row h-100 align-items-center">
          <div
            class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
          >
            <a class="navbar-brand brand-logo disabled">
              <img src="../../../public/logo.png" />
            </a>
          </div>
          <div
            class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1"
          >
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item">
                <router-link to="/" class="nav-link">
                  <span class="menu-title">Beranda</span>
                </router-link>
              </li>
              <!-- <li class="nav-item"> 
                <router-link :to="{ name: 'hotel' }" class="nav-link">
                  <span class="menu-title">Hotel</span>
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link :to="{ name: 'pesawat' }" class="nav-link">
                  <span class="menu-title">Pesawat</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'kereta' }" class="nav-link">
                  <span class="menu-title">Kereta</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'bus' }" class="nav-link">
                  <span class="menu-title">Bus</span>
                </router-link>
              </li>
              <li class="nav-item nav-profile dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  id="profileDropdown"
                >
                  {{ name }}
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right navbar-dropdown"
                  aria-labelledby="profileDropdown"
                >
                  <span @click="logout" class="dropdown-item">
                    <i class="mdi mdi-logout text-dark"></i>
                    Logout
                  </span>
                </div>
              </li>
            </ul>
            <button
              class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="horizontal-menu-toggle"
            >
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: "",
    };
  },
  // name: "navbar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    email: function () {
      return this.$store.getters.userDetail.name;
    },
    role: function () {
      return this.$store.getters.userDetail.role;
    },
  },
  methods: {
    logout: function () {
      let conf = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      };
      this.axios
        .post("/logout", conf)
        .then((response) => {
          if (response.data.status === false || response.data.status === 0) {
            this.$store.commit("logout");
            localStorage.removeItem("Authorization");
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          this.$store.commit(error, "logout");
        });
    },
  },
  mounted() {
    this.name = localStorage.getItem("name");
  },
};
</script>
