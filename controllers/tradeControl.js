const Trade = require('../models/tradeModel.js');
const auth = require('../middleware/auth');

const tradeCtrl = {
    createTrade: async (req, res) => {
        try {
            const { type, user_id, symbol, shares, price } = req.body;
           
            
            
            if (!type || !user_id || !symbol || !shares || !price) {
                return res.status(400).json({ msg: "All fields are required" });
            }
           
            if (shares < 1 || shares > 100) {
                return res.status(400).json({ msg: "Shares value must be between 1 and 100" });
            }
            
            if (!['buy', 'sell'].includes(type)) {
                return res.status(400).json({ msg: "Type must be 'buy' or 'sell'" });
            }

            
            const lastTrade = await Trade.findOne().sort({ id: -1 });
            const newId = lastTrade ? lastTrade.id + 1 : 1;

           
            const newTrade = new Trade({
                id: newId,
                type,
                user_id,
                symbol,
                shares,
                price
            });
            await newTrade.save();

            res.status(201).json(newTrade);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getTrades: async (req, res) => {
        try {
            const { type, user_id } = req.query;
            let filter = {};

            
            if (type) filter.type = type;
            if (user_id) filter.user_id = user_id;

            const trades = await Trade.find(filter).sort({ id: 1 });
            res.status(200).json(trades);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getTradeById: async (req, res) => {
        try {
            const trade = await Trade.findOne({ id: req.params.id });
            if (!trade) return res.status(404).json({ msg: "Trade not found" });
            res.status(200).json(trade);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    methodNotAllowed: (req, res) => {
        res.status(405).json({ msg: "Method not allowed" });
    }
};

module.exports = tradeCtrl;
