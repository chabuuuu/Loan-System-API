const express = require('express');
import { AuthenticationController } from "../controllers/AuthenticationController";
import { authenticateJWT } from "../services/jwt/jwtAuthenticate";
const authenticationController = new AuthenticationController();
const router = express.Router();
router.post('/login' , authenticationController.login);
router.get('/me', authenticateJWT , authenticationController.getAccount);
module.exports = router;
