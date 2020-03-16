<template>
  <div class="list-and-details">
    <div class="filter">  
      
      <Dropdown class="dropdown-menu-filters"
          :options="filters"
          v-on:selected="pagecountFilter"
          :disabled="false"
          placeholder="Filter on count page"/>
      <Dropdown class="dropdown-menu-sort"
          :options="options"
          v-on:selected="orderSelectionBy"
          :disabled="false"
          placeholder="Order by"/>
  </div>

    <div class="book-list">
      <!-- Use native modifier due to BookItem is not a native HTML element  -->
      <a class="a-book-list" v-if="filteredAndSortedData.length==0">
      <BookItem
        v-for="(book,index) in this.$store.state.books" 
        :key="index" 
        :book="book"
        @click.native="displayDetails(book)"/>
      </a>
      <a class="a-book-list" v-else>
      <BookItem
        v-for="(book,index) in filteredAndSortedData" 
        :key="index" 
        :book="book"
        @click.native="displayDetails(book)"/>
      </a>
    </div>

    <div v-if="selectedBook!=null">
      <BookItemDetails :bookitemdetails="selectedBook"/>
    </div>
    <div v-else-if="isAddClicked">
      <BookItemForm/>
    </div>

    <v-btn
      fab absolute dark top right style="top: 30px" color=#42b983
      @click="addBook">
      <v-icon>add_circle</v-icon>
    </v-btn>

  </div>
</template>

<script>
import store from '@/store/index.js'
import BookItem from "./BookItem.vue";
import BookItemDetails from "./BookItemDetails.vue";
import BookItemForm from "./BookItemForm.vue";
import Dropdown from "./Dropdown.vue";

export default {
  data() {
    return {
      options: [
        {name: 'Newest', value: 'Newest'},
        {name: 'Oldest', value: 'Oldest'},
        {name: 'Most pages', value: 'Most pages'},
        {name: 'Less pages', value: 'Less pages'}
      ],
      filters: [
        {name: 'All', value: 'all'},
        {name: 'Less 100', value: 'small'},
        {name: '100 to 300', value: 'medium'},
        {name: 'Over 300', value: 'large'}
      ],
      selectedOrderBy: {name: 'Newest', value: 'Newest'},
      pcFilter: {name: 'All', value: 'all'},

      selectedBook: null,

      bookCollection: store.state.books,
      isAddClicked: false
    }
  },
  components: {
    BookItem, BookItemDetails, Dropdown, BookItemForm
  },
  async created(){
    
  },
  methods: {
    addBook () {
      this.isAddClicked?this.isAddClicked=false:this.isAddClicked=true
      this.selectedBook=null;
    },
    orderSelectionBy(selection) {
      this.selectedOrderBy = selection;
    },
    pagecountFilter(selection) {
      this.pcFilter = selection;
    },
    displayDetails(book) {
      this.selectedBook=book
      this.isAddClicked=false
    }
  },
  computed: {
    filteredAndSortedData: function () {
      var temp = this.$store.getters.getAllBooks;
      if (this.pcFilter.value == "all")
        temp = this.$store.getters.getAllBooks;
      else if(this.pcFilter.value == "small")
        temp = this.$store.getters.getSmallBooks;
      else if(this.pcFilter.value == "medium")
        temp = this.$store.getters.getMediumBooks;
      else if(this.pcFilter.value == "large")
        temp = this.$store.getters.getLargeBooks;

      switch(this.selectedOrderBy.name){
        case "Newest":
          return temp.sort(function(a, b){return new Date(a.volumeInfo.publishedDate) - new Date(b.volumeInfo.publishedDate);});
        case "Oldest":
          return temp.sort(function(a, b){return new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate);});
        case "Most pages":
          return temp.sort(function(a, b){return b.volumeInfo.pageCount - a.volumeInfo.pageCount;});
        case "Less pages":
          return temp.sort(function(a, b){return a.volumeInfo.pageCount - b.volumeInfo.pageCount;});

        default:
          return temp;
      }
    }
  }
}
</script>

<style>
.list-and-details{
  width: 100%;
  height: 100%;
}

.filter div label{
  width: 100px;
  float: left;
}

.filter div input{
  display: inline-block;
  width: 40px;
}

.filter h4{
  text-align: left;
}

.filter {
  padding: 1px;
}

.a-book-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
  padding: 15px;
  border: 6px solid #ccc;

  width: 65%;
  float: left;
}

.book-details {
  padding: 15px;
}

.dropdown-menu {
  margin-top: 0%;
}
</style>