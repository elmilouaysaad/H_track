const { linearRegression, rSquared } = require("simple-statistics");

/**
 * Train a regression model using historical demand data.
 * @param {Array} data - Array of objects [{date, demand}]
 * @returns {Function} - A function to predict future demand.
 */
const trainRegressionModel = (data) => {
  // Prepare data for regression: dates as x, demand as y
  const dateToNumeric = (date) => new Date(date).getTime();
  const regressionData = data.map((entry) => [dateToNumeric(entry.date), entry.demand]);

  // Train the linear regression model
  const regression = linearRegression(regressionData);

  // Return a prediction function
  return (futureDate) => {
    const numericDate = dateToNumeric(futureDate);
    return regression.m * numericDate + regression.b;
  };
};

module.exports = {
  trainRegressionModel,
};
