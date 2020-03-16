<template>
  <div class="home-content">
    <BookList/>
    <BookItemDetails/>
  </div>
</template>

<script>
import BookList from '@/components/BookList.vue'
//import BookItemDetails from '@/components/BookItemDetails.vue'

export default {
  name: 'Home',
  data() {
    return {
      //books: [],
      //orderBy: 'newest',
    }
  },
  async mounted() {
    //this.loadBookList();
  },
  methods: {
    
  },
  components: {
    BookList//, BookItemDetails
  }
}
</script>
