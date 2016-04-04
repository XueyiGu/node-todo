var Food = require('./models/todo');
var Menu = require('./models/menu');

function getFood(res) {
    Food.find(function (err, doc) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }else{
            // return all food in JSON format
            res.json(doc);
        }
    });
};

function getMenu(res){
    Menu.find(function (err, doc) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }else{
            // return all food in JSON format
            res.json(doc);
        }
    });
};

module.exports = function (app) {
    // api of food---------------------------------------------------------------------
    // get all food
    app.get('/api/food', function (req, res) {
        // use mongoose to get all food in the database
        getFood(res);
    });

    // get total price of food
    app.get('/api/total', function (req, res) {
        // use mongoose to get all food in the database
        Food.aggregate([{$group :{_id: null, total:{$sum: "$price"}}}], function(err, doc){
            if(err){
                res.send(err);
            }else{
                res.json(doc);
            }
        });
    });

    // create food and send back all food after creation
    app.post('/api/food', function (req, res) {
        // create a kind of food, information comes from AJAX request from Angular
        Food.create(req.body, function(err, doc) {
            if (err){
                res.send(err);
            }else{
                // get and return all the food after you create another
                getFood(res);
            }
        });
    });

    // delete a kind of food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, doc) {
            if (err){
                res.send(err);
            }else{
                getFood(res);
            }
        });
    });

    // update a kind of food
    app.put('/api/food/:food_id', function (req, res) {
        Food.update({_id: req.params.food_id},{$set: req.body},
            function (err, doc) {
            if (err){
                res.send(err);
            }else{
                getFood(res);
            }
        });
    });

    //api of menu---------------------------------------------------------------------
    // get all menu items
    app.get('/api/menu', function (req, res) {
        // use mongoose to get all items in the database
        getMenu(res);
    });

    // create an item and send back all items after creation
    app.post('/api/menu', function (req, res) {
        // create an item, information comes from AJAX request from Angular
        Menu.create(req.body, function(err, doc) {
            if (err){
                res.send(err);
            }else{
                // get and return all the items after you create another
                getMenu(res);
            }
        });
    });

    // delete a menu item
    app.delete('/api/menu/:menu_id', function (req, res) {
        Menu.remove({
            _id: req.params.menu_id
        }, function (err, doc) {
            if (err){
                res.send(err);
            }else{
                getMenu(res);
            }
        });
    });

    // update a menu item
    app.put('/api/menu/:menu_id', function (req, res) {
        Menu.update({_id: req.params.menu_id},{$set: req.body},
            function (err, doc) {
                if (err){
                    res.send(err);
                }else{
                    getMenu(res);
                }
            });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};