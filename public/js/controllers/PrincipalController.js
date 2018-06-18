
 

apoioApp.controller('PrincipalController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage, $mdDialog,$window, md5, loginService){
		$scope.tituloPagina = "PRINCIPAL";

		$sessionStorage.dono = "una";
		$sessionStorage.idEmpresa = "5b1d9edafd09c90010bd45a6";

		$scope.$on('tituloPagina', function (event, args) {
		 	$scope.tituloPagina = args;
		});


		
		

/*
		$scope.logout = function(){
			console.log('logout');
			var cb = function(){
				console.log('logout cb');
				
				$scope.telaLogin();
				
			};

			$sessionStorage.usuarioLogado = null;
			loginService.logout(cb);
		};*/



	  /*	$scope.telaLogin = function() {

			$mdDialog.show({
	      		controller: LoginController,
	      		templateUrl: '/view/dialogs/login.tmpl.html',
	      		parent: angular.element(document.body),
	      		//targetEvent: ev,
	      		clickOutsideToClose:false,
	      		escapeToClose:false,
	      		fullscreen: true // Only for -xs, -sm breakpoints.
	    	})
	    	.then(function(usuario) {
	    		$sessionStorage.usuarioLogado = usuario;

				console.log("vaiiiii login");
	    		if(!$scope.evento){
	    			console.log("vai selecionar o evento");
			  		$scope.selecionarEvento();
			  	} else {
			  		$scope.goToDashboard();
			  	}

	    	}, function() {
	    		// erro
	    	});
	  	};*/


	  	/*console.log('is isAuthenticated ',loginService.isAuthenticated());
	  	if(!loginService.isAuthenticated()){
	  		
	  		if($sessionStorage.usuarioLogado){

	  			console.log("VAI RECONSTRUIR O LOGIN " ,$sessionStorage.usuarioLogado);
	  			loginService.reconstruirSessao($sessionStorage.usuarioLogado);
	  			$scope.goToDashboard();
	  		} else{
	  			$scope.telaLogin();		
	  		}

	  	} else {
	  		//if(!$scope.evento){
		  		$scope.selecionarEvento();
		  	//}
	  	}*/

		

		/*function LoginController($scope, $mdDialog, loginService) {

	  		$scope.usuario =null;
			$scope.senha   =null;
			$scope.msgErro =null;

			$scope.login = function(){

				if(!$scope.usuario || !$scope.senha) {
					$scope.msgErro = "Todos os campos são obrigatórios."; 
				} else {
					var cbErro =   $scope.novoEvento = function(msg) {
			     		$scope.msgErro = msg;
			    	};

				    var cbSucesso = function(usuario) {
				      $mdDialog.hide(usuario);
				    };

				    console.log('Senha md5: ',md5.createHash($scope.senha || ''));
					loginService.login($scope.usuario, md5.createHash($scope.senha || '') , $sessionStorage.dono, cbSucesso, cbErro);
				}
			};
		};


	  	function DialogController($scope, $mdDialog, eventoService) {

	  		var getEventos = function(){
	  			eventoService.getEventos(function(resultado){
	  				console.log(resultado);
					$scope.eventos = resultado;
				});		
			};
			
		    $scope.novoEvento = function() {
		      $mdDialog.cancel();
		    };

		    $scope.selecionarEvento = function(evento) {
		      $mdDialog.hide(evento);
		    };

		    getEventos();
		};
*/
	}
);

