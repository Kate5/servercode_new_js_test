/* global Backendless */

/**
* @param {Object} req The request object contains information about the request
* @param {Object} req.context The execution context contains an information about application, current user and event
* @param {Object} req.item An item to create
*
* @param {Object} res The response object
* @param {Object} res.result Created item
* @param {Object} res.error
*
* @returns {Object|Promise.<Object>|void} By returning a value you overwrite server's result
*/
Backendless.ServerCode.Persistence.afterCreate('*', function(req, res) {
  //add your code here
});