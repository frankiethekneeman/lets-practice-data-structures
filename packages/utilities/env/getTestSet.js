function getTestSet(userImplementations, referenceImplementations) {
  const implMap = {
    all: [...userImplementations, ...referenceImplementations],
    reference: referenceImplementations,
    user: userImplementations
  }
  return implMap[(process.env.TEST_SET || '').toLowerCase()] || userImplementations
}

module.exports = getTestSet;
