import express, { response } from "express";
import data from "./data/mock.json" assert {type: "json"};

const app = express();

const PORT = 3000;

//Serving static files
app.use(express.static("public"));
app.use('/images', express.static("images"));

//Using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

//GET
app.get('/', (request, response) => {
    response.json(data);
});

//GET download method
app.get('/download', (request, response) => {
    response.download("./images/mountains_2.jpeg");
});

//GET redirect method
app.get('/redirect', (request, response) => {
    response.redirect("https://michaelsault.ca");
});


//Route Chaining - After
app.route('/class')
    .get((request, response) => {
        //response.send('Retrieve class info')
        throw new Error();
    }).post((request, response) => {
        response.send('Create class info')
    }).put((request, response) => {
        response.send('Update class info')
    });

// //Route Chaining - Before
// //GET
// app.get('/class', (request, response) => {
//     response.send('Create class info')
// });

// //POST
// app.post('/class', (request, response) => {
//     response.send('Create class info')
// });

// //PUT
// app.put('/class', (request, response) => {
//     response.send('Update class info')
// });


//GET with next()
app.get('/next', (request, response, next) => {
    console.log("The response will be sent by the next function.");
    next();
}, (request, response) => {
    response.send("I just up a route with a second callback")
});

//GET with Routing Parameters
app.get('/class/:id', (request, response) => {
    //Middleware: Acess the routing parameters
    const studentId = Number(request.params.id);

    const student = data.filter((student) => student.id === studentId);
    //Everything above here is middleware
    response.send(student);
});

//POST
app.post('/create', (request, response) => {
    response.send('This is a POST request at /create');
});

//POST - express.json and express.urlencoded
app.post('/item', (request, response) => {
    console.log(request.body);
    response.send(request.body);
});

//PUT
app.put('/edit', (request, response) => {
    response.send('This is a PUT request at /edit');
});

//DELETE
app.delete('/delete', (request, response) => {
    response.send('This is a DELETE request at /delete');
});


//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something is broken!");
});


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});