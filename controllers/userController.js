const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let users = require('../users.json');
const SECRET_KEY = 'yourSecretKey';

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.json({ message: 'Registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
};