var animal = require('./routes/animals');
var sighting = require('./routes/sightings');
var index = require('./routes/index');

module.exports = function (app) {
	app.get('/', index.index);

	app.post('/animals', animal.saveAnimal);
	app.get('/animals', animal.getAllAnimals);
	app.delete('/animal/:id', animal.deleteAnimal);
	app.get('/animal/:id', animal.getAnimal);
	app.post('/animal/:id', animal.updateAnimal)


	app.get('/sighting/:id', sighting.getAllSightingsByAnimal)
	app.post('/sighting', sighting.saveSighting)
	app.get('/sighting', sighting.getAllSightings)
	app.post('/sighting/all', sighting.getAllSightingsByLocation)
};

