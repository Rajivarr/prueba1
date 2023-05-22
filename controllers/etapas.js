const Etapas = require('../models/etapas')
const { request, response} = require('express')

// crear
const createEtapa = async (req = request, 
    res = response) => {
    try{
        const id = req.body.id 
            ? req.body.id.toUpperCase()
            : ''

        const nombre = req.body.nombre


        const etapasDB = await Etapas.findOne({nombre})
        
        if(etapasDB){
           return res.status(400).json({msg: 'Ya existe'})
        }

        const data = {
            nombre  // nombre: nombre
        
        }
        const etapa = new Etapas(data)
        //console.log(cliente)
        await etapa.save()
        return res.status(201).json(etapa)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

const getEtapas = async (req = request, 
    res = response) => {
        try{
            const etapasDB = await Etapas.find()//select * from tipoEquipo where estado=?
            return res.json(etapasDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


const updateEtapaByNombre = async (req = request,
    res = response) => {
    try{
        //console.log(req.body)
       // console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        //console.log(data)
        const etapas = await Etapas.findByIdAndUpdate(id, data, {new: true})
        return res.json(etapas)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { 
    createEtapa, 
    getEtapas,
    updateEtapaByNombre
}