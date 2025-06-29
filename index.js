import express from 'express';


const app = express();


const PORT = 4003;


app.listen(PORT, () => {

    console.log(`Server is Runing at ${PORT}`);

});