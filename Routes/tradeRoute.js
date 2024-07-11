const express = require('express');
const tradeCtrl = require('../controllers/tradeControl');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/trades', auth, tradeCtrl.createTrade);
router.get('/trades', auth, tradeCtrl.getTrades);
router.get('/trades/:id', auth, tradeCtrl.getTradeById);
router.all('/trades/:id', auth, tradeCtrl.methodNotAllowed);

module.exports = router;



