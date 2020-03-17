import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    book:{imageLinks:'', title:'',subtitle:'', authors:'', publisher:'', publishedDate:'', categories:[], pageCount: 0, printType: '', averageRating:0, ratingsCount:0, maturityRating:'', contentVersion:'', language:'', previewLink:'', infoLink:'', canonicalVolumeLink:'', description:''},
    books: [],
  },
  mutations:{
    triggerFunction: (state, bookData) => {
      state.books.push(bookData);
    },
    updateVXFunc: (state, bookData) => {
      var selectedBook = state.books.find(item => item.id === bookData.id);
      state.books[selectedBook] = bookData;
      //Object.assign(selectedBook, bookData);
  }
  },
  actions:{
      triggerFunction: (context, bookData) => {
          context.commit('triggerFunction', bookData)
      },
      updateVXFunc: (context, bookData) => {
        context.commit('updateVXFunc', bookData)
      }
  },
  modules: {
  },
  getters: {
    getOrderBy( state ){
      return state.orderBy;
    },
    getOrderDirection( state ){
      return state.orderDirection;
    },
    getSmallBooks( state ){
      return state.books.filter(bks => bks.pageCount<100);
    },
    getMediumBooks( state ){
      return state.books.filter(bks => bks.pageCount>=100 && bks.pageCount<=300);
    },
    getLargeBooks( state ){
      return state.books.filter(bks => bks.pageCount>300 );
    },
    getAllBooks( state ){
      return state.books
    }
  }
})
