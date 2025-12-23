const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

// FIXED MongoDB Connection (No bufferMaxEntries error!)
let dbConnected = false;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    dbConnected = true;
    console.log('✅ MongoDB Connected!');
  })
  .catch(err => {
    console.log('⚠️ MongoDB Offline - Using Memory DB');
  });

// In-Memory Fallback Database
let memoryUsers = [];

// Routes
app.get('/', (req, res) => res.json({ message: '🚀 FoodHub Backend LIVE!' }));

// ✅ SIGNUP - Works with MongoDB OR Memory!
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    if (dbConnected) {
      // MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'User exists!' });
      
      const user = new User({ name, email, phone, password });
      await user.save();
      
      res.json({ success: true, user: { id: user._id, name, email } });
    } else {
      // Memory DB
      const existingUser = memoryUsers.find(u => u.email === email);
      if (existingUser) return res.status(400).json({ error: 'User exists!' });
      
      const newUser = { id: Date.now(), name, email, phone, password };
      memoryUsers.push(newUser);
      
      res.json({ success: true, user: { id: newUser.id, name, email } });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ LOGIN - Works with MongoDB OR Memory!
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (dbConnected) {
      const user = await User.findOne({ email });
      if (user && user.password === password) {
        res.json({ success: true, user: { id: user._id, name: user.name, email } });
      } else {
        res.status(400).json({ error: 'Invalid credentials!' });
      }
    } else {
      const user = memoryUsers.find(u => u.email === email && u.password === password);
      if (user) {
        res.json({ success: true, user: { id: user.id, name: user.name, email } });
      } else {
        res.status(400).json({ error: 'Invalid credentials!' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ SHOW ALL USERS (Memory + MongoDB)
app.get('/api/users', async (req, res) => {
  try {
    let allUsers = [];
    
    if (dbConnected) {
      // Get from MongoDB
      const mongoUsers = await User.find();
      allUsers = mongoUsers.map(u => ({ 
        id: u._id, 
        name: u.name, 
        email: u.email,
        phone: u.phone,
        source: 'MongoDB' 
      }));
    } else {
      // Get from Memory
      allUsers = memoryUsers.map(u => ({ 
        ...u, 
        source: 'Memory DB' 
      }));
    }
    
    res.json({ 
      users: allUsers,
      total: allUsers.length,
      mongoConnected: dbConnected,
      message: `Found ${allUsers.length} users!`
    });
  } catch (error) {
    res.json({ 
      users: memoryUsers,
      total: memoryUsers.length,
      mongoConnected: false,
      message: 'Using Memory DB'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`✅ Ready for React signup/login!`);
  console.log(`📱 View users: http://localhost:${PORT}/api/users`);
});
