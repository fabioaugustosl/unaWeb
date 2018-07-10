
apoioApp.controller('RelatorioController', 
	function ($scope, $rootScope, $routeParams, $window, $sessionStorage, notify, relatorioIngressoService){
		
		console.log("chegou no RelatorioController");
		var relatorioCtrl = this;

		$scope.$emit("tituloPagina", "Relatórios");
		var dono = $sessionStorage.dono;
		relatorioCtrl.link = '';

	
		relatorioCtrl.exportarChamados = function(){
			
			/*var cb = function(dados){
				//console.log(dados);
				 blob = new Blob([dados]),
       			 url = $window.URL || $window.webkitURL;
   				 console.log('VAIIIII');
   				 var link = url.createObjectURL(blob);
   				 console.log(link);
   				// $window.open(link);
   				relatorioCtrl.link = link;
			};

			relatorioIngressoService.exportarChamadosXls(cb);
			*/
			var filtros = null;
			$window.open(relatorioIngressoService.getLinkExportar(filtros));
		};

		
	}
	
);