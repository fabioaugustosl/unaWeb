
 

apoioApp.controller('MenuController',
	function ($scope, $rootScope, $routeParams, $location, $sessionStorage, $mdDialog,$window, md5, loginService){
		
		

		var resetarMenuSelecionado = function(menuAtivo){
			$scope.classDash = "";
			$scope.classGraficos = "";
			$scope.classUnidade = "";
			$scope.classEmpresas = "";
			$scope.classCategoria = "";
			$scope.classRegiao = "";
			$scope.classApoio = "";
			$scope.classChamados = "";

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
			}

		}


	  	console.log("principal Controller");

		
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



		resetarMenuSelecionado("dashboard");
		
	}
);

