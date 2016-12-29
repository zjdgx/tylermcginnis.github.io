---
title: "React Tutorial Pt 2: Building React Applications with Gulp and Browserify."
date: "2015-01-19T08:14:05.284Z"
layout: post
path: "/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/"
description: "A guide to building a React app with Gulp and Browserify."
---

<hide-from-preview>

****

Table of Contents:

[Pt I: A Comprehensive Guide to Building Apps with
React.js.](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)

[Pt 1.5: Utilizing Webpack and Babel to build a React.js
App](http://tylermcginnis.com/react-js-tutorial-1-5-utilizing-webpack-and-babel-to-build-a-react-js-app/)

**[Pt II: Building React.js Apps with Gulp, and
Browserify.](http://tylermcginnis.com/react-js-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)**

[Pt III: Architecting React.js Apps with
Flux.](http://tylermcginnis.com/react-js-tutorial-pt-3-architecting-react-js-apps-with-flux/)

~~Pt IV: Add Routing to your React App with React Router. (Coming Soon)~~**

~~Pt V: Add Data Persistence to your React App with Firebase. (Coming Soon)~~**

~~Pt VI:Combining React.js, Flux, React Router, Firebase, Gulp, and Browserify. (Coming
Soon)~~*

**__Check out my [React.js Program](http://reactjsprogram.com/). It's the successor to this blog series.__
****
__Since writing this post I (along with most of the community) have adopted
Webpack over Gulp. This is still a great post and contains some great
information, but I recommend reading
**[THIS](http://tylermcginnis.com/react-js-tutorial-1-5-utilizing-webpack-and-babel-to-build-a-react-js-app/)**
tutorial for actual implementation as this post is a little out of date.__

****
</hide-from-preview>

In part 1 we talked about all things React.

At this point you should feel comfortable with the following parts of React -

    JSX
    Virtual DOM
    React.createClass
    render (method)
    React.render
    state
    getInitialState
    setState
    props
    propTypes
    getDefaultProps
    Component LifeCycle
    componentWillMount
    componentDidMount
    componentWillReceiveProps
    componentWillUnmount
    Events
    onClick
    onSubmit
    onChange

If you’re not comfortable with the above, go re-read [part
1](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/).

At this point you might have noticed that in order to actually build apps with
React, you need a way to transform your JSX into JS and also a way to
export/import components from other components (or you need to put some thought
into how you load your script tags in your HTML). This tutorial is going to
introduce Gulp as a way to transform JSX into JS (along with a few other handy
transformations). It’s also going to cover using Browserify with React in order
to be able to import/export components for the use in other components.

*I realize that there are many other ways to do the JSX -> JS transformation
and specifically a lot of people are using webpack for mostly all of this. Those
other ways are great. I’ve found that for beginners though, Gulp and Browserify
make a great pair which abstracts some low level complexities without
abstracting everything. I hope to build a future tutorial which uses Webpack
instead of Gulp/Browserify.*

Let’s start with Gulp. If you’ve had experience with another build tool, such as
Grunt or Broccoli, this will make a lot of sense. If you have no experience with
build tools, this next section is more specifically for you.

Let’s talk about why we need a tool like Gulp. Think of all the cool tools
developers have built on top of things like JavaScript and CSS. Let’s use SASS
and Coffeescript as examples. One day this (or perhaps these) developers got
together and they said something along the lines of “Hey, CSS is cool, but it
has a lot of limitations. Let’s make a language that is a layer on top of CSS.
What we can do is we can create a language that is more powerful than CSS and
has a lot more features. Then all we have to do is figure out a way for our
language to have some sort of process to it which allows developers using our
language to convert it (or transpile it) to actual CSS so the browser can
understand it.” — and that’s exactly what they did. Coffeescript is another
example. That conversation probably went like this “Wow JavaScript is so ugly.
There’s not even a class keyword. We should build a language that isn’t so ugly
and then figure out how to transpile it to actual JavaScript because that’s all
the browser can understand.” A conversation similar to this most likely occurred
when the React team decided to go with this JSX idea. As long as there’s a way
to convert the “transpiled language” to a real language the browser can
understand, there’s no issue. One convenient use case for Gulp is that we can
tell Gulp that whenever we change a certain file or whenever we do some certain
event, to go ahead and take our Coffeescript, SASS, JSX (etc), and transpile it
into actual JavaScript or CSS.

Though having Gulp transpile your code is great, if you were only doing that,
you probably don’t need the power of Gulp since there are more basic solutions.
However, we’re going to use Gulp for more than just transpiling our JSX into JS.
Let’s think of some more things we do as developers that could be automated with
a build tool process like Gulp. Perhaps the most obvious processes are the ones
we use right before pushing our code to production. We first minify our code
(shorten variable names, remove white space, etc) in order to minimize our file
size. Next thing we usually do is concatenate all of our JavaScript files into
one file so when the client makes a request to the server for our app, it can
grab that one concatenated JavaScript file without having to worry about making
a bunch of requests to grab all of the files. Next thing you would need to do is
head over to your HTML page and change out all your ```<script>``` tags with just one,
which was the minified JavaScript file. There are a plethora of things you can
do with Gulp, we’ll stick with the most common ones for this post.

Now that you have a better idea of why build tools like Gulp are so handy, let’s
jump into getting started with Gulp.

The first thing you need to do when starting out with Gulp is to use NPM to
install Gulp globally. If you’re not familiar with NPM, download Node and then
do some googling. Using NPM is outside of the scope of this tutorial but is
fairly straight forward.

In your terminal run

    npm install --global gulp

that will install gulp globally on your computer.

Now, go ahead and make a new project with a folder structure that looks like
this (remember, passively reading this tutorial won’t get you very far).

    gulpfile.js
    src
      index.html
      js
        App.js
        Child.js
        Parent.js

Head over to your *index.html* page and add the following code.
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js"></script>
    <script src="src/Child.js"></script>
    <script src="src/Parent.js"></script>
    <script src="src/App.js"></script>
  </body>
</html>
```

Notice it’s pretty bare right now. All we really have is a div with an id of app
and we’re loading React from a CDN.

Head over to your* Child.js* file and add the following code.

```javascript
var Child = React.createClass({
  render: function(){
    return (
      <div>
        and this is the <b>{this.props.name}</b>.
      </div>
    )
  }
});
```

One more boilerplate addition. Now head over to your Parent.js file and add the
following code.

```javascript
var Parent = React.createClass({
  render: function(){
    return (
      <div>
        <div> This is the parent. </div>
        <Child name="child"/>
      </div>
    )
  }
});
```

Now head over to your *App.js* file and add the following code.

```javascript
React.render(<Parent />, document.getElementById('app'));
```

Notice all we’re doing is creating two components, one child, one parent. The
parent component is rendered to *#app* (in *App.js*), which then renders the
child component passing in “child” as a property on props.

Now comes the fun part. Let’s head over to our *gulpfile.js* file and start
building out our build process. Here’s the functionality that we eventually want
from our final gulp build process.

Development

1) Transform our JSX into JS and save the output into a dist/src folder.
2) Copy our index.html from our src folder into the dist folder
3) Watch changes to any JS or HTML file then run the previous two processes again.

Production

1) Take all the JS files, concat them all together, minify the result, then output
the result to one file named build.js to the build folder inside the dist
folder
2) Replace our ```<script>``` tags in our index.html page with one ```<script>```
which references our new minified build.js file

With these processes above we’ll make it very simple to prepare our code for
production and also very simple to convert our JSX to JS during development.

#### **Download NPM Packages**

The very first thing we need to do is set up our package.json file. For those
unfamiliar with what our package.json is for, it’s essentially just a collection
of the node packages that are required for our application. In your terminal,
head over to the root of this project then type **npm init **and select from the
different options (you can just hit enter until it finishes). The options don’t
matter too much - you can change them later.

Once you’re finished with that you’ll have a bare package.json file. Now in your
terminal run the following commands.

    npm install --save-dev gulp;
    npm install --save-dev gulp-concat;
    npm install --save-dev gulp-uglify;
    npm install --save-dev gulp-react;
    npm install --save-dev gulp-html-replace;

If you’ve used npm before, this is pretty straight forward. If you haven’t, we
practically just did witchcraft. All we did was tell npm to go and download each
of those packages and save them into our *node_modules* folder (which was
created for us) and add them to our *package.json* file as a developer
dependency. Now if you check out the *node_modules* folder, it should be full of
the packages above. What we can do now is in our *gulpfile.js* file, we can use
**require** to essentially import the code from each of the different packages
and save that functionality into a variable. Let’s do that right now.

In the top of your *gulpfile.js* file, add the following code.

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
```

Notice we’ve created a variable for each of the packages we downloaded earlier.
Now, each of those variables is just whatever was being exported from each
individual package.

Before we dive into building our different Gulp tasks, we first need to create a
paths object. This paths object is going to be filled with properties that
represent differents paths. Copy this code under your variable declarations in
our *gulpfile.js* file.

```javascript
var path = {
  HTML: 'src/index.html',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};
```

Now that are paths are defined, let’s create our first gulp task.

#### **Gulp Tasks for Development**

Our first task is going to be called transform and it’s going to be what
transforms our JSX into JS. The code for this task looks like this,

```
gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});
```

Perhaps the coolest thing about Gulp is its ability to pipe and chain function
invocations. What this means is that we’re able to take one file, transform it
and do something with it, then take that transformation and do something else
with it, then when we’re finished, tell it where to put the newly created file.
That’s exactly what we’re doing above. We create a gulp task called transform
and pass it a callback function. In our callback function we grab the *path.JS
array*. Gulp then gets each one of those files, transforms them using the react
method we initialized earlier then pipes that outcome to *dist/src*. If you ran
this task, after you’d see that Gulp took all your JS files, converted your JSX
to JS, then outputted the results to a new *src* folder in a new *dist* folder -
all in a manner of milliseconds. Pretty rad.

Let’s create our next Gulp task. All this task is going to do is take our
*index.html* file and copy it over to our *dist* folder so our newly created JS
files from our transform Gulp task above can be referenced by our *index.html*
page.

```javascript
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});
```

We’re now going to create our last Gulp task for development. What we want to do
is create a task that will always be running so when we change either our
*index.html* or any of the JS files, our two tasks from earlier will run and
update the code in the *dist* folder.

```javascript
gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy']);
});
```

What the task above is saying is watch all of our files, whenever any of them
change, run the transform task and the copy task. Pretty straightforward.

Now all we want to do for our development tasks is set up a default task. This
default task will run whenever we type **gulp** in our command line. Here’s the
code for that.

```javascript
gulp.task('default', ['watch']);
```

When we type **gulp**, Gulp will run the watch task, which we know watches our
files for changes and then runs the **transform** and **copy** tasks.

Those are all the tasks we’re going to create for developing. There are
obviously a plethora of other tasks you could create for dev, but those are what
we’ll stick with right now. At this point you should be able to run **gulp** and
the JSX in your *App.js* file will be converted to JS and the output will go to
*dist/src.* Your index.html file should have also been copied over to your dist
folder. Open your *index.html* page in the browser and you should see your
components being rendered.

**Production Gulp Tasks**

Now what we want to do is create a few gulp tasks for production so whenever we
run **gulp build** our code will prepare itself to get pushed to production.

The first task we’re going to build for production is called **build**. This
task is going to grab all of our JS files, concatenate all of them together,
minify them, then output the result to our *dist/build* folder. The code for
that looks like this.

```javascript
gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});
```

The only thing that might look a little strange is the *path.OUT* argument we’re
passing to concat and uglify. All this is doing is telling both of those
functions what the resulting file path should be, so in this case, when we use
gulp.dest it’s going to take the *path.MINIFIED_OUT* file (*build.min.js*) and
output it to *path.DEST_BUILD* (*dist/build*).

Now you might notice this is cool, but at this point it’s a little annoying
because whenever we run **gulp build**, we then need to go and change our HTML
to reference the new *build.min.js* file rather than *src/App.js* and whatever
other script tags we’re referencing here. What if there were a way to, whenever
we ran our production gulp tasks, to replace all of our ```<script>``` tags with just
our new ```<script src=”build/build.mins.js”>``` script and then output that new
file to our dist folder? Well, there is. The way we’re going to do that is with
a **gulp-html-replace**. First, we need to head over to our index.html in our
main src folder and make some additions. Go ahead and modify the original
child/parent/App.js scripts to be wrapped in comments like this.

```html
<!-- build:js -->
<script src="src/Child.js"></script>
<script src="src/Parent.js"></script>
<script src="src/App.js"></script>
<!-- endbuild -->
```

What’s going to happen is we’re going to tell Gulp, “Hey Gulp, when I tell you
to, concat and minify all my JS files and output them to a new *dist/build*
folder. As you’re doing that go to my copied *index.html* page in my *dist*
folder and replace the **build:js** comment and whatever is inside of it with
this new script tag ```<script src="build/build.min.js"></script>``` but don’t
change my original *index.html* file in my normal *src* folder because I still
want to develop with that.”

Let’s now build out our replaceHTML task. The code should look like this

```javascript
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
```

Note that what we give htmlreplace is an object with a key that represents where
to replace and whose value is what to replace. That ‘js’ key in htmlreplace
coincides with** build:js** in our *index.html* page.

Very last step is now that both of our production tasks are ready, we need to
create another task that wraps both of those tasks in one. We do that with the
following code

```javascript
gulp.task('production', ['replaceHTML', 'build']);
```

Now whenever we run **gulp production**, Gulp will run our **replaceHTML** and
**build** tasks. Go ahead and give it a try and check that your
*dist/index.html* and *dist/build/build.min.js* files are correct.

For reference, here’s the full *gulpfile.js* file.

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
  HTML: 'src/index.html',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy']);
});

gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['watch']);

gulp.task('production', ['replaceHTML', 'build']);
```

At this point we have a full working build process using just Gulp. As you might
have noticed, this method has some weaknesses. First, you have to be very
careful how you load your different components in your HTML. Notice that we’re
loading the *Child.js* file before the *Parent.js* file. This makes sense
because *Parent.js* is dependent upon *Child.js*. Also note how we’re loading
*Parent.js* before we load *App.js*, again this is because Parent is required in
the *App.js* file. It might seem pretty straight forward in this example but as
your app grows, it’s very tricky to keep track of these Parent/Child
relationships and not to mention both Child and Parent are now in the global
scope, which from CS 101 we know is not a good thing. Another weakness in this
method is that if you put a debugger in our JSX, by the time our browser loads
that debugger we’re no longer in JSX land but in JS land and we have no way of
telling which line the error is on in our original JSX code. This isn’t ideal.
Although we still will always have to debug our transpiled JSX version, it would
be neat if we were able to still get the line numbers of where the error was at
in our original JSX file. Good news is when we introduce Browserify into our
build process, it will take care of both of these weaknesses and more.

At a fundamental level, all [Browserify](http://browserify.org/) allows you to
do is require certain packages just like we did earlier with gulp, concat,
uglify, etc. This has huge benefits for us because not only do we now have
access to all of NPMs packages, but we’re now able to require only the packages
(or React components) we need to for that specific file. This solves our problem
of all of our components being on the global scope. Let’s take a quick look at
exporting and requiring modules.

I remember when I first started leaning about Browserify every definition about
it would be in terms of commonjs - which meant literally nothing to me because I
knew nothing about commonjs. That is until I fell upon
[this](http://www.reddit.com/r/webdev/comments/2e0161/eli5_amd_commonjs_es6/)
article on Reddit. The author talks about how Commonjs, AMD, and ES6 Modules are
all ways to “break a Javascript project up into multiple self-contained modules
and managing the dependencies between them”. That makes sense. I can essentially
create module that can be passed around and used in other parts of my
application without having to pollute the global scope. The author continues,
“CommonJS is the standard implemented by Node. A file can assign any value
(including a function or object) to its module.exports property and any other
file can use require(“filename”) to get a copy of that value. It works great in
Node but isn't usable in a web browser; because of a quirk of the way file
loading in HTML and Javascript works fetching each of the files would cause the
browser to hang until it was loaded. There are, however, some tools (browserify)
that will let you write your browser code in CommonJS and automatically convert
it to something web appropriate.” Then it clicked. All Browserify allows me to
do is have the greatness of using require in Node, but on the browser. This is
fantastic for React because as you’ve probably guessed by now, each React
component we create can be its own module that we can then require in other
components based off of need. Let’s take a look at some sample commonjs syntax.

We’re going to create three files (***NOTE: This example (Add, Multiply, Math)
is just for demonstrating how Commonjs works, it's not part of the overall
tutorial***). The first file will be called *Add.js* and it will export an
object with an addition helper method on it. The second file will be called
*Multiply.js* and it will export an object with a multiplication helper method
on it. The third will be called *Math.js* where we require and then use our Add
and Multiply module.

**Add.js file**

```javascript
var addObj  = {
  add: function(x,y){
    return x + y;
  }
};
module.exports = addObj;
```

**Multply.js file**

```javascript
var multiplyObj = {
  multiply: function(x,y){
    return x * y;
  }
};
module.exports = multiplyObj;
```

**Math.js file**

```javascript
var addObj = require(‘./Add’);
var multplyObj = require(‘./Multiply’);

addObj.add(3,4) // 7
multiplyObj.multiply(2,5) // 10
```

Just a few minor things to note about the code above. If you want a certain
object or function to be available in a different file, you use module.exports
to export your code.

If you want to require whatever was exported from a different file, you use
require and whatever the name of that file was minus the extension.

Now that we have a solid understanding of how Browserify can make our React code
more modular, let’s view the bigger picture of what our build process will look
like when we incorporate browserify. We’re still going to have two main tasks,
**watch** and **build**. **watch** for development and **build** for production.
On the surface both of these tasks will look very similar to our tasks before we
added Browserify. Our **watch** task is going to concat our JS files, transform
them from JSX to JS, and output the results into our *dist* folder. **build**
will also transform our JSX to JS, concatenate, minify, then output the result
to out *dist* folder. The process looks similar, but there are actually some
really cool features introduced by Browserify which we haven’t talked about.
We’ll get those more when we look at the code.

Let’s jump in.

**Browserify + Gulp + React (Development Tasks)**

Like before, we’re going to start out downloading all of the NPM packages we’ll
need for our new gulpfile. However, before we jump into that let’s hurry and
remove an NPM package we were using for the previous example that we won’t be
using for this example. In your terminal run

    npm uninstall gulp-concat;

This commands remove the Concat libraries from our *package.json* and our
*node_modules* folder.

Now let’s install the new NPM packages we will need. Run the following command
in your terminal.

    npm install --save-dev vinyl-source-stream;
    npm install --save-dev browserify;
    npm install --save-dev watchify;
    npm install --save-dev reactify;
    npm install --save-dev gulp-streamify;

We’ll get into what each of these packages do when we use them in our tasks.
Head over to your *gulpfile.js* and go ahead and remove everything. It’s easier
to start new since we’re introducing a pretty big change with browserify. At the
top of your gulpfile add the following code like we did before.

```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};
```

The first task we’re going to create is our copy task. This is exactly the same
as before. We’re taking our index.html page and copying it over to our *dist*
folder.

```javascript
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});
```

Our next task is going to be our main task for development. This one is pretty
lengthy so I’ll post the code and we’ll walk through it.

```javascript
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});
```

The very first thing we do is tell Gulp to watch our *index.html* file for any
changes and if something does change, run the copy task.

The next thing we do is set up a watcher. Watchify works very closely with
Browserify. A problem that was occurring with these Browserify/React build
processes was that Browserify would take forever to transpile because it was
going through every component every single time anything changed and would
re-update the new bundled file. Watchify fixes this. Instead of going through
every file, Watchify will cache your files and only update the ones that need to
be updated. This makes builds take a LOT less time.

Notice we’re passing a browserify function invocation to our watchify function
invocation. Let’s now talk a bit about that browserify invocation. We’re passing
browserify an object that is going to essentially set up the configurations for
our browserify build. The first property on the object is **entries**. Notice
entries is an array with the path of just our main component in it (*app.js*).
You might remember earlier we had a JS array (*['src/js/*.js',
'src/js/**/*.js']*) which was every JS file we wanted to be transformed from JSX
to JS. Well one perk with browserify is that you just tell it the entry point or
the main component in your app and it will take care of all the child
components. Pretty slick. Next we have the **transform** property. Browserify
works with more than just React. Here is where we tell Browserify how to
transform our code. In this case, we’re using reactify which will take care of
our JSX to JS transpiling. Next is **debug** which is set to true. This tells
Browserify to use source maps. What source maps do is even though we’re
referencing the transpiled JSX in our index.html page, through source maps when
there is an error in our code, the error will point to the line number in our
JSX file rather than our transpiled JS file. This is super convenient for
debugging. That last line with **cache: {}, packageCache: {}, fullPaths: true**
is necessary, but we won’t go into it. The watchify website just states that
it’s needed in order to use watchify.

The next thing we’re going to do is set up our watcher to watch for updates in
our parent component or in any of its children components. We tell our watcher
to watch for updates then we pass it a callback function to invoke whenever
there is an update. The code in the callback should look fairly familiar.
**watcher.bundle() **concatenates all of our different components into one file
and does some browserify magic to make the module.exports/requires work. Then
the rest is just piping the result to our *dist/src* folder. The last thing in
our watch task is that we’re continuing to bundle and pipe after we set up the
on update callback. The reason for this is so that when we first call **gulp
watch** our code will bundle and pipe itself to the dist folder even before a
change is made. Then any changes made to our JS files after that will just
overwrite the initial bundled code.

The last thing for our development tasks is to set the default gulp task to run
the watch task so we can now just run **gulp** and our watch task will kick off.

```javascript
gulp.task('default', ['watch']);
```

#### **Browserify + Gulp + React (Production Tasks)**

Just like before we started using Browserify, I like to keep my Development and
Production tasks separate. Like before, create a gulp task called **build**.
This task is going to be very similar to our **watch** task except this one is
only going to bundle and pipe our code without actually watching it for updates.
It’s also going to minify the final code then output it to *dist/build* rather
than *dist/src*.

```javascript
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});
```

Like I mentioned, this is mostly the same. We got rid of source mapping and our
watchify stuff and added minification, but that’s it.

Also exactly like before we used Browserify, we want to be able to modify our
index.html page when it’s ready for production and switch out our regular
scripts with the minified versions. We’ll use the same **replaceHTML** task that
we used before to do this.

```javascript
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
```

and to wrap both of our production tasks into one gulp process,

```javascript
gulp.task('production', ['replaceHTML', 'build']);
```

and that’s it! Here’s what the full *gulpfile.js* should look like
```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch']);
```

You now have a very nice build process that has some very nice features. To
recap, those features include

- JSX to JS transformation
- Source maps for debugging
- Fast since Watchify only updating the necessary files
-  More modularity with browserify
- Require only the files you need when you need them
- You only need to give browserify your most parent component and it takes care of the rest.

I hope this tutorial was useful for you.
At this point you should be fairly comfortable with React and its different
pieces. You should also have an idea of how to setup a build process using Gulp
and Browserify to compliment your React development. Up next, Flux and how to
better architect your React.js applications.