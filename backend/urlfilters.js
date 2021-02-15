/*
This is applied to filter out common special characters that may mess
with URL paths to backend images.
*/

exports.filterURL = function filterURL(filteredstring) { stringreturn = filteredstring
  .toLowerCase()
  .replace(/[^a-z0-9]+/g,'-')
  return stringreturn
}

