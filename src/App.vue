<template>  
  <div id="app">
    <div class="container-scroller">
      <router-view name="header" />
        <div class=" page-body-wrapper">
          <div class="main-panel">
            <router-view />
          </div>
        </div>
      <router-view name="footer"/>
    </div>
  </div>
</template>

<script>
// import Navbar from '../components/layouts/Navbar.vue'
export default {
  name: 'App'
}
</script>
