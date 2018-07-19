
 

apoioApp.controller('PrincipalController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage, $mdDialog,$window, md5, loginService){
		$scope.tituloPagina = "Login";

		$scope.usuarioAutenticado = false;


		console.log(' location search ', $location.search());


		$scope.$on('tituloPagina', function (event, args) {
		 	$scope.tituloPagina = args;
		});

		$scope.$on('usuarioAutenticado', function (event, args) {
			console.log('PRINCIPAL CONTROLLER ONNN  ',args);
			//$scope.usuarioAutenticado = args;
			$scope.usuarioAutenticado = true;
			console.log($scope.usuarioAutenticado);
		});




		$scope.logout = function(){
			console.log('logout');
			var cb = function(){
				console.log('logout cb');
				
				$scope.telaLogin();
				
			};

			$sessionStorage.usuarioLogado = null;
			loginService.logout(cb);
		};


		console.log('is isAuthenticated PRincipal COntroller: ',loginService.isAuthenticated());
		if(!loginService.isAuthenticated()){
	  	
	  		if($sessionStorage.usuarioLogado){
				console.log("VAI RECONSTRUIR O LOGIN " ,$sessionStorage.usuarioLogado);
	  			loginService.reconstruirSessao($sessionStorage.usuarioLogado);
	  			$scope.usuarioAutenticado = true;
	  		}

	  	} else {
	  		$scope.usuarioAutenticado = true;
	  	}

	  	
	
				
	  	/*
	  	if(!loginService.isAuthenticated()){
	  		
	  		$scope.usuarioAutenticado = true;

	  		if($sessionStorage.usuarioLogado){

	  			console.log("VAI RECONSTRUIR O LOGIN " ,$sessionStorage.usuarioLogado);
	  			loginService.reconstruirSessao($sessionStorage.usuarioLogado);
	  			$location.replace();
				$location.url('/dashboard');
	  		} else{
	  			//$scope.telaLogin();		
	  		}

	  	} */
	  	/*else {
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
					var cbErro =  function(msg) {
						console.log('pau no login : ',msg);
			     		$scope.msgErro = msg;
			    	};

				    var cbSucesso = function(usuario) {
				    	console.log('sucesso no login : ',usuario);
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

