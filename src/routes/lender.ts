const express = require('express');
const router = express.Router();
import { authenticateJWT } from '../services/jwt/jwtAuthenticate';
import { LenderController } from '../controllers/LenderController';
const lenderConrtoller = new LenderController();

router.get('/', lenderConrtoller.readAllData);
router.post('/', lenderConrtoller.addData);
router.put('/:id', lenderConrtoller.updateData);
router.delete('/:id', lenderConrtoller.deleteData);
module.exports = router;
