
apoioApp.factory('apoioService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';

	var urlApoio = urlPadrao+'/api/apoio/v1/';
	

	var listar = function(parametros, fcCallback){
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		$http.get(urlApoio+paramentro)
			.then(
				function(data){
					console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get apoios');
				}
			);

	};


	var listarPorEmpresa = function(idEmpresa, fcCallback){

		$http.get(urlApoio+"?empresa="+idEmpresa)
			.then(
				function(data){
					console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get apoios');
				}
			);

	};


	/*var getApoios = function(dono, fcCallback){
		$http.get(urlapoio+"?dono="+dono)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get apoios');
				}
			);
	};*/

	
	var salvarApoio = function(apoio, fcCallback, fcError){
		console.log("apoio novo: ", apoio);
		if(apoio._id){
			$http.patch(urlApoio+apoio._id, apoio).
				then(
					function(data, status){
						console.log('service callback sucesso apoio', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO apoio', data);
						fcCallbackError(data.data);
					}
				);

		} else {
			$http.post(urlApoio, apoio)
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


	var remover = function(idApoio, fcCallback){
		$http.delete(urlApoio+idApoio)
			.then(
				function(status){
					console.log('call back service remover apoio');
					fcCallback(idApoio);
				}
			);	
			
	};





	return {
		listarPorEmpresa : listarPorEmpresa,
		listar : listar,
		remover :remover,
		salvar : salvarApoio

	};


});
