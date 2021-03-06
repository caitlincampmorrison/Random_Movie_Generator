const express = require('express')
const app = express.Router()
const{ Movie } = require('../db')

app.get('/', async(req,res,next) => {
    try{
        res.send(await Movie.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.post('/', async(req,res,next) => {
    try{
        const data = await Movie.create({title: req.body.title, stars: 2})
        res.send(data)
    }
    catch(ex){
        next(ex)
    }
})

app.delete('/:id', async(req,res,next) => {
    try{
        const data = await Movie.destroy({
            where: {id: req.params.id}
        })
        res.sendStatus(204)
    }
    catch(ex){
        next(ex)
        console.log("error encountered")
    }
})

app.put('/:id', async(req,res,next) => {
    try{
        const data = await Movie.update(
            {stars: req.body.stars},
            {where: {id: req.params.id}}
        )
    }
    catch(ex){
        next(ex)
    }
})

module.exports = app
