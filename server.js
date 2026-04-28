require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const connectDB    = require('./config/db');
const authRoutes   = require('./routes/authRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const bukuRoutes   = require('./routes/bukuRoutes');
const modulRoutes  = require('./routes/modulRoutes');
const imageRoutes  = require('./routes/imageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth',   authRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/buku',   bukuRoutes);
app.use('/api/modul',  modulRoutes);
app.use('/api/image',  imageRoutes);

app.get('/', (_, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));