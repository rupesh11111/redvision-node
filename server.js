const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const dotenv = require('dotenv');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const cors = require("cors");

dotenv.config();

const app = express();

// Connect to database
connectDB();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
    region: process.env.S3_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
                cb(null, Date.now().toString() + file.originalname );
        },
    }),
});

app.use(upload.any());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
