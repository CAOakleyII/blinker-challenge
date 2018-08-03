<template>
  <div class="home">
    <div class="home__searchbox">
      <Search/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

import { GET_VEHICLES } from '@/store/action-types.js'

export default {
  name: 'home',
  mounted () {
    this.getVehicles()
  },
  methods: {
    getVehicles () {
      this.$store.dispatch(GET_VEHICLES)
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
