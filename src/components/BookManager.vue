<template>
  <div class="container book">
    <header>
      <h1 class="header">Book Manager</h1>
      <h4 class="section-tabs" :class="sectionClass('library')" @click="setLibrary">My books</h4>
      <h4 class="section-tabs" :class="sectionClass('explorer')" @click="setSection('explorer')">Find books</h4>
    </header>
    
    <mylibrary v-if="this.section === 'library'" />
    <newbooks v-if="this.section === 'explorer'" />

  </div>
</template>

<script>
import mylibrary from './MyLibrary'
import newbooks from './NewBooks'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    mylibrary,
    newbooks
  },
  computed: {
    ...mapState('book/newBooks', {
      today: state => state.today
    }),
    ...mapState('book', {
      section: state => state.section
    })
  },
  data () {
    return {
      newSearch: '',
      loading: false,
      model: {}
    }
  },
  created () {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    this.set_today(now)
  },
  methods: {
    ...mapActions('book/newBooks', [
      'set_today',
      'reset_search'
    ]),
    ...mapMutations('book', [
      'SET_SECTION'
    ]),
    setSection (payload) {
      this.SET_SECTION(payload)
    },
    sectionClass (btn) {
      return this.section === btn ? 'section-tab_active' : ''
    },
    setLibrary () {
      this.setSection('library')
      this.reset_search()
    }
  }
}
</script>
