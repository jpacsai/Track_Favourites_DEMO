<template>
    <li :class="{ future: future }" class="book_li">
      <p class="order-num">{{ this.num }}</p>
      <!-- BOOK THUMBNAIL IMAGE -->
      <div class="img-container">
        <a :href="sourceUrl" target='_blank'><img :src="image"/></a>
      </div>
      <!-- / -  -  -  -  - / - INFO SECTION - / -  -  -  -  - / -->
      <div class='info'>
        <!-- TITLE -->
        <p class='title'>{{ this.title }}<span v-if="this.series === true && (this.section === 'library' || this.series === true && view !== 'series')" @click="searchSeries"> {{ this.serieDisplay }}</span></p>
        <!-- AUTHOR -->
        <p v-if="view === 'search' || section === 'library'" class="author">by <span class='author-link' @click='authorBooks'>{{ this.author }}</span> - {{ this.year }}</p>
        <!-- RELEASE YEAR -->
        <p v-if="view !== 'search'" class="author">{{ this.year }}</p>
        <!-- / -  -  -  -  - / - RATINGS - / -  -  -  -  - / -->
        <div class="ratings" >
          <!-- STAR RATING -->
          <svg width="100px" height="25px" viewBox="0 0 100 25" >
            <path d="M9.29 1.1 L3.3 21.78 L19.8 8.58 L0 8.58 L16.5 21.78
                     M28.29 1.1 L22.3 21.78 L38.8 8.58 L19 8.58 L35.5 21.78
                     M47.29 1.1 L41.3 21.78 L57.8 8.58 L38 8.58 L54.5 21.78
                     M66.29 1.1 L60.3 21.78 L76.8 8.58 L57 8.58 L73.5 21.78
                     M85.29 1.1 L79.3 21.78 L95.8 8.58 L76 8.58 L92.5 21.78" 
                  :fill="'url(#grad-' + this.id + ')'" stroke="transparent" />
            <defs>
              <linearGradient :id="'grad-' + this.id" x1="0" y1="0" x2="1" y2="0">
                <stop :id="'stop1-' + this.id" offset="0%" stop-color="transparent"/>
                <stop :id="'stop2-' + this.id" offset="0%" stop-color="lightgrey" />
              </linearGradient>
            </defs>
          </svg>
          <!-- NUMBER RATING -->
          <p>{{ this.rating }} avg rating</p>
        </div> 
      </div>
      <!-- / -  -  -  -  - / - DETAIL SECTION - / -  -  -  -  - / -->
      <div class="details">
        <!-- BOOK'S POSITON IN SERIES -->
        <p v-if="view === 'series' && section === 'explorer' && this.position" class="serie-position">BOOK <span>{{ this.position }}</span></p>
        <!-- FUTURE RELEASE DATE -->
        <p class="future-release" v-if='this.future === true'>Coming on {{ this.release }}</p>
      </div>
      <!-- / -  -  -  -  - / - LIBRARY DETAILS SETTINGS - / -  -  -  -  - / -->
      <div v-if='this.liked === true || this.section === "library"' class="shelf-container" >
        <!-- SHELF SETTINGS -->
        <select :value="this.shelf" @change="selectChange">
          <option value="want">Want to read</option>
          <option value="reading">Currently reading</option>
          <option value="read">Read</option>
        </select>
        <!-- OWNERSHIP CHECKBOX -->
        <input type="checkbox" name="ownership" :checked="this.owned" @change="ownerChange"> I have it<br>
      </div> 
      <!-- / -  -  -  -  - / - LIBRARY REMOVE ICON - / -  -  -  -  - / -->
      <div v-if='this.section === "library"' class="heart-container">
        <img class='heart' v-bind:src="removeIcon" @mouseover="removeIconToggle" @mouseout="removeIconToggle" alt="remove icon" @click='removeBook'/>
      </div>
      <!-- / -  -  -  -  - / - LIKE ICON - / -  -  -  -  - / -->
      <div v-if='this.section !== "library"' class="heart-container">
        <!-- NOT LIKED -->
        <img class='heart' v-if='this.liked === false' src="../assets/heart_empty.svg" alt="heart" @click='likeToggle'>
        <!-- LIKED -->
        <img class='heart' v-if='this.liked === true' src="../assets/heart_red.svg" alt="heart" @click='likeToggle'>
      </div>
    </li>
