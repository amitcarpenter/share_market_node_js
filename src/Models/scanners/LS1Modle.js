const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for your data
const ls1_schema = new Schema({
    Date: Date,
    Open: Number,
    High: Number,
    Low: Number,
    Close: Number,
    Adj_Close: Number,
    Volume: Number,
    Dividend_Date: String,
    First_Appeared_on: String,
    Symbol: String,
    "52W_High": Number,
    "52W_Low": Number,
    Day_Change_Percentage: Number,
    RSI: Number,
    Volume_MA_5: Number,
    Volume_Average: Number,
    index: String
});

// Create a model from the schema
const LS1 = mongoose.model('LS1', ls1_schema);

// Export the model
module.exports = LS1;
