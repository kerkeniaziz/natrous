
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
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


exports.addNewTour = (req, res) => {
    
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


 exports.getTourById = (req, res) => {
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

exports.updateTourById = (req, res) => {
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

exports.deleteTourById = (req, res) => {
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
