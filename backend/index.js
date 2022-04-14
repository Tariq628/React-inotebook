const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
connectToMongo();

// available routes;
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
})