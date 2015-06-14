var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
						{dialect: "sqlite", storage: "quiz.sqlite"
					});
// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definicion de la tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function(){
	Quiz.count().success(function(count){
		//success(..) ejecuta el manejador una vez creada la tabla
		if (count === 0) { // la tabla se inicializa solo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
						})
			.success(function(){console.log('Base de datos inicializada')});		

		};
	});
});