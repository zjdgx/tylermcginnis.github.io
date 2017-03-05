---
title: "Build your own React Router v4"
date: "2017-03-02T12:12:03.284Z"
layout: post
path: "/build-your-own-react-router-v4/"
articleImage: "todo"
description: "There's no better way to learn how React Router works under the hood than building our own version of it."
---

I still remember the feelings when I first started learning about routing in client side applications. At the time I was just a wee lad still getting my feet wet with this whole "Single Page Application" thing and I'd be lying if I said it didn't take a poop all over my brain. From the beginning it's as if my brain treated my application code and my router code as two unique and distinct ideas. There was my application code, and then there was my routing code. They were like step brothers who didn't like each other but were forced to live together anyway.

Over the last few years I have, probably at this point against your approval, been fortunate enough to be able to teach this idea of routing to other developers. Unfortunately, it turns out that most of our brains seem to be wired similarly to mine when it comes to this topic. I think there's a few reasons for this. First, routing in general is pretty complex. This makes, for those library authors, finding the right abstraction over routing even more complex. Second, because of this complexity, consumers of routing libraries tend to blindly trust the abstraction without really understanding what's going on under the hood. In this tutorial we'll dive into solving both problems. First the later by recreating our own simplified version of React Router v4 which will then shed some light on the former, that is, whether or not RRv4 is a reasonable abstraction.

Here's our app code we'll be using to test our ~React Router implementation once we've built it.

TODO. Get working example to play with.

```
const Home = () => (
  <h2>Home</h2>
)

const About = () => (
  <h2>About</h2>
)

const Topic = ({ topicId }) => (
  <h3>{topicId}</h3>
)

const Topics = ({ match }) => {
  const items = [
    { name: 'Rendering with React', slug: 'rendering' },
    { name: 'Components', slug: 'components' },
    { name: 'Props v. State', slug: 'props-v-state' },
  ]

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {items.map(({ name, slug }) => (
          <li key={name}>
            <Link to={`${match.url}/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
      {items.map(({ name, slug }) => (
        <Route key={name} path={`${match.path}/${slug}`} render={() => (
          <Topic topicId={name} />
        )} />
      ))}
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
  )
}

const App = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>

    <hr/>

    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/topics" component={Topics} />
  </div>
)
```

If you're unfamiliar with React Router v4, here's the basic premise. `Route`s render some UI when a URL matches a location you specificy in the Route's `path` prop. `Link`s provide a declarative, accessible way to navigate around your app. In other words, the `Link` component allows you to update the URL, and the `Route` component changes your UI based on that new URL. *The focus of this tutorial isn't actually on teaching the basics of RRV4, so if the code above is still confusing, head over to [the official docs](https://reacttraining.com/react-router), play around with the examples, and once you're more comfortable, join us again.*

The first thing you should notice is that we've introduced two components that were given to us by the router into our app, `Link` and `Route`. My favorite aspect of React Router v4 is that the API is "Just Components™". What this means is that if you're already familiar with React, the same intuition you have about components and how to compose them, will continue to hold true in regards to your routing code. And even more convenient for our use case here, because we're already familiar with how to create components, creating our own React Router will be nothing more than doing what we're already familiar with, creating more components.

We're going to start off by creating our `Route` component. Before we dive into the code, let's go ahead and check out the API (which conveniently is just which props it takes).

In our example above, you'll notice that it can take in three props. `exact`, `path`, and `component`. This means the `propTypes` for our `Route` component currenty look like this,

```
static propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
}
```

There's a few subtleties here. First, the reason `path` isn't required is because if a `Route` isn't given a path, it will automatically be rendered. Second, the reason `component` isn't marked as required either is because there are actually a few different ways to tell React Router the UI you want to render if the path matches. One way that isn't in our example above is with the `render` prop. It looks like this,

```
<Route path='/settings' render={({ match }) => {
  return <Settings authed={isAuthed} match={match} />
}} />
```

`render` allows you to conveniently inline a function which returns some UI rather than creating a separate component. So we'll add that to our propTypes as well,

```
static propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
  render: PropTypes.func,
}
```

Now we know what props `Route` receives, let's talk again about what it actually does. Route "renders some UI when the URL matches a location you specificy in the Route's `path` prop". Based off of that definition we know that Route is going to need some functionality which checks if the current URL matches the component's `path` prop. If it does, we'll render some UI. If it doesn't, we'll do nothing by returning null.

Let's see what this looks like in code, using a placeholder for our matching function for now

```
class Route extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func,
  }

  render () {
    const {
      path,
      exact,
      component,
      render,
    } = this.props

    const match = matchPath(
      location.pathname, // global DOM variable
      { path, exact }
    )

    if (!match) {
      // Do nothing because the current
      // location doesn't match the path prop.

      return null
    }

    if (component) {
      // The component prop takes precedant over the
      // render method. If the current location matches
      // the path prop, create a new element passing in
      // match as the prop.

      return React.createElement(component, { match })
    }

    if (render) {
      // If there's a match but component
      // was undefined, call the render
      // prop passing in match as an argument.

      return render({ match })
    }

    return null
  }
}
```

Now `Route` is looking pretty solid. If the current location matches the prop that was passed in, we render some UI, if not, we don't do anything.

Let's take a step back for a moment and talk about routing in general. In a client side application, there are really only two ways for the user to update the URL. The first way is clicking on an anchor tag and the second is by clicking the back/forward button. Foundationally, our router needs to be aware of the current URL and render UI based on that URL. What this also means is that our router needs to be aware of when the URL changes, so that it can figure out which new UI to display based on that new URL. If we know that the only way to update a URL is through an anchor tag or the forward/back button, we can plan for and react to those changes. We'll get into anchor tags a little later when we build out our `<Link>` component, but for now, I want to focus on the back/forward buttons. React Router uses [History](https://github.com/ReactTraining/history)'s `.listen` method to listen to changes for the current URL, but to avoid bringing in another library, we'll use HTML5's `popstate` event. `popstate`, which will be fired whenever the user clicks on the forward or back button, is exactly what we need. Because it's the `Route`s that are rendering the UI based off the current URL, it makes sense to also give `Route`s the ability to listen for and re-render whenever a `popstate` event occurs. By re-rendering, each `Route` will re-check to see if they match with the new URL. If they do, they'll render UI, if not, they'll do nothing. Let's see what this looks like now,

```
class Route extends Component {
  propTypes: {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
  }

  componentWillMount() {
    addEventListener('popstate', this.handlePop)
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.handlePop)
  }

  handlePop = () => {
    this.forceUpdate()
  }

  render() {
    const {
      path,
      exact,
      component,
      render,
    } = this.props

    const match = matchPath(location.pathname, { path, exact })

    if (!match)
      return null

    if (component)
      return React.createElement(component, { match })

    if (render)
      return render({ match })

    return null
  }
}
```

You should notice that all we've done is added a `popstate` listener when the component mounts, and when the `popstate` event is fired, we call `forceUpdate` which will kick off a re-render.

Now, no matter how many `<Route>`s we're rendering, each of them will be listen for, re-match, and re-render based on the forward/back buttons.

One thing we've been "hand waving" over up until this point has been our `matchPath` function. This function is pivitol to our router because it's the function which is going to decide if a current URL matches the path of a `<Route>` component as we talked about above. One nuance to `matchPath` is we need to make sure that we take into account `<Route>`s `exact` prop. If you're not familiar with what `exact` does, here's an explanation straight from the docs


> When `true`, will only match if the path matches the `location.pathname` _exactly_.

| path | location.pathname | exact | matches? |
|---|---|---|---|---|
| `/one`  | `/one/two`  | `true` | no |
| `/one`  | `/one/two`  | `false` | yes |

Let's dive into the implementation of our `matchPath` function now. If you look back at our `Route` component, you'll see that the signature for `matchPatch` looks like this,

```
const match = matchPath(location.pathname, { path, exact })
```

Where `match` is either an object or null depending on if there was a match. Based on that signature, we can build out the first part of `matchPath` like this,

```
const matchPatch = (pathname, options) => {
  const { exact = false, path } = options
}
```

Here we're using some ES6 magic. We're saying "create a variable called exact which equates to options.exact, unless that's undefined, then set it to false. Also create a variable called path which eqautes to options.path".

Earlier I mentioned "the reason `path` isn't required is because if a `Route` isn't given a path, it will automatically be rendered". Well since it's indirectly our `matchPath` function which decides if something is rendered or not (by whether there's a match), let's add that functionality now.

```
const matchPatch = (pathname, options) => {
  const { exact = false, path } = options

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    }
  }
}
```

Now comes the matching part. React Router uses [pathToRegex]() for this, we'll simplify things and just use a simple Regex.

```
const matchPatch = (pathname, options) => {
  const { exact = false, path } = options

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    }
  }

  const match = new RegExp(`^${path}`).exec(pathname)

}
```

If you're not familiar with `.exec`, it's going to return an array containing the matched text if it finds a match, otherwise it returns null. Here is every `match` for when our example app routes to `/topics/components

| path | location.pathname | return value |
|---|---|---|---|---|
| `/`  | `/topics/components`  | `['/']` |
| `/about`  | `/topics/components`  | `null` |
| `/topics`  | `/topics/components`  | `['/topics']` |
| `/topics/rendering`  | `/topics/components`  | `null` |
| `/topics/components`  | `/topics/components`  | `['/topics/components']` |
| `/topics/props-v-state`  | `/topics/components`  | `null` |
| `/topics`  | `/topics/components`  | `['/topics']` |


> Notice that we're getting a `match` for every `<Route>` that's in our app. That's because, well, each `<Route>` calls `matchPath` in its render function.

Now that we know exactly what our match RegExp is returning, all we need to do now is figure out if there's a match.

```
const matchPatch = (pathname, options) => {
  const { exact = false, path } = options

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    }
  }

  const match = new RegExp(`^${path}`).exec(pathname)

  if (!match) {
    // There wasn't a match.
    return null
  }

  const url = match[0]
  const isExact = pathname === url

  if (exact && !exact) {
    // There was a match, but it wasn't
    // an exact match as specified by
    // the exact prop.

    return null
  }

  return {
    path,
    url,
    isExact,
  }
}
```


The way you navigate is by clicking a link, or clicking the back button, we can listen for link clicks by hijacking anchor tags, and we can listen to the back button by setting up popstate event listeners.


[Sometime later? Finishing paragraph?] At this point you'll notice API is "Just Components ™". I've always said that React will make you a better JavaScript developer. Well, React Router will make you a better React developer. Because everything is "Just Components", if you know React, you know React Router.

