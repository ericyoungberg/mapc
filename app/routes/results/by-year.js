import Ember from 'ember';

export default Ember.Route.extend({

  currentYear: null,

  beforeModel(transition) {
    const yearFromRouter = String(transition.params['results.by-year'].year);
    const validYears = ['2004', '2008', '2012', 'current'];
    
    if (!validYears.includes(yearFromRouter)) {
      this.transitionTo('/results/current');
    }
  },

  model(params) {
    this.set('currentYear', params.year);
    return (params.year === 'current') ? [] : Ember.$.ajax({url: `/assets/data/results_${params.year}.json`});
  },


  actions: {

    showStateData(state) {
      const year = this.get('currentYear');
      this.transitionTo(`/results/${year}/${state}`);
    },

  },

});
