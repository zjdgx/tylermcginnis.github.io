---
title: "Functional Components vs. Stateless Functional Components vs. Stateless Components"
date: "2015-12-15T11:12:03.284Z"
layout: post
path: "/functional-components-vs-stateless-functional-components-vs-stateless-components/"
---

Earlier today I read Dan Abramov’s [“React Components, Elements, and
Instances”](https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca#.b7hh0fbh9)
article. As always I loved the article but even more than that, this time, I
loved Dan’s focus on using proper vocabulary to describe technical topics. That
post gave me the idea for this post. Three ways to describe React components
which are often used incorrectly — **Stateless Components**, **Stateless
Functional Components**, and **Functional Components**.

Let’s look at the differences between the three.

#### #1 Stateless Components

```javascript
const Repos = React.createClass({
  render(){
    return (
      <div>
        <h3> User Repos </h3>
        <ul className="list-group">
          {this.props.repos.map((repo, index) => {
            return (
              <li className="list-group-item" key={repo.name}>
                <h4><a href={repo.html_url}>{repo.name}</a></h4>
                <p>{repo.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})

class Repos extends React.Component {
  render(){
    return (
      <div>
        <h3> User Repos </h3>
        <ul className="list-group">
          {this.props.repos.map((repo, index) => {
            return (
              <li className="list-group-item" key={repo.name}>
                <h4><a href={repo.html_url}>{repo.name}</a></h4>
                <p>{repo.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
```

All the code above does is it receives an array of repositories of a specific user, maps over those
repositories, and displays them to the view.

You should feel pretty at home with the code above. *createClass* has been
around since the heavens opened and bestowed React upon us and *React.Component*
has been around since React 0.13.0 Beta 1 (January 2015). Neither component is
using getInitialState or a constructor to initialize a state property. Each
component is receiving its data as props then simply presenting that data.

#### #2 Stateless Functional Components

```javascript
const Repos = ({repos}) => {
  return (
    <div>
      <h3> User Repos </h3>
      <ul className="list-group">
        {repos.map((repo, index) => {
          return (
            <li className="list-group-item" key={repo.name}>
              <h4><a href={repo.html_url}>{repo.name}</a></h4>
              <p>{repo.description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

Notice the code above is just a function (granted a fancy ES6 function but
that’s besides the point). If your component has just a *render* method (and no
state), you can simply create your component as a *Stateless Functional
Component* and your function will be passed *props* as its first argument. Also
notice that we’re NOT calling this a* Stateless Component* or a *Functional
Component*. The reason for that brings us to number 3.

#### #3 Functional Components

```javascript
const ReposWithState = () => {
  ¯\_(ツ)_/¯
}
```

[In the future, React will have Functional Components that contain their own
state. ](https://twitter.com/sebmarkbage/status/658713924607606784)This is the
reason why the code in #2 above shouldn’t be called a Stateless Component nor
should it be described as a Functional Component, because future Functional
Components will also be able to have their own state.

I realize this might come off as hairsplitting, but I strongly believe that
clearly understanding the vocabulary for technical topics will make learning and
teaching said topics much easier.