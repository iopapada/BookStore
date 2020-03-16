<template>
  <v-app>
    <v-app-bar
      app
      color="dark lighter-3 white--text text--lighten-3"
      dark
      height="120">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/logo.svg"
          width="100"/>

        <v-toolbar-title class="page-title">
          BookStore
        </v-toolbar-title>
      </div>
      
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </v-app-bar>

    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color=#75B600
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
      
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
  //import Header from './components/Header'
  import store from './store/index.js'
  const API_KEY = "AIzaSyDTh_TfDbaQzaIypAS_N872MLSIKcz7mpE";
  const COUNT = "20";

  export default {
    name: "App",
    components: {
    },
    data: () => ({
      fab: false,
      url: `https://www.googleapis.com/books/v1/volumes?q=intitle:king&maxResults=${COUNT}&key=${API_KEY}`
    }),
    methods: {
      onScroll (e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      }
    },
    async created() {
      store.state.books = await fetch(this.url)
      .then(response => {
        return response.json(); 
      })
      .then(function(jsonResponse) {
        let items = jsonResponse.items;
        return items;
      }); 
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: darkgray;
}

#nav {
  padding: 30px;
  margin-left: auto;
  margin-top: auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #75B600;
}

.page-title{
  font-size: 3.25rem;
  color: #75B600;
}

.home-content{
  display: inline;
}

</style>