<template>
  <div class="book-item">
      <template v-if="volumeInfo.imageLinks">
        <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title">
      </template>
      <template v-else>
        <img
          src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
          :alt="volumeInfo.title"
          width="128"
        >
      </template>

      <h4>{{ volumeInfo.title }}</h4>

      <p class="author">
        <span v-if="!volumeInfo.authors">No authors to display</span>
        <span v-else>
          By
          <span v-for="(author, index) in volumeInfo.authors" :key="index">
            <em>
              {{author}}
              <!-- {{
              index + 1 !== volumeInfo.authors.length && index + 1 !== volumeInfo.authors.length-1 ? author + ', ' : index + 1 == volumeInfo.authors.length && index+1 !== 1 ? ' and ' + author : author
              }} -->
            </em>
          </span>
        </span>
      </p>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  created(){
    //console.log(this.book);
  },
  data(){
    return{

    }
  },
  computed: {
    volumeInfo(){
      return this.book
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}

ul li {
  display: inline-block;
}

ul li:first-child {
  list-style: none;
}
.author {
  font-size: 14px;
}

.book-item {
  color: #000000c4;
}
</style>
