/**
* Expense.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		vendorName : 'string',
  		approved : 'boolean',
  		type : 'string',
  		totalAmount : 'float',
  		image : 'string' // URL of S3 instance
  }
};

