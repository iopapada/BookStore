<template>
  <div class="item-details">
    <form @submit.prevent="submit" novalidate>
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
        <input type="text" id="title" name="title" :value=volumeInfo.title >
      </div>

      <div>
        <label>Subtitle:</label>
        <input v-if="!volumeInfo.subtitle" placeholder="No information">
        <input v-else id="subtitle" name="subtitle" :value=volumeInfo.subtitle>
      </div>

      <div class="author">
        <label>Author:</label>
        <input v-if="!volumeInfo.authors" placeholder="No information" >
        <span v-else v-for="(author, index) in volumeInfo.authors" :key="index">
          <em contenteditable="true">
            {{
            index + 1 !== volumeInfo.authors.length && index + 1 !== bookitemdetails.volumeInfo.authors.length-1 
            ? author + ', ' : index + 1 == bookitemdetails.volumeInfo.authors.length && index+1 !== 1 
            ? ' and ' + author : author
            }}
          </em>
        </span>
      </div>

      <div>
        <label>Publisher:</label>
        <input v-if="!volumeInfo.publisher" placeholder="No information">
        <input v-else :value=volumeInfo.publisher >
      </div>

      <div>
        <label>Publish Date:</label>
        <input v-if="!volumeInfo.publishDate" placeholder="No information">
        <input v-else id="publishDate" name="publishDate" :value=volumeInfo.publishDate
              v-on:change="event => checkDateFormat(event)"
              v-model="txtDateInput">
      </div> 

      <div>
        <label>Category:</label>
        <input v-if="!volumeInfo.categories" placeholder="No information">
        <span v-else v-for="(category, index) in volumeInfo.categories" :key="index">
          <em contenteditable="true">
            {{ index + 1 !== volumeInfo.categories.length && index + 1 !== bookitemdetails.volumeInfo.categories.length-1 
            ? author + ', ' : index + 1 == bookitemdetails.volumeInfo.categories.length && index+1 !== 1 
            ? ' and ' + category : category }}
          </em>
        </span>
      </div> 

      <div>
        <label>test:</label>
        <input v-if="!volumeInfo.authors" placeholder="No information">
        <input v-else v-for="(autor, index) in volumeInfo.autor" :key="index" value=",">{{autor}}
      </div> 

      <div>
        <label>Page Count: </label>
        <input v-if="!volumeInfo.pageCount" placeholder="No information" @keydown="onKeydown">
        <input v-else id="pageCount" name="pageCount" :value=volumeInfo.pageCount  @keydown="onKeydown">
      </div>

      <div>
        <label>Print type:</label>
        <input v-if="!volumeInfo.printType" placeholder="No information">
        <input v-else id="printType" name="printType" :value=volumeInfo.printType>
      </div>

      <div>
        <label>Average rating:</label>
        <input v-if="!volumeInfo.averageRating" placeholder="No information">
        <input v-else id="averageRating" name="averageRating" :value=volumeInfo.averageRating>
      </div>

      <div>
        <label>Ratings count:</label>
        <input v-if="!volumeInfo.ratingsCount" placeholder="No information">
        <input v-else id="ratingsCount" name="ratingsCount" :value=volumeInfo.ratingsCount>
      </div>

      <div>
        <label>Maturity rating:</label>
        <input v-if="!volumeInfo.maturityRating" placeholder="No information">
        <input v-else id="maturityRating" name="maturityRating" :value=volumeInfo.maturityRating>
      </div>

      <div>
        <label>Content Version:</label>
        <input v-if="!volumeInfo.contentVersion" placeholder="No information">
        <input v-else id="contentVersion" name="contentVersion" :value=volumeInfo.contentVersion>
      </div>

      <div>
        <label>Language:</label>
        <input v-if="!volumeInfo.language" placeholder="No information">
        <input v-else id="language" name="language" :value=volumeInfo.language>
      </div>

      <div>
        <label>Preview link:</label>
        <input v-if="!volumeInfo.previewLink" placeholder="No information">
        <input v-else id="previewLink" name="previewLink" :value=volumeInfo.previewLink>
      </div>

      <div>
        <label>Info link:</label>
        <input v-if="!volumeInfo.infoLink" placeholder="No information">
        <input v-else id="infoLink" name="infoLink" :value=volumeInfo.infoLink>
      </div>

      <div>
        <label>Canonical link:</label>
        <input v-if="!volumeInfo.canonicalVolumeLink" placeholder="No information">
        <input v-else id="canonicalVolumeLink" name="canonicalVolumeLink" :value=volumeInfo.canonicalVolumeLink>
      </div>
      
      <span>Descritpion: </span>
      <div v-if="volumeInfo.description==''?true:false" contenteditable="true" placeholder="There is no description"/>
      <div v-else contenteditable="true">
        {{volumeInfo.description}}
      </div>
      
      <v-btn type="submit" class="button"
      position="relative" dark bottom color=#42b983
      @click="editBook">
        <v-icon>edit</v-icon>
      </v-btn>
    </form>
  </div>
</template>

<script>
//import { required, isNumeric, isValidDateFormat } from "@/validators/bookinfovalidator.js";

export default {
  props: {
    bookitemdetails: {
      type: Object,
      required: false
    }
  },
  messages: {
    required: "{attribute} is required!",
    isNumber: "{attribute} must contain only numbers",
    isValidDateFormat: "{attribute} is not a valid Date format.",
  },
  data() {

  },
  methods: {
    onKeydown (event) {
      const char = String.fromCharCode(event.keyCode)
      if (!/[0-9]/.test(char)) {
        event.preventDefault()
      }
    }
  },
  computed: {
    volumeInfo(){
      return this.bookitemdetails.volumeInfo
    }
  }
}
</script>

<style>
.item-details div input{
  border: groove;
  margin-bottom: 15px;
  width: 400px;
}
.item-details div label{
  display: inline-block;
  width: 140px;
  text-align: right;
}
/* .item-details div span {
  border: groove;
  margin-bottom: 5px;
  width: 400px;
} */
.item-details div span label{
  border: groove;
  margin-bottom: 5px;
  width: 400px;
  text-align: right;

}

::placeholder { 
  color: rgb(211, 102, 102);
}
</style>