
var express = require('express')
var router = express.Router()
var Search = require('bing.search')
var mongo = require('mongodb').MongoClient
var Bing = require('node-bing-api')({ accKey: "8805a5c8bfe94e38924aea9d3dda07b5" });

// Connect to database
var mongoURL = process.env.MONGODB_URI
var database = null;

mongo.connect(mongoURL, function (err, db) {

    if(err){
        throw  err
    } else {
        console.log('Connect to mongodb successfully')
        db.createCollection('history')
        database = db;

    }
})


router.get('/imagesearch/:keyword', function (request, response, next) {

    var date = new Date();

    var keyword = decodeURIComponent(request.params.keyword)
    var offset = request.query.offset

    saveNewSubmit(date, keyword, database)

    // console.log('Keyword: ' + keyword)
    // console.log('Offset: ' + offset)
    // console.log('Time: ' + date)
    // console.log('Time to locate string: ' + date.toLocaleString())

    var conllection = database.collection('images')

    Bing.images(keyword, {top:offset}, function (err, res, body) {

        if(err) throw err

        var resultArr =  body.value

        response.send(resultArr.map(function (image) {
            return {
                "url":image.contentUrl,
                "snippet":image.name,
                "thumbnail":image.thumbnailUrl,
                "context":image.webSearchUrl
            }
        }))

    })

})

router.get('/latest/imagesearch', function (req, res, next) {

    var conllection = database.collection('history')

    conllection.find().toArray(function (err, docs) {

        res.send(docs.map(function (value) {
            return {
                'term':value.term,
                'when':value.when
            }
        }))

    })
})


function saveNewSubmit(date, keyword, db) {

    var historyCollection = db.collection('history')
    historyCollection.insertOne({
        'term':keyword,
        'when':date.toLocaleString()
    })
}

module.exports = router