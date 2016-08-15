const monk = require('monk');

const mongodb = require('mongodb').MongoClient;
const servers = require('../servers');
const SERVER  = servers.mongo;
//const db      = monk(SERVER.audience()+'/urls');

module.exports = function() {
  var exports = this;

  mongodb.connect(SERVER.audience()+'/urls', (err, db)=> {
    const SHORTCUT = db.collection('SHORTCUT');

    /**
     * @method getAllShortcuts
     **/
    exports.getAllShortcuts = () => new Promise( (resolve,reject) => {
      SHORTCUT.find({}).toArray(function (err, items) {
        resolve(items);
      });
    });

  });


  //const SHORTCUT = db.get('SHORTCUT');

  /**
   * @method getAllShortcuts
   **
  this.getAllShortcuts = () => SHORTCUT.find();

/*
  //my sql connection
  var sql = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'urls'
  });

  /**
   * @method getAllShortcuts
   **
  this.getAllShortcuts = function()
  {
    return sql.query('select * from urls.SHORTCUT');
  }

  /**
   * @method getShortcutById
   * @param id unsigned integer
   **
  this.getShortcutById = function(id)
  {
      return sql.query('CALL urls.GET_SHORTCUT_BY_ID('+id+')');
  }

  /**
   * @method getShortcutByUrl
   * @param url string max len=2000
   **
  this.getShortcutByUrl = function(url)
  {
      return sql.query('CALL urls.GET_SHORTCUT_BY_URL("'+url+'")');
  }

  /**
   * @method insertShortcut
   * @param url string max len=2000
   **
  this.insertShortcut = function(url)
  {
      return sql.query('CALL urls.INSERT_SHORTCUT("'+url+'")');
  }*/

  return this;
}
