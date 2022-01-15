// Conexón a la base de datos
const { connect } = require('mongoose');

URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.stxmk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

connect(URI)
    .then(() => console.log('Database connected.'))
    .catch(e => console.log(e));