const { override, typeful } = require('otfunc');

module.exports = class CommandRegister {
  constructor() {
    this.registerObj = {};
    this.receiveObj = {};

    this.register = override([
      typeful(
        [Object],
        function (obj) {
          let newObj = {};
          const dfs = (obj, path) => {
            if (typeof obj === 'function') {
              newObj[path.slice(1)] = obj;
            };
            if (typeof obj === 'object') {
              for (let i of Object.keys(obj)) dfs(obj[i], path + '.' + i);
            }
          }
          dfs(obj, '');
          Object.assign(this.registerObj, newObj);
        }
      ),
      typeful(
        [String, Function],
        function (key, func) {
          this.registerObj[key] = func;
        }
      )
    ]);

    this.receive = override([
      typeful(
        [Object],
        function (obj) {
          let newObj = {};
          const dfs = (obj, path) => {
            if (typeof obj === 'function') {
              newObj[path.slice(1)] = obj;
            };
            if (typeof obj === 'object') {
              for (let i of Object.keys(obj)) dfs(obj[i], path + '.' + i);
            }
          }
          dfs(obj, '');
          Object.assign(this.receiveObj, newObj);
        }
      ),
      typeful(
        [String, Function],
        function (key, func) {
          this.receiveObj[key] = func;
        }
      )
    ]);
  }
};
