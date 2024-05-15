const LS1 = require("../../Models/scanners/LS1Modle");

const getPreviousDay = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString();
};

const ls1_data = async (req, res) => {
  try {
    const { index, volume_threshold, rsi_threshold, close_number } = req.body;

    const ls1_data = await LS1.find({ index: index }).lean().exec();

    if (!ls1_data || ls1_data.length === 0) {
      return res.status(400).json({ success: false, message: "No data found" });
    }

    const ls1_data_filtered = [];

    for (const stockData of ls1_data) {
      const dateString = stockData.Date;
      const previousDayDate = getPreviousDay(dateString);

      let previous_day_high = null;

      try {
        const previousDayDocument = await LS1.findOne({
          Date: previousDayDate,
          Symbol: stockData.Symbol,
        });

        if (previousDayDocument) {
          previous_day_high = previousDayDocument.High;
          console.log(previous_day_high);
        } else {
          console.log(`No document found for ${previousDayDate}`);
          continue;
        }
      } catch (error) {
        console.error(
          `Error retrieving document for ${previousDayDate}: ${error.message}`
        );
        continue;
      }

      if (
        stockData.Volume > volume_threshold &&
        stockData.Close > close_number &&
        stockData.RSI >= rsi_threshold &&
        previous_day_high !== null &&
        stockData.Close > previous_day_high &&
        stockData.Volume > stockData.Volume_MA_5
      ) {
        ls1_data_filtered.push(stockData);
      }
    }

    if (ls1_data_filtered.length === 0) {
      return res.status(400).json({ success: false, message: "No data found" });
    }

    res.status(200).json({ success: true, data: ls1_data_filtered });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const ls2_data = async (req, res) => {
  try {
    const { index, volume_threshold, rsi_threshold, close_number } = req.body;

    const ls1_data = await LS1.find({ index: index }).lean().exec();

    if (!ls1_data || ls1_data.length === 0) {
      return res.status(400).json({ success: false, message: "No data found" });
    }

    const ls1_data_filtered = [];

    for (const stockData of ls1_data) {
      const dateString = stockData.Date;
      const previousDayDate = getPreviousDay(dateString);

      let previous_day_high = null;

      try {
        const previousDayDocument = await LS1.findOne({
          Date: previousDayDate,
          Symbol: stockData.Symbol,
        });

        if (previousDayDocument) {
          previous_day_high = previousDayDocument.High;
          console.log(previous_day_high);
        } else {
          console.log(`No document found for ${previousDayDate}`);
          continue;
        }
      } catch (error) {
        console.error(
          `Error retrieving document for ${previousDayDate}: ${error.message}`
        );
        continue;
      }

      if (
        stockData.Volume > volume_threshold &&
        stockData.Close > close_number &&
        stockData.RSI >= rsi_threshold &&
        previous_day_high !== null &&
        stockData.Close > previous_day_high &&
        stockData.Volume > stockData.Volume_MA_5
      ) {
        ls1_data_filtered.push(stockData);
      }
    }

    if (ls1_data_filtered.length === 0) {
      return res.status(400).json({ success: false, message: "No data found" });
    }

    res.status(200).json({ success: true, data: ls1_data_filtered });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { ls1_data, ls2_data };
