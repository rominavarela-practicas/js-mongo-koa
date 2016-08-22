const router  = require("koa-router")();
const dao     = require("../dao/shortcut")();
const path    = "/shortcut";
const koaBody = require('koa-body')();

module.exports = function(server) {
  /**
   * @method create url
   * @param { url }
   * @uses post
   **/
  router.post( path , koaBody, function *(next){
    var data = yield dao.insertShortcut(this.request.body.url);
    this.body = data;
  });

  /**
   * @method get all
   * @uses get
   **/
  router.get( path , function *(next){
    var data = yield dao.getAllShortcuts();
    this.body = data;
  });

  /**
   * @method read url by id
   * @uses get
   * This method redirets to the url described by the id
   **/
  router.get( path + "/:id" , function *(next){
    var data = yield dao.getShortcutById(this.params.id);
    this.body = data;
  });

  // direct access
  router.get( "/:id" , function *(next){
    var data = yield dao.getShortcutById(this.params.id);
    this.redirect( data.url );
  });

  server.use(router.routes());
  server.use(router.allowedMethods());
}
