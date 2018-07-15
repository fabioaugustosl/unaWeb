
apoioApp.factory('relatorioIngressoService', function($http, $log){
	
	//var urlPadrao = 'http://52.13.195.71:3000';
	var urlPadrao = 'http://localhost:3000';

	var urlChamadoInfo = urlPadrao+'/api/chamadoInfo/v1/';


	var exportarChamadosXls = function(fcCallback){
		$http.get(urlChamadoInfo+'/xls')
			.then(
				function(data, status, headers, config){
					console.log(data);
					fcCallback(data.data);
				},
				function(data, status, headers, config){
					
				}
			);
	};

	var getLinkExportar=function(filtros){
		return urlChamadoInfo+'/xls';
	}



	return {
		exportarChamadosXls : exportarChamadosXls,
		getLinkExportar :getLinkExportar
	};


});
