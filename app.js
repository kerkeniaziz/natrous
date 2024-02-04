const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World', app:'Natrous'});
    res.end();
    
})

app.post('/', (req, res) => {
    res.status(200).json({message : 'you can post to this endpoint ...', app:'Natrous'});
    res.end();
    
});

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});