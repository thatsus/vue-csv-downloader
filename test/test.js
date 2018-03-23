import Vue from 'vue';

// PhantomJS doesn't have Promises, so we need to supply them. But if it ever
// gets them, this should let us seamlessly use the native ones.
if (!global.Promise) {
    global.Promise = require('promise');
}

/**
 * In many tests we have to wait for more than one call to nextTick() before 
 * a Vue component is in the state we need. This makes it easy.
 * @param  number n how many times to wait
 * @return Promise  calls `then` after two tick cycles
 */
Vue.waitTicks = function (n) {
    var promise = this.nextTick();
    for (var i = 1; i < n; i++) {
        promise = promise.then(() => this.nextTick());
    }
    return promise;
};

// Require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
var testsContext = require.context('./', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
