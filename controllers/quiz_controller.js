/* Modo sin BD asociada */
/*
//GET /quizes/question
exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

//GET /quizes/answer
exports.answer = function(req, res){
	if (req.query.respuesta ==='Roma') {
		res.render('quizes/answer',{respuesta: 'Correcto'});
	} else{
		res.render('quizes/answer',{respuesta: 'InCorrecto'});
	};
}
*/
/* Modo con BD asociada en SQLite y una sola pregunta*/
var models = require ('../models/models.js');
/*
//GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};

//GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'InCorrecto'});
		}
	})
};
*/
//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

// GET /quizes/:id (renombraremos quizes.ejs por show.ejs)
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{ quiz: quiz});
	})
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		console.log('req.query.respuesta= '+req.query.respuesta );
		console.log('quiz.respuesta= '+quiz.respuesta);
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', 
						{ quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', 
						{ quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};

