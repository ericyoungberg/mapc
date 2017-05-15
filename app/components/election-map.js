import Ember from 'ember';

export default Ember.Component.extend({

  width: 960,
  height: 500,

  didRender() {
    const results = this.get('results');

    const projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([this.get('width')/2, this.get('height')/2]);

    const path = d3.geo.path().projection(projection);
  }
  

});
