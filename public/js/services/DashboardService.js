
apoioApp.factory('dashboardService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://52.13.195.71:3000';

	var urlChamadoInfo = urlPadrao+'/api/chamadoInfo/v1/';
	

	var listarMediaMinutos = function(dono, fcCallback){
		$http.get(urlChamadoInfo+"somatorioMinutos/"+dono)
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


	var resumoChamadosDias = function(dono, data, fcCallback){
		$http.get(urlChamadoInfo+"chamadosDia/"+dono+"/"+data)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get resumo dias');
				}
			);
	};


	var listarChamadosAbertos = function(dono, fcCallback){

		$http.get(urlChamadoInfo+"chamadosAbertos/"+dono)
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


	var resumoQtdChamdosPorDia = function(dono, fcCallback){

		$http.get(urlChamadoInfo+"qtdChamadosUltimos/"+dono)
			.then(
				function(data){
					console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get qtdChamadosUltimos');
				}
			);

	};


	

	return {
		listarMediaMinutos :listarMediaMinutos,
		resumoQtdChamdosPorDia : resumoQtdChamdosPorDia,
		resumoChamadosDias : resumoChamadosDias, 
		listarChamadosAbertos : listarChamadosAbertos
	};


});
