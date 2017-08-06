
apoioApp.factory('parametroService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000';
	var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';
	
	var urlLog = urlPadrao+'/api/parametro/v1/';

	
	var getParametro = function(dono, fcCallback){
		$http.get(urlLog+"?dono="+dono)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data[0]);
				},
				function(data){
					console.log('erro get parametro');
				}
			);

	};


	return {
		getParametro : getParametro
	};


});
