require("dotenv").config();
const mongoClient = require('mongodb').MongoClient
const mongoUrl=process.env.MONGODB
const state={
    db:null
}
// module.exports.connect=function(done){
//     const url=`mongoUrl`
//     const dbname='socailbuzz'

//     mongoClient.connect(url,(err,data)=>{
//         if (err) return done(err)
//         state.db=data.db(dbname)
//         done()
//     })
// }

module.exports.get=function(){
    return state.db
}

module.exports.connect=function(done){
    const url='mongodb://localhost:27017'
    const dbname='socialbuzz'

    mongoClient.connect(url,(err,data)=>{
        if (err) return done(err)
        state.db=data.db(dbname)
        done()
    })
}

module.exports.get=function(){
    return state.db
}