const express = require('express');
const fs = require('fs');
const app = express();

/*app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World', app:'Natrous'});
    res.end();
    
})

app.post('/', (req, res) => {
    res.status(200).json({message : 'you can post to this endpoint ...', app:'Natrous'});
    res.end();
    
});*/
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status : 'success', 
        results : tours.length,
        app:'Natrous',
        data : {
            tours
        },
        
    });
});

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});