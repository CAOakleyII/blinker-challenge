import { shallowMount } from '@vue/test-utils'
import Results from '@/components/Results.vue'
describe('Results.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Results, {
      propsData: {
        vehicles: mockResultVehicles
      }
    })

    wrapper.setData({ page: 1, size: 2 })
  })

  it('renders the vehicles provided', () => {
    expect(wrapper.contains('.results__vehicle')).toBeTruthy()
  })
  it('returns initial pagination', () => {
    expect(wrapper.vm.paginatedVehicles).toHaveLength(2)
  })

  it('increments pagination based on size', () => {
    wrapper.vm.nextPage()
    expect(wrapper.vm.paginatedVehicles).toHaveLength(4)
  })

  it('sorts results by year', () => {
    wrapper.vm.size = 4
    wrapper.vm.sortby = 'year'
    expect(wrapper.vm.paginatedVehicles[0].year).toBeLessThan(wrapper.vm.paginatedVehicles[3].year)
  })

  it('sorts results by mileage', () => {
    wrapper.vm.size = 4
    wrapper.vm.sortby = 'mileage'
    expect(wrapper.vm.paginatedVehicles[0].mileage).toBeGreaterThan(wrapper.vm.paginatedVehicles[3].mileage)
  })

  it('sorts results by listing date', () => {
    wrapper.vm.size = 4
    wrapper.vm.sortby = 'listing'
    expect(new Date(wrapper.vm.paginatedVehicles[0].created_at).getTime()).toBeGreaterThan(new Date(wrapper.vm.paginatedVehicles[3].created_at).getTime())
  })
})
const mockResultVehicles = [{
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
  'year': 2011,
  'make': 'Land Rover',
  'model': 'Range Rover',
  'mileage': 7458,
  'drivetrain': '4x4',
  'bodytype': 'SUV',
  'image_url': 'http://st.motortrend.com/uploads/sites/10/2015/09/2014-Range-Rover-Autobiography-Black-Edition-front-three-quarters.jpg',
  'created_at': '2016-12-14T20:13:22.586Z'
},
{
  'year': 2012,
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
}]
