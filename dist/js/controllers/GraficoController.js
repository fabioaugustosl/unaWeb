

apoioApp.controller('GraficoController',
	function ($scope, $rootScope, $http, $log, $sessionStorage, graficoService, categoriaItemService){
		var graficoCtrl = this;
		console.log("Graficos Controller");

		$scope.$emit("tituloPagina", "Gráficos");

		var dono = $sessionStorage.dono;
		var idEmpresa = $sessionStorage.idEmpresa

		graficoCtrl.idCategoria;

		graficoCtrl.categorias;


		var recuperarQtdCategoriaPorChamados = function(){
			var callback = function(dados){ 

				var rotulos = [];
		        var serie = [];

		        graficoCtrl.categorias = [];

		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];
		        	
		        	let c = {};
		        	c.nome = dado._id.nome;
		        	c.id = dado._id.id;
		        	graficoCtrl.categorias.push(c);

		        	rotulos.push(dado._id.nome);
		        	serie.push(dado.total);
		        }
	
				var data ={
		       		labels: rotulos,
			       	datasets: [{
			       		data: serie
			        }]
			    };

		        var myLineChart = new Chart($('#graficoCategoriasDosChamados'), {
				    type: 'pie',
				    data: data 
				});
			};
			console.log('vai chamar grafico');

			graficoService.listarQtdCategoriasPorChamado(idEmpresa, callback);
		};


		graficoCtrl.gerarGraficoItem = function(){
			var callback = function(dados){ 

				var rotulos = [];
		        var serie = [];

		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];

		        	rotulos.push(dado.item);
		        	serie.push(dado.total);
		        }

	
				var data ={
		       		labels: rotulos,
			       	datasets: [{
			       		data: serie
			        }]
			    };

		        var myLineChart = new Chart($('#graficoItensAtendimentosDosChamados'), {
				    type: 'pie',
				    data: data 
				});
			};
			console.log('vai chamar idCategoria');

			graficoService.listarQtdItensPorChamado(graficoCtrl.idCategoria, callback);
		};


		recuperarQtdCategoriaPorChamados();


	}
);
