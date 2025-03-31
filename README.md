
# SIT737 – Cloud Native Application Development  
## Task 4.1P: Basic Calculator Microservice with Logging

This repository contains a Node.js microservice developed for Task 4.1P. The service performs basic arithmetic operations (addition, subtraction, multiplication, division) and includes logging via the Winston library.


## ✨ Features

- REST API using Express
- Four POST endpoints: `/add`, `/subtract`, `/multiply`, `/divide`
- Input validation with meaningful error messages
- Request logging using Winston
- Logs written to both console and files (`logs/combined.log`, `logs/error.log`)


## 🪜 Step-by-Step Implementation

### 1️⃣ Initialize Project


mkdir sit737-2025-prac4p
cd sit737-2025-prac4p
npm init -y
npm install express winston
```

---

### 2️⃣ Create Project Files


touch index.js
mkdir logs
```



### 3️⃣ Implement Basic Microservice

Inside `index.js`:

- Set up Express
- Create four endpoints:
  - `/add`
  - `/subtract`
  - `/multiply`
  - `/divide`
- Each accepts a JSON body with `num1` and `num2`
- Validates that both are numbers

Example:
```js
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    logger.error('Invalid input for addition');
    return res.status(400).json({ error: 'Invalid input' });
  }
  const result = num1 + num2;
  logger.info(`Addition: ${num1} + ${num2} = ${result}`);
  res.json({ result });
});
```

---

### 4️⃣ Add Winston Logging

Configured `winston` like this:

```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
```

Used `logger.info()` and `logger.error()` inside each endpoint.

---

### 5️⃣ Run the Application

node index.js
```

Test using curl:

curl -X POST http://localhost:3000/add \
-H "Content-Type: application/json" \
-d '{"num1": 10, "num2": 5}'
```

---

 6️⃣ View Logs


tail -f logs/combined.log
tail -f logs/error.log


---

  Project Structure

```
├── index.js
├── package.json
├── logs/
│   ├── combined.log
│   └── error.log
└── README.md
```

---

## 🔗 Repository

Once completed, code was pushed to GitHub:  
[https://github.com/sarthak022602/sit737-2025-prac4p](https://github.com/sarthak022602/sit737-2025-prac4p)

---

## 👤 Author

**Sarthak Dutta**  
Deakin University  
SIT737 – Cloud Native Application Development (T1 2025)

```

---

