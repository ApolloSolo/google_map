const regex = {
    simple_re: /(?<street_number>.*?),(?<route>.*?),(?<city>.*?),(?<state>.*)/,
    replace_space: /\s/g
  };

module.exports = regex