import Ember from 'ember';

export default Ember.Component.extend({

  width: 800,
  height: 500,

  usPaths: null,

  didRender() {
    this.renderMap();
  },


  renderMap() {
    const results = this.get('results');

    const projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([this.get('width')/2, this.get('height')/2]);

    const path = d3.geo.path().projection(projection);

    /**
     * We must remove the svg element if there is one. Otherwise we
     * will not be able to render the map with the new dataset.
     */
    const svg = document.querySelector('.election-map > svg');
    if (svg) {
      svg.parentNode.removeChild(svg);
    }

    d3.select('.election-map')      
      .append('svg')
      .attr('class', 'states')
      .attr('height', this.get('height'))
      .attr('width', this.get('width'));


    /**
     * Collect the winners of each state so we will know how to
     * color our map later.
     */
    let winners = {};
    if (Object.values(results).length === 0) {
      this.set('noData', true);
    }
    else {
      this.set('noData', false);
      // Find the winners for each state
      let winner, state, competitors;
      winners = Object.values(results).reduce((winners, result) => {
        competitors = Object.values(result);

        state = competitors[0].state; // We need to get the current state from a piece of our data

        winners[state] = Object.values(result).reduce((winning, competitor) => {
          return (winning.votes > competitor.votes) ? winning : competitor;
        });
      
        return winners;
      });
    }


    /**
     * If we don't already have the GeoJSON USA states data loaded,
     * load it in and then render our data.
     *
     * Following code built by referencing http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922
     */
    if (this.get('usPaths') !== null) {
      this.renderData(this.get('usPaths'), path, winners);
    }
    else {
      d3.json('/assets/data/us-paths.json', (err, us) => {
        if (err) throw err;

        this.set('usPaths', us);
        this.renderData(us, path, winners);
      });
    }
        
  },


  renderData(us, path, winners) {
     d3.select('svg')
      .selectAll('path') 
      .data(us.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', stateData => {
        let state = stateData.properties.NAME;

        return (winners[state]) ? winners[state].parties[0].toLowerCase().replace(' ', '-') : '';
      })
      .on('click', stateData => {
        let state = stateData.properties.NAME.toLowerCase().replace(' ', '-');

        this.sendAction('showStateData', state);
      });
  },
  

});
