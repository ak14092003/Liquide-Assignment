const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
        timestamp: {
        type: Number,
        required: true,
        default: () => Date.now(),
        get: timestamp => Math.floor(timestamp), 
        set: timestamp => timestamp 
    }
    }
});

tradeSchema.set('toJSON', { getters: true });
tradeSchema.set('toObject', { getters: true });

module.exports = mongoose.model('trades', tradeSchema);
