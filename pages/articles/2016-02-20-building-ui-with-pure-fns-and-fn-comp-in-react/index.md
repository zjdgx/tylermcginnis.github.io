---
title: "Building User Interfaces with Pure Functions and Function Composition in React"
date: "2016-02-20T13:12:03.284Z"
layout: post
path: "/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js-34b999ddeaba/"
---

If you’re reading this you’re probably familiar with the idea of functions. When
to use and when to not use a function probably comes pretty natural to you. In
this post we’re going to learn how to leverage that knowledge to build better
user interfaces.

One of the best parts of React.js is that you can use the same intuition that
you have about functions for when to create new React components. However,
instead of your function taking in some arguments and returning a value, your
function is going to take in some arguments and return some UI. This idea can be
summed up in the following formula, f(d)=V. A Function takes in some Data and
returns a View. This is a beautiful way to think about developing user
interfaces because now your UI is just composed of different function
invocations, which is how you’re already used to building applications and every
benefit that you get from functions is now transferred over to your UI.

Let’s look at some actual code now.

```javascript
var getProfilePic = function (username) {
  return 'https://photo.fb.com/' + username
}

var getProfileLink = function (username) {
  return 'https://www.fb.com/' + username
}

var getProfileData = function (username) {
  return {
    pic: getProfilePic(username),
    link: getProfileLink(username)
  }
}

getProfileData('tylermcginnis')
```

Looking at the code above, we have three functions and one function invocation.
You'll notice our code is very clean and organized because we've separated
everything out into different functions. Each function has a specific purpose
and we're composing our functions by having one function (getProfileData) which
leverages the other two functions (getProfilePic and getProfileLink). Now when
we invoke getProfileData we'll get an object back which represents our user. You
should be very comfortable with the code above. But now what I want to do is
instead of having those functions return some value, let's modify them a bit to
return some UI (in the form of JSX). Here you'll really see the beauty of
React's **render** method.

```javascript
var ProfilePic = React.createClass({
  render: function() {
    return (
      <img src={'https://photo.fb.com/' + this.props.username'} />
    )
  }
})
```
```javascript
var ProfileLink = React.createClass({
  render: function() {
   return (
      <a href={'https://www.fb.com/' + this.props.username}>
        {this.props.username}
      </a>
    )
  }
})
```
```javascript
var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <ProfilePic username={this.props.username} />
        <ProfileLink username={this.props.username} />
      </div>
   )
  }
})
```
```javascript
<Avatar username="tylermcginnis" />
```

Now, instead of composing functions to get some value, we're composing functions
to get some UI. This idea is so important in React that React 0.14 introduced
Stateless Functional Components which allows the code above to be written as
normal functions (and which we'll cover more in depth later in the course).

```javascript
var ProfilePic = function (props) {
  return <img src={'https://photo.fb.com/' + props.username'} />
}
```
```javascript
var ProfileLink = function (props) {
  return (
    <a href={'https://www.fb.com/' + props.username}>
      {props.username}
    </a>
  )
}
```
```javascript
var Avatar = function (props) {
  return (
    <div>
      <ProfilePic username={props.username} />
      <ProfileLink username={props.username} />
    </div>
  )
}
```
```javascript
<Avatar username="tylermcginnis" />
```

One thing each of the functions and components above has in common is they're
all "pure functions".

Perhaps one of my favorite things about React is it's given me a light
introduction to functional programming (FP) and a fundamental piece of FP are
pure functions.

The whole concept of a pure function is consistency and predictability (which
IMO are keys to writing great software).

The reason for the consistency and predictability is because pure functions have
the following characteristics.

- Pure functions always return the same result given the same arguments.
- Pure function's execution doesn't depend on the state of the application.
- Pure functions don't modify the variables outside of their scope.

When you call a function that is "pure", you can predict exactly what's going to
happen based on its input. This makes functions that are pure easy to reason
about and testable.

Let's look at some examples.

```javascript
function add (x,y) {
  return x + y
}
```

Though simple, **add** is a pure function. There are no side effects. It will
always give us the same result given the same arguments.

Let's now look at two native JavaScript methods. .slice and .splice

```javascript
var friends = ['Ryan', 'Michael', 'Dan']
friends.slice(0, 1) // 'Ryan'
friends.slice(0, 1) // 'Ryan'
friends.slice(0, 1) // 'Ryan'
```

Notice **.slice** is also a pure function. Given the same arguments, it will
always return the same value. It's predictable.

Let's compare this to .slice's friend, .splice

```javascript
var friends = ['Ryan', 'Michael', 'Dan']
friends.splice(0, 1) // ["Ryan"]
friends.splice(0, 1) // ["Michael"]
friends.splice(0, 1) // ["Dan"]
```

**.splice** is not a pure function since each time we invoke it passing in the
same arguments, we get a different result. It's also modifying state.

Why is this important for React? Well the main reason is React's **render**
method needs to be a pure function and because it's a pure function, all of the
benefits of pure functions now apply to your UI as well. Another reason is that
it's a good idea to get used to making your functions pure and pushing "side
effects" to the boundaries of your program. I'll say this throughout the course,
React will make you a better developer if you learn React the right way.
Learning to write pure functions is the first step on that journey.