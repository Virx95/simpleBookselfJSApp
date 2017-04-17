var Model = require('./../models/Animal');

var getAllSightings = function (req, res) {
    new Model.Sighting()
        .fetchAll({withRelated: 'animal'})
        .then(function (sightings) {
            res.json(sightings);
        }).catch(function (error) {
        console.log(error);
        res.send('An error occured');
    });
};

var getAllSightingsByAnimal = function (req, res) {
    new Model.Sighting().where('animal_id', req.params.id)
        .fetchAll({withRelated: 'animal'})
        .then(function (sightings) {
            res.json(sightings);
        }).catch(function (error) {
        console.log(error);
        res.send('An error occured');
    });
};

var getAllSightingsByLocation = function (req, res) {
    new Model.Sighting().where('location', req.body.location)
        .fetchAll({withRelated: 'animal'})
        .then(function (sightings) {
            res.json(sightings);
        }).catch(function (error) {
        console.log(error);
        res.send('An error occured');
    });
};

var saveSighting = function (req, res) {
    new Model.Sighting({
        animal_id: req.body.animal_id,
        location: req.body.location,
        time: req.body.time
    }).save()
        .then(function (sightings) {
            res.json(sightings);
        }).catch(function (error) {
        console.log(error);
        res.send('An error occured');
    });
};

module.exports = {
    getAllSightings: getAllSightings,
    getAllSightingsByAnimal: getAllSightingsByAnimal,
    saveSighting: saveSighting,
    getAllSightingsByLocation: getAllSightingsByLocation
};
