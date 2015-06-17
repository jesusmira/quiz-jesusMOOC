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
// Autoload -factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}else{ next (new Error('No existe quizId= ' + quizID));}
		}
	).catch(function(error){next(error);});
};

//GET /quizes
// Para el ejercicio lo modificaremos aqui

exports.index = function(req, res){

	if (req.query.search !== undefined) {

		var filtro  = (req.query.search || '').replace(" ", "%");
		filtro = "%"+filtro+"%";
		models.Quiz.findAll(
			{where: ["pregunta like ?", filtro], order: 'pregunta ASC'}).then(function(quizes){
				res.render('quizes/index.ejs', {quizes: quizes});
		}).catch(function(error){next(error);});

	} else{

		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
		}).catch(function(error){next(error);});
	}

};

// GET /quizes/:id (renombraremos quizes.ejs por show.ejs)
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{ quiz: req.quiz});
	});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
//	models.Quiz.find(req.params.quizId).then(function(quiz){
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta){
			resultado ='Correcto';
		} 
			res.render('quizes/answer', 
						{ quiz: req.quiz, respuesta: resultado});		
//	});
};

