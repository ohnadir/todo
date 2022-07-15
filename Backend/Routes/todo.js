const router = require('express').Router();


const {
    addTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getTodo,
    getPagonationTodos,
    getSearchTodo

} = require('../Controllers/todo');

const {
    addTodoValidator,
    updateTodoValidator,
    idValidator
} = require('../Validation/todo');
const validationResult = require('../Validation/index');

router.post('/', addTodoValidator, validationResult, addTodo)
router.get('/', getTodos)
router.get('/', getPagonationTodos)
router.get('/get', getSearchTodo)
router.get('/:id',idValidator, getTodo)
router.patch('/:id', updateTodoValidator, idValidator, validationResult, updateTodo)
router.delete('/:id',idValidator, deleteTodo);


module.exports = router;