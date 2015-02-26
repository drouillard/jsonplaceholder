var jsonServer = require('json-server')
var clone = require('clone')
var data = require('./data.json')

var port = process.env.PORT || 3000 
var exphbs = require('express-handlebars');

var app = jsonServer.create()
var router = jsonServer.router(clone(data))

app.set ('views', __dirname + '/views');
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: 'html.hbs'}));
app.set('view engine', 'hbs');

app.get('/buildings/:id', function(req,res){
      console.dir(req);
     res.render('buildings/show', {
        title: req.params.id
    });
});





app.all('*', function(req, res, next) {
  router.db.object = clone(data)
  next()
})

app.use(router)

app.listen(port, function() {
  console.log('JSONPlaceholder listening on http://localhost:' + port)
})