</template>

<script>
import * as d3 from 'd3'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'book',
  computed: {
    ...mapState('book', {
      section: state => state.section
    }),
    ...mapState('book/library', {
      library: state => state.myBooks
    }),
    ...mapState('book/newBooks', {
      view: state => state.view,
      authorName: state => state.authorName,
      authorId: state => state.authorId
    })
  },
  props: {
    book: Object,
    shelf: String,
    owned: Boolean,
    num: Number,
    id: Number,
    title: String,
    serieTitle: String,
    serieDisplay: String,
    image: String,
    rating: Number,
    year: String,
    sourceUrl: String,
    series: Boolean,
    release: String,
    future: Boolean,
    author: String,
    authorid: Number,
    position: String
  },
  data () {
    return {
      liked: false,
      removeIcon: require('../assets/remove_empty.svg'),
      emptyIcon: require('../assets/remove_empty.svg'),
      fullIcon: require('../assets/remove_full.svg')
    }
  },
  mounted () {
    if (this.section !== 'library') {
      this.checkLike()
    }
    this.addStarRating()
  },
  methods: {
    ...mapActions('book/newBooks', ['search_series', 'fetch_new_authorBooks']),
    ...mapActions('book/library', ['saveBook', 'deleteBook', 'updateBook']),
    ...mapActions('reminder', ['extractReminder', 'deleteReminder']),
    ...mapMutations('book', ['SET_SECTION']),
    setSection (payload) {
      this.SET_SECTION(payload)
    },
    selectChange (e) {
      const value = e.target.value
      const bookObj = Object.assign({}, this.book)
      bookObj.shelf = value
      this.updateBook([this.id, bookObj])
    },
    ownerChange () {
      const bookObj = Object.assign({}, this.book)
      bookObj.owned = !bookObj.owned
      console.log(bookObj.owned)
      this.updateBook([this.id, bookObj])
    },
    removeIconToggle () {
      this.removeIcon = this.removeIcon === this.fullIcon ? this.emptyIcon : this.fullIcon
    },
    likeToggle () {
      this.liked = !this.liked
      if (this.liked === true) {
        const bookObj = Object.assign({shelf: 'reading'}, this.book)
        this.saveBook(bookObj)
        if (this.future === true) {
          this.extractReminder([bookObj, 'book'])
        }
      } else {
        this.removeBook()
        if (this.future === true) {
          this.removeReminder()
        }
      }
    },
    checkLike () {
      const i = this.id
      const incl = this.library.some(b => b.id === i)
      if (incl === true) {
        this.liked = true
      }
    },
    removeBook () {
      this.deleteBook(this.book.id)
      if (this.future === true) {
        this.removeReminder()
      }
    },
    removeReminder () {
      this.deleteReminder(this.book.id)
    },
    searchSeries () {
      if (this.section === 'library') {
        this.setSection('explorer')
      }
      this.search_series([
        this.id,
        this.serieTitle,
        this.authorName || this.author,
        this.authorId || this.authorid,
        this.library
      ])
    },
    authorBooks () {
      if (this.section === 'library') {
        this.setSection('explorer')
      }
      this.fetch_new_authorBooks([this.author, this.authorid, this.library])
    },
    addStarRating () {
      const color = this.rating >= 4 ? 'limegreen' : this.rating >= 3 ? 'palegreen' : this.rating >= 2 ? 'gold' : 'red'

      d3.select('#stop1-' + this.id)
        .attr('offset', this.rating * 20 + '%')
        .attr('stop-color', color)

      d3.select('#stop2-' + this.id)
        .attr('offset', this.rating * 20 + '%')
    }
  }
}
</script>
