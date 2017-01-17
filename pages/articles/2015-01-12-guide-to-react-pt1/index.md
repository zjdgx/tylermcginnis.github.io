---
title: "React Tutorial Pt 1: A Comprehensive Guide to Building Apps with React.js"
date: "2015-01-12T08:14:05.284Z"
layout: post
path: "/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/"
description: "The most popular guide for learning to build apps with React."
---

<hide-from-preview>

****

Table of Contents:

**[Pt I: A Comprehensive Guide to Building Apps with
React.js.](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)**

[Pt 1.5: Utilizing Webpack and Babel to build a React.js
App](http://tylermcginnis.com/react-js-tutorial-1-5-utilizing-webpack-and-babel-to-build-a-react-js-app/)

[Pt II: Building React.js Apps with Gulp, and
Browserify.](http://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)

[Pt III: Architecting React.js Apps with
Flux.](http://tylermcginnis.com/react-js-tutorial-pt-3-architecting-react-js-apps-with-flux/)

~~Pt IV: Add Routing to your React App with React Router. (Coming Soon)~~**

~~Pt V: Add Data Persistence to your React App with Firebase. (Coming Soon)~~**

~~Pt VI:Combining React.js, Flux, React Router, Firebase, Gulp, and Browserify. (Coming
Soon)~~*

**__Check out my [React.js Program](http://reactjsprogram.com/). It's the successor to this blog series.__

****

</hide-from-preview>

By now you’ve probably heard about facebook’s React. You’ve probably even heard
really good things. There has never been a better time to take the leap and
start learning React. The difficulty starting out with React isn’t React itself.
It’s important to remember React is “just the V in MVC” or “just the view
layer”. Comparing React to Angular or React to Ember is unfair because React
isn’t trying to be a full fledged framework. It’s just trying to be the view
layer, which it’s really good at. This brings up issues for developers who are
trying to learn React. React isn’t difficult to learn; putting all of the pieces
together to build a full web application in React is.

As you’ve started to learn React you’ve probably ran into this problem. You read
facebook’s documentation, read a few tutorials, maybe even watched some Egghead
videos. You started feeling pretty comfortable with React. Then you realized “I
feel comfortable with React, but I still don’t think I can actually build
anything meaningful with it”. I think that’s a thought that everyone learning
React has. This goes back to the point of React. If you just learned the “V” in
MVC, you would still feel pretty worthless. This React.js tutorial series is
going to focus on addressing that concern. We’re going to first start off
learning about the fundamentals of React. You’ll get comfortable with React
itself from props to state to JSX and everything in between. After learning
about the fundamentals of React we’re going to jump into all of the other
components (pun slightly intended) that are needed to build a full web
application using React.js. We’ll cover how to use Gulpto set up a nice build
process for converting React’s HTML like syntax called JSX to JavaScript. We’ll
talk about using Browserify to tie all of our components together. We’ll then
dive into the Flux architecture and see how Flux can help us structure and
architect our React application in an efficient manner. Next we’ll talk about
persisting our data with Firebase and using React Router for, you guessed it,
introducing routing into our app. After that, we’ll put it all together and
build a “[Github Note
Taker](http://tylermcginnis.github.io/react-github-notetaker)” app, an app that
allows you to save notes and see a snapshot of a developers Github account
(potentially useful for tech interviews where you want to take notes on a
particular candidate). I realize this is a lot, but when I first started
learning React I was frustrated with the lack of tutorials focused on putting
all the pieces of React together. This tutorial series hopes to fill that gap.

#### **React.js Fundamentals:**

Components are the building blocks of React. If you’re coming from an Angular
background, components are very similar to Directives. If you’re coming from a
different background, they’re essentially widgets or modules. You can think of a
component as a collection of HTML, CSS, JS, and some internal data specific to
that component. I like to think of React components as the Kolaches of the web.
They have everything you need, wrapped in a delicious composable bundle. These
components are defined either in pure JavaScript or they can be defined in what
the React team calls “JSX”. If you decide to use JSX (which you most likely
will, it’s pretty standard — and it’s what we’ll use for this tutorial), you’ll
need some compile stage to convert your JSX to JavaScript, we’ll get to this
later.

What makes React so convenient for building user interfaces is that data is
either received from a component’s parent component, or it’s contained in the
component itself. Before we jump into code, let’s make sure we have a high level
understanding of components.


<figure>
  <img style="margin: 0px auto; border-radius: 5px" src='profile.png' />
</figure>

Above we have a picture of my Twitter profile. If we were going to re-create
this page in React, we would break different sections up into different
components (highlighted). Notice that components can have nested components
inside of them. We might name the left component (pink) the “UserInfo”
component. Inside the UserInfo component we have another component (orange),
that we could call the “UserImages” component. The way this parent/child
relationship works is our UserInfo component, or the parent component, is where
the ‘state’ of the data for both itself and the UserImage component (child
component) lives. If we wanted to use any part of the parent component’s data in
the child component, which we do, we would pass that data to the child component
as an attribute. In this example, we pass the UserImage component all of the
images that the user has (which currently live in the UserInfo component). We’ll
get more into the details of the code in a bit, but I want you to understand the
bigger picture of what’s happening here. This parent/child hierarchy makes
managing our data relatively simple because we know exactly where our data lives
and we shouldn’t manipulate that data anywhere else.

The topics below are what I believe to be the fundamental aspects of React. If
you understand all of them and their purposes, you’ll be at a very good spot
after reading this tutorial.

JSX — Allows us to write HTML like syntax which gets transformed to lightweight
JavaScript objects.

Virtual DOM — A JavaScript representation of the actual
DOM.

React.createClass — The way in which you create a new component.

render (method) — What we would like our HTML Template to look like.

ReactDOM.render — Renders a React component to a DOM node.

state — The internal data store (object) of a component.

getInitialState — The way in which you set the initial state of a component.

setState — A helper method for altering the state of a component.

props — The data which is passed to the child component from the parent component.

propTypes — Allows you to control the presence, or types of certain props passed to the child component.

getDefaultProps — Allows you to set default props for your component.

Component LifeCycle
  - componentWillMount — Fired before the component will mount
  - componentDidMount — Fired after the component mounted
  - componentWillReceiveProps — Fired whenever there is a change to props
  - componentWillUnmount — Fired before the component will unmount

Events
  - onClick
  - onSubmit
  - onChange

I know it seems like a lot, but you’ll soon see how each piece is fundamental in
building robust applications with React (and I also wasn’t kidding when I said I
wanted this to be a comprehensive guide).

At this point you should understand, on a very high level, how React works. Now,
let’s jump into some code.

#### Creating your First Component (JSX, Virtual DOM, render, ReactDOM.render)

First, let’s go ahead and create our very first HelloWorld component so you can
visualize how we use **createClass** to create a component. **createClass**
takes in an object. **This object is what ****will**** specify the different
properties (render, getInitialState, propTypes) of the component.**

[Hello World Component Fiddle](https://jsfiddle.net/tylermcginnis/d5hm5cjL/)

```javascript
var HelloWorld = React.createClass({
  render: function(){
    return (
      <div>
        Hello World!
      </div>
    )
  }
});


ReactDOM.render(<HelloWorld />, document.getElementById('app'));
```
Notice that the only method on the object we’re passing to createClass is the
**render** method. Every component is required to have a render method. The
reason for that is render is essentially the template for our component. So in
this example the text that will show on the screen where this component is
rendered is **Hello World!** A few more things about the code above. We’ve saved
the result of calling our React.createClass constructor into a variable called
HelloWorld. We do this because later on we’ll need to tell React to which
element our component should be rendered. This is where ReactDOM.render comes
into play. ReactDOM.render takes in two arguments. The first argument is the
component you want to render, the second argument is the DOM node where you want
to render the component. *(Notice we're using ReactDOM.render and not
React.render. This was a change made in React .14 to make React more modular. It
makes sense when you think that React can render to more things than just a DOM
element).* In the example above we’re telling React to take our **HelloWorld**
component and render it to the element with an ID of app. Because of the
parent/child child relations of React we talked about earlier, you usually only
have to use ReactDOM.render once in your application because by rendering the
most parent component, all child components will be rendered as well. If you
want your whole app to be React, you would render the component to
document.body.

Now at this point you might feel a little weird throwing “HTML” into your
JavaScript. Since you started learning web development, you’ve been told that
you should keep your logic out of the view, AKA keep your JavaScript uncoupled
from your HTML. This paradigm is strong, but it does have some weaknesses. I
don’t want to make this tutorial longer trying to convince you that this idea is
a step in the right direction, so if this idea still bothers you you can check
out [this link](http://www.slideshare.net/floydophone/react-preso-v2). As you
learn more about React, this uneasiness should quickly subside. The “HTML” that
you’re writing in the render method isn’t actually HTML but it’s what React is
calling “JSX”. JSX simply allows us to write HTML like syntax which gets
transformed to lightweight JavaScript objects. React is then able to take these
JavaScript objects and from them form a “virtual DOM” or a JavaScript
representation of the actual DOM. This creates a win/win situation where you get
the accessibility of templates with the power of JavaScript.

Looking at the example below, this is what your JSX is transformed to once React
runs its transformation process.

[Hello World Component in JS](http://jsfiddle.net/tylermcginnis/y1qvspm1/)

```javascript
var HelloWorld = React.createClass({
  displayName: "HelloMessage",
  render: function() {
    return React.createElement("div", null, "Hello World");
  }
});
```

Now, you can forgo the JSX -> JS transform phase and write your React components
like the code above, but as you can imagine, that would be rather tricky. I’m
unaware of anyone who is not using JSX.

Up until this point we haven’t really emphasized the importance of this new
virtual DOM paradigm we’re jumping into. The reason the React team went with
this approach is because, since the virtual DOM is a JavaScript representation
of the actual DOM, React can keep track of the difference between the current
virtual DOM(computed after some data changes), with the previous virtual DOM
(computed befores some data changes). [React then isolates the changes between
the old and new virtual DOM and then only updates the real DOM with the
necessary
changes](https://www.youtube.com/watch?v=-DX3vJiqxm4)[.](https://www.youtube.com/watch?v=-DX3vJiqxm4)
In more layman’s terms, because manipulating the actual DOM is slow, React is
able to minimize manipulations to the actual DOM by keeping track of a virtual
DOM and only updating the real DOM when necessary and with only the necessary
changes. ([More info here](https://www.youtube.com/watch?v=-DX3vJiqxm4)).
Typically UI’s have lots of state which makes managing state difficult. By
re-rendering the virtual DOM every time any state change occurs, React makes it
easier to think about what state your application is in.

The process looks something like this,

**Signal to notify our app some data has changed→ Re-render virtual DOM -> Diff
previous virtual ****DOM**** with new virtual DOM -> Only update real DOM with
necessary changes.**

Because there’s this transformation process from JSX to JS, you need to set up
some sort of transformation phase as you’re developing. In part 2 of this series
I’ll introduce using Gulp withReact and how to have your Gulp process include
this JSX to JS transformation and more. For now, we’ll just stick with JSFiddle.
If you’re interested in getting started without Gulp, check out the getting
start guide [here](http://facebook.github.io/react/docs/getting-started.html).

Let’s take a look back at our “Most Important Parts of React” checklist and see
where we’re at now.

**JSX — Allows us to write HTML like syntax which gets transformed to lightweight
JavaScript objects.**

**Virtual DOM — A JavaScript representation of the actual
DOM.**

**React.createClass — The way in which you create a new component.**

**render (method) — What we would like our HTML Template to look like.**

**ReactDOM.render — Renders a React component to a DOM node.**

state — The internal data store (object) of a component.

getInitialState — The way in which you set the initial state of a component.

setState — A helper method for altering the state of a component.

props — The data which is passed to the child component from the parent component.

propTypes — Allows you to control the presence, or types of certain props passed to the child component.

getDefaultProps — Allows you to set default props for your component.

Component LifeCycle
  - componentWillMount — Fired before the component will mount
  - componentDidMount — Fired after the component mounted
  - componentWillReceiveProps — Fired whenever there is a change to props
  - componentWillUnmount — Fired before the component will unmount

Events
  - onClick
  - onSubmit
  - onChange

We’re making good pace. Everything in bold is what we’ve already covered and you
should at least be able to explain how those certain components fit into the
React ecosystem.

**Adding State to your Component (state)**

Next on the list is “state”. Earlier we talked about how managing user
interfaces is difficult because they typically have lots of different states.
This area is where React really starts to shine. Each component has the ability
to manage its own state and pass its state down to child components if needed.
Going back to the Twitter example from earlier, the UserInfo component
(highlighted in pink above) is responsible for managing the state (or data) of
the users information. If another component also needed this state/data but that
state wasn’t a direct child of the UserInfo component, then you would create
another component that would be the direct parent of the UserInfo and the other
component (or both components which required that state), then you would pass
the state down as props into the child components. In other words, if you have a
multi component hierarchy, a common parent component should manage the state and
pass it down to its children components via props.

Let’s take a look at an example component using it’s own internal state.

[Hello {name} With State](https://jsfiddle.net/tylermcginnis/du72b5L2/)

```javascript
var HelloUser = React.createClass({
  getInitialState: function(){
    return {
      username: '@tylermcginnis33'
    }
  },
  render: function(){
    return (
      <div>
        Hello {this.state.username}
      </div>
    )
  }
});
```

We’ve introduced some new syntax with this example. The first one you’ll notice
is the getInitialState method. From the definition above, the getInitialState
method is “The way in which you set the state of a component”. In other terms,
getInitialState returns an object which contains the state or data for our
component.In the code above we’re telling our component that we want it to keep
track of a username. This username can now be used inside our component by
**{this.state.username}**, which is exactly what we do in our render method.

The last thing to talk about with state is that our component needs the ability
to modify its own internal state. We do this with a method called **setState**.
Remember earlier when we talked about the re-rendering of the virtual dom
whenever the data changes?

**Signal to notify our app some data has changed→ Re-render virtual DOM -> Diff
previous virtual DOM with new virtual DOM -> Only update real DOM with necessary
changes.**

That “signal to notify our app some data has changed” is actually just setState.
Whenever setState is called, the virtual DOM re-renders, the diff algorithm
runs, and the real DOM is updated with the necessary changes.

As a sidenote, when we introduce setState in the code below, we’re also going to
introduce a few events that are on our list. Two birds, one stone.

So in the next code sample, we’re going to now have an input box that whenever
someone types into it, it will automatically update our state and change the
username.

[Hello {name} with Ability to Change State
Fiddle](https://jsfiddle.net/tylermcginnis/f27qby3L/)

```javascript
var HelloUser = React.createClass({
  getInitialState: function(){
    return {
      username: '@tylermcginnis33'
    }
  },
  handleChange: function(e){
    this.setState({
      username: e.target.value
    });
  },
  render: function(){
    return (
      <div>
        Hello {this.state.username} <br />
        Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
      </div>
    )
  }
});
```

Note we’ve introduced a few more things. The first thing is the **handleChange**
method. This method is going to get called every time a user types in the input
box. When handleChange is called, it’s going to call setState to re-define our
username withwhatever was typed into the input box (e.target.value). Remember,
whenever setState is called, React creates a new virtual DOM, does the diff,
then updates the real DOM.

Now let’s look at our render method. We’ve added a new line that contains an
input field. The type of the input field is obviously going to be “text”. The
value is going to be the value of our username which was originally defined in
our getInitialState method and will be updated in the handleChange method.
Notice there is a new attribute you’ve probably never seen before, **onChange**.
onChange is a React thing and it will call whatever method you specify every
time the value in the input box changes, in this case the method we specified
was handleChange.

The process for the code above would go something like this.

A user types into the input box → handleChange is invoked → the state of our
component is set to a new value → React re-renders the virtual DOM → React Diffs
the change → Real DOM is updated.

Later on when we cover props, we’ll see some more advanced use cases of handling
state.

We’re getting there! If you can’t explain the items in bold below, go re-read
that section. *and one tip on REALLY learning React. Don’t let passively reading
this give you a false sense of security that you actually know what’s going on
and can re-create what we’re doing. Head over to JSfiddle and try to recreate
(or create your own) components without looking at what I’ve done. It’s the only
way you’ll truly start learning how to build with React. This goes for this
tutorial and the following to come.

**JSX — Allows us to write HTML like syntax which gets transformed to lightweight
JavaScript objects.**

**Virtual DOM — A JavaScript representation of the actual
DOM.**

**React.createClass — The way in which you create a new component.**

**render (method) — What we would like our HTML Template to look like.**

**ReactDOM.render — Renders a React component to a DOM node.**

**state — The internal data store (object) of a component.**

**getInitialState — The way in which you set the initial state of a component.**

**setState — A helper method for altering the state of a component.**

props — The data which is passed to the child component from the parent component.

propTypes — Allows you to control the presence, or types of certain props passed to the child component.

getDefaultProps — Allows you to set default props for your component.

Component LifeCycle
  - componentWillMount — Fired before the component will mount
  - componentDidMount — Fired after the component mounted
  - componentWillReceiveProps — Fired whenever there is a change to props
  - componentWillUnmount — Fired before the component will unmount

Events
  - onClick
  - onSubmit
  - onChange

**Receiving State from Parent Component (props, propTypes, getDefaultProps)**

We’ve talked about props a few times already since it’s hard to really do much
without them. By our definition above, props is the data which is passed to the
child component from the parent component. This allows for our React
architecture to stay pretty straight forward. Handle state in the highest most
parent component which needs to use the specific data, and if you have a child
component that also needs that data, pass that data down as props.

Here’s a very basic example of using props.

[Very Basic Props Example](https://jsfiddle.net/tylermcginnis/jsd0qa3u/)

```javascript
var HelloUser = React.createClass({
  render: function(){
    return (
      <div> Hello, {this.props.name}</div>
    )
  }
});

ReactDOM.render(<HelloUser name="Tyler"/>, document.getElementById('app'));
```

Notice on line 9 we have an attribute called name with a value of “Tyler”. Now
in our component, we can use **{this.props.name}** to get “Tyler”.

Let’s look at a more advanced example. We’re going to have two components now.
One parent, one child. The parent is going to keep track of the state and pass a
part of that state down to the child as props. Let’s first take a look at that
parent component.

[Passing a list to a Child
Component](https://jsfiddle.net/tylermcginnis/xbq2dxut/)

Parent Component:

```javascript
var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: 'Tyler McGinnis',
      friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen']
    }
  },
  render: function(){
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <ShowList names={this.state.friends} />
      </div>
    )
  }
});
```

There really isn’t much going on in this component that we haven’t seen before.
We have an initial state and we pass part of that initial state to another
component. The majority of the new code will come from this child component so
let’s take a closer look at that.

Child Component:

```javascript
var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});
```

Remember that the code that gets returned from our render method is a
representation of what the real DOM should look like. If you’re not familiar
with **Array.prototype.map**, this code might look a little wonky. All map does
is it creates a new array, calls our callback function on each item in the
array, and fills the new array with the result of calling the callback function
on each item. For example,

[Array.prototype.map](http://jsfiddle.net/tylermcginnis/xgwpzv80/)

```javascript
var friends = ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen'];
var listItems = friends.map(function(friend){
  return "<li> " + friend + "</li>";
});

console.log(listItems); // ["<li> Jake Lingwall</li>", "<li> Murphy Randall</li>", "<li> Merrick Christensen</li>"];
```

The console.log above returns ```["<li> Jake Lingwall</li>", "<li> Murphy
Randall</li>", "<li> Merrick Christensen</li>"]```.

Notice all that happened was we
made a new array and added ```<li> </li>``` to each item in the original array.

What’s great about map is it fits perfectly into React (and it’s built into
JavaScript). So in our child component above, we’re mapping over names, wrapping
each name in a pair of ```<li>``` tags, and saving that to our listItems variable.
Then, our render method returns an unordered list with all of our friends.

Let’s look at one more example before we stop talking about props. It’s
important to understand that wherever the data lives, is the exact place you
want to manipulate that data. This keeps it simple to reason about your data.
All getter/setter method for a certain piece of data will always be in the same
component where that data was defined. If you needed to manipulate some piece of
data outside where the data lives, you’d pass the getter/setter method into that
component as props. Let’s take a look at an example like that.

[Passing a List to a Child Component with a Setter
Method](https://jsfiddle.net/tylermcginnis/6rhdpt5c/)

```javascript
var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: 'Tyler McGinnis',
      friends: [
        'Jake Lingwall',
        'Murphy Randall',
        'Merrick Christensen'
      ],
    }
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function(){
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <AddFriend addNew={this.addFriend} />
        <ShowList names={this.state.friends} />
      </div>
    )
  }
});
```
```javascript
var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },
  render: function(){
    return (
        <div>
          <input
            type="text"
            value={this.state.newFriend}
            onChange={this.updateNewFriend} />
          <button onClick={this.handleAddNew}> Add Friend </button>
        </div>
    );
  }
});
```
```javascript
var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});
```

You’ll notice the code above is mostly the same as the previous example, except
now we have the ability to add a name to our friends list. Notice how I created
a new AddFriend component that manages the new friend we’re going to add. The
reason for this is because the parent component (FriendContainer) doesn’t care
about the new friend you’re adding, it only cares about all of your friends as a
whole (the friends array). However, because we’re sticking with the rule of only
manipulate your data from the component that cares about it, we’ve passed the
addFriend method down into our AddFriend component as a propand we call it with
the new friend once the handleAddNew method is called.

At this point I recommend you try to recreate this same functionality on your
own using the code above as a guidance once you’ve been stuck for 3-4 minutes.

Before we move on from props, I want to cover two more React features regarding
props. They are **propTypes** and **getDefaultProps.** I won’t go into too much
detail here because both are pretty straight forward.

[propTypes](http://facebook.github.io/react/docs/reusable-components.html) allow
you to control the presence, or types of certain props passed to the child
component. With propTypes you can specify that certain props are required or
that certain props be a specific type.

**getDefaultProps** allow you to specify a default (or a backup) value for
certain props just in case those props are never passed into the component.

I’ve modified our example from earlier to now, using propTypes, require that
addFriend is a function and that it’s passed into the AddFriend component. I’ve
also, using getDefaultProps, specified that if no array of friends is given to
the ShowList component, it will default to an empty array.

[Passing a List to a Child Component with a Setter Method with Default Props and
Type Checking](https://jsfiddle.net/tylermcginnis/fg685mkg/)

```javascript
var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: 'Tyler McGinnis',
      friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen'],
    }
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function(){
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <AddFriend addNew={this.addFriend} />
        <ShowList names={this.state.friends} />
      </div>
    )
  }
});
```

```javascript
var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },
  propTypes: {
    addNew: React.PropTypes.func.isRequired
  },
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },
  render: function(){
    return (
      <div>
        <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
        <button onClick={this.handleAddNew}> Add Friend </button>
      </div>
    );
  }
});
```
```javascript
var ShowList = React.createClass({
  getDefaultProps: function(){
    return {
      names: []
    }
  },
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});
```

Alright, we’re on the last stretch for this first tutorial. Let’s take a look at
our guide and see what we have left.

**React.createClass — The way in which you create a new component.**

**render (method) — What we would like our HTML Template to look like.**

**ReactDOM.render — Renders a React component to a DOM node.**

**state — The internal data store (object) of a component.**

**getInitialState — The way in which you set the initial state of a component.**

**setState — A helper method for altering the state of a component.**

**props — The data which is passed to the child component from the parent component.**

**propTypes — Allows you to control the presence, or types of certain props passed to the child component.**

**getDefaultProps — Allows you to set default props for your component.**

Component LifeCycle
  - componentWillMount — Fired before the component will mount
  - componentDidMount — Fired after the component mounted
  - componentWillReceiveProps — Fired whenever there is a change to props
  - componentWillUnmount — Fired before the component will unmount

**Events**
  - **onClick**
  - **onSubmit**
  - **onChange**

We’re so close!

**Component LifeCycle**

Each component you make will have its own lifecycle events that are useful for
various things. For example, if we wanted to make an ajax request on the initial
render and fetch some data, where would we do that? Or, if we wanted to run some
logic whenever our props changed, how would we do that? The different lifecycle
events are the answers to both of those. Let’s break them down.

[Component Life Cycle](https://jsfiddle.net/tylermcginnis/L3edLfeL/)

```javascript
var FriendsContainer = React.createClass({
  getInitialState: function(){
    alert('In getInitialState');
    return {
      name: 'Tyler McGinnis'
    }
  },
  // Invoked once before first render
  componentWillMount: function(){
      // Calling setState here does not cause a re-render
      alert('In Component Will Mount');
  },
  // Invoked once after the first render
  componentDidMount: function(){
      // You now have access to this.getDOMNode()
      alert('In Component Did Mount');
  },
  // Invoked whenever there is a prop change
  // Called BEFORE render
  componentWillReceiveProps: function(nextProps){
      // Not called for the initial render
      // Previous props can be accessed by this.props
      // Calling setState here does not trigger an additional re-render
      alert('In Component Will Receive Props');
  },
  // Called IMMEDIATELY before a component is unmounted
  componentWillUnmount: function(){},
  render: function(){
    return (
      <div>
        Hello, {this.state.name}
      </div>
    )
  }
});
```

**componentWillMount**: Invoked once before the *initial* render. If you were to
call setState here, no re-render would be invoked. An example of this would be
if you’re using a service like firebase, you’d set up your reference to your
firebase database here since it’s only invoked once on the initial render.

**componentDidMount** - Invoked once after the initial render. Because the
component has already been invoked when this method is invoked, you have access
to the virtual DOM if you need it. You do that by calling
**this.getDOMNode()**. *Now it might seem like if you wanted to make AJAX
requests you would do that in componentWillMount, but the devs at facebook
actually recommend you do that in componentDidMount. So this is the lifecycle
event where you’ll be making your AJAX requests to fetch some data.*

**componentWillReceiveProps** - This life cycle is not called on the initial
render, but is instead called whenever there is a change to props. Use this
method as a way to react to a prop change before render() is called by updating
the state with setState.

**componentWillUnmount** - This life cycle is invoked immediately before a
component is unmounted from the DOM. This is where you can do necessary clean
up. For example, going back to our firebase example this is the life cycle event
where you would clean up your firebase reference you set in componentWillMount.

There are a [few
more](http://facebook.github.io/react/docs/component-specs.html) life cycle
methods, but the ones I’ve covered are the ones that I’ve seen which are the
most useful.

Well, if you stuck with me until this point, great job. I hope this tutorial was
beneficial to you and you now feel at least mildly comfortable with React. As I
mentioned before, this is just part 1 of a 6 part tutorial series. If you have
any suggestions or if this helped you out, let me know in the comments.
