const mongoose = require('mongoose');


const dbconnection = () =>{
    mongoose.connect(process.env.DB_URI).then((conn)=>{
        console.log(`connected to database: ${conn.connection.host}`);
    }).catch((err) => {
        console.error('Database connection error:', err);
    });
};

module.exports =dbconnection;