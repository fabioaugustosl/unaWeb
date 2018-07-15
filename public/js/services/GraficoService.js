apoioApp.factory('graficoService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://52.13.195.71:3000';

	var urlChamado = urlPadrao+'/api/chamadoInfo/v1/';
	

	var listarQtdCategoriasPorChamado = function(idEmpresa, fcCallback){
		console.log('listarQtdCategoriasPorChamado');
		$http.get(urlChamado+'qtdChamadosPorCategoria/'+idEmpresa)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get chamados');
				}
			);

	};


	var listarQtdItensPorChamado = function(idCategoria, fcCallback){
		console.log('listarQtdItensPorChamado');
		$http.get(urlChamado+'qtdChamadosItensPorCategoria/'+idCategoria)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get chamados');
				}
			);

	};


	var listarQtdChamadosPorAtendente = function(idEmpresa, fcCallback){
		console.log('listarQtdCategoriasPorChamado');
		$http.get(urlChamado+'qtdChamadosPorAtendente/'+idEmpresa)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get qtdChamadosPorAtendente');
				}
			);

	};


	var listarQtdChamadosPorSolicitante = function(idEmpresa, fcCallback){
		console.log('listarQtdChamadosPorSolicitante');
		$http.get(urlChamado+'qtdChamadosPorSolicitante/'+idEmpresa)
			.then(
				function(data){
					//console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get chamados');
				}
			);

	};
	

	return {
		listarQtdCategoriasPorChamado : listarQtdCategoriasPorChamado,
		listarQtdItensPorChamado : listarQtdItensPorChamado,
		listarQtdChamadosPorSolicitante : listarQtdChamadosPorSolicitante, 
		listarQtdChamadosPorAtendente : listarQtdChamadosPorAtendente
	};


});
