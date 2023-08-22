const restrictRotationNumber = (number, min = 0, max) => {
  // we are not assigning default value for it as if max was null it will override the default value.
  const currentMax = max || 1000000;
  const convertedNumber = +number;
  const rotateValue = Math.min(Math.max(min, convertedNumber), currentMax);
  return rotateValue == -180 ? 180 : rotateValue == 180 ? -180 : rotateValue;
};

export default restrictRotationNumber;
