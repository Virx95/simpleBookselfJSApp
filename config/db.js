var DBConfig = {
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'nextdefault',
		database: 'animal_registry',
		charset: 'utf8'
	}
};

var knex = require('knex')(DBConfig);
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;
