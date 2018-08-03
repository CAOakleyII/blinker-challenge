<template>
  <div class="search">
    <input type="text" class="search__textbox" v-model="searchText" placeholder="Search" @keyup.enter="onSearchKeyUp" />
    <div class="search__results">
      <Results v-bind:vehicles="filteredVehicles" />
    </div>
  </div>
</template>

<script>
import Results from '@/components/Results.vue'

export default {
  name: 'Search',
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    filteredVehicles: function () {
      let vehicles = this.$store.state.vehicles.vehicles.slice(0)
      let keywords = this.searchText.toLowerCase().split(' ')

      // If there's no search text, we can shortcut the search and return all vehicles
      if (this.searchText.trim() === '') {
        return vehicles
      }

      // Return the filtered array of vehicles based on keyword searches
      return vehicles.filter(vehicle => {
        let fullMatch = true

        // loop through each word in the search, do an AND check
        // e.g. If a user searches "1999 Honda" it will only return 1999 Honda's
        // not all 1999 cars and all hondas
        // Some partials are allowed - "Range" will find "Range Rover"
        // however it will not find a car named "Ranger"
        keywords.forEach(keyword => {
          if (keyword === '') {
            return
          }
          let makeMatch = false
          let modelMatch = false
          let yearMatch = false
          let make = vehicle.make.toLowerCase()
          let model = vehicle.model.toLowerCase()

          keyword = keyword.toLowerCase()

          // check make
          if (keyword !== make) {
            if (make.includes(' ')) {
              makeMatch = make.split(' ').includes(keyword)
            }
          } else {
            makeMatch = true
          }

          // check model
          if (keyword !== model) {
            if (model.includes(' ')) {
              modelMatch = model.split(' ').includes(keyword)
            }
          } else {
            modelMatch = true
          }

          // check year
          if (keyword === vehicle.year.toString()) {
            yearMatch = true
          }

          // if nothing matches, remove this vehicle from the list.
          if (!makeMatch && !modelMatch && !yearMatch) {
            fullMatch = false
          }
        })

        // if each keyword is within the vehicles, make/model/year it's a match return true.
        return fullMatch
      })
    }
  },
  components: {
    Results
  }
}
</script>

<style scoped lang="scss">
.search {
  background-color: #242323;

  &__textbox {
    font-size: 1rem;
    padding: 0.4rem 0;
    border: none;
    border-bottom: 2px solid #ffffff;
    background-color: rgba(0,0,0,0);
    outline: 0;
    color: #ffffff;
    width: 100%;
    text-align: center;
    margin: 5px 0px;
     &::-webkit-input-placeholder {
      color: #ecebe8;
      font-weight: 200;
      font-size: 1rem;
      letter-spacing: 1px;
      text-align: center;
    }
  }
}
</style>
