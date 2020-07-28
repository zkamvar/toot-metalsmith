var metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');
var layouts    = require('metalsmith-layouts');
var handlebars = require('jstransformer-handlebars');

metalsmith(__dirname)
.metadata({
  site: {
    name: 'Electroniq',
    description: "Electroniq is astrophysicist (and retro music enthusiast) Tara Himmels' blog."
  }
})
.source('./src')
.destination('./public')
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
