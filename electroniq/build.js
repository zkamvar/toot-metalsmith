var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var partials    = require('metalsmith-discover-partials');
var handlebars  = require('jstransformer-handlebars');
var collections = require('metalsmith-collections');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Electroniq',
      description: "Electroniq is astrophysicist (and retro music enthusiast) Tara Himmels' blog."
    }
  })
  .source('./src')
  .destination('./public')
  .use(partials({
    directory: './layouts/partials',
    pattern: /\.hbs$/ // NOTE: regex is unquoted here
  }))
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
    },
  }))
  .use(markdown())
  .use(layouts({
    directory: './layouts',
    default: 'article.hbs',
    pattern: ["*/*/*html","*/*html","*html"]
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Electroniq built!');
    }
  });
