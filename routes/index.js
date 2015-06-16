var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
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

// GET /author
router.get('/author', function(req, res) {
  res.render('author', { author: {nombre: 'Jesús Mira Lorente',
  		 urlfoto: '/images/photo.jpg'} });
});

module.exports = router;

