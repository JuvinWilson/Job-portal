// Api Documentation
import swaggerdoc from 'swagger-jsdoc'
import swaggerui from 'swagger-ui-express'
//package imports
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';

// security package imports
import helmet from 'helmet'
import xss from 'xss-clean'
import mongosanitize from 'express-mongo-sanitize'

//file imports
import connectDb from './config/db.js';

// route imports
import testRoutes from './routes/testroutes.js'
import authRoutes from './routes/authroutes.js';
import errormiddleware from './middlewares/errormiddleware.js';
import userRoutes from './routes/userroutes.js';
import jobRoutes from './routes/jobroutes.js';

dotenv.config()

//DATABASE CALL
connectDb()

//swagger api config 
// swagger api options  
const options={
    definition:{
        openapi: "3.0.0",
        info:{
            title: 'job portal application',
            description: 'Node Express job portal application'
        }, 
        servers: [
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:['./routes/*.js'],
} 

const spec =swaggerdoc(options);

// express rest object

const app=express();

//middilewares
app.use(helmet())
app.use(xss())
app.use(mongosanitize())
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// get method
// app.get('/',(req,res)=>{
//     res.send("Welcome To Job Portal");
// })


//ROUTES
// test routes
app.use('/api/v1/test',testRoutes);

//auth routes
app.use('/api/v1/auth',authRoutes);

// user routes
app.use('/api/v1/user',userRoutes);

// job routes
app.use('/api/v1/job',jobRoutes);

// home route root
app.use("/api-doc",swaggerui.serve,swaggerui.setup(spec));

// validation middleware

app.use(errormiddleware);

// port

const PORT= process.env.PORT || 8080;

//listen

app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.Dev_MODE} MODE ON PORT IN ${PORT}`.bgBlue); 
});