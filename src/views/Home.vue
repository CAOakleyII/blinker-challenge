<template>
  <div class="home">
    <div class="home__searchbox">
      <Search/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import 'whatwg-fetch'
import { SET_VEHICLES } from '@/store/mutation-types.js'

export default {
  name: 'home',
  mounted () {
    this.getVehicles()
  },
  methods: {
    getVehicles () {
      fetch('https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json')
        .then(resp => {
          if (!resp.ok) {
            throw new Error('Error retrieving cars.json', resp.status, resp.statusText)
          }
          return resp.text()
        })
        .then(json => {
          this.$store.commit(SET_VEHICLES, JSON.parse(json))
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__searchbox {
    margin: auto;
    @media only screen and (min-width: 992px) {
      width: 40%;
    }
    @media only screen and (max-width: 991px) {
      width: 98%;
    }
  }
}
</style>
