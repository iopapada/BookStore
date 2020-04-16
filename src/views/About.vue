<template>
  <div class="text">
      <h1>On implement requirements</h1>
      <pre>
        # Vue Coding Challenge: Bookstore API
      ### Tasks:
      1. Using the Google Books API, get and show around 10-20 books from any author of your choice. Store `volumeInfo` of results locally in-app.
        - Filter data *(e.g. category, number of authors, average rating, keywords in description.*
        - Sort data *(e.g. average rating, date published, page count)*
      2. Include a form for creating and editing book information
        - Must have form validation: invalid characters (all except numbers, letters, and punctuation).
        - Any other validation(s) of your choice.

      ### Notes:
        - No server required. Deploy front-end on Firebase or Heroku.
        - Avoid using libraries if possible (unless suggested below) and try to demonstrate vanilla JS skill.
        - **Form validation** is the high-priority task.
        - Write unit tests for major brownie points
        - *Suggestion: use Pug and Stylus for simplicity and efficiency*

      ### Suggested/allowed tech:
      - Vuex
      - Vue Router
      - Vuetify
      - Pug
      - Stylus (or equivalent)
      - Jest (or equivalent)

      ### Useful links:
      - Google Books API (https://developers.google.com/books/)
      - Preprocessors with Vue (https://vue-loader.vuejs.org/guide/pre-processors.html)
      - Resource representations (https://developers.google.com/books/docs/v1/reference/volumes#resource)
      </pre>
  </div>
</template>

<style scoped lang="scss">

.text{
    padding-left: 62px;
    pre{
      white-space: pre-wrap;
      white-space: moz-pre-wrap; //firefox
      white-space: -pre-wrap; //opera 4-6
      white-space: -o-pre-wrap; //opera 7
      word-wrap: break-word; //internet explorer
    }
  }

</style>