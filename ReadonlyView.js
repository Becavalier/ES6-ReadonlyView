/**
 * @fileOverview ReadonlyView
 * @author       yhorg@hotmail.com
 * @version      0.1.0
 * @license
 * SwiftSlide Copyright (c) 2016 YHSPY (https://www.yhspy.com/)
 *
 * https://github.com/Becavalier/ReadonlyView
 *
 * License:: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

;(function(name, context, definition){

    context[name] = definition;

})("ReadonlyView", this, function(obj){

    var self = this;

    this.nope = function(){
        console.error("Sorry, you can't modify read-only view.");
    };

    this.handler = {
        set: this.nope,
        defineProperty: this.nope,
        deleteProperty: this.nope,
        preventExtensions: this.nope,
        setPrototypeOf: this.nope,
        get: function (target, key, receiver) {

            // Hijack the operation
            var result = Reflect.get(target, key, receiver);

            // If what we get is an object, make it read only
            if (Object(result) === result) {
                return new Proxy(result, self.handler);
            }

            return result;

        },
        getPrototypeOf: function (target, key, receiver) {

            // Hijack the operation
            var result = Reflect.getPrototypeOf(target);

            // If what we get is an object, make it read only
            if (Object(result) === result) {
                return new Proxy(result, self.handler);
            }

            return result;

        },
        getOwnPropertyDescriptor: function (target, key, receiver) {

            // Hijack the operation
            var result = Reflect.getOwnPropertyDescriptor(target, key);

            // If what we get is an object, make it read only
            if (Object(result) === result) {
                return new Proxy(result, self.handler);
            }

            return result;

        }
    };

    return new Proxy(obj, this.handler);

});
