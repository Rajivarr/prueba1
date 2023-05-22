const { Router } = require('express')
const {  
    createUniversidad, 
    getUniversidades,
    updateUniversidadByNombre } =
 require('../controllers/universidad')

const router = Router()

// crear
router.post('/', createUniversidad)

// consultar todos
router.get('/', getUniversidades)

// editar
router.put('/:nombre', updateUniversidadByNombre)

module.exports = router;