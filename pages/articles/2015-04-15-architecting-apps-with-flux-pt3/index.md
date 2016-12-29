---
title: "React Tutorial Pt 3: Architecting React.js Apps with Flux."
date: "2015-04-15T09:14:05.284Z"
layout: post
path: "/react-js-tutorial-pt-3-architecting-react-js-apps-with-flux/"
---
<hide-from-preview>

****

Table of Contents:

[Pt I: A Comprehensive Guide to Building Apps with
React.js.](http://tylermcginnis.com/react-js-tutorial-a-comprehensive-guide-to-building-apps-with-react/)

[Pt 1.5: Utilizing Webpack and Babel to build a React.js
App](http://tylermcginnis.com/react-js-tutorial-1-5-utilizing-webpack-and-babel-to-build-a-react-js-app/)

[Pt II: Building React.js Apps with Gulp, and
Browserify.](http://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)

**[Pt III: Architecting React.js Apps with
Flux.](http://tylermcginnis.com/react-js-tutorial-pt-iii-architecting-react-js-apps-with-flux/)**

~~Pt IV: Add Routing to your React App with React Router. (Coming Soon)~~**

~~Pt V: Add Data Persistence to your React App with Firebase. (Coming Soon)~~**

~~Pt VI:Combining React.js, Flux, React Router, Firebase, Gulp, and Browserify. (Coming
Soon)~~*

**__Check out my [React.js Program](http://reactjsprogram.com/). It's the successor to this blog series.__
****
</hide-from-preview>

When you first start learning React, you’ll inevitably ask yourself “Should I
learn Flux?”. You’ll then most likely look to Google for the source of that
answer and after a bit of researching softly conclude that, yes you should.
However, I wish that wasn’t always the answer. Flux is great. Flux does a really
good job at what it’s designed to do. I use Flux. A lot of people use Flux. But
you don’t have to use Flux with React. In fact, I would suggest that you don’t
even look at Flux until you really understand the pain point that it’s trying to
solve. Too many people jump into React then jump straight to Flux because they
think they have to and are left disappointed with React because Flux is a bit,
complex. **Don’t let the complexity of Flux ruin the simplicity of React.**

So, a better question than “Should I learn Flux?” is “Should I use Flux for this
particular project?” and if yes, then learn it. The entire reasoning behind Flux
is making data changes in your app easy to reason about. In its most simple
form, Flux removes the burden of having a component manage its own state and
moves that data to a central location called a Store where multiple components
can now share that data. Then, everything in that Store’s purpose is to, in one
way or another, assist in the modification or preservation of the data. The
benefit of this is that if the data in the Store changes, you know exactly what
triggered the change because the Store is the only place in your app with the
ability to modify the data.

Notice how Flux revolves around the fact that your application has data and that
data needs to be kept up to date in an effective manner. If your app doesn’t
have and or care about dynamic data, Flux might not be the best choice. Flux
excels in respect to data management, but will feel unnecessary if you don’t
have any data to manage.

So now that you’re aware of the necessity of your app to have data in order for
Flux to be beneficial, let’s talk about the flow of a Flux app. Because, again,
the whole idea of a Flux app is to make your data changes easy to reason about,
Flux embraces a one way data flow architecture. So what we’ll do in this
tutorial is we’ll walk through every part of the Flux architecture until we have
a solid grasp of each concept.

![](https://cdn-images-1.medium.com/max/800/0*wb78t7XwxmQHIOW6.png)

Above is a Flux diagram I made that I wish existed when I was learning Flux. It
won’t make a ton of sense now, but as you read through the different parts of
the Flux architecture my hope is that you’ll reference this diagram and it will
start clicking for you. **If you’ve read any of my tutorials before, you know
I’m a huge fan of trying to break things down into their most easy to understand
form. With Flux, I can honestly say this was a bit difficult. If something
doesn’t make sense, keep reading and then re-read and I’m confident it will
eventually *click*.**

Let’s start off with our components. Remember, one of the main points of Flux is
to take the storage of the data out of the component and put it in a more
central location (Store). Because of that, our components will look exactly the
same except, as you probably guessed, we’ll be calling out to our Actions to add
data and Stores to fetch data.

For the sake of having code snippets that demonstrate the principles I talk
about, let’s pretend we’re building a basic Todo List app. I’ll obviously leave
a lot of parts out, but I’ll include the parts that demonstrate the specific
Flux principle.

The full source code can be found
[HERE](https://github.com/tylermcginnis/Flux-Todolist).

#### **Component/View**

```javascript
var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: todoStore.getList()
    }
  },
  componentDidMount: function(){
    todoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    todoActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },
  _onChange: function(){
    this.setState({
      list: todoStore.getList()
    })
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem add={this.handleAddItem}/>
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;
```

Let’s break down this component.

First thing you’ll notice is the list property on the object which is being
returned from *getIntiailState* doesn’t have a value of an empty array but its
value is instead whatever is being returned from *todoStore.getList()*. Remember
the reason for this is because we’re taking the data out of the component and
putting it into the Store. We’ll cover more about the Store side of things later
in this tutorial.

Next, you’ll notice the *componentDidMount* and *componentWillUnmount* methods.
Each of those are calling methods on the todoStore which seem to be adding and
removing an event listener. Head back up to the diagram for a second and reread
the “Views/Component” section. Because we’re relying on the Store to house our
data, we’ll need to make sure that whenever the data in the Store changes, our
component knows about that and will update its own state. We accomplish this by
passing the store a method (*_onChange*) which will refetch the data from the
store and update the components state. Now, whenever the Store changes its data,
it can invoke the callback function we initially passed it when the component
mounted (*_onChange*) which will make sure the component keeps its data up to
date with what’s in the store. The *addChangeListener* piece is what’s tying the
store back into the component.

The last thing to notice is that every time a user event occurs, whether it’s
adding a new item to the todo list (handleAddItem) or removing an item from the
list (handleRemoveItem), we’re invoking a method on our todoActions rather than
using *setState. *Again, this is because our main source of truth for our data
is the store, and as the diagram points out, we first need go through our
actions in order to eventually update the data in the store.

**Actions**

Let’s now take a look at our actions, or the second phase of our Flux diagram.


```javascript
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var todoActions = {
  addItem: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  }
};

module.exports = todoActions;
```

Referring back to the diagram, the Dispatcher is what is going to emit a certain
event. Notice the way we keep track of these events is through a constants file.
Because we need to emit a specific type of event, and also listen for that exact
same type of event, a constants object makes perfect sense.

```javascript
var appConstants = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM"
};

module.exports = appConstants;
```

Notice literally all this constants object is is a mirrored key value pair.
Whose keys/values are whatever the specific event is we’re emitting/listening
for.

Back to our actions, since our Dispatcher is the one actually emitting an event,
our Actions object can be thought of as essentially just prepping an object
before it’s dispatched. Notice in our addItem method the actionType is
appConstants.addItem and the data is just the specific item we’re adding. These
keys/values will eventually make themselves to our store where we can not only
listen for that specific event (addItem) but also grab the data off of that
payload once it gets to the store.

**Dispatcher**

Now we’ve arrived at the 3rd part of our diagram, the Dispatcher. You can think
of the Dispatcher as the hub of your app. Every time you want to change the data
that lives in a store, you must go through the Dispatcher.

```javascript
var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;
```

You probably noticed there’s really not much going on here. That’s because,
there really doesn’t need to be much going on. The whole point of the dispatcher
again is to dispatch certain events. There are plenty of libraries that do this,
but the recommended one is the one we’re using in the code above. It also
happens to be the one facebook uses as well. We require the *flux* module, then
create a new instance of the Dispatcher on that module, then set a method on it
that we’ll invoke from any *actions* in our app. The reason we’re using
*VIEW_ACTION *as the source of our dispatch is because you could also be using
SERVER_ACTION if that action was coming from the server. The only other thing is
to pass along the action which is passed in when handleAction is invoked (and
contains the *actionType* as well as the *data*). What’s interesting about our
Dispatcher is that most people don’t really mention that you’ll use the same
dispatcher in all your stores as well in order to register callbacks which will
be invoked when certain Dispatches are dispatched. It’s a little weird at first,
but you can think of the Dispatcher as kind of a bridge. In the main
Dispatcher.js file is where you set up your *handleAction* method which will
dispatch the actual event, but you also need to make it so your stores actually
listen to those events. So what’s interesting, and kind of confusing at first,
is inside your store you’ll require the Dispatcher which you exported from your
main Dispatcher file in order to register some callbacks that will be invoked
whenever the Dispatcher dispatches then hears those certain dispatches. We’ll
see that in the next section on Stores. I realize that got super wordy but stick
with me. The paragraph above will make more sense after reading this next
section.

**Stores**

The store, where the magic happens. You can think of a Store as having **four**
parts.

**First**: The actual “model” or data store. What’s great about Flux, is your
“model” is just a JavaScript data structure like an object or array. Everything
else in the Store will be built around manipulating or getting this data.

```javascript
var _store = {
  list: []
};
```

**Second**: Setter methods. Remember, the whole point of Flux is to make your
data changes easy to reason about. These setter methods will be the only
interface for manipulating the data of our store (which we made in the first
step above).

```javascript
var addItem = function(item){
  _store.list.push(item);
};

var removeItem = function(index){
  _store.list.splice(index, 1);
}
```

**Third**: The Store itself, which is really just a collection of getter
functions in order to access the data in the first step along with a few
emitter/change listener helpers. Another idea of Flux that might throw you at
first is Getters vs Setters. Remember, we only want to be able to manipulate the
data from our setter functions (which we made in the second step above).
However, we want to be able to GET the data whenever we like through our Getter
functions defined in this step. To accomplish this, we’ll make the setter
functions “private” to our Store file while we’ll export the actual Store (this
step, or the collection of Getter methods) so that we can require the Store in
other files and invoke those getter methods in order to get the data. In other
words, this step is going to be global, while the other steps will be “private”.

```javascript
var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  },
});
```

A few things to note about the actual code above. Notice, as mentioned, we have
our *getList* method which just returns us the list. If you remember back to the
component we built earlier, you’ll notice in *getInitialState* we’re invoking*
todoStore.getList() *and setting the result to the list property on our state.

```javascript
getInitialState: function(){
  return {
    list: todoStore.getList()
  }
}
```

This *getList* method in the Store above is the interface for getting the data
out of the store. We also have the *addChangeListener* and *removeChangeListener
*methods. Again if you remember back to our component we built earlier, when our
component mounted, we passed in *_.onChange* which just used setState to invoke
*todoStore.getList()* in order to refetch the data.

```javascript
_onChange: function(){
  this.setState({
    list: todoStore.getList()
  })
},
componentDidMount: function(){
  todoStore.addChangeListener(this._onChange);
},
componentWillUnmount: function(){
  todoStore.removeChangeListener(this._onChange);
}
```

Well, the cb parameter we’re passing to addChangeListener and
*removeChangeListener* is that *_.onChange* function. So now, whenever a
*CHANGE_EVENT* (or “*CHANGE*”) event is emitted, React will invoke *_.onChange*
which will update the state of the component.

The last thing to discuss about the *todoStore* itself above is the use of
*objectAssign* with *EventEmitter*. All *objectAssign* allows you to do is
extend/combine objects together in order to make “super objects” if you will. By
super objects, I mean objects whose keys/values are a collection of keys/values
from different objects. We pass *objectAssign* a target, or an empty object
first. This empty object is what the next two parameters are going to add their
properties to. We then pass it EventEmitter.prototype. Now our empty object will
get all of the properties that are on the EventEmitter’s prototype object. This
will give our store the ability to do things like .on() and .emit(). The last
argument is another object whose properties will be added to the empty object.
So when everything is complete, the object being returned from *objectAssign* is
an object which has all of properties of EventEmitter’s prototype as well as
*adChangeListener*, *removeChangeListener*, and getList.

**Fourth**: We need to use our Dispatcher to listen for certain events and when
we hear those events, invoke the setter functions above (in the second step).

```javascript
AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});
```

Remember, when the handleAction method on our Dispatcher is invoked, it’s going
to dispatch an object which will look like this

```javascript
{
  source: ‘VIEW_ACTION’,
  action: {
    actionType: ‘SOME_CONSTANT’,
    data: ‘SOME DATA’
   }
}
```

So on our Switch statement, we’ll be checking the actionType in order to know
which action was emitted. Based on that actionType, we’ll know exactly what
setter function (which we created in step 2 above) to invoke in order to modify
the data. Once we invoke our setter function, we will then emit a change event,
then, because in our addChangeListener method in our todoStore we set up the
.on() event handler, whenever it hears the change event, it will invoke the
callback function which was passed to it which is _onChange from our original
component.

Here's the full code for the todoStore.js file.

```javascript
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var addItem = function(item){
  _store.list.push(item);
};

var removeItem = function(index){
  _store.list.splice(index, 1);
}

var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = todoStore;
```

Let’s walk step by step through the whole process now.

* Our todoStore is created, creating a place where our data lives, some setter
functions, a todoStore object with a getList method a addChangeListener and
removeChangeListener function, and we register our callbacks with the
Dispatcher.
* When our component mounts, we pass *_.onChange* to
*todoStore*.*addChangeListener* which makes it so whenever the Store hears the
“CHANGE” event, it will run *_.onChange* which will refetch the data from the
store using *todoStore.getList()* and update its own state with the data
returned from *getList()*.
* A user clicks “Submit” wanting to add a new item to their todo list which
invokes a method on the component which we’ll call *handleAddItem*.
* *handleAddItem* runs and invokes the todoActions.addItem method passing it the
new item to add.
* The *addItem* method on our *todoActions* object invokes
*AppDispatcher.handleAction* passing it an object with the actionType of
*appConstants.ADD_ITEM* and the data of the original todo item.
* When AppDispatcher.handleAction invokes, it emits *appConstants.ADD_ITEM*,
because of step 1, the callback we passed to *AppDispatcher.register *in our
Store is invoked, the switch statement catches the *appConstants.ADD_ITEM
*conditional and then *addItem *is invoked which pushes the new item onto our
data in the Store.
* todoStore emits a “*CHANGE*” event then because of step 2, *todoStore* hears
that event which invokes the callback function which was passed to it which was
originally *_onChange* in our component
* *_onChange* runs which uses *todoStore.getList()* in order to update its own
internal state and now we’ve gone full circle.

    That process in code will look like this.

    1. See Code Above

    2.
      componentDidMount: function(){
        todoStore.addChangeListener(this._onChange);
      }

    3.
      handleAddItem: function(newItem){
        todoActions.addItem(newItem);
      }

    4.
      AppDispatcher.handleAction = function(action){
        this.dispatch({
          source: 'VIEW_ACTION',
          action: action
        });
      };

    5.
      case appConstants.ADD_ITEM:
          addItem(action.data);

    5.5

      var addItem = function(item){
        _store.list.push(item);
      };

    6.
      todoStore.emit(CHANGE_EVENT);
        break;

    6.5

      addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
      },

    7.
      _onChange: function(){
        this.setState({
          list: todoStore.getList()
        })
      }

Now, that might seem like a rather large and unnecessary process to take. That’s
a fair judgement. But remember what Flux is designed to do. It’s not meant for
small apps with little data but instead meant to be implemented with large apps
with complex and ever changing data.