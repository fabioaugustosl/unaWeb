
apoioApp.factory('chamadoService', function($http, $log){
	
	var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	//var urlPadrao = 'http://172.31.19.92:3000';

	var urlChamado = urlPadrao+'/api/chamado/v1/';
	

	var listar = function(parametros, fcCallback){
		var paramentro = "";
		if(parametros){

			paramentro = "?"+parametros;
		}

		$http.get(urlChamado+paramentro)
			.then(
				function(data){
					console.log(data);

					fcCallback(data.data);
				},
				function(data){
					console.log('erro get chamados');
				}
			);

	};




	return {
		listar : listar
	};


});
