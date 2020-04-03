const wrap = (value) => JSON.stringify({value, timestamp: Date.now()});

const unwrap = (datum) => JSON.parse(datum);

const getKey = (key) => `wiregoose-token-${key}`;

const get = (key, {age}) => {
  const rawDatum = window.localStorage.getItem(getKey(key));
  const datum = rawDatum && unwrap(rawDatum);
  return datum && datum.timestamp + age > Date.now() ? datum.value : null;
};

const set = (key, value) => window.localStorage.setItem(getKey(key), wrap(value));

export default {get, set};
