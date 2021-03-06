# Learning metalsmith

This repo will walk through [this tutorial](https://web.archive.org/web/20200415053639/https://azurelogic.com/posts/building-a-blog-with-metalsmith/) on creating a blog
through metalsmith, which is a static site generator written entirely in node.js

The goal of this is to figure out if I can package this into an electron app.

Update: The above tutorial is a bit old and slightly frustrating. I'll go with
a different tutorial:

<https://neustadt.fr/essays/crafting-a-simple-blog-with-metalsmith/>

### Update 1

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

### Update 2

It turns out that with the new method of using templates, partials are not
really possible for anything but handlebars syntax??? The [repository 
responsible](https://github.com/timdp/metalsmith-discover-partials) for providing
partials support is minimally documented `-_-`

Not only that, but the permalinks syntax seems to have changed.


Okay, after going through this... it seems that the ecosystem for this project
may be dying? There was an issue opened on Metalsmith's repo that asked 
point-blank if the project was maintained: https://github.com/segmentio/metalsmith/issues/329

The answer was basically, "not really, but that's okay because the core is solid"

Looking at the code, it seemed that they dropped work on the project back in
2019. There is one issue open at the moment that shows someone pleading to become
a maintainer of the project, but no one responding: https://github.com/segmentio/metalsmith/issues/335

I don't doubt that the core is solid. It's simple and straightforward, but the
fact that there is no apparent energy in the base gives me pause for the project.

Even the person who wrote the tutorial I was following had abandoned the project
(note that the description indicates that the repo is deprecated: https://github.com/parimalsatyal/neustadt.fr-metalsmith)



le sigh.
