var Todo = require('./models/todo');

function getTodos() {
    return Todo.find().exec();
};


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', async function (req, res) {
        // use mongoose to get all todos in the database
        let todos = await getTodos();
        res.json(todos);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', async function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, async function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
                let todos = await getTodos();
                res.json(todos);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', async function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, async function (err, todo) {
            if (err)
                res.send(err);

                let todos = await getTodos();
                res.json(todos);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
