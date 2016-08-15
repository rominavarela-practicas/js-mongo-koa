module.exports.ws = {
  route: 'http://localhost',
  port: '3000',
  audience: function(){ return this.route + ':' + this.port }
}

module.exports.app = {
  route: 'http://localhost',
  port: '80',
  audience: function(){ return this.route /*+ ':' + this.port*/ }
}

module.exports.dev = {
  route: 'http://localhost',
  port: '8080',
  audience: function(){ return this.route + ':' + this.port }
}

module.exports.mongo = {
  route: 'mongodb://localhost',
  port: '27017',
  audience: function(){ return this.route + ':' + this.port }
}
