//////////////////////////////////////////////////////
//Function that will delay the execution of a function
//////////////////////////////////////////////////////
const Debounce = (fn, delay) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), delay);
  };
};

export default Debounce;
