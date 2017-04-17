var Model = require('./../models/Animal');

var saveAnimal = function (req, res) {
	new Model.Animal({
		name: req.body.name,
		species: req.body.species
	}).save()
		.then(function (animal) {
			res.json(animal);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

var getAllAnimals = function (req, res) {
	new Model.Animal().fetchAll()
		.then(function (animals) {
			res.json(animals);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

var deleteAnimal = function (req, res) {
	var animalId = req.params.id;
	new Model.Animal().where('id', animalId)
		.destroy()
		.catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

var getAnimal = function (req, res) {
	var animalId = req.params.id;
	new Model.Animal().where('id', animalId)
		.fetch()
		.then(function (animal) {
			res.json(animal);
		}).catch(function (error) {
			console.log(error);
			res.send('An error occured');
		});
};

var updateAnimal = function (req, res) {
    new Model.Animal({
		id: req.params.id,
        species: req.body.species
    }).save()
        .then(function (animal) {
            res.json(animal);
        }).catch(function (error) {
        console.log(error);
        res.send('An error occured');
    });
}

module.exports = {
	saveAnimal: saveAnimal,
	getAllAnimals: getAllAnimals,
	deleteAnimal: deleteAnimal,
	getAnimal: getAnimal,
	updateAnimal: updateAnimal
};
