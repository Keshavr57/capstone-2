require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5051;

app.use(cors());
app.use(express.json());

app.options('*', cors());

// Dummy login (can be extended later with MongoDB users collection)
const users = [{ email: 'test@example.com', password: '123456' }];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: '✅ Login successful!', user });
  } else {
    res.status(401).json({ message: '❌ Invalid credentials' });
  }
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: '❌ User already exists' });
  users.push({ email, password });
  res.json({ message: '✅ Registration successful!' });
});

app.get('/products', async (req, res) => {
  try {
    const [dummy, fake] = await Promise.all([
      axios.get('https://dummyjson.com/products/category/smartphones'),
      axios.get('https://fakestoreapi.com/products/category/electronics')
    ]);
    const dummyProducts = dummy.data.products.map(p => ({
      id: `d-${p.id}`,
      name: p.title,
      image: p.images[0],
      price: p.price,
      rating: p.rating,
      specs: { category: p.category, description: p.description }
    }));
    const fakeProducts = fake.data.map(p => ({
      id: `f-${p.id}`,
      name: p.title,
      image: p.image,
      price: p.price,
      rating: p.rating?.rate || 0,
      specs: { category: p.category, description: p.description }
    }));
    res.json([...dummyProducts, ...fakeProducts]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
