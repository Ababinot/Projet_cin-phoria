import { mount } from '@vue/test-utils';
import ListeFilms from '@/components/ListeFilms.vue';

describe('ListeFilms', () => {
  test('renders correctly', () => {
    const wrapper = mount(ListeFilms);
    expect(wrapper.text()).toContain('Hello, world!');
  });
});