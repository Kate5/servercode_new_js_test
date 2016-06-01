/* global Backendless */
'use strict';
/**
* @param {Object} req The request object contains information about the request
* @param {Object} req.context The execution context contains an information about application, current user and event
* @param {Object} req.item An item to create
*
* @returns {Object|Promise.<Object>|void} By returning a value you can stop further event propagation and return
*          a specific result to the caller
*/
Backendless.enablePromises();
Backendless.ServerCode.Persistence.beforeCreate('*', function(req) {

    class Contact extends Backendless.ServerCode.PersistenceItem {
        constructor() {
            super();
        }
    }

    var contactObject = new Contact();
    contactObject.name = "afterCreate";
    contactObject.age = 4;

    return contactObject.save();
    //return Backendless.Persistence.of( 'Contact' ).save( contactObject);

});