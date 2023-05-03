const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const http = require('http');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = http.createServer(app);

const io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

io.on('connection', (socket) => {
  console.log('New socket connection');

  socket.on('updateSeats', (updatedSeatsData) => {
    io.emit('updateSeats', updatedSeatsData);
  });

  socket.on('addSeat', (newSeat) => {
    console.log('New seat added:', newSeat);
    // Handle the new seat data as needed
    io.emit('updateSeats', newSeat);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;