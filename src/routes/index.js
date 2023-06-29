
const {Router} = require('express')
const router = Router()

const AsistenteDb =require ('../controllers/index.controller')

router.get('/asistentes', AsistenteDb.getAsistentes)

router.get('/asistentes/documento/:tipoid&:numid',AsistenteDb.getAsistentesByDocument)

router.get('/asistentes/email/:email',AsistenteDb.getAsistentesByEmail)

router.get('/asistentes/nombre/:nombre',AsistenteDb.getAsistentesByName)

router.post('/asistentes', AsistenteDb.saveAsistente)

router.delete('/asistentes/:tipoid&:numid',AsistenteDb.deleteAsistente)

router.put('/asistentes',AsistenteDb.updateAsistente)

router.patch('/asistentes/:tipoid&:numid&:estado',AsistenteDb.patchAsistente)


module.exports =router;