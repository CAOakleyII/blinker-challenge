import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Search.vue', () => {
  let store
  let wrapper
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        vehicles: {
          vehicles: mockStateVehicles
        }
      }
    })

    wrapper = shallowMount(Search, { store })
  })

  it('searches on year', () => {
    const searchText = '2014'
    wrapper.vm.searchText = searchText
    expect(wrapper.vm.filteredVehicles).toHaveLength(1)
    expect(wrapper.vm.filteredVehicles[0].year).toBe(2014)
  })

  it('searches on make and is case-insensitive', () => {
    const searchText = 'kia'
    wrapper.vm.searchText = searchText
    expect(wrapper.vm.filteredVehicles).toHaveLength(1)
    expect(wrapper.vm.filteredVehicles[0].make).toBe('Kia')
  })

  it('searches on model and is case-insensitive', () => {
    const searchText = 'accent'
    wrapper.vm.searchText = searchText
    expect(wrapper.vm.filteredVehicles).toHaveLength(1)
    expect(wrapper.vm.filteredVehicles[0].model).toBe('Accent')
  })

  it('searches on make with spaces', () => {
    const searchText = 'Land'
    wrapper.vm.searchText = searchText
    expect(wrapper.vm.filteredVehicles).toHaveLength(1)
    expect(wrapper.vm.filteredVehicles[0].make).toBe('Land Rover')
  })

  it('searches on model with spaces', () => {
    const searchText = 'Range'
    wrapper.vm.searchText = searchText
    expect(wrapper.vm.filteredVehicles).toHaveLength(1)
    expect(wrapper.vm.filteredVehicles[0].model).toBe('Range Rover')
  })
})

const mockStateVehicles = [{
  'year': 2013,
  'make': 'Kia',
  'model': 'Optima',
  'mileage': 24235,
  'drivetrain': 'FWD',
  'bodytype': 'sedan',
  'image_url': 'http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg',
  'created_at': '2016-10-14T20:13:22.586Z'
},
{
  'year': 2013,
  'make': 'Hyundai',
  'model': 'Accent',
  'mileage': 21587,
  'drivetrain': 'FWD',
  'bodytype': 'sedan',
  'image_url': 'http://www.conceptcarz.com/images/Hyundai/2013-Hyundai-Accent-Sedan-Image-01.jpg',
  'created_at': '2016-11-14T20:13:22.586Z'
},
{
  'year': 2014,
  'make': 'Nissan',
  'model': 'Juke',
  'mileage': 10457,
  'drivetrain': 'FWD',
  'bodytype': 'CUV',
  'image_url': 'http://www.automobilesreview.com/gallery/2014-nissan-juke-nismo-rs/2014-nissan-juke-nismo-rs-08.jpg',
  'created_at': '2016-10-14T20:13:22.586Z'
},
{
  'year': 2013,
  'make': 'Land Rover',
  'model': 'Range Rover',
  'mileage': 7458,
  'drivetrain': '4x4',
  'bodytype': 'SUV',
  'image_url': 'http://st.motortrend.com/uploads/sites/10/2015/09/2014-Range-Rover-Autobiography-Black-Edition-front-three-quarters.jpg',
  'created_at': '2016-12-14T20:13:22.586Z'
}]
