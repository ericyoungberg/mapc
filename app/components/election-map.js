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

    d3.json('/assets/data/us-paths.json', (err, us) => {
      if (err) throw err;

      const svg = d3.select('.election-map')      
        .append('svg')
        .attr('class', 'states')
        .attr('height', this.get('height'))
        .attr('width', this.get('width'));

      svg.selectAll('path') 
        .data(us.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', stateData => {
          let state = stateData.properties.NAME;

          return (winners[state]) ? winners[state].parties[0].toLowerCase().replace(' ', '-') : '';
        });
    });
  }
  

});
