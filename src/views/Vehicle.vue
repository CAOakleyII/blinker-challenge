<template>
  <div class="vehicle">
    <div class="vehicle__search">
      <router-link to="/"> Back to Search </router-link>
    </div>
    <div v-if="vehicle" class="vehicle__profile">
        <div class="vehicle__image">
          <div v-if="!paginatedVehicles" class="vehicle__image-spinner spinner startup-spinner"></div>
          <img :src="vehicle.image_url" />
        </div>
        <div class="vehicle__details">
          <label class="vehicle__name"> {{vehicle.year}} {{vehicle.make}} {{vehicle.model}} </label>
          <label class="vehicle__mileage"> {{vehicle.mileage}} miles </label>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vehicle',
  data () {
    return {
      vehicle: undefined
    }
  },
  mounted () {
    this.vehicle = this.$route.params
  }
}
</script>

<style lang="scss" scoped>
.vehicle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__profile {
    width: 100%;
  }

  &__image {
    margin: auto;
    width: 33%;
    position: relative;
    min-height: 300px;
    img {
      min-width: 50%;
      max-width: 100%;
      top: 5px;
      position: relative;
      border-bottom: none;
    }
    &-spinner {
      z-index: -1;
    }

    @media only screen and (max-width: 991px) {
      width: 95%;
    }
  }

  &__details {
    background-color: #2c2c2c;
    color: #fff;
    width: 33%;
    margin: auto;
    text-align: center;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid black;
    border-top: none;
    padding: 15px 0 5px;
    label {
      display: block;
      max-height: 95vh;
    }

    @media only screen and (max-width: 991px) {
      width: 95%;
    }
  }

  &__name {
    font-size: 1.1rem;
    display: block;
  }

  &__mileage {
    display: block;
    padding: 10px 0;
    font-size: 0.9rem;
  }

  &__search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: left;
    padding: 0.4rem 0;
    z-index: 1;
    a {
      padding-left: 0.4rem;
      text-decoration: none;
      color: #ffffff;
      &:hover {
        color:#61a8dd;
      }
    }
  }
}
</style>
