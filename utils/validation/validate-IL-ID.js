exports.validateILID = (id) => {
  const idRegex = /^[1-9]\d{8}$/; // Israeli ID format: 9 digits, first digit cannot be 0
  return idRegex.test(id);
};
