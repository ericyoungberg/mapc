import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('results', function() {
    this.route('by-year', {path: '/:year'}, function() {
      this.route('state', {path: '/:state'});
    });
  });
});

export default Router;
