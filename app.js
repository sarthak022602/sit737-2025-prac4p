const express = require('express');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

// Create logs directory if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Winston Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
    ]
});

app.use(express.json());

// Logging middleware for all requests
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Helper function for validation
function isInvalid(num1, num2) {
    return isNaN(num1) || isNaN(num2);
}

// Addition
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (isInvalid(num1, num2)) {
        logger.error(`Invalid input for addition: ${num1}, ${num2}`);
        return res.status(400).json({ error: 'Invalid numbers' });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

// Subtraction
app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    if (isInvalid(num1, num2)) {
        logger.error(`Invalid input for subtraction: ${num1}, ${num2}`);
        return res.status(400).json({ error: 'Invalid numbers' });
    }
    const result = parseFloat(num1) - parseFloat(num2);
    logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

// Multiplication
app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    if (isInvalid(num1, num2)) {
        logger.error(`Invalid input for multiplication: ${num1}, ${num2}`);
        return res.status(400).json({ error: 'Invalid numbers' });
    }
    const result = parseFloat(num1) * parseFloat(num2);
    logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
    res.json({ result });
});

// Division
app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (isInvalid(num1, num2)) {
        logger.error(`Invalid input for division: ${num1}, ${num2}`);
        return res.status(400).json({ error: 'Invalid numbers' });
    }
    if (parseFloat(num2) === 0) {
        logger.error(`Division by zero attempt: ${num1} / ${num2}`);
        return res.status(400).json({ error: 'Cannot divide by zero' });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    logger.info(`Division: ${num1} / ${num2} = ${result}`);
    res.json({ result });
});

// Start server
app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`);
    logger.info(`Microservice started on port ${port}`);
});
