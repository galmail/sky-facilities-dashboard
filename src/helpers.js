// helpers.js

module.exports = {
  
  getLine: ({ d3, x, y }) => {
    return d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));
  },

  getDomainX: ({ d3, data }) => {
    return d3.extent(data, d => d.date);
  },

  getDomainY: ({ d3, data }) => {
    const maxValue = d3.max(data, d => d.value);
    return [0, maxValue];
  },

}
