var bookshelf = require('./../config/db').bookshelf;

var Animal = bookshelf.Model.extend({
	tableName: 'animal',
    sightings: function sightings() {
        return this.hasMany(Sighting, 'animal_id');
    }
});

var Sighting = bookshelf.Model.extend({
    tableName: 'sighting',
    animal: function animal() {
        return this.belongsTo(Animal);
    }
});

module.exports = {
	Animal: Animal,
	Sighting: Sighting
};
