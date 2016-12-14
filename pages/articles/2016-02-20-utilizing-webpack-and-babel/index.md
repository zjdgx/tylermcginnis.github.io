---
title: "React Tutorial 1.5: Utilizing Webpack and Babel to build a React.js App"
date: "2016-02-20T05:12:03.284Z"
layout: post
path: "/react-js-tutorial-1-5-utilizing-webpack-and-babel-to-build-a-react-js-app-5f804d729d3b/"
---

Let me preface this section by saying that Webpack is hard. Partially because
it’s an extremely powerful tool and partially because the documentation is
terrible. If you have experience with other tools like Gulp or Grunt it’s a bit
easier, but if you don’t, just hold on and it will get easier. We’re going to
hyperfocus on the real meat of Webpack for this course and jump into more
advanced features in other courses.

 > This is an excerpt from [React.js Program](http://www.reactjsprogram.com/), the successor of this tutorial series.
If you like this material, check out the program itself and specifically the
[React.js
Fundamentals](http://courses.reactjsprogram.com/courses/reactjsfundamentals)
course since it’s completely free and contains 12 videos, text, and actual
curriculum to work through. It’s a more linear approach to learn React and
the React ecosystem.

The first questions you should ask yourself whenever you’re using a new tool are
“Why does this thing exist?” and “What problem is this thing solving?”. If you
can’t eventually answer those two questions, you probably don’t need it. So
let’s answer those questions in terms of Webpack.

Why does webpack exist? Webpack, at its core, is a code bundler. It takes your
code, transforms and bundles it, then return a brand new version of your code.

What problem is this thing solving? Think about how many times we have to take
our code and change it so it’s compliant with what the browser is used to
(vanilla HTML, CSS, and JavaScript). If you’ve ever used a CSS Preprocessor like
SASS or LESS you know you need to transform your SASS/LESS code into normal CSS.
If you’ve ever used CoffeeScript or any compile to JavaScript language you know
there’s also a conversion step there. So where Webpack really shines is you’re
able to tell it every transformation your code needs to make, and it will do
them and output a bundle file for you full of those changes (and some other
helpful things as well like minification if you desire).

In this specific course we’re going to keep our Webpack configurations pretty
light, but in future courses we’ll jump into some more advanced topics.

If you think about the process we talked about above, that idea of taking your
code and transforming it in someway then spitting it out — there are really
three main steps and three main things Webpack need to know.

1) Webpack needs to know the starting point of your application, or your root
JavaScript file.

2) Webpack needs to know which transformations to make on your code.

3) Webpack needs to know to which location it should save the new transformed
code.

The code for this might look a little scary at first, but know that all we’re
doing is coding out those three steps above so Webpack can understand them.

The first thing we need to do is create a file which is going to contain our
Webpack configurations. Conveniently, this file should be named
**webpack.config.js** and be located in the root directory of our project.

