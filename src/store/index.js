import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    book:{imageLinks:'', title:'',subtitle:'', authors:'', publisher:'', publishedDate: '', categories: '', pageCount: 0, printType: '', averageRating:0, ratingsCount:0, maturityRating:'', contentVersion:'', language:'', previewLink:'', infoLink:'', canonicalVolumeLink:'', description:''},
    books: [],
  },
  mutations:{
    triggerFunction: (state, payload) => {
        Vue.set(state.book, 'imageLinks', payload.imageLinks);
        Vue.set(state.book, 'title', payload.title);
        Vue.set(state.book, 'subtitle', payload.subtitle);
        Vue.set(state.book, 'authors', payload.authors);
        Vue.set(state.book, 'publisher', payload.publisher);
        Vue.set(state.book, 'publishedDate', payload.publishedDate);
        Vue.set(state.book, 'categories', payload.categories);
        Vue.set(state.book, 'pageCount', payload.pageCount);
        Vue.set(state.book, 'printType', payload.printType);
        Vue.set(state.book, 'averageRating', payload.averageRating);
        Vue.set(state.book, 'ratingsCount', payload.ratingsCount);
        Vue.set(state.book, 'maturityRating', payload.maturityRating);
        Vue.set(state.book, 'contentVersion', payload.contentVersion);
        Vue.set(state.book, 'language', payload.language);
        Vue.set(state.book, 'previewLink', payload.previewLink);
        Vue.set(state.book, 'infoLink', payload.infoLink);
        Vue.set(state.book, 'canonicalVolumeLink', payload.canonicalVolumeLink);
        Vue.set(state.book, 'description', payload.description);
        state.books.push(state.book);
    },
  },
  actions:{
      triggerFunction: (context, payload) => {
          context.commit('triggerFunction', payload)
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
      return state.books.filter(bks => bks.volumeInfo.pageCount<100);
    },
    getMediumBooks( state ){
      return state.books.filter(bks => bks.volumeInfo.pageCount>=100 && bks.volumeInfo.pageCount<=300);
    },
    getLargeBooks( state ){
      return state.books.filter(bks => bks.volumeInfo.pageCount>300 );
    },
    getAllBooks( state ){
      return state.books
    }
  }
})
