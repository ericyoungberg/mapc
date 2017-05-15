import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(transition) {
    const yearFromRouter = String(transition.params['results.by-year'].year);
    const validYears = ['2004', '2008', '2012', 'current'];
    
    if (!validYears.includes(yearFromRouter)) {
      this.transitionTo('/results/current');
    }
  },

  model(params) {
    return (params.year === 'current') ? [] : Ember.$.ajax({url: `/assets/data/results_${params.year}.json`});
  }

});
