
apoioApp.factory('pessoaService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3001';
	var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:81';
	
	var urlPessoa = urlPadrao+'/api/pessoa/v1/';



	var getPessoaPorCpf = function(cpf, fcCallback){
		cpf = cpf.match(/\d/g).join("");
		console.log('estou no service e vou fazer busca pelo cpf ',cpf);
		$http.get(urlPessoa+"?cpf="+cpf)
			.then(
				function(data){
					fcCallback(data.data);
				},
				function(data){
					console.log('Erro encontrar pessoa por cpf');
				}
			);
	};

	

	var getPessoaPorLogin = function(login, dono, fcCallback){
		$http.get(urlPessoa+"?login="+login+"&dono="+dono)
			.then(
				function(data){
					fcCallback(data.data);
				},
				function(data){
					console.log('Erro encontrar pessoa');
				}
			);

	};



	var getPessoas = function(parametros, fcCallback){
		if(!parametros){
			parametros = '';
		}
		$http.get(urlPessoa+parametros)
			.then(
				function(data){
					fcCallback(data.data);
				},
				function(data){
					console.log('Erro listar pessoas');
				}
			);

	};
	

	return {
		recuperarPessoaPorCpf	: getPessoaPorCpf,
		recuperarPessoaPorLogin 	: getPessoaPorLogin,
		listar : getPessoas
	};


});
