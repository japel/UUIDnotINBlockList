/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var uuid = require("node-uuid");

module.exports.bootstrap = function (cb) {


  Test.create([
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()},
    {UUID: uuid.v4()}])
    .exec(function (error, created) {
      console.log(created);
      console.log(created.length);
      var myUUID = created[0].UUID;

      var blockList = [];

      blockList.push(created[1].UUID);
      blockList.push(created[2].UUID);
      blockList.push(created[3].UUID);

      Test.find({and:[{UUID:{"!":blockList}},{UUID:{"!":myUUID}}]})
        .exec(function (error, found) {
          console.log(found);
          console.log(found.length);
        });

    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
