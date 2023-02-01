const { Pool } = require('pg');
const User = require('../Model/User');
const jwt = require('jsonwebtoken');



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'password',
    database: 'postgres',
    port: '5432'
});


const signIn = async(req,res)=>{
    const{correoElectronico, password} = req.body;
    const response = await User.findOne({correoElectronico, password})
    if(!response) return res.status(401).send("Correo Incorrecto");
    if(response.password !== password)return res.status(401).send("Contraseña incorrecta");


}

const getUsers = async (req, res) => {
    
    const response = await pool.query('SELECT * FROM persona ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM persona WHERE id = $1', [id]);
    res.json(response.rows);
};
const getUserRol = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT rol FROM persona where id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, puesto, rfc, direccion, correoElectronico, cuentaGithub, estado, ciudad, numero1, numero2, genero, password, rol } = req.body;
    const response = await pool.query('INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, puesto, rfc, direccion, correoElectronico, cuentaGithub, estado, ciudad, numero1, numero2, genero, password, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [nombre, apellidoPaterno, apellidoMaterno, puesto, rfc, direccion, correoElectronico, cuentaGithub, estado, ciudad, numero1, numero2, genero, password, rol]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {nombre, apellidoPaterno, apellidoMaterno, puesto, rfc, direccion, correoElectronico, cuentaGithub, estado, ciudad, numero1, numero2, genero, password, rol}
        }
    })
    await response.save();

}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, apellidoPaterno, apellidoMaterno, puesto, rfc, direccion, correoElectronico, cuentaGithub, estado, ciudad, numero1, numero2, genero, password, rol } = req.body;

    const response =await pool.query('UPDATE persona SET nombre = $1, apellidoPaterno = $2, apellidoMaterno = $3, puesto = $4, rfc = $5, direccion = $6, correoElectronico = $7, cuentaGithub = $8, estado = $9, ciudad = $10, numero1 = $11, numero2 = $12 ,genero = $13, password = $14, rol = $15 WHERE id = $16', [
        nombre, apellidoPaterno, apellidoMaterno, puesto, rfc, direccion, correoElectronico, cuentaGithub, estado, ciudad, numero1, numero2, genero,password, rol, id 
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM persona where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    signIn,
    getUserRol,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};