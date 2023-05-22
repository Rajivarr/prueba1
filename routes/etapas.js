
const { Router } = require('express')
const {  
    createEtapa, 
    getEtapas,
    updateEtapaByNombre } =
 require('../controllers/etapas')

const router = Router()

// crear
router.post('/', createEtapa)

// consultar todos
router.get('/', getEtapas)

// editar
router.put('/:id', updateEtapaByNombre)

module.exports = router;