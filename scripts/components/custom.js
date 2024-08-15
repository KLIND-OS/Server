String.prototype.format = function (...args) {
  return this.replace(/{}/g, function () {
    return args.shift();
  });
};
