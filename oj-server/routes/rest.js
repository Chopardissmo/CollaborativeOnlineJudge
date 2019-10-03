const express = require('express');
const router = express.Router();
const _problemServices = require('../services/problemServices');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/problems', (req, res) => {
    // To specify what origins have access to the resource, 
    // you need to add the Access-Control-Allow-Origin header to your response. 
    // It will be interpreted by the browser of the visitor of your site.
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    
    _problemServices.getProblems()
        .then(problems => {
             res.json(problems);
        });
});

router.get('/problems/:id', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // express offers a way for fetching param from params
    let id = req.params.id;
    _problemServices.getProblem(+id)
        .then(problem => {
             res.json(problem);
        });
});

//jsonParse one more parameter ---->  cause there is jsonParse, so req.body is available
router.post('/problems', jsonParser, function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    _problemServices.addProblem(req.body)
        .then(
            (problem) => {
                 res.json(problem);
            }, 
            (error) => {
                res.status(400).send("Problem name already existed");;
            });
});

module.exports = router;