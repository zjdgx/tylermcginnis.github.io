---
title: 'React Interview Questions'
date: "2017-01-03T03:58:56.223Z"
layout: post
path: "/react-interview-questions/"
articleImage: "https://tylermcginnis.com/react-interview-questions/react-interview-questions.jpg"
description: 'Have an interview releated to React coming up? Here are some questions (and answers) you should know.'
---

<figure>
  <img style="margin: 0px auto; border-radius: 5px" src='react-interview-questions.jpg' />
</figure>

*For the record, asking someone these questions probably isn't the best way to get a deep understanding of their experience with React. For that, I'd rely on projects and or pair programming with them. Some of these I think are important to know, others, not so much.*

> What happens when you call __setState__?

Regardless of the framework, you typically want to update the UI whenever UI state changes in your app. That sounds obvious but it's the reason why you should only have UI state in your component state and it's the whole purpose of setState.

The first thing React will do when setState is called is merge the object you passed into setState into the current state of the component. This will kick off a process called reconciliation. The end goal of reconciliation is to, in the most efficient way possible, update the UI based on this new state. To do this, React will construct a new tree of React elements (which you can think of as an object representation of your UI). Once it has this tree, in order to figure out how the UI should change in response to the new state, React will diff this new tree against the previous tree. By doing this, React will then know the exact changes occured and by knowing exactly what changes occured, React is able to minimize its footprint on the UI by only updating where absolutely neccessary.

***

> What's the difference between an __Element__ and a __Component__ in React?

Simply put, a React element describes what you want to see on the screen. Not so simply put, a React element is an object representation of some UI. A React component is a function or a class which optionally accepts input and returns a React element (typically via JSX which gets transpilled to a `createElement` invocation).

For more info, check out [React Elements vs React Components](http://localhost:8000/react-elements-vs-react-components/)

***

> When would you use a __Class Component__ over a __Functional Component__?

If your component has state or a life cycle method(s), use a Class component. Otherwise, use a Functional component.

***

> What is the difference between a __controlled__ component and an __uncontrolled__ component?

A large part of React is this idea of having components control and manage their own state. What happens when we throw native HTML form elements (input, select, textarea, etc) into the mix? Should we have React be the "single source of truth" like we're used to doing with React or should we allow that form data to live in the DOM like we're used to typically doing with HTML from elements? Understanding the two different approaches will allow us to easily answer this question.

A __controlled__ component is a component where React is in *control* and is the single source of truth for the form data. As you can see below, *username* doesn't live in the DOM but instead lives in our component state. Whenever we want to update *username*, we call *setState*, as we're used to.

```javascript
class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () => {}
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.username}
          onChange={this.updateUsername} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

An __uncontrolled__ component is where your form data is handled by the DOM, instead of inside your React component. You use *refs* to accomplish this.

```javascript
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

Though uncontrolled components are typically easier to implement since you just grab the value from the DOM using refs, it's typically recommended that you favor controlled components over uncontrolled components. The main reasons for this are that controlled components support instant field validation, allow you to conditionally disable the submit button, and enforce input formats while uncontrolled components do not.

***

> What are __keys__ in React and why are they important?

***

> What are __refs__ in React and why are they important?

***

> If you created a React element like __Twitter__ below, what would the component definition of __Twitter__ look like?

```javascript
<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>
```

```javascript
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise
// which will resolve with that username's data.

class Twitter extends Component {
  // finish this
}
```

```javascript
import React, { Component, PropTypes } from 'react'
import fetchUser from './twitterAPI'
// fetchUser returns a promise

class Twitter extends Component {
  state = {
    user: null,
  }
  static propTypes = {
    username: PropTypes.string.isRequired,
  }
  componentDidMount () {
    fetchUser(this.props.username)
      .then((user) => this.setState({user}))
  }
  render () {
    this.props.children(this.state.user)
  }
}
```

***

> In which life cycle event do you make AJAX requests and why?

***

> Why is immutability important in React?

***

> What does __shouldComponentUpdate__ do and why is it important?

***

> How do you tell React to build in __Production__ mode and what will that do?

***

> Explain the life cycle of a React component.

***

> If iterating over child elements, why would you want to use `React.Children.map(props.children, () => )` instead of `props.children.map(() => )`

***

> Describe how events are handled in React.

***

> What is the difference between __createElement__ and __cloneElement__?

***

> What is the second argument that can optionally be passed to __setState__ and what is its purpose?

***

> What is wrong, if anything, with this code?

```javascript
this.setState((prevState, props) => {
  return {
    streak: prevState.streak + props.count
  }
})
```

Nothing is wrong with it 🙂. It's rarely used and not well known, but you can also pass a function to __setState__ that recieves the previous state and props and returns a new state, just as we're doing above.