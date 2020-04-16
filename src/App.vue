<template>
  <v-app>
    <NavBar
      :nav-links="navLinks"
      :image-path="require('@/assets/logo.svg')"
      background="darkgray"
      linkColor="#333"
      hoverBackground="#fff"
    />

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
      
      <router-view/>

  </v-app>
</template>

<script>
  import NavBar from '@/components/NavigationBar.vue'
  import store from './store/index.js'
  require('dotenv').config();
  
  const API_KEY = process.env.VUE_APP_API_KEY;
  const COUNT = "20";

  export default {
    name: "App",
    components: {
      NavBar
    },
    data: () => ({
      fab: false,
      url: `https://www.googleapis.com/books/v1/volumes?q=intitle:king&maxResults=${COUNT}&key=${API_KEY}`,
      navLinks: [
        {
          text: 'Home',
          path: '/',
          icon: 'ion-ios-home'
        },
        {
          text: 'Usage',
          path: '/',
          icon: 'ion-ios-business'
        },
        {
          text: 'Worldwide',
          path: '/',
          icon: 'ion-ios-globe'
        },
        {
          text: 'Contact',
          path: '/about',
          icon: 'ion-ios-megaphone'
        }
      ]
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
      var temp = await fetch(this.url)
      .then(response => {
        return response.json(); 
      })
      .then(function(jsonResponse) {
        let items = jsonResponse.items;
        return items;
      });
      //console.log(temp);
      //need to construct the volumeInfo with the id
      var temp2 = [];
      temp.forEach(x => {
        x.volumeInfo["id"]=x.id;
        temp2.push(x.volumeInfo);
      });
      //console.log(temp2);
      store.state.books = temp2;  
    }
  }
</script>

<style lang="scss">
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';

figure {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 10px;
  margin-inline-end: 0;
}

body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //background-color: darkgray;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #75B600;
    }
  }
}


</style>