"use strict";
//https://sequelize.org/v4/manual/tutorial/models-definition.html
//import Sequelize = require('sequelize-hierarchy');
var Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);
var sqlite3 = require('sqlite3').verbose();
// npx tsc to compile
console.log('run sequelize hierarchy demo');
// Initialize Hierarchy
var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/Users/jessicayang/Workspace/Angular/sequelize-with-hierarchy/database.sqlite'
});
// test connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
var Folder = sequelize.define('folder', {
    name: Sequelize.STRING
});
var fa = Folder.create({ name: 'a' });
var fab = Folder.create({ name: 'ab', parentId: 1 });
var fac = Folder.create({ name: 'ac', parentId: 1 });
//Adds a column parentId and hierarchyLevel to Folder model
Folder.isHierarchy();
//creating tables
Folder.sync();
//create ancestor table
sequelize.models.folderancestor.sync();
//retrieve hierarchy
var folders = Folder.findAll(); //{ hierarchy: true }
console.log("log out results: ");
console.log(folders);
/***
 * Connection has been established successfully.
log out results:
Promise [Object] {
  _bitField: 0,
  _fulfillmentHandler0: undefined,
  _rejectionHandler0: undefined,
  _promise0: undefined,
  _receiver0: undefined }
Executing (default): SELECT 1+1 AS result
Executing (default): CREATE TABLE IF NOT EXISTS `folders` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `hierarchyLevel` INTEGER UNSIGNED, `parentId` INTEGER REFERENCES `folders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE);
Executing (default): SELECT `id`, `name`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId` FROM `folders` AS `folder`;
Executing (default): INSERT INTO `folders` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (NULL,'a','2020-02-06 04:01:49.762 +00:00','2020-02-06 04:01:49.762 +00:00');
Executing (default): INSERT INTO `folders` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (NULL,'ab','2020-02-06 04:01:49.763 +00:00','2020-02-06 04:01:49.763 +00:00');
Executing (default): INSERT INTO `folders` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (NULL,'ac','2020-02-06 04:01:49.763 +00:00','2020-02-06 04:01:49.763 +00:00');
Executing (default): PRAGMA INDEX_LIST(`folders`)
 */
