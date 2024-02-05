const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    console.log(req.requestTime)

    res.status(200).json({
        status : 'success', 
        requestAt : req.requestTime,
        results : tours.length,
       
        data : {
            tours
        },
        
    });
};


const addNewTour = (req, res) => {
    
     const newId = tours[tours.length - 1].id +1;
     const newTour = Object.assign({id : newId}, req.body);
 
     tours.push(newTour);
     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
         res.status(201).json({
             status :'success', 
             data : {
                 tour : newTour
             }
         })
     })
 
 };


const getTourById = (req, res) => {
    console.log(req.params)
    const id = req.params.id *1;

    if (id> tours.length) {
        return res.status(404).json({
            status : 'fail',
            message : 'invalid id',
        });
    }

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status : 'success', 
        data : {
            tour
        }
        
    });
};

const updateTourById = (req, res) => {
    const id = req.params.id *1;

    if (id> tours.length) {
        return res.status(404).json({
            status : 'fail',
            message : 'invalid id',
        });
    }
    console.log(req.body);
    res.status(200).json({status : 'success',data : {tour :'update tour here'}});
};

const deleteTourById = (req, res) => {
    const id = req.params.id *1;

    if (id> tours.length) {
        return res.status(404).json({
            status : 'fail',
            message : 'invalid id',
        });
    }
    console.log(req.body);
    res.status(204).json({status : 'success',data : null});
}




/*app.get('/api/v1/tours', getAllTours); 
app.get('/api/v1/tours/:id', getTourById);
app.post('/api/v1/tours',  addNewTour);
app.patch('/api/v1/tours/:id', updateTourById);
app.delete('/api/v1/tours/:id', deleteTourById);
*/

app.route('/api/v1/tours').get(getAllTours).post(addNewTour); 

app
    .route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById);

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});