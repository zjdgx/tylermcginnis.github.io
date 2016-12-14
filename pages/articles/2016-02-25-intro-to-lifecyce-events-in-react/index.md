---
title: "An Introduction to Life Cycle Events in React"
date: "2016-02-25T15:12:03.284Z"
layout: post
path: "/an-introduction-to-life-cycle-events-in-react-js-aa3796ad85aa/"
---

*This is an excerpt from *[React.js Program](http://www.reactjsprogram.com/)*
and more specifically, the free *[React.js
Fundamentals](http://courses.reactjsprogram.com/courses/reactjsfundamentals)*
course.*

We’ve talked about how the Render method in a React component needs to be a pure
function. That means it needs to be stateless, it needs to not make any Ajax
requests, etc. It should just receive state and props and then render a UI.

Though we can’t do those things in the render method, they’re still pretty
critical for building a React app. So now the question, where should those
things go? To answer this question, we’ll dive into React Life Cycle methods.
Lifecycle methods are special methods each component can have that allow us to
hook into the views when specific conditions happen (i.e. when the component
first renders or when the component gets updated with new data, etc).

There are many different life cycle methods, but in this post we’re going to
explore the ones that are used most often (which will cover ~90% of use cases).

You can really break React’s Life Cycle Methods down into two categories.

1) When a component get mounted to the DOM and unmounted.
2) When a component receives new data.

**Mounting / Unmounting**

In this section we’re going to focus on those life cycle methods which are
called when the component is initialized and added to the DOM (mounting), and
when the component is removed from the DOM (unmounting). By definition then,
these methods will be invoked only once during the life of the component.

For a moment I want you to step back and think about some items that may be
important to do when a component mounts or unmounts.

Here are some things that we may need to do:

* Establish some default props in our component
* Set some initial state in our component
* Make an Ajax request to fetch some data needed for this component
* Set up any listeners (ie Websockets or Firebase listeners)
* Remove any listeners you initially set up (when unmounted)

*What I want you to do is really think about the problem we’re trying to solve.
If you’re good and you understand it, continue on. If not, re-read the section
above. Looking at code won’t help you too much if you don’t understand the
underlying issues we’re trying to solve.*

Let’s walk through each one of our needs from above and correlate that with a
Life Cycle Method.

**Establish some default props in our component:**

We’re going to cover this more in depth in a later section but say we want to
make it so that even if the consumer of our component doesn’t pass in a certain
prop, that prop still has a default value. We can do that with the
**getDefaultProps** method.
```javascript
var Loading = React.createClass({
  getDefaultProps: function () {
    return {
      text: 'Loading'
    }
  },
  render: function () {
    ...
  }
})
```
So if we had a Loading component that took in a loading **text**, we could make
sure that if a **text** attribute isn’t provided to the component,
**this.props.text** will by default be ‘Loading’.

**Set some initial state in our component**

You saw a glimpse of this in the previous video. Sometimes you’ll want your
component to manage some piece of state. In order to do that you’ll first need
to set some initial state of your component when your component is first added
to the DOM. To do this you can use **getInitialState**

```javascript
var Login = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      password: ''
    }
  },
  render: function () {
    ...
  }
})
```

Above we’ve used **getInitialState** to set an **email** and **password**
property on our state object in our **Login** component. To update the state,
you can call** this.setState** passing in a new object which overwrites one or
both of the email and password properties.

**Make an Ajax request to fetch some data needed for this component**

This is a very common use case. The component needs some data that it’s going to
get from an Ajax request. You can do this utilizing **componentDidMount**. This
will get called right after the component is mounted to the DOM.

```javascript
var FriendsList = React.createClass({
  componentDidMount: function () {
    return Axios.get(this.props.url)
      .then(this.props.callback)
  },
  render: function () {
    ...
  }
})
```

Here we’re using Axios to fetch some data then call a callback we received from
props once that data is resolved.

**Set up any listeners (ie Websockets or Firebase listeners)**

As you might have guessed, this is a perfect opportunity to use
**componenDidMount** as well.

```javascript
var FriendsList = React.createClass({
  componentDidMount: function () {
    ref.on('value', function (snapshot) {
      this.setState({
        friends: snapshot.val()
      })
    })
  },
  render: function () {
    ...
  }
})
```

Now that we’ve set up that listener, we want to be sure to remove it when the
component is removed from the DOM so we don’t have memory leaks.

**Remove any listeners you initially set up (when unmounted)**

That’s where **componentWillUnmount** comes into play.

```javascript
var FriendsList = React.createClass({
  componentWillUnmount: function () {
    ref.off()
  },
  render: function () {
    ...
  }
})
```

Now let’s look at Life Cycle Events that are going to be called whenever the
component receives new data from its parent component.

The first is **componentWillReceiveProps**. There will be times that you’ll want
to execute some code whenever your component receives new props. That’s exactly
what componentWillReceiveProps does. We’ll cover this more in depth in future
courses

The second is a more advanced case and is **shouldComponentUpdate**. React is
very intelligent about not re-rendering unless something changed. You can make
it even more intelligent by implementing **shouldComponentUpdate**.
shouldComponentUpdate returns a boolean, if that boolean is true, that component
will re-render. If it’s false, that component (and naturally all child
components), won’t re-render. This can be a huge performance gain if you know
exactly when you want to re-render (based on either the state or the props of
your components). We’ll cover this more in depth in a future course.

Though we didn’t cover every life cycle event in this post, this chart below
should be of some help.

![](https://cdn-images-1.medium.com/max/1600/0*VoYsN6eq7I_wjVV5.png)