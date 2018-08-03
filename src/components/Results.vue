<template>
  <div class="results">

    <div class="results__sortby">
      <label class="results__sortbyOption">
        <input id="rdoSortByNone" type="radio" value="none" v-model="sortby" name="sortby">
        <label for="rdoSortByNone" class="checkmark"> none </label>
      </label>

      <label class="results__sortbyOption">
        <input id="rdoSortByYear" type="radio" value="year" v-model="sortby" name="sortby">
        <label for="rdoSortByYear" class="checkmark"> year </label>
      </label>

      <label class="results__sortbyOption">
        <input id="rdoSortByMileage" type="radio" value="mileage" v-model="sortby" name="sortby">
        <label for="rdoSortByMileage" class="checkmark"> mileage </label>
      </label>

      <label class="results__sortbyOption">
        <input id="rdoSortByListing" type="radio" value="listing" v-model="sortby" name="sortby">
        <label for="rdoSortByListing" class="checkmark"> listing date </label>
      </label>
    </div>

    <div class="results__header">
      <span class="results__column"> Year </span>
      <span class="results__column"> Make </span>
      <span class="results__column"> Model </span>
      <span class="results__column"> Mileage </span>
    </div>

    <div class="results__vehicle" v-for="(vehicle, index) in paginatedVehicles" v-bind:vehicle="vehicle" v-bind:key="index" @click="onVehicleClick(vehicle)">
        <span class="results__column"> {{vehicle.year}} </span>
        <span class="results__column"> {{vehicle.make}} </span>
        <span class="results__column"> {{vehicle.model}} </span>
        <span class="results__column"> {{vehicle.mileage}} </span>
    </div>

    <div class="results__pagination" v-if="paginatedVehicles">
        <span @click="nextPage"> load more... </span>
    </div>

    <div v-if="!paginatedVehicles" class="results__spinner spinner startup-spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    vehicles: {
      type: Array
    }
  },
  data () {
    return {
      page: 1,
      size: 15,
      sortby: 'none'
    }
  },
  computed: {
    paginatedVehicles: function () {
      if (!this.vehicles) {
        return
      }

      let pageSize = this.page * this.size

      // if no sorting is needed, just return the list as is for quicker results
      if (this.sortby === 'none') {
        return this.vehicles.slice(0, pageSize)
      }

      // sort the data before doing pagination
      var sorted = this.vehicles.slice(0).sort((v1, v2) => {
        switch (this.sortby) {
          case 'year':
            return v1.year - v2.year
          case 'mileage':
            return v2.mileage - v1.mileage
          case 'listing':
          default:
            return new Date(v2.created_at) - new Date(v1.created_at)
        }
      })

      // return the sorted paginated data
      return sorted.slice(0, pageSize)
    }
  },
  methods: {
    onVehicleClick (vehicle) {
      this.$router.push({ name: 'vehicle', params: vehicle })
    },
    nextPage () {
      this.page++
    }
  }
}
</script>

<style lang="scss" scoped>
.results {
  color: #ffffff;
  background-color: #2c2c2c;

  &__sortby {
    padding: 0 0.4rem 0.4rem 0.4rem;
    font-size: 0.7rem;
    color: #b5b5b5;
    font-variant: small-caps;
    font-weight: bold;
  }

  &__sortbyOption {
    label {
      &:hover {
      cursor: pointer;
      color: #fff;
      }
    }
    input {
      visibility: hidden;
      &:checked + label {
        color: #61a8dd;
      }
    }
  }

  &__header {
    color: #b5b5b5;
    background-color: #303030;
    padding: 5px 0px;
    border: 1px solid rgba(20,20,20, 0.5);
  }

  &__vehicle {
    padding: 3px 0;
    border-left: 1px solid rgba(20,20,20, 0.5);
    border-right: 1px solid rgba(20,20,20, 0.5);
    border-bottom: 1px solid rgba(97,168,221,0.15);
    &:nth-last-child() {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(20,20,20, 0.5);
      cursor: pointer;
    }
  }

  &__column {
    width: 25%;
    display: inline-block;
  }

  &__pagination {
    padding: 15px 0px;
    &:hover {
      cursor: pointer;
      color: #61a8dd;
    }
  }
}
</style>
