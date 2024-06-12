import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import fetchFilms from './ListeFilms.vue'; // Assurez-vous de spécifier le bon chemin vers votre composant

describe('fetchFilms', () => {
    it('should render films correctly', () => {
      // Données de test pour les films
      const films = [
        { titre: 'Film 1', description: 'Description du film 1', rating: 4 },
        { titre: 'Film 2', description: 'Description du film 2', rating: 3 }
      ];
  
      // Montage du composant FilmDisplay avec les données de test
      const wrapper = shallowMount(fetchFilms, {
        propsData: { films }
      });
  
      // Vérification de l'affichage des films
      const filmElements = wrapper.findAll('.film');
      expect(filmElements).to.have.lengthOf(films.length);
  
      // Vérification du contenu des films
      filmElements.forEach((filmElement, index) => {
        expect(filmElement.find('.film-title').text()).to.equal(films[index].titre);
        expect(filmElement.find('.film-description').text()).to.equal(films[index].description);
        expect(filmElement.find('.film-rating').text()).to.equal(films[index].rating.toString());
      });
    });
  });
  