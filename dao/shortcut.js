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

    /**
     * @method insertShortcut
     * @param url string max len=2000
     **/
    this.insertShortcut = (url) => new Promise( (resolve,reject) => {
      SHORTCUT.insert(
        { url: url, timestamp: new Date() },
        ( err, data ) =>
          {
            err ? reject(err) :
            SHORTCUT.findOne(
              { url: url },
              ( err, data ) => { err ? reject(err) : resolve( norm(data) ); }
            );
          }
      );
    });

  });

  return this;
}
