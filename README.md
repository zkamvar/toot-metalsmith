# Learning metalsmith

This repo will walk through [this tutorial](https://web.archive.org/web/20200415053639/https://azurelogic.com/posts/building-a-blog-with-metalsmith/) on creating a blog
through metalsmith, which is a static site generator written entirely in node.js

The goal of this is to figure out if I can package this into an electron app.

Update: The above tutorial is a bit old and slightly frustrating. I'll go with
a different tutorial:

<https://neustadt.fr/essays/crafting-a-simple-blog-with-metalsmith/>

One of the downfalls of following an old blog post is that there are conventions
that have changed in the last few years. This time, I was getting a lot of
problems around the templating engine because of the fact that they changed the
major version and removed some key elements. For example, they used to accept
this pattern in `build.js`:

```js
.use(layouts({
        engine: 'handlebars',
        directory: './layouts',
        default: 'article.html',
        pattern: ["*/*/*html","*/*html","*html"]
    }))
```

But when I used this, I got an error that said "No file to process" and it gave
me [a link to the module page](https://www.npmjs.com/package/metalsmith-layouts#no-files-to-process)
where I was unsure of what went wrong. After about 20 minutes, I was able to
find [the changelog](https://github.com/metalsmith/metalsmith-layouts/blob/master/CHANGELOG.md#200---january-10-2018)
for the project, and found that there were a couple of things wrong:

1. The support for the raw JS engines were dropped in support of using `jstransformers`, which meant that I had to install `jstransformers-handlebars` instead. 
2. The `engine:` option was removed and instead, the format was determined by **file extension** (what is this, windows?)

It turns out that there is [a
dictionary](https://github.com/jstransformers/inputformat-to-jstransformer/blob/master/dictionary.json)
that defines what extensions are needed (I will need this for liquid).

In the end, I was able to run `npm install jstransformers-handlebars --save` and
change `build.js` to this:

```js
.use(layouts({
        directory: './layouts',
        default: 'article.hbs',
        pattern: ["*/*/*html","*/*html","*html"]
    }))
```


