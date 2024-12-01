const tf = require('@tensorflow/tfjs');

// Sample data (Date and Demand)
const data = [
  { date: '2024-12-01', demand: 67.4 },
  { date: '2024-12-02', demand: 58.2 },
  { date: '2024-12-03', demand: 80.1 },
  { date: '2024-12-04', demand: 72.5 },
  { date: '2024-12-05', demand: 65.9 },
  { date: '2024-12-06', demand: 70.3 },
  // More data points can go here
];

// Normalize the demand data between 0 and 1 (min-max normalization)
const normalizeData = (data) => {
  const values = data.map((d) => d.demand);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return {
    normalized: values.map((value) => (value - min) / (max - min)),
    min,
    max,
  };
};

// Reshape data for LSTM model (sequence of length 1)
const reshapeData = (data, lookBack = 1) => {
  const X = [];
  const Y = [];
  for (let i = lookBack; i < data.length; i++) {
    X.push(data.slice(i - lookBack, i)); // Previous 'lookBack' days as input
    Y.push(data[i]); // Next day's demand as target
  }
  return [X, Y];
};

// Normalize the data
const { normalized, min, max } = normalizeData(data);

// Prepare the data for LSTM
const lookBack = 3;  // Number of previous days to predict next day
const [X, Y] = reshapeData(normalized, lookBack);

// Convert X and Y to tensors
const X_tensor = tf.tensor3d(X, [X.length, lookBack, 1]);
const Y_tensor = tf.tensor2d(Y, [Y.length, 1]);

// Build the LSTM model
const model = tf.sequential();

model.add(
  tf.layers.lstm({
    units: 50, // Number of LSTM units
    inputShape: [lookBack, 1], // Input shape (lookBack days, 1 feature per day)
    returnSequences: false, // We want a single output (next day's demand)
  })
);

model.add(tf.layers.dense({ units: 1 })); // Single output node (predicted demand)

// Compile the model
model.compile({
  optimizer: 'adam',
  loss: 'meanSquaredError', // For regression tasks
});

// Train the model
const trainModel = async () => {
  await model.fit(X_tensor, Y_tensor, {
    epochs: 100, // Number of training epochs
    batchSize: 8, // Number of samples per batch
    verbose: 1,  // Show training progress
  });
  console.log('Model training complete!');
};

// Predict using the model
const predictDemand = async (inputData) => {
  const inputTensor = tf.tensor3d([inputData], [1, lookBack, 1]);
  const prediction = model.predict(inputTensor);
  const predictedNormalized = prediction.dataSync()[0]; // Get the prediction
  const predictedDemand = predictedNormalized * (max - min) + min; // Reverse normalization
  return predictedDemand;
};

// Run the training and prediction
const runForecasting = async () => {
  await trainModel();
  const testData = [70.3, 65.9, 72.5]; // Sample test data (latest 3 days)
  const forecastedDemand = await predictDemand(testData);
  console.log(`Predicted Demand for the next day: ${forecastedDemand.toFixed(2)}%`);
};

// Start the forecasting
runForecasting();
