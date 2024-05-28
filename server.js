const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const app = express();

// Connect to database
connectDB();

const upload = multer({
    dest: 'files/', // Location where files will be saved
});

app.use(upload.any());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
