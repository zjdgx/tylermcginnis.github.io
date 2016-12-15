---
title: "Book Review: JavaScript Patterns (4.5/5)"
date: "2014-09-15T08:14:05.284Z"
layout: post
path: "/book-review-javascript-patterns-4-5-5-cc1f22efc4e7/"
---

As someone already very familiar with the JavaScript landscape, it’s difficult
to find a book that’s at the right level. This book does exactly that. In the
first chapter of the book, Stoyan does a fantastic job of covering some
fundamental JavaScript principles that are often glanced over. ‘this’, the new
keyword, hoisting, and closures to name a few. After covering the fundamentals
Stoyan jumps straight into some very interesting design patterns in JavaScript.
As someone coming from a non traditional CS background, it was great to see
someone take famous design patterns like Singletons, Factories, Proxies, and
Decorators and apply them in JavaScript. Though some might complain that this
book is a tad outdated, I actually think that adds to its strength. Many times
we rely on things like bind and Object.create in ES5 but because ES5 was newly
released when this book was created, Stoyan doesn’t assume you’re going to use
its features but does assume you’ll want to shim some of its features for older
browsers. This sheds an interesting light on how some of these patterns in ES5
were created. For example, Object.create is recreated in like this,

```javascript
if(!Object.create){
  Object.create = function(obj){
    var F = function(){};
    F.prototype = obj;
    return F;
  }
}
```

Also, Function.prototype.bind is doing something similar to this under the hood

```javascript
if(typeof Function.prototype.bind === 'undefined'){
  Function.prototype.bind = function(thisArg){
    var fn = this;
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);

    return function(){
      return fn.apply(thisArg, args.concat(slice.call(arguments)));
    }
  }
}
```

Overall, JavaScript Patterns by Stoyan Stefanov is a fantastic book for someone
with prior JavaScript experience who is looking to dive deeper into different
JavaScript patterns and how the language works.