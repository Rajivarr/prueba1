const Universidad = require('../models/universidad')
const { request, response} = require('express')

// crear
const createUniversidad = async (req = request, 
    res = response) => {
    try{
        const id = req.body.id 
            ? req.body.id.toUpperCase()
            : ''

        const nombre = req.body.nombre

        const email = req.body.email

        const direccion = req.body.direccion
        const telefono = req.body.telefono

        const universidadDB = await Universidad.findOne({nombre})
        
        if(universidadDB){
           return res.status(400).json({msg: 'Ya existe'})
        }

        const data = {
            nombre,  // nombre: nombre
            email,
            direccion,
            telefono         //segun lo que entendi no seria necesaria la fecha ya que aumaticamente se genera
        }
        const universidad = new Universidad(data)
        //console.log(cliente)
        await universidad.save()
        return res.status(201).json(universidad)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

const getUniversidades = async (req = request, 
    res = response) => {
        try{
            const universidadesDB = await Universidad.find()//select * from tipoEquipo where estado=?
            return res.json(universidadesDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


const updateUniversidadByNombre = async (req = request,
    res = response) => {
    try{
        //console.log(req.body)
       // console.log(req.params)
        const data = req.body
        const nom = req.params.nombre
        data.fechaActualizacion = new Date()
        //console.log(data)
        const universidad = await Universidad.findByIdAndUpdate(nom, data, {new: true})
        return res.json(universidad)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { 
    createUniversidad, 
    getUniversidades,
    updateUniversidadByNombre
}