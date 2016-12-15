---
title: "Object Creation in Javascript: Functional Instantiation vs Prototypal Instantiation vs Pseudo Classical Instantiation"
date: "2013-08-08T08:14:05.284Z"
layout: post
path: "/object-creation-in-javascript-functional-instantiation-vs-prototypal-instantiation-vs-pseudo-e9287b6bbb32/"
---

Object creation in Javascript can be a pretty hairy subject with so many
different types of techniques to create an Object. In this post I hope to cover
four different types of techniques and discuss the pros and cons of each. I’ll
be covering Functional Instantiation, Functional Instantiation with Shared
Methods, Prototypal Instantiation, and Pseudo Classical Instantiation.

First off, there is just the manual way to create an object. An example would
look like this:

```
var tyler = {}; //create an empty object
tyler.name = "Tyler"; //assign properties to that object
tyler.age = 23;
tyler.homeState = "Utah";
tyler.sayName = function(){
   alert(tyler.name);
}
```

This is not very effective. If we wanted to create another “person” we would
have to re-code the entire object like below.

```javascript
var joey = {}; //create an empty object
joey.name = "Joey"; //assign properties to that object
joey.age = 25;
joey.homeState = "Arkansas";
joey.sayName = function(){
   alert(joey.name);
}
```

Obviously this technique is not very effective if we have large code bases that
are dealing with very similar objects.

Let’s not examine the Functional Instantiation technique for creating an
object.<br> There really are two ways to do this, first:

```javascript
var person = function(name, age, homeState){
   return {
     name: this.name,
     age: this.age,
     homeState: this.homeState,
     sayName: function(){
        alert(this.name);
     }
   }
}
```

and the second way of writing this is

```javascript
var person = function(name, age, homeState){
  var results = {};
  results.name = name;
  results.age = age;
  results.homeState = homeState;
  results.sayName = function(){
   alert(results.name);
 }
}
```

That’s much better than what we had earlier. Now all we need to do to create a
new object is

```javascript
var Tyler = person("Tyler", 23, "Utah");
var Joey = person("Joey", 25, "Arkansas");
```

This way is not only pretty on the eyes, it seems to flow better than other
techniques and you’re able to have real “private” variables if you set up your
closure functions correctly. This isn’t possible on other the other techniques
I’m going to talk about.

Next we have Functional Instantiation with Shared Methods.<br> You’ll notice
above that every time we call the person function, we’re creating a new
sayName() function. Why not just create another object outside out function,
then create a sayName property of that object then reference that new object
every time we want to use sayName?

Let’s see what this looks like below.

```javascript
var person = function(name, age, homeState){
  var results = {};
  results.name = name;
  results.age = age;
  results.homeState = homeState;
  results.sayName = personMethod.sayName;
}

var personMethod = {};
personMethod.sayName = function(){
  alert(this.name);
}

//later
var Tyler = person("Tyler", 23, "Utah");
var Joey = person("Joey", 25, "Arkansas");

```

Now whenever we call the person function, we’re referencing that
personMethod.sayName method rather than creating a new one each time.<br> Now is
when things start to get a little tricky.

Prototypical Instantiation is another way to create an object.

```javascript
var person = function(name, age, homeState){
  var result = Object.create(person.prototype);
  result.name     = name;
  result.age  = age;
  result.homeState = homeState;

  return result;
};

person.prototype.sayName = function(){
  alert(this.sayName);
};

// Later
var tyler = new person("Tyler", 23, "Utah");
var joey = new person("Joey", 25, "Arkansas");
```

In the code above, the result variable is now able to delegate to
person.prototype on failed look-ups. For example, when we say person.sayName(),
the browser checks for sayName on the person object, doesn't find it, so it
delegates to the prototype, where it is found and returned.

Now let's analyze the most common approach: Pseudo Classical Instantiation

```javascript
var person = function(name, age, homeState){
  /* this = Object.create(Car.prototype) */
  this.name     = name;
  this.age  = age;
  this.homeState = homeState;

  /* return this */
};

person.prototype.sayName = function(){
  alert(this.sayName);
};

// Later
var tyler = new person("Tyler", 23, "Utah");
var joey = new person("Joey", 25, "Arkansas");
```

So what's going on here is that first, whenever we use the "new" keyword,
Car.prototype is set to be the delegator of the "this" variable whenever a call
on the "this" variable fails. For example, when we say this.sayName(), the
browser first checks the person function for "sayName", when it's not found, (or
when it fails to find it), it delegates to the prototype, which then alerts
this.sayName. This allows our function to be more flexible and really utilize
the "this" keyword. Also, you'll notice that since "this" is automatically added
and returned, there is no need to return that object since it's already doing
that for us. This technique is the industry standard and should be used in most
cases (unless you prefer functional instantiation).