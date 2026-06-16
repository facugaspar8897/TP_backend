const publicacionCtrl = require('../controllers/publicacion.controller')
const express = require('express');
const router = express.Router();

router.get('/', publicacionCtrl.getPublicaciones)
router.post('/', publicacionCtrl.createPublicacion);
router.put('/:id',publicacionCtrl.editPublicacion);
router.delete('/:id',publicacionCtrl.deletePublicacion)

module.exports = router;