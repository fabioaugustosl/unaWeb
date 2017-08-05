
apoioApp.factory('unidadeService', function($http, $log){
	
	var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	//var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';

	var urlAgrupamento = urlPadrao+'/api/agrupamento/v1/';
	var urlUnidade = urlPadrao+'/api/unidade/v1/';
	


	
	var getAgrupamentos = function(dono, fcCallback){
		$http.get(urlAgrupamento+"?dono="+dono)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get agrupamentos');
				}
			);
	};


	var recuperarAgrupamentosPorEmpresa = function(idEmpresa, fcCallback){
		$http.get(urlAgrupamento+"?idEmpresa="+idEmpresa)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get agrupamentos');
				}
			);
	};

	
	var salvarAgrupamento = function(agrupamento, fcCallback, fcError){
		console.log("Agrupamento novo: ", agrupamento);
		if(agrupamento._id){
			$http.patch(urlAgrupamento+agrupamento._id, agrupamento).
				then(
					function(data, status){
						console.log('service callback sucesso agrupamento', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO agrupamento', data);
						fcCallbackError(data.data);
					}
				);

		} else {
			$http.post(urlAgrupamento, agrupamento)
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


	var removerAgrupamento = function(idAgrupamento, fcCallback){
		$http.delete(urlAgrupamento+idAgrupamento)
			.then(
				function(status){
					console.log('call back service remover agrupamento');
					fcCallback(idAgrupamento);
				}
			);	
			
	};



	/*********************************/
	/***** UNIDADES*******************/
	/*********************************/
	var getUnidades = function(idAgrupamento, fcCallback){
		$http.get(urlUnidade+"?idAgrupamento="+idAgrupamento)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get unidades');
				}
			);
	};

	
	var salvarUnidade = function(unidade, fcCallback, fcError){
		console.log("unidade novo: ", unidade);
		if(unidade._id){
			$http.patch(urlUnidade+unidade._id, unidade).
				then(
					function(data, status){
						console.log('service callback sucesso unidade', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO unidade', data);
						fcCallbackError(data.data);
					}
				);

		} else {
			$http.post(urlUnidade, unidade)
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


	var removerUnidade = function(idUnidade, fcCallback){
		$http.delete(urlUnidade+idUnidade)
			.then(
				function(status){
					console.log('call back service remover unidade');
					fcCallback(idUnidade);
				}
			);	
			
	};





	return {
		recuperarAgrupamentosPorEmpresa : recuperarAgrupamentosPorEmpresa,
		getAgrupamentos : getAgrupamentos,
		removerAgrupamento :removerAgrupamento,
		salvarAgrupamento : salvarAgrupamento,
		getUnidades : getUnidades,
		removerUnidade :removerUnidade,
		salvarUnidade : salvarUnidade

	};


});
