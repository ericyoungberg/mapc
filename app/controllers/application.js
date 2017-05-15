import Ember from 'ember';

export default Ember.Controller.extend({

  copyrightYear: Ember.computed(() => {
    return (new Date()).getFullYear();
  }),

});
