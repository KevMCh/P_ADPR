/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Transform a token object into an exception object and throw it.
//  http://stackoverflow.com/questions/17857670/javascript-prototype-throw-the-error-as-object-object-object-has-no-method
// Thanks Eliasib for pointing the error
if (typeof Object.create !== 'function') {
   Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
   };
}



Object.constructor.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};

(function () {
   var parse = make_parse();
   console.log("Esto funciona");

   function go(source) {
      var string, tree;
      try {
         tree = parse(source);
         string = JSON.stringify(tree, ['key', 'name', 'message',
         'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
      } catch (e) {
         string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
         'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
      }
      document.getElementById('OUTPUT').innerHTML = string
      .replace(/&/g, '&amp;')
      .replace(/[<]/g, '&lt;');
   }
      document.getElementById('PARSE').onclick = function (e) {
         go(document.getElementById('INPUT').value);
      };
   }());
