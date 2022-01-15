const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//Esquema de la tabla Usuario
const userSchema = new Schema({
    name: String,
    lastname: String,
    user: {
        type: String,
        unique: true,
        require: true
    },
    profile: {
        type: String,
        default: 'profile-default.png'
    },
    password: {
        type: String,
        require: true
    },
    cursos: {
        type: Array
    },
    role: {
        type: String,
        default: 'client'
    }
})

//Encriptar contraseña
userSchema.methods.encrypthPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

//Comparar contraseña ingresada por el usuario
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', userSchema);
