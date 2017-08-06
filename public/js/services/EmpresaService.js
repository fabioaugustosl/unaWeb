
apoioApp.factory('empresaService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000';
	var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';
	
	var urlEmpresa = urlPadrao+'/api/empresa/v1/';

	var listar = function(parametros, fcCallback){
		var paramentro = "";
		if(parametros){
			paramentro = parametros;
		}

		$http.get(urlEmpresa+paramentro)
			.then(
				function(data){
					console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get empresa');
				}
			);

	};


	var listarPorDono = function(dono, fcCallback){
		$http.get(urlEmpresa+"?dono="+dono)
			.then(
				function(data){
					console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get empresa');
				}
			);

	};

	var remover = function(idEmpresa, fcCallback){
		$http.delete(urlEmpresa+idEmpresa)
			.then(
				function(data){
					fcCallback();
				},
				function(data){
					console.log('erro get empresa');
				}
			);

	};

	var getEmpresa = function(id, fcCallback){
		$http.get(urlEmpresa +id)
			.then(
				function(data, status, headers, config){
					fcCallback(data.data);
				},
				function(data, status, headers, config){
				}
			);
	};



	var salvarEmpresa = function(empresa, fcCallback, fcCallbackError){
		
		if(empresa._id){
			$http.patch(urlEmpresa+empresa._id, empresa).
				then(
					function(status){
						fcCallback(data.data);
					},
					function(){
						fcCallbackError("Ocorreu um erro ao atualizar os dados do empresa.");
					}
				);
				
		} else {
			$http.post(urlEmpresa, empresa)
				.then(
					function(data, status, headers, config){
						fcCallback(data.data);
					},
					function(data, status, headers, config){
						fcCallbackError("Ocorreu um erro ao salvar o empresa.");
					}
				);
				
		}

		
	};

	return {
		listar : listar,
		remover :remover,
		listarPorDono : listarPorDono,
		getEmpresa :getEmpresa, 
		salvar : salvarEmpresa
	};


});