Now that we have our file made we need to make sure that this file exports an
object which is going to represent our configurations for Webpack. If you’re not
familiar with JavaScript modules, I highly recommend [this blog
series](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.g9p44q9ly)
by [Preethi](https://twitter.com/iam_preethi).


Now let’s go ahead and walk down our list of those three items and convert them
into code. First up, telling webpack where the entry point of our application is
located. This one is pretty straight forward and looks like this,


All we do is give our object a property of **entry** and a value which is an
array with a string which points to our root JavaScript file in our app. You
might be asking why it’s an array instead of just a string. Webpack allows you
to have one or many entry points in your application. If you just have one, you
can just use a string. If you have more, you can use an array. I always default
to an array so I can easily add more later if needed.

Now that we’ve told Webpack where to start, we need to tell it which
transformations to actually make. This is where **loaders** will come in handy.

Let’s say that for some reason we’re still writing CoffeeScript in 2016 (ZING!).
We would need a way to transform our CoffeeScript into regular JS. Sounds like
the perfect place for a CoffeeScript loader. First step, we need to install the
loader we want. We’ll use npm to do this. In your terminal you would run **npm
install — save-dev coffee-loader** which would then save coffee-loader as a dev
dependency in your package.json file. Next, we need to configure our
webpack.config.js file to be aware of this specific transform. To do that we’ll
first need to add a **module **property to the object we’re exporting in
webpack.config.js and then that module property will have a property of
**loaders** which is an array.

```javascript
// In webpack.config.js
module.exports = {
  entry: [
    './app/index.js'
  ],
  module: {
    loaders: []
  }
}
```

Inside of that loaders array is where we’re (obviously) going to put all of our
different loaders or transformations we want to take place.

Each loader needs to be composed of three things. The first is which file type
to run the specific transformation on. For example, we don’t want to run CSS
transformations on a JavaScript file and vice versa. The next item is which
directories should be included or excluded from being transformed. An example
here is we don’t want to run our transformations on anything in our node_modules
folder, so we’d have the node_modules path as an excluded value. The last thing
is the specific loader we want to run. Let’s take a look at what this looks
like.

```javascript
// In webpack.config.js
module.exports = {
  entry: [
    './app/index.js'
  ],
  module: {
    loaders: [
      {test: /\.coffee$/, include: __dirname + '/app', loader: "coffee-loader"}
    ]
  },
}
```

The first thing you’ll probably notice is the **test:/\.js$/** section. It looks
scary if you’re not used to regular expressions but all it’s doing is it tells
Webpack to run the coffee-loader on all extensions that end in .coffee.

Next, **include** tells Webpack which directories to include in our
transformations. Instead of excluding node_modules, I chose to think positively
and include the directory we’d like transformed. Last step is an obvious one.
**loader** tells Webpack which transformation to run on all paths that match the
**test** RegEx and are in the **include** directory.

As you can see, the steps from including more loaders is pretty basic. NPM
install the specific loader then add a new object to the loaders array.

Now that we’ve done steps 1 and 2, we just have one more step. This last step is
specifying where Webpack should output the new transformed code.

```javascript
// In webpack.config.js
module.exports = {
  entry: [
    './app/index.js'
  ],
  module: {
    loaders: [
      {test: /\.coffee$/, include: __dirname + '/app', loader: "coffee-loader"}
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/dist'
  },
}
```

Again the code here is pretty self explanatory. **filename** is the name of the
file that Webpack is going to create which contains our new transformed code.
**path** is the specific directory where the new filename (**index_bundle.js**)
is going to be placed. If you’ve never seen **__dirname** before that’s just
referencing the name of the directory that the currently executing script
resides in.

So now when Webpack runs, our code will be transformed and then can be
referenced at **ourApp/dist/index_bundle.js**. Well that’s great, but now we
need to come up with a plan to get our HTML to reference this specific file.
There are a few options, but most are crappy. If we look at how normal apps are
usually structured it’s usually something like this.

    /app
      - components
      - containers
      - config
      - utils
      index.js
      index.html
    /dist
      index.html
      index_bundle.js
    package.json
    webpack.config.js
    .gitignore

So as you can see, our code we’re developing with is found in the **app** folder
and our transformed code is in the **dist** folder. Now you can visually see the
issue. We want to change the **index.html** located in the **app** folder but
the **index.html** file that the browser is actually going to be using is
located in the **dist** folder (because that’s where we’ve also told webpack to
spit out the transformed JS file).

The first option to solve this is to just manage two index.html files and
whenever you change the one located in /app, copy/paste that to the one located
in /dist. Though this will work, I won’t be able to look my Wife in the eyes
again if we do this.

Second option, we could figure out a way so that whenever webpack runs, our
**/app/index.html** gets copied over to **/dist/index.html**. This sounds a lot
better and the final solution will look close to this.

As you can probably guess, there’s already a Webpack tool that allows us to do
something similar. Instead of actually copying our index.html file, it’s just
going to use that file as a template and create a brand new index.html file.
This plugin is the html-webpack-plugin. As always, you’ll need to run **npm
install — save-dev html-webpack-plugin** before you can use it. Now we just need
to tell webpack what we want to do with it.

First thing, we’ll need to create a new instance of HTMLWebpackPlugin and we’ll
need to specify three things. First, we can give it a **template** of what we
want the newly created file to look like. Second, we give it a **filename** or,
well, what the new file it creates is going to be called. Third,
WebpackPluginConfig is going to be smart enough to detect the filename of the
output of the transformed code (in this case we’re calling index_bundle.js) and
it then going to inject a script into the <head> or <body> of the newly created
index.html file. So the third option is **inject** and is where you would like
to inject that script — the ‘head’ or the ‘body’.

Let’s see what all the code looks like.

```javascript
// In webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './app/index.js'
  ],
  module: {
    loaders: [
      {test: /\.coffee$/, include: __dirname + '/app', loader: "coffee-loader"}
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
};
```

You’ll notice we’ve added a few more steps. At the top of the file we create a
new instance of **HtmlWebpackPlugin** and we give it three options. **template**
points to our regular index.html file located in our app directory. **filename**
just says we want to keep the name index.html. **inject** says to inject a
script which references the name of the output file (index_bundle.js) of our
loaders and put it in the body of this newly created HTML file. Lastly we add
the **HTMLWebpackPluginConfig** variable we created as an item in the array of
**plugins** in our webpack config.

Now when we run **webpack **from our command line, inside of our **dist** folder
we’ll have two files. **index_bundle.js** and **index.html**.
**index_bundle.js** is the result of taking our **entry** code and running it
through our loaders. While **index.html** was created on the fly with
**HTMLWebpackPluginConfig**.

Let’s take a look at what our index.html file inside of our **app** folder looks
like then what our newly created index.html file inside of **dist** looks like.

**app/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
</html>
```

**dist/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="index_bundle.js"></script>
</html>
```

You’ll notice that the only difference between the two files is that the one in
**dist** (which was created with HTMLWebpackPlugin) now has a script tag
pointing to** index_bundle.js** . Again, the only real magic going on here is
that HTMLWebpackConfig is smart enough to detect the **output** **filename** of
your newly created file from Webpack and it will automatically add that as a
script in your newly create index.html file. So in our example we used**
index_bundle.js** as the **output filename** so as you can see in the created
index.html file above, we have now have **<script
src=”index_bundle.js”></script>** inside the body. If we were to change the
output of our webpack config to be **OUR-AWESOME-JS-FILE.js**, then inside the
body of our newly create index.html file we would have **<script
src=”OUR-AWESOME-JS-FILE.js”></script>**

Now the only other crucial piece of information is how to actually tell webpack
to run.

If you’ve installed webpack globally (by running **npm install -g webpack**)
then you have access to the webpack CLI. (If you haven’t, the same rules below
apply but you’ll just have to just npm scripts to run them).

In the root directory of your app (or wherever webpack.config.js is located),
you can run **webpack** from your terminal and that will do a one time run
through of your webpack settings. However, this can be kind of a pain to keep
having to run the command over and over whenever you change anything. To fix
this, run **webpack -w** and that will watch your files and re-execute
**webpack** whenever any of the files Webpack is concerned about changes.
Lastly, if you’re wanting to ship to production, you can run **webpack -p** and
that will run through the normal transformations as well as minify your code.

So now you’re probably thinking, “Hey Tyler. That’s cool and all, but I came
here for React and I still haven’t seen any of it.” First off, calm down.
Second, that’s fair. The good news is you already have all the Webpack knowledge
you need to get going with React. Now we just need to look at a tool called
babel and add it as a loader.

[Babel.js](https://babeljs.io/) is a wonderful tool for compiling your
JavaScript. With Webpack you tell it which transformations to make on your code,
while Babel is the specific transformation itself. In terms of React, Babel is
going to allow us to transform our JSX (which you’ll see soon) into actual
JavaScript. What’s nice about Babel though is it can be used for much more than
just JSX -> JS transformations. You can also opt into “future” versions of
JavaScript (ES2015, 2016, etc) and use Babel to transform your future JavaScript
to modern day JavaScript so the browser can understand it. Let’s jump into what
this looks like.

As always we’ll need to NPM install some things. Babel is very modular, so we’ll
need to install a few things initially. If you’re following along you can run
**npm install — save-dev babel-core babel-loader babel-preset-react**.
babel-core is babel itself, babel-loader is the webpack loader we’ll use, and
babel-preset-react is to get the JSX -> JS transformation going.

You might have the temptation to add a new loader to webpack for each type of
Babel transformation we want to make but that’s not the case. Instead, you just
give Webpack the single** babel-loader **we installed then that loader will look
to a **.babelrc** file that we’ll make for each of the babel transformations you
want to make.

First, in the same directory where the **webpack.config.js** file is (usually
the root directory), we’ll need to make a **.babelrc** file which looks like
this

    {
      "presets": [
        "react"
      ]
    }

Again all this file does is it instructs our babel-loader which babel
transformations to actually make. For now, all we care about is the react
transform. This works because we npm installed babel-preset-react earlier.

Now all we need to do is add the babel-loader as a loader to our
webpack.config.js file.

```javascript
// In webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"}
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
```

You’ll notice everything here is the same but instead of our ugly coffee-script
loader, we’re not using our babel-loader.

That’s it! I realize that’s a lot of steps but you’ve probably realized that the
code for these steps isn’t actually difficult, it’s just piecing everything
together that is.

[Pt I: A Comprehensive Guide to Building Apps with
React.js.](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)<br>
Pt 1.5 (BONUS): Utilizing Webpack and Babel to build a React.js App<br> [Pt II:
Building React.js Apps with Gulp, and
Browserify.](http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/)<br>
[Pt III: Architecting React.js Apps with Flux.](https://tylermcginnis.com/react-js-tutorial-pt-3-architecting-react-js-apps-with-flux-4657ef831895)