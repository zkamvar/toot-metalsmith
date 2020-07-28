var metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');

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
.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Electroniq built!');
  }
});
