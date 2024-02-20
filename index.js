const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('mp3' | 'wav'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Generate unique URL
  const uniqueUrl = `/uploads/${file.filename}`;
  res.send(`File uploaded successfully. Access it at: ${uniqueUrl}`);
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});