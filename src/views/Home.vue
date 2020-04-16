<template>
  <div class="home-content">
    <BookList/> 
  </div>
</template>

<script>
import BookList from '@/components/BookList.vue'

export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  async mounted() {
    
  },
  methods: {
    
  },
  components: {
    BookList
  }
}
</script>

<style lang="scss">

.home-content{
  //display: inline-block;
  //position: relative;
}

</style>