import Ember from 'ember';

export default Ember.Component.extend({

  width: 960,
  height: 500,

  didRender() {
    const results = this.get('results');

    console.log(results);

    const projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([this.get('width')/2, this.get('height')/2]);

    const path = d3.geo.path().projection(projection);

    // Find the winners for each state
    let winner, state, competitors;
    const winners = Object.values(results).reduce((winners, result) => {
      competitors = Object.values(result);

      state = competitors[0].state;
      winners[state] = Object.values(result).reduce((winning, competitor) => {
        return (winning.votes > competitor.votes) ? winning : competitor;
      });
    
      return winners;
    });

    console.log(winners);
  }
  

});
