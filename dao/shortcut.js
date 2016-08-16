const monk = require('monk');

const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const servers = require('../servers');
const SERVER  = servers.mongo;
//const db      = monk(SERVER.audience()+'/urls');

module.exports = function() {
  mongodb.connect(SERVER.audience()+'/urls', (err, db) => {
    const SHORTCUT = db.collection('SHORTCUT');

    function norm(shortcut){
      return {
        id: shortcut._id.valueOf(),
        url: shortcut.url,
        timestamp: shortcut.timestamp.toString()
      }
    }

    /**
     * @method getAllShortcuts
     **/
    this.getAllShortcuts = () => new Promise( (resolve,reject) => {
      SHORTCUT.find()
              .map(norm)
              .toArray( ( err, data ) => { err ? reject(err) : resolve(data); } );
    });

    /**
     * @method getShortcutById
     * @param id unsigned integer
     **/
    this.getShortcutById = (id) => new Promise( (resolve,reject) => {
      SHORTCUT.findOne(
        { _id: new ObjectId(id) },
        ( err, data ) => { err ? reject(err) : resolve(data); }
      );
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
