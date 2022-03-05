require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// packages
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

// routes
const authRouter = require('./routes/authRouter');

// middlewares
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

app.use(express.json());
app.use(cookieParser(process.env.ACCESS_TOKEN));
app.use(morgan('tiny'));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080'
  })
);

app.use('/api/v1/auth', authRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
