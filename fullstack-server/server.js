const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/API/products');
require('dotenv').config();
app.use(express.json());

app.use('/api', productRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})