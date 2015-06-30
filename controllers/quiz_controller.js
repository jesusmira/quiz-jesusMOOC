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
	models.Quiz.find({
			where: { id: Number(quizId)},
			include: [{ model: models.Comment }]
		}).then(
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

	if (req.query.search ) {

		var filtro  = (req.query.search || '').replace(" ", "%");
		filtro = "%"+filtro+"%";
		models.Quiz.findAll(
			{where: ["pregunta like ?", filtro], order: 'pregunta ASC'}).then(function(quizes){
				res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error){next(error);});

	} else{

		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error){next(error);});
	}

};

// GET /quizes/:id (renombraremos quizes.ejs por show.ejs)
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{ quiz: req.quiz, errors: []});
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
						{ quiz: req.quiz, respuesta: resultado, errors: []});		
//	});
};
// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(// crea objeto quiz
	{ pregunta: "Pregunta", respuesta: "Respuesta", tema: "tema"}	
		);
	res.render('quizes/new',{quiz: quiz, errors: []});
};
// GET /quizes/create

exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz);

	// guarda en DB los campos pregunta y respuesta de quiz 
	// y añadimos el control de validacion(modulo 8)
	quiz
	.validate()
	.then(// esto funcionara con la version 2.2.0 de sequelize con la 1.7.0 no
		function(err){
			if(err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}else{
				quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
					res.redirect('/quizes');
			});
			}
		}
	);
};

/* Solucion para problemas con then y sequelize 1.7.0
exports.create = function(req, res){
var quiz = models.Quiz.build( req.body.quiz );

	// guarda en DB los campos pregunta y respuesta de quiz 
	// y añadimos el control de validacion(modulo 8)
var errors = quiz.validate();//ya que el objeto errors no tiene then(
if (errors)
	{
		var i=0; 
		var errores = new Array(); //se convierte en [] con la propiedad message por compatibilida con layout
		for (var prop in errors) errores[i++] = {message: errors[prop]};	
		res.render('quizes/new', {quiz: quiz, errors: errores});
	} else {
		quiz // save: guarda en DB campos pregunta y respuesta de quiz
		.save({fields: ["pregunta", "respuesta"]})
		.then( function(){ res.redirect('/quizes')}) ;
	}
};
*/
// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit',{quiz: quiz, errors: []});
};

// GET /quizes/
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			}else{
				req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
					res.redirect('/quizes');
			});
			}
		}
	);

};
// DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};