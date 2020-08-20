/**
 *  Get a fixed size array initialized entirely to nulls.
 *  
 *  @param size an integer greater than or equal to zero.
 *  @return a sealed array of size nulls.
 */
function getFixedArray(size) {
  const toReturn = new Array();
  for (let i = 0; i < size; i++) {
    toReturn.push(null);
  }
  Object.seal(toReturn);
  return toReturn;
}

module.exports = getFixedArray;