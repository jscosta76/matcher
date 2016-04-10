var express = require('express');
var router = express.Router();
// import model
var Searcher = require('../models/searcher');

/* get all users */
router.get('/', function(req, res){
  //res.json({message:'Hello, this is working'});
  Searcher.find(function(err, searchers){
    if (err) {
      res.send(err);
    }
    res.json(searchers);
  });
});

// get specific searchers by id
router.get('/:searcher_id', function(req, res){
  Searcher.findById(req.params.searcher_id, function(err, searcher){
    if (err) {
      res.send(err);
    }
    res.json(searcher);
  });
});

// put users
router.post('/', function(req, res){
  var searcher = new Searcher();

  // set searcher properties - come from request
  // set the speakers properties (comes from the request)
     searcher.name = req.body.name;
     searcher.company = req.body.company;
     searcher.title = req.body.title;
     searcher.description = req.body.description;
     searcher.picture = req.body.picture;
     searcher.schedule = req.body.schedule;
     // save received data
     searcher.save(function(err){
       if (err) {
         res.send(err);
       }

       res.json({message:'searcher successfully created'});
     });
});

// update specific searchers by id
router.put('/:searcher_id', function(req, res){
  Searcher.findById(req.params.searcher_id, function(err, searcher){
    if (err) {
      res.send(err);
    }
    searcher.name = req.body.name;
    searcher.company = req.body.company;
    searcher.title = req.body.title;
    searcher.description = req.body.description;
    searcher.picture = req.body.picture;
    searcher.schedule = req.body.schedule;

    //save data received
    searcher.save(function(err){
      if(err)
        res.send(err);

        res.json({message:'searcher successfully updated'});
    });
  });
});

// delete specific users by id
router.delete('/:searcher_id', function(req, res){
  Searcher.remove({
    _id:req.params.searcher_id
  }, function(err, searcher){
    if(err)
      res.send(err);

      res.json({message:'searcher successfully deleted!'})
  });
});

module.exports = router;
