import { shallowMount } from '@vue/test-utils'
import Movie from '@/components/Movie.vue'

describe('Movie.vue', () => {
  it('renders props.title when passed', () => {
    const Title = 'test'
    
    const wrapper = shallowMount(Movie, {
      props: { Title, Year: 1999, imdbID: "Xcateue" }
    })
   // expect(wrapper.).toMatch(Title)
  })
})


