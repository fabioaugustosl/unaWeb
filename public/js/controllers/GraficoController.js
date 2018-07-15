

apoioApp.controller('GraficoController',
	function ($scope, $rootScope, $http, $log, $timeout, $sessionStorage, graficoService, categoriaItemService){
		var graficoCtrl = this;
		console.log("Graficos Controller");

		var cores = ['#00BFFF', '#708090', '#98FB98','#708090','#D2691E','#FFA500','#FFFF00','#DAA520','#CAE1FF','#C1CDCD', '#FFE4C4','#00FFFF', '#87CEFF' ,'#2E8B57', '#CD8C95'];

		$scope.$emit("tituloPagina", "Gráficos");

		var dono = $sessionStorage.dono;
		var idEmpresa = $sessionStorage.idEmpresa

		graficoCtrl.idCategoria;

		graficoCtrl.categorias;


		var recuperarQtdCategoriaPorChamados = function(){
			var callback = function(dados){ 
				console.log('calback qtd categorias: ',dados);

				var rotulos = [];
		        var serie = [];
		        var background = [];

		        graficoCtrl.categorias = [];

		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];
		        	
		        	let c = {};
		        	c.nome = dado._id.nome;
		        	c.id = dado._id.id;
		        	graficoCtrl.categorias.push(c);

		        	rotulos.push(dado._id.nome);
		        	serie.push(dado.total);
		        	background.push(cores[Math.floor(Math.random() * 15)]);
		        }
	
				var data ={
		       		labels: rotulos,
			       	datasets: [{
			       		data: serie,
			       		backgroundColor: background
			        }]
			    };

		        var myLineChart = new Chart($('#graficoCategoriasDosChamados'), {
				    type: 'pie',
				    data: data 
				});
			};
			console.log('vai chamar grafico');

			graficoService.listarQtdCategoriasPorChamado(dono, callback);
		};


		graficoCtrl.gerarGraficoItem = function(){
			console.log('gerar grafico item: ',graficoCtrl.idCategoria);
			var callback = function(dados){ 
				console.log(dados);

				var rotulos = [];
		        var serie = [];
		         var background = [];

		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];

		        	rotulos.push(dado.item);
		        	serie.push(dado.total);
		        	background.push(cores[Math.floor(Math.random() * 15)]);
		        }

	
				var data ={
		       		labels: rotulos,
			       	datasets: [{
			       		data: serie,
			       		backgroundColor: background
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


		
		graficoCtrl.recuperarQtdChamadosPorSolicitante = function(){
			var callbackChamadosPorSolicitante = function(dados){ 
				console.log('calback  callbackChamadosPorSolicitante: ',dados);

				var rotulos = [];
		        var serie = [];
		        var background = [];
		        
		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];
		        	
		        	rotulos.push(dado._id.nome);
		        	serie.push(dado.total);
		        	background.push(cores[Math.floor(Math.random() * 15)]);
		        }
	
				var data ={
		       		labels: rotulos,
			       	datasets: [{
			       		data: serie,
			       		backgroundColor: background
			        }]
			    };

		        var myLineChart = new Chart($('#graficoChamadosPorSolicitante'), {
				    type: 'pie',
				    data: data 
				});
			};
			console.log('vai chamar grafico por solicitante');

			graficoService.listarQtdChamadosPorSolicitante(dono, callbackChamadosPorSolicitante);
		};



		graficoCtrl.recuperarQtdChamadosPorAtendente = function(){
			var callbackChamadosPorAtendente = function(dados){ 
				console.log('calback qtd recuperarQtdChamadosPorAtendente: ',dados);

				var rotulos = [];
		        var serie = [];
		        var background = [];

		        
		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];
		        	
		        	rotulos.push(dado._id.nome);
		        	serie.push(dado.total);
		        	background.push(cores[Math.floor(Math.random() * 15)]);
		        }
	
				var data ={
		       		labels: rotulos,
			       	datasets: [{
			       		data: serie,
			       		backgroundColor: background
			        }]
			    };

		        var myLineChart = new Chart($('#graficoChamadosPorAtendente'), {
				    type: 'pie',
				    data: data 
				});
			};
			console.log('vai chamar grafico por solicitante');

			graficoService.listarQtdChamadosPorAtendente(dono, callbackChamadosPorAtendente);
		};

		graficoCtrl.recuperarQtdChamadosPorSolicitante();
		$timeout(function(){graficoCtrl.recuperarQtdChamadosPorAtendente();}, 300);
		$timeout(function(){recuperarQtdCategoriaPorChamados()}, 300);	

	}
);

