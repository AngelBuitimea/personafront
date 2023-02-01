const { Router } = require('express');
const router = Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser, getUserRol, signIn } = require('../controllers/index.controller');


router.post('/users', signIn);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/rol/:id', getUserRol);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

module.exports = router;