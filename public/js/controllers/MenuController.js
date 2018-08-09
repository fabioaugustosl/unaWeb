
 

apoioApp.controller('MenuController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage, $mdDialog,$window, md5, loginService){

		$scope.usuarioAutenticado = false;

		$scope.$on('usuarioAutenticado', function (event, args) {
			console.log('PRINCIPAL CONTROLLER ONNN  ',args);
			//$scope.usuarioAutenticado = args;
			$scope.usuarioAutenticado = true;
			console.log($scope.usuarioAutenticado);
		});


		console.log('is isAuthenticated Menu COntroller: ',loginService.isAuthenticated());
		if(!loginService.isAuthenticated()){
	  	
	  		if($sessionStorage.usuarioLogado){
				console.log("VAI RECONSTRUIR O LOGIN " ,$sessionStorage.usuarioLogado);
	  			loginService.reconstruirSessao($sessionStorage.usuarioLogado);
	  			$scope.usuarioAutenticado = true;
	  		}

	  	} else {
	  		$scope.usuarioAutenticado = true;
	  	}


		var resetarMenuSelecionado = function(menuAtivo){
			$scope.classDash = "";
			$scope.classGraficos = "";
			$scope.classUnidade = "";
			$scope.classEmpresas = "";
			$scope.classCategoria = "";
			$scope.classRegiao = "";
			$scope.classApoio = "";
			$scope.classAutorizado = "";
			$scope.classChamados = "";
			$scope.classRelatorios = "";
			$scope.classGraficos = "";

			if(menuAtivo == "dashboard"){
				$scope.classDash = "active";
			} else if(menuAtivo == "categoria"){
				$scope.classCategoria = "active";
			} else if(menuAtivo == "empresa"){
				$scope.classEmpresas = "active";
			} else if(menuAtivo == "regiao"){
				$scope.classRegiao = "active";
			} else if(menuAtivo == "grafico"){
				$scope.classGraficos = "active";
			} else if(menuAtivo == "apoio"){
				$scope.classApoio = "active";
			} else if(menuAtivo == "chamados"){
				$scope.classChamados = "active";
			} else if(menuAtivo == "autorizado"){
				$scope.classAutorizado = "active";
			} else if(menuAtivo == "relatorios"){
				$scope.classRelatorios = "active";
			} else if(menuAtivo == "graficos"){
				$scope.classGraficos = "active";
			}

		}


	  //	console.log("principal Controller");

		
		$scope.irParaDashboard = function(){
			console.log("go to das");
			resetarMenuSelecionado("dashboard");
			$location.replace();
			$location.url('/dashboard');
		};

		$scope.irParaApoio = function(){
			resetarMenuSelecionado("apoio");
			$location.replace();
			$location.url('/apoio');
		};

		$scope.irParaAutorizado = function(){
			resetarMenuSelecionado("autorizado");
			$location.replace();
			$location.url('/autorizado');
		};

		$scope.irParaCategoria = function(){
			resetarMenuSelecionado("categoria");
			$location.replace();
			$location.url('/categoria');
		};
		
		$scope.irParaEmpresa = function(){
			resetarMenuSelecionado("empresa");
			$location.replace();
			console.log("ir para empresa");
			$location.url('/empresa');
		};

		$scope.irParaRegiao = function(){
			resetarMenuSelecionado("regiao");
			$location.replace();
			$location.url('/regiao');
		};

		$scope.irParaUnidade = function(){
			resetarMenuSelecionado("unidade");
			$location.replace();
			$location.url('/unidade');
		};

		$scope.irParaGrafico = function(){
			resetarMenuSelecionado("grafico");
			$location.replace();
			$location.url('/grafico');
		};

		$scope.irParaChamados = function(){
			resetarMenuSelecionado("chamados");
			$location.replace();
			$location.url('/chamados');
		};

		$scope.irParaRelatorios = function(){
			resetarMenuSelecionado("relatorios");
			$location.replace();
			$location.url('/relatorios');
		};


		resetarMenuSelecionado("dashboard");
		
	}
);

