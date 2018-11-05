<template>
    <li>
        {{ this.author}} - {{ this.title }}
    </li>
</template>

<script>
export default {
  name: 'searchresult',
  props: {
    author: String,
    title: String
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
