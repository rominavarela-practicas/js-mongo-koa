var mysql               = require('koa-mysql');

module.exports = function() {

  //my sql connection
  var sql = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'urls'
  });

  /**
   * @method getAllShortcuts
   **/
  this.getAllShortcuts = function()
  {
    return sql.query('select * from urls.SHORTCUT');
  }

  /**
   * @method getShortcutById
   * @param id unsigned integer
   **/
  this.getShortcutById = function(id)
  {
      return sql.query('CALL urls.GET_SHORTCUT_BY_ID('+id+')');
  }

  /**
   * @method getShortcutByUrl
   * @param url string max len=2000
   **/
  this.getShortcutByUrl = function(url)
  {
      return sql.query('CALL urls.GET_SHORTCUT_BY_URL("'+url+'")');
  }

  /**
   * @method insertShortcut
   * @param url string max len=2000
   **/
  this.insertShortcut = function(url)
  {
      return sql.query('CALL urls.INSERT_SHORTCUT("'+url+'")');
  }

  return this;
}
