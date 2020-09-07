function seq(start, stop, step = 1) {
  if ((stop - start) / step < 0) {
    throw new Error('Cannot generate infinite lists.');
  }

  const limit = stop * step;

  const toReturn = []

  for (let i = start; (step * i) < limit; i += step) {
    toReturn.push(i);
  }

  return toReturn;
}

module.exports = seq;
