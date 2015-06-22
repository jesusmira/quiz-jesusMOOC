var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});
// Autoload de comados con :quizId
router.param('quizId', quizController.load);

// Definicion de rutas quizes( con solo un elemento)
/*
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
*/
// Definicion de rutas quizes( con varios elementos)
router.get('/quizes/',                     quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Añadimos la definicion de rutas para crear elementos en BD
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
// Añadimos la definicion de rutas para editar los elementos de la BD
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);

// GET /author
router.get('/author', function(req, res) {
  res.render('author', { author: {nombre: 'Jesús Mira Lorente',
  		 urlfoto: '/images/photo.jpg'}, errors: [] });
});

module.exports = router;

