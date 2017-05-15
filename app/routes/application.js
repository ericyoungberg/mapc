import Ember from 'ember';

export default Ember.Route.extend({

  copyrightYear: Ember.computed(function() {
    return (new Date).getFullYear();
  }),

});
