<template>
<form id="app" >
  <div class=msg-errors>
  <p v-if="errors.length">
    <span>Please correct the following error(s):</span>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
  </div>

  <div class="form">
    <div class="text-xs-center">
        <img
        src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
        width="128"
        >
    </div>

    <div>
      <label>Title: *</label>
      <input type="title" class="input" placeholder="required" v-model="title">
    </div>

    <div>
    <label>Subtitle:</label>
    <input id="subtitle" name="subtitle" v-model="subtitle">
    </div>

    <div>
    <label>Author: *</label>
    <input id="authors" name="authors" placeholder="required" v-model="authors">
    </div>  

    <div>
    <label>Publisher:</label>
    <input id="publisher" name="publisher" v-model="publisher">
    </div>

    <div>
    <label>Publish Date:</label>
    <input id="publishedDate" name="publishedDate" placeholder="Year" v-model="publishedDate">
    </div>

    <div>
    <label>Category:</label>
    <input id="category" name="category" v-model="categories">
    </div>

    <div>
    <label>Page Count: </label>
    <input id="pageCount" name="pageCount" placeholder="Only numbers" @keydown="onKeydown" v-model="pageCount">
    </div>

    <div>
    <label>Print type:</label>
    <input id="printType" name="printType" v-model="printType">
    </div>

    <div>
    <label>Average rating:</label>
    <input id="averageRating" name="averageRating" placeholder="Only numbers" v-model="averageRating">
    </div>

    <div>
    <label>Ratings count:</label>
    <input id="ratingsCount" name="ratingsCount" placeholder="Only numbers" v-model="ratingsCount">
    </div>

    <div>
    <label>Maturity rating:</label>
    <input id="maturityRating" name="maturityRating" v-model="maturityRating">
    </div>

    <div>
    <label>Content Version:</label>
    <input id="contentVersion" name="contentVersion" v-model="contentVersion">
    </div>

    <div>
    <label>Language:</label>
    <input id="language" name="language" v-model="language">
    </div>

    <div>
    <label>Preview link:</label>
    <input id="previewLink" name="previewLink" v-model="previewLink">
    </div>

    <div>
    <label>Info link:</label>
    <input id="infoLink" name="infoLink" v-model="infoLink">
    </div>

    <div>
    <label>Canonical link:</label>
    <input id="canonicalVolumeLink" name="canonicalVolumeLink" v-model="canonicalVolumeLink">
    </div>
    
    <div>
      <label>Descritpion: </label>
      <textarea 
          contenteditable=true
          placeholder="Enter description..."
          rows="5"
          max-rows="16"
          v-model="description">
      </textarea>
    </div>
    
    <v-btn
    position="relative" dark bottom color=#75B600
    @click="checkForm">
    <v-icon>save</v-icon>
    </v-btn>

  </div>
</form>
</template>

<script>
import { isNumeric, isValidDateFormat } from "@/validators/bookinfovalidator.js";
export default {
  data() {
    return {
      errors:[],
      imageLinks:null,
      title: null,
      subtitle: null,
      authors: null,
      publisher: null,
      publishedDate: null,
      categories: null,
      pageCount: null,
      printType: null,
      averageRating: null,
      ratingsCount: null,
      maturityRating: null,
      contentVersion: null,
      language: null,
      previewLink: null,
      infoLink: null,
      canonicalVolumeLink: null,
      description: null
      };
  },
  created(){
  },
  methods: {
    checkForm:function(e) {
      this.errors = [];
      if(this.title==="" || this.title===null) this.errors.push("Title required.");
      if(this.authors==="" || this.authors===null) this.errors.push("Authors required.");

      if(!isValidDateFormat(this.publishedDate)) this.errors.push("Publish date has no valid format.");
      if(!isNumeric(this.averageRating) ) this.errors.push("Average rating is not numeric");
      if(!isNumeric(this.ratingsCount)) this.errors.push("Ratings count is not numeric");
      
      if(this.errors.length!==0) return true;
      
      e.preventDefault();

      //var newBook = {imageLinks:this.imageLinks, title:this.title, subtitle:this.subtitle, authors:this.authors, publisher:this.publisher, publishedDate:this.publishedDate, categories:this.categories, pageCount:this.pageCount, printType:this.printType, averageRating:this.averageRating, ratingsCount:this.ratingsCount, maturityRating:this.maturityRating, contentVersion:this.contentVersion, language:this.language, previewLink:this.previewLink, infoLink:this.infoLink, canonicalVolumeLink:this.canonicalVolumeLink, description:this.description};
      this.triggerFunction(this.imageLinks, this.title, this.subtitle, this.authors, this.publisher, this.publishedDate, this.categories, this.pageCount, this.printType, this.averageRating, this.ratingsCount, this.maturityRating, this.contentVersion, this.language, this.previewLink, this.infoLink, this.canonicalVolumeLink, this.description);
      alert('ok!');
    },
    onKeydown (event) {
      const char = String.fromCharCode(event.keyCode)
      if (!/[0-9]/.test(char)) {
        event.preventDefault()
      }
    },
    triggerFunction: function(imageLinks, title, subtitle, authors, publisher, publishedDate, categories, pageCount, printType,
      averageRating, ratingsCount, maturityRating, contentVersion, language, previewLink, infoLink, canonicalVolumeLink, description){  
      this.$store.dispatch('triggerFunction',{ imageLinks, title, subtitle, authors, publisher, publishedDate,
      categories, pageCount, printType, averageRating, ratingsCount, maturityRating, contentVersion, language, previewLink, infoLink, canonicalVolumeLink, description})
    }
  }
}
</script>

<style>
.form div input, form div textarea{
  border: groove;
  margin-bottom: 15px;
  width: 400px;

}
.form div label{
  display: inline-block;
  width: 140px;
  text-align: right;
}

.form div span{
  border: groove;
  margin-bottom: 5px;
  width: 400px;
  text-align: right;
}

.msg-errors{
  color: red;
}
::placeholder { 
  color: rgb(211, 102, 102);
}
</style>