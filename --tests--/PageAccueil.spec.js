// PageAccueil.spec.js

import { mount } from '@vue/test-utils';
import PageAccueil from '@/components/PageAccueil.vue';

describe('PageAccueil.vue', () => {
  it('affiche correctement les films', () => {
    const films = [
      { name: 'Film 1', description: 'Description 1' },
      { name: 'Film 2', description: 'Description 2' },
      { name: 'Film 3', description: 'Description 3' },
    ];

    const wrapper = mount(PageAccueil, {
      props: { films },
    });

    const filmsRendus = wrapper.findAll('.film');
    expect(filmsRendus.length).toBe(films.length);
    films.forEach((film, index) => {
      expect(filmsRendus.at(index).text()).toContain(film.name);
      expect(filmsRendus.at(index).text()).toContain(film.description);
    });
  });

  it('navigue vers la page de détails lorsqu\'un film est cliqué', async () => {
    const films = [
      { name: 'Film 1', description: 'Description 1' },
      { name: 'Film 2', description: 'Description 2' },
      { name: 'Film 3', description: 'Description 3' },
    ];

    const wrapper = mount(PageAccueil, {
      props: { films },
    });

    await wrapper.find('.film').trigger('click');
    // Ajoutez ici vos attentes concernant la navigation vers la page de détails
  });
});
