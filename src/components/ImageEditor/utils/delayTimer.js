const delayTimer = (milliseconds) => {
  return new Promise(resolve => setTimeout(() => resolve(), milliseconds));
};

export default delayTimer;