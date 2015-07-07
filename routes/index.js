var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});
// Autoload de comados con :quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load); // autoload : commentId

//Definicion de rutas de sesion
router.get('/login', sessionController.new);      // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definicion de rutas quizes( con solo un elemento)
/*
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
*/
// Definicion de rutas quizes( con varios elementos)
router.get('/quizes/',                     quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Añadimos la definicion de rutas para crear elementos en BD(quiz)
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
// Añadimos la definicion de rutas para editar los elementos de la BD
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
// Añadimos la definicion de ruta para borrar elementos en la BD
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);
// Añadimos la definicion de rutas para crear elementos en BD(comment)
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);

router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
					sessionController.loginRequired, commentController.publish);


// GET /author
router.get('/author', function(req, res) {
  res.render('author', { author: {nombre: 'Jesús Mira Lorente',
  		 urlfoto: '/images/photo.jpg'}, errors: [] });
});

module.exports = router;

