
apoioApp.factory('autorizadoService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://52.40.14.3:3000';

	var urlAutorizado = urlPadrao+'/api/autorizado/v1/';
	

	var listar = function(parametros, fcCallback){
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		$http.get(urlAutorizado+paramentro)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get solicitantes autorizados');
				}
			);
	};

	
	var salvarAutorizado = function(autorizado, fcCallback, fcError){
		console.log("autorizado novo: ", autorizado);
		if(autorizado._id){
			$http.patch(urlAutorizado+autorizado._id, autorizado).
				then(
					function(data, status){
						console.log('service callback sucesso autorizado', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO autorizado', data);
						fcCallbackError(data.data);
					}
				);
		} else {
			$http.post(urlAutorizado, autorizado)
				.then(
					function(data, status, headers, config){
						fcCallback(data.data);
					},
					function(data, status, headers, config){
						console.log(data);
						fcError(data.data);
					}
				);	
		}
	};


	var remover = function(idAutorizado, fcCallback){
		$http.delete(urlAutorizado+idAutorizado)
			.then(
				function(status){
					console.log('call back service remover autorizado');
					fcCallback(idAutorizado);
				}
			);	
	};



	return {
		listar : listar,
		remover :remover,
		salvar : salvarAutorizado

	};


});
