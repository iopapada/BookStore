<template>
  <div class="item-details">
    <form>
      
      <div class=msg-errors>
        <p v-if="errors.length">
          <span>Please correct the following error(s):</span>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </p>
      </div>
      <a :href="volumeInfo.previewLink" target="_blank">
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
      </a>

      <div>
        <label>Title: *</label>
        <input type="text" id="title" name="title" :value=volumeInfo.title @change="changeTitle(volumeInfo,$event)">
      </div>

      <div>
        <label>Subtitle:</label>
        <input type="text" id="subtitle" name="subtitle" :value=volumeInfo.subtitle @change="changeSubtitle(volumeInfo,$event)">
      </div>

      <div class="author">
        <label>Author: *</label>
        <input type="text" id="authors" name="authors" :value=volumeInfo.authors @change="changeAuthors(volumeInfo,$event)">
        <!-- <span v-else v-for="(author, index) in volumeInfo.authors" :key="index" @change="changeAuthors(volumeInfo,$event)">
          <em contenteditable="true">
            {{
            index + 1 !== volumeInfo.authors.length && index + 1 !== volumeInfo.authors.length-1 
            ? author + ', ' : index + 1 == volumeInfo.authors.length && index+1 !== 1 
            ? ' and ' + author : author
            }}
          </em>
        </span> -->
      </div>

      <div>
        <label>Publisher:</label>
        <input type="text" id="publisher" name="publisher" :value=volumeInfo.publisher @change="changePublisher(volumeInfo,$event)">
      </div>

      <div>
        <label>Publish Date:</label>
        <input type="text" id="publishedDate" name="publishedDate" :value=volumeInfo.publishedDate @change="changePublishedDate(volumeInfo,$event)">
      </div> 

      <div>
        <label>Category:</label>
        <input type="text" id="categories" name="categories" :value=volumeInfo.categories  @change="changeCategories(volumeInfo,$event)">
        <!-- <span v-else v-for="(category, index) in volumeInfo.categories" :key="index" @change="changeCategories(volumeInfo,$event)">
          <em contenteditable="true">
            {{ index + 1 !== volumeInfo.categories.length && index + 1 !== volumeInfo.categories.length-1 
            ? author + ', ' : index + 1 == volumeInfo.categories.length && index+1 !== 1 
            ? ' and ' + category : category }}
          </em>
        </span> -->
      </div> 

      <div>
        <label>Page Count: </label>
        <input type="text" id="pageCount" name="pageCount" :value=volumeInfo.pageCount  @keydown="onKeydown" @change="changePageCount(volumeInfo,$event)">
      </div>

      <div>
        <label>Print type:</label>
        <input type="text" id="printType" name="printType" :value=volumeInfo.printType @change="changePrintType(volumeInfo,$event)">
      </div>

      <div>
        <label>Average rating:</label>
        <input type="text" id="averageRating" name="averageRating" :value=volumeInfo.averageRating @change="changeAverageRating(volumeInfo,$event)">
      </div>

      <div>
        <label>Ratings count:</label>
        <input type="text" id="ratingsCount" name="ratingsCount" :value=volumeInfo.ratingsCount @change="changeRatingsCount(volumeInfo,$event)">
      </div>

      <div>
        <label>Maturity rating:</label>
        <input type="text" id="maturityRating" name="maturityRating" :value=volumeInfo.maturityRating @change="changeMaturityRating(volumeInfo,$event)">
      </div>

      <div>
        <label>Content Version:</label>
        <input type="text" id="contentVersion" name="contentVersion" :value=volumeInfo.contentVersion @change="changeContentVersion(volumeInfo,$event)">
      </div>

      <div>
        <label>Language:</label>
        <input type="text" id="language" name="language" :value=volumeInfo.language @change="changeLanguage(volumeInfo,$event)">
      </div>

      <div>
        <label>Preview link:</label>
        <input type="text" id="previewLink" name="previewLink" :value=volumeInfo.previewLink @change="changePreviewLink(volumeInfo,$event)">
      </div>

      <div>
        <label>Info link:</label>
        <input type="text" id="infoLink" name="infoLink" :value=volumeInfo.infoLink @change="changeInfoLink(volumeInfo,$event)">
      </div>

      <div>
        <label>Canonical link:</label>
        <input type="text" id="canonicalVolumeLink" name="canonicalVolumeLink" :value=volumeInfo.canonicalVolumeLink @change="changeCanonicalVolumelink(volumeInfo,$event)">
      </div>
      
      <div>
        <label>Descritpion: </label>
        <textarea 
          contenteditable=true
          @change="changeDescription(volumeInfo,$event)"
          placeholder="Enter something..."
          rows="5"
          max-rows="16"
          v-model="volumeInfo.description">
        </textarea>
      </div>
      
      <v-btn type="submit" class="button"
      position="relative" dark bottom color=#75B600
      @click="checkForm">
        <v-icon>edit</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script>
import { isNumeric, isValidDateFormat } from "@/validators/bookinfovalidator.js";

export default {
  props: {
    bookitemdetails: {
      type: Object,
      required: false
    }
  },
  data() {
    return{
      errors:[],
      
    }
  },
  methods: {
    checkForm:function(e) {
      //if(this.errors.length!==0) return true;
      e.preventDefault();
      this.updateVXFunc(this.bookitemdetails);
    },
    onKeydown (event) {
      const char = String.fromCharCode(event.keyCode)
      if (!/[0-9]/.test(char)) {
        event.preventDefault()
      }
    },
    changeTitle: function(item, event){
      if(event.target.value==="" || event.target.value===null) 
      {
        alert("Title field is required.");
        event.target.value = item.title;
      }
      else
        item.title = event.target.value; 
    },
    changeSubtitle: function(item, event){
      item.subtitle = event.target.value; 
    },
    changeAuthors: function(item, event){
      if(event.target.value==="" || event.target.value===null) 
      {
        alert("Authors field is required.");
        event.target.value = item.authors;
      }
      else
        item.authors = event.target.value; 
    },
    changePublisher: function(item, event){
      item.publisher = event.target.value; 
    },
    changePublishedDate: function(item, event){
      if(!isValidDateFormat(item.publishedDate))
      {
        alert("Valid date format of Published Date field is only the 4-digit of YEAR.");
        event.target.value = item.publishedDate;
      }
      else
        item.publishedDate = event.target.value; 
    },
    changeCategories: function(item, event){
      item.categories = event.target.value; 
    },
    changePageCount: function(item, event){
      item.pageCount = event.target.value; 
    },
    changePrintType: function(item, event){
      item.printType = event.target.value; 
    },
    changeAverageRating: function(item, event){
      if(!isNumeric(item.averageRating) )
      {
        alert("Average rating field can be Only Number.");
        event.target.value = item.averageRating;
      }
      else
        item.averageRating = event.target.value; 
    },
    changeRatingsCount: function(item, event){
      if(!isNumeric(item.ratingsCount) )
      {
        alert("Ratings count field can be Only Number.");
        event.target.value = item.ratingsCount;
      }
      else
        item.ratingsCount = event.target.value; 
    },
    changeMaturityRating: function(item, event){
      item.maturityRating = event.target.value; 
    },
    changeContentVersion: function(item, event){
      item.contentVersion = event.target.value; 
    },
    changeLanguage: function(item, event){
      item.language = event.target.value; 
    },
    changePreviewLink: function(item, event){
      item.previewLink = event.target.value; 
    },
    changeInfoLink: function(item, event){
      item.infoLink = event.target.value; 
    },
    changeCanonicalVolumelink: function(item, event){
      item.canonicalVolumeLink = event.target.value; 
    },
    changeDescription: function(item, event){
      item.description = event.target.value; 
    },
    updateVXFunc: function(
      bookData
      ){  
      this.$store.dispatch('updateVXFunc',{
      bookData
      })
    }
  },
  computed: {
    volumeInfo(){
      return this.bookitemdetails
    }
  }
}
</script>

<style>
.item-details div input, .item-details div textarea{
  border: groove;
  margin-bottom: 15px;
  width: 400px;
}
.item-details div label{
  display: inline-block;
  width: 140px;
  text-align: right;
}

.item-details div span{
  border: groove;
  margin-bottom: 5px;
  width: 400px;
  text-align: right;
}

::placeholder { 
  color: rgb(211, 102, 102);
}
</style>