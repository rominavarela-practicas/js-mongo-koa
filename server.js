console.log('\nLoading...');

const server = require('koa')();
const servers = require('./servers');
const SERVER = servers.ws;

//enable cors
server.use(function *(next) {
  for(key in servers)
    if( this.header.origin === servers[key].audience())
      this.set("Access-Control-Allow-Origin", this.header.origin );
  this.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  yield next;
});

//error handler
server.use(function *(next){
  try
  {
    yield next;
  }
  catch(err)
  {
    this.body = { success: false, error: err.message };
  }
});

//routes
require('./ws/shortcut')(server);

//server on
server.listen(SERVER.port, function () {
  console.log('\nWS Server up in: ' + SERVER.audience());
});
