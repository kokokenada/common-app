declare let require;

let angularCore;
let injectionJs;
let Injectable;

try {
  angularCore = require('@angular-core');
} catch (e) {

}
try {
  injectionJs = require('injection-js');
} catch (e)
{

}

if (!angularCore && !injectionJs) {
  throw ("Injectable wrapper requires injection-js or @angular-core to be imported");
} else if (angularCore) {
  Injectable = angularCore.Injectable;
} else if (injectionJs) {
  Injectable = injectionJs.Injectable;
} else {
  throw 'unexpected state'
}
export { Injectable };
