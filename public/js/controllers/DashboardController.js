

apoioApp.controller('DashboardController',
	function ($scope, $rootScope, $http, $log, $sessionStorage, $timeout, $interval, moment, notify, dashboardService){
		var dashboardCtrl = this;
		console.log("Dashboard Controller");

		$scope.$emit("tituloPagina", "Dashboard");

		var dono = $sessionStorage.dono;

		$.cookie('animations','bounce');
		
		
		var montarContadoresDeMediaMinutos = function(){
			
			var callback = function(qtd){ 

				dashboardCtrl.dadosMinutos = [];

				if(qtd && qtd.length > 0){
					var totalEsperaProfessor = 0;
					var totalTempoAtendimento = 0;
					var totalChamados = 0;

					for(var i = 0; i<qtd.length; i++){
						var obj = qtd[i];

						totalEsperaProfessor = totalEsperaProfessor + obj.minutosAteAtribuir + obj.minutosAteIniciar;
						totalTempoAtendimento = totalTempoAtendimento + obj.minutosAteFichar;

						totalChamados = totalChamados + obj.total;
					}

					dashboardCtrl.dadosMinutos.push({
						nome : 'Média de espera do professor (min)',
						cor: 'green',
						valor : totalEsperaProfessor / totalChamados,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});

					dashboardCtrl.dadosMinutos.push({
						nome : 'Tempo médio de atendimento efetivo (min)',
						cor: 'red',
						valor : totalTempoAtendimento / totalChamados,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});

					dashboardCtrl.dadosMinutos.push({
						nome : 'Tempo médio de atendimento total (min)',
						cor: 'yellow',
						valor : (totalTempoAtendimento +totalEsperaProfessor) / totalChamados,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});
				}
			};

			dashboardService.listarMediaMinutos(dono, callback);
		};


		var montarContadoresChamados = function(){
			
			var callback = function(resultado){ 

				dashboardCtrl.resumoChamados = [];

				if(resultado && resultado.length > 0){
					
					console.log('resumo dos chamados: ',resultado);

					var abertos = resultado[0].abertos;
					if(!abertos){ abertos = 0;}

					dashboardCtrl.resumoChamados.push({
						nome : 'Abertos hoje',
						classIcon : 'fa-bell-o',
						valor : abertos,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});

					var caminho = resultado[2].caminho;
					if(!caminho){ caminho = 0;}

					dashboardCtrl.resumoChamados.push({
						nome : 'Atendente a caminho',
						classIcon : 'fa-space-shuttle',
						valor : caminho,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});

					var andamento = resultado[1].andamento;
					if(!andamento){ andamento = 0;}

					dashboardCtrl.resumoChamados.push({
						nome : 'Em atendimento',
						classIcon : 'fa-wrench',
						valor : andamento,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});

					var fechados = resultado[3].fechados;
					if(!fechados){ fechados = 0;}

					dashboardCtrl.resumoChamados.push({
						nome : 'Fechados hoje',
						classIcon : 'fa-thumbs-o-up fa-custon',
						valor : fechados,
						infoUpdate : moment().format('D MMMM YYYY, hh:mm'),
					});
				}
			};

			var data = moment(new Date()).format("DD-MM-YYYY");
			dashboardService.resumoChamadosDias(dono, data, callback);
		};




		var recuperarResumoQtdChamadosAbertosDia = function(){
			
			var callback = function(dados){ 

				var rotulos = [];
		        var serieX = [];

		        for (i = 0; i < dados.length; i++) { 
		        	var dado = dados[i];
		        	
		        	rotulos.push(dado._id.dia+'/'+dado._id.mes+'/'+dado._id.ano);
		        	serieX.push(dado.total);
		        }

				var data ={
		       		labels: rotulos,
			       	datasets: [{
			            label: 'Quantidade de chamados por dia',
			            pointRadius: 10,
            			pointHitRadius: 30,
            			backgroundColor: "#FF000F",
			            borderColor: "rgba(75,192,192,1)",
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            data: serieX
			        }]
			    };


		        var myLineChart = new Chart($('#graficoChamadosAbertosPorDia'), {
				    type: 'bar',
				    data: data
				    
				});

			};

			dashboardService.resumoQtdChamdosPorDia(dono, callback);
		};


		

		var recuperarChamadosAbertos = function(){
			
			var callback = function(chamados){ 

				// verifica se tem chamado novo
				var totalChamadosTela = 0; 
				var totalChamadosCallback = 0;

				if(dashboardCtrl.chamadosAbertos) { totalChamadosTela = dashboardCtrl.chamadosAbertos.length; };
				if(chamados){  totalChamadosCallback = chamados.length;}
				
				if(totalChamadosCallback > 0 ){

					var idUltimoTela = dashboardCtrl.chamadosAbertos[(totalChamadosTela-1)];
					var idUltimoCallback = chamados[(totalChamadosCallback -1)];

					if((totalChamadosCallback != totalChamadosTela)
						|| (idUltimoTela != idUltimoCallback)){
						notify({ message: "Novo chamado aberto!", 
							classes: 'alert-success', position: 'right', duration: 5000 });
						vibrarTela();
					}
				
				}
				dashboardCtrl.chamadosAbertos = chamados;
			};

			dashboardService.listarChamadosAbertos(dono, callback);
		};


		var vibrarTela = function(){
	 		$("body").removeClass($.cookie('animations'));
	        var ani = $(this).attr('data-value');
	        $("body").addClass("animated " + ani);
	        $.cookie('animations', ani);
		};




		montarContadoresDeMediaMinutos();
		
		$timeout(function(){montarContadoresChamados()}, 100);
		$timeout(function(){recuperarChamadosAbertos()}, 200);
		$timeout(function(){recuperarResumoQtdChamadosAbertosDia()}, 400);

		$interval( function(){ montarContadoresChamados(); }, 60000);

		$interval( function(){ recuperarChamadosAbertos(); }, 60500);

	}
);
