
apoioApp.factory('regiaoService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';

	var urlRegiao = urlPadrao+'/api/regiao/v1/';
	

	
	var getRegioes = function(dono, fcCallback){
		$http.get(urlRegiao+"?dono="+dono)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get regiaos');
				}
			);
	};


	var listarRegioesPorEmpresa = function(idEmpresa, fcCallback){
		$http.get(urlRegiao+"?empresa="+idEmpresa)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get regiaos');
				}
			);
	};

	
	var salvarRegiao = function(regiao, fcCallback, fcError){
		console.log("Regiao novo: ", regiao);
		if(regiao._id){
			$http.patch(urlRegiao+regiao._id, regiao).
				then(
					function(data, status){
						console.log('service callback sucesso regiao', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO regiao', data);
						fcCallbackError(data.data);
					}
				);

		} else {
			$http.post(urlRegiao, regiao)
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


	var removerRegiao = function(idRegiao, fcCallback){
		$http.delete(urlRegiao+idRegiao)
			.then(
				function(status){
					console.log('call back service remover regiao');
					fcCallback(idregiao);
				}
			);	
			
	};




	return {
		listarRegioesPorEmpresa : listarRegioesPorEmpresa,
		getRegioes : getRegioes,
		removerRegiao :removerRegiao,
		salvarRegiao : salvarRegiao

	};


});
