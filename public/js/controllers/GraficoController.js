

apoioApp.controller('GraficoController',
	function ($scope, $rootScope, $http, $log, $timeout, $sessionStorage, graficoService, categoriaItemService){
		var graficoCtrl = this;
		console.log("Graficos Controller");

		var cores = ['#0000FF', '#2F4F4F', '#CD0000','#CD950C','#8B7355','#8B4C39','#8B8970','#473C8B','#6B8E23','#483D8B', '#4682B4','#00FFFF', '#87CEFF' ,'#36648B', '#8B4513'];

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

