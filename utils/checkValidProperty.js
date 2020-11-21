const checkValidProperties = (objectToCheck, validPropertiesArray) => {
  // Check if all the properties in req.body.user is a valid property
  return Object.keys(objectToCheck).every((key) =>
    validPropertiesArray.includes(key),
  );
};

module.exports = checkValidProperties;
