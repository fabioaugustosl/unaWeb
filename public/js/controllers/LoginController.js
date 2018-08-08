
 

apoioApp.controller('LoginController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage, $window, md5, loginService){
		$scope.tituloPagina = "LOGIN";
		

		$scope.login1 = function(){

			if(!$scope.usuario || !$scope.senha) {
					$scope.msgErro = "Todos os campos são obrigatórios."; 
			} else {
				var cbErro =  function(msg) {
					console.log('pau no login : ',msg);
		     		$scope.msgErro = msg;
		    	};

			    var cbSucesso = function(usuario) {
			    	console.log('sucesso no login : ',usuario);
			      	$sessionStorage.usuarioLogado = usuario;

					console.log("vaiiiii login");

					$sessionStorage.dono = usuario.dono;
					$sessionStorage.idEmpresa = usuario.info_extra1;//"5b1d9edafd09c90010bd45a6";

					$location.replace();
					$location.url('/');
					$window.location.reload();
			    };

			    //console.log('Senha md5: ',md5.createHash($scope.senha || ''));
				loginService.login($scope.usuario, md5.createHash($scope.senha || '') , $sessionStorage.dono, cbSucesso, cbErro);
			}
		};



	  	

	  	console.log('is isAuthenticated login controller ',loginService.isAuthenticated());
	  	
	  	if(!loginService.isAuthenticated()){
	  		
	  		if($sessionStorage.usuarioLogado){

	  			console.log("VAI RECONSTRUIR O LOGIN " ,$sessionStorage.usuarioLogado);
	  			loginService.reconstruirSessao($sessionStorage.usuarioLogado);
	  			
	  				// ir para dash
	  			$location.replace();
				$location.url('/dashboard');
	  		}

	  	}  else {
	  		$location.replace();
			$location.url('/dashboard');
	  	}
	  	
	}
);

