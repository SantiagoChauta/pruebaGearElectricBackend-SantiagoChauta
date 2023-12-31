
const {Router} = require('express')
const router = Router()

const AsistenteDb =require ('../controllers/index.controller')

router.get('/asistentes', AsistenteDb.getTotal)

router.get('/asistentes/:page', AsistenteDb.getAsistentes)

router.get('/asistentes/document/:tipoid&:numid&:page',AsistenteDb.getAsistentesByDocument)

router.get('/asistentes/email/:email&:page',AsistenteDb.getAsistentesByEmail)

router.get('/asistentes/name/:nombre&:page',AsistenteDb.getAsistentesByName)

router.post('/asistentes', AsistenteDb.saveAsistente)

router.delete('/asistentes/:tipoid&:numid',AsistenteDb.deleteAsistente)

router.put('/asistentes',AsistenteDb.updateAsistente)

router.patch('/asistentes/:tipoid&:numid&:estado',AsistenteDb.patchAsistente)


module.exports =router;