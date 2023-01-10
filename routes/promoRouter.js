const express = require('express')
const bodyParser = require('body-parser');
const Promotions = require('../models/promotion');


const promoRouter = express.Router();
promoRouter.use(bodyParser.json())

promoRouter.route('/')

.get(function(req, res, next){
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req,  res, next)=>{
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,  res, next)=>{
    res.end('PUT operation not supported on /promotions')
})
.delete((req,  res, next)=>{
    Promotions.remove()
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

promoRouter.route('/:promoid')
.get((req, res, next)=>{
    Promotions.findById(req.params.promoid)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post( (req,  res, next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on promotions/' + req.params.promoid)
})

.put( (req,  res, next)=>{
    Promotions.findByIdAndUpdate(req.params.promoid, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete((req,  res, next)=>{
    Promotions.findByIdAndRemove(req.params.promoid)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports = promoRouter;

