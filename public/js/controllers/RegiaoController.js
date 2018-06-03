
apoioApp.controller('RegiaoController', 
	function ($scope, $rootScope, $routeParams, $timeout, $mdDialog, $sessionStorage, notify,  regiaoService, unidadeService, apoioService, empresaService){
		
		var regiaoCtrl = this;

		$scope.$emit("tituloPagina", "Regiões de atendimento");
		var dono = $sessionStorage.dono;
		var idEmpresa = $sessionStorage.idEmpresa;

		regiaoCtrl.processando = false;

		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};

		
		// variaveis
		regiaoCtrl.regioes = null;
		regiaoCtrl.unidades = null;
		regiaoCtrl.apoios = null;
		regiaoCtrl.empresas = null;
		regiaoCtrl.empresaSelecionada = null;
		regiaoCtrl.idRegiaoSelecionada = null;
		regiaoCtrl.regiaoSelecionada = null;
		regiaoCtrl.apoioSelecionado = null;
		regiaoCtrl.unidadeSelecionada = null;
		regiaoCtrl.agrupamentos = null;
		regiaoCtrl.idPredioSelecionado = null;





		/* Parte da regra para controle da selecao de EMPRESAS */

		var callbackListarEmpresaPorDono = function(resultado){
			console.log('TODOS as empresas: ',resultado);
			regiaoCtrl.empresas = resultado;

			if(regiaoCtrl.empresas && regiaoCtrl.empresas.length == 1){
				regiaoCtrl.empresaSelecionada = regiaoCtrl.empresas[0];
				regiaoCtrl.idEmpresaSelecionada = regiaoCtrl.empresaSelecionada._id;

				regiaoCtrl.selecionarEmpresa();
			}

		};

		
		regiaoCtrl.getEmpresasPorDono = function(){
			empresaService.listarPorDono(dono, callbackListarEmpresaPorDono);		
		};


		regiaoCtrl.selecionarEmpresa = function(){
			var callback = function(categSalva){
				console.log(categSalva);
			};

			var callbackErro = function(msg){
				console.log(msg);
			};

			// Todo : recuperar regioes, apoios e unidades
			regiaoCtrl.recuperarRegioes(regiaoCtrl.empresaSelecionada);
			$timeout(function(){ regiaoCtrl.recuperarApoiosPorEmpresa(regiaoCtrl.empresaSelecionada); }, 200);
			$timeout(function(){ regiaoCtrl.recuperarUnidadesPorEmpresa(regiaoCtrl.empresaSelecionada); }, 400);
			
	    };



		
		/*Parte de REGIAO */

		regiaoCtrl.selecionarRegiao = function(){
			regiaoCtrl.processando  = true;

			console.log('ID regiao Seleciona',regiaoCtrl.idRegiaoSelecionada);

			//regiaoCtrl.regiaoSelecionada = regiao;
			for (var j = 0; j < regiaoCtrl.regioes.length; j++) {
				if(regiaoCtrl.idRegiaoSelecionada == regiaoCtrl.regioes[j]._id){
					regiaoCtrl.regiaoSelecionada = regiaoCtrl.regioes[j];
					break;
				} 
			}
			console.log(regiaoCtrl.regiaoSelecionada);

			// percorrer a lista de apoios e checar os que já estão marcados na regiao
			if(regiaoCtrl.apoios){	
				// limpar todos os apoios checkados
				for (var k = 0; k < regiaoCtrl.apoios.length; k++) {
					regiaoCtrl.apoios[k].checked = false;
				}

				for (var i = 0; i < regiaoCtrl.regiaoSelecionada.apoios.length; i++) {
					var apoioRegiao = regiaoCtrl.regiaoSelecionada.apoios[i];
					
					for (var k = 0; k < regiaoCtrl.apoios.length; k++) {
						if(apoioRegiao._id == regiaoCtrl.apoios[k]._id){
							regiaoCtrl.apoios[k].checked = true;
							continue;
						} 
					}
				}
				console.log('apoios: ',regiaoCtrl.apoios);
			}

			// percorrer a lista de unidade e checar os que já estão marcados na regiao
			if(regiaoCtrl.unidades){

				for (var i = 0; i < regiaoCtrl.unidades.length; i++) {
					regiaoCtrl.unidades[k].checked = false;
				}	

				for (var k = 0; k < regiaoCtrl.unidades.length; k++) {

					for (var i = 0; i < regiaoCtrl.regiaoSelecionada.unidades.length; i++) {
						var uniRegiao = regiaoCtrl.regiaoSelecionada.unidades[i];
						
						if(uniRegiao._id == regiaoCtrl.unidades[k]._id){
							regiaoCtrl.unidades[k].checked = true;
							continue;
						} 
					}	
				}
				console.log('unidades: ',regiaoCtrl.unidades);
			}

			regiaoCtrl.processando  = false;
		};


	  	var callbackListarRegioes = function(resultado){
			console.log("call back listar regioes", resultado);
			regiaoCtrl.regioes = resultado;
			if(!resultado){
				regiaoCtrl.regioes = [];
			}
			regiaoCtrl.processando  = false;
			regiaoCtrl.regiaoSelecionada = null;
		};

		
		regiaoCtrl.recuperarRegioes = function(empresa){
			regiaoCtrl.processando = true;
			console.log('idEmpresa: ',empresa._id);
				
			regiaoService.listarRegioesPorEmpresa(empresa._id, callbackListarRegioes);		
		};




		regiaoCtrl.adicionarRegiao= function() {

			if(!regiaoCtrl.empresaSelecionada){
				regiaoCtrl.msgErro = "Favor seleciona uma empresa primeiro.";
				notificarErro(regiaoCtrl.msgErro);
			} else {
				regiaoCtrl.msgErro = "";
				regiaoCtrl.regiaoSalvar = {};
				regiaoCtrl.regiaoSalvar.dono = "una";
				regiaoCtrl.regiaoSalvar.empresa = regiaoCtrl.empresaSelecionada._id;
				regiaoCtrl.regiaoSalvar.nome = "";
			}
		
	  	};


	  	regiaoCtrl.salvarRegiao = function(){
	  		console.log(regiaoCtrl.regiaoSalvar);
	  		if(!regiaoCtrl.regiaoSalvar.nome){
				regiaoCtrl.msgErro = "É necessário informar um nome para a região de atendimento";
				notificarErro(regiaoCtrl.msgErro);
	    	} else {
		    	regiaoService.salvarRegiao(regiaoCtrl.regiaoSalvar, callbackSucessoSalvarRegiao, callbackErroSalvarRegiao);
	    	}
				
		};


		regiaoCtrl.cancelarSalvarRegiao = function(){
			regiaoCtrl.msgErro = "";
			regiaoCtrl.regiaoSalvar = null;
		};


		var callbackSucessoSalvarRegiao = function(regiaoSalva) {
			var msg = 'Região de atendimento foi salva com sucesso. ';
			
			regiaoCtrl.regioes.push(regiaoSalva);

			regiaoCtrl.msg = msg;
			regiaoCtrl.msgErro = '';
			regiaoCtrl.regiaoSalvar = null;
			notificarSucesso(regiaoCtrl.msg);
		};


		var callbackErroSalvarRegiao  = function(msg) {
			regiaoCtrl.msg = '';
			regiaoCtrl.msgErro = msg;
			regiaoCtrl.regiaoSalvar = null;
			notificarErro(regiaoCtrl.msgErro);
		};



		/* parte APOIO*/

		var callbackListarApoioPorEmpresa = function(resultado){
			console.log('TODOS os apoios da empresa: ',resultado);
			regiaoCtrl.apoios = resultado;
		};

		
		regiaoCtrl.recuperarApoiosPorEmpresa = function(empresa){
			apoioService.listarPorEmpresa(empresa._id, callbackListarApoioPorEmpresa);		
		};



		regiaoCtrl.atualizarApoioSelecionada = function(apoio){
			var adicionada = true;

			var callback = function(apoioSalva){
				console.log('call back ',apoio);
				console.log('call back ',apoioSalva);
				if(adicionada){
					notificarSucesso(apoio.nome+" habilitado para atender a região "+regiaoCtrl.regiaoSelecionada.nome+".");
				} else {
					notificarSucesso("Apoio removido com sucesso.");
				}
			};

			var callbackErro = function(msg){
				console.log(msg);
				notificarErro(msg);
			};

			if(regiaoCtrl.regiaoSelecionada) {
		        if(apoio.checked){
		        	var existe = verificarApoioJaExisteParaEssaRegiao(apoio);
		        	if(!existe){
						regiaoCtrl.regiaoSelecionada.apoios.push(apoio._id);
		        	}
	        	
		        }else{
		        	adicionada = false;
		        	var indexOfItem = regiaoCtrl.regiaoSelecionada.apoios.indexOf(apoio._id);
		        	regiaoCtrl.regiaoSelecionada.apoios.splice(indexOfItem, 1);
		        }
		        regiaoService.salvarRegiao(regiaoCtrl.regiaoSelecionada, callback, callbackErro);
		    }
	    };


 		var verificarApoioJaExisteParaEssaRegiao = function(apoio){
	    	var jaExiste = false;
        	if(regiaoCtrl.regiaoSelecionada.apoios){

        		for(var i = 0; i < regiaoCtrl.regiaoSelecionada.apoios.length; i++){
        			var ap = regiaoCtrl.regiaoSelecionada.apoios[i];
        			if(ap._id == apoio._id){
        				jaExiste = false;
        				break;
        			}
        		}
        	}
        	return jaExiste;
	    }


		/* parte UNIDADES*/

		
		var callbackListarUnidadesPorEmpresa = function(resultado){
			console.log('TODOS os agrupamentos da empresa: ',resultado);
			regiaoCtrl.agrupamentos = resultado;
			if(regiaoCtrl.agrupamentos && regiaoCtrl.agrupamentos.length > 0){
				regiaoCtrl.idPredioSelecionado = regiaoCtrl.agrupamentos[0]._id;
			}

			var callbackListarUnidadesPorAgrupemento = function(resUnidades){
				console.log('TODOS as unidades da empresa: ',resUnidades);
				for(var k = 0; k<resUnidades.length; k++){
					var u = resUnidades[k];
					u.agrupamento = agrupamento;
					regiaoCtrl.unidades.push(u);
				}
				recuperarUnidadesDoProxAgrupamento();

			};

			var i = 0;
			var agrupamento = null;

			var recuperarUnidadesDoProxAgrupamento = function(){
				//vou tentar fazer uma parada recursiva ai
				if(i < resultado.length){
					agrupamento = resultado[i++];
					unidadeService.getUnidades(agrupamento._id, callbackListarUnidadesPorAgrupemento);			
				}
			};
			
			recuperarUnidadesDoProxAgrupamento();	

		};

		
		regiaoCtrl.recuperarUnidadesPorEmpresa = function(empresa){
			regiaoCtrl.unidades = [];
			unidadeService.recuperarAgrupamentosPorEmpresa(empresa._id, callbackListarUnidadesPorEmpresa);		
		};



		regiaoCtrl.atualizarUnidadeSelecionada = function(unidade){
			var adicionada = true;
			var callback = function(unidadeSalva){
				console.log('Unidade salva : ',unidadeSalva);
				if(adicionada){
					notificarSucesso(unidade.nome+" adicionado(a) a região "+regiaoCtrl.regiaoSelecionada.nome+".");
				} else {
					notificarSucesso("Unidade removida com sucesso.");
				}
			};

			var callbackErro = function(msg){
				console.log(msg);
				notificarErro(msg);
			};

			if(regiaoCtrl.regiaoSelecionada) {
		        if(unidade.checked){
		        	var existe = verificarUnidadeJaExisteParaEssaRegiao(unidade);
		        	console.log('existe : ',existe);
		        	if(!existe){
						regiaoCtrl.regiaoSelecionada.unidades.push(unidade._id);
		        	}

		        }else{
		        	adicionada = false;
		        	var indexOfItem = regiaoCtrl.regiaoSelecionada.unidades.indexOf(unidade._id);
		        	regiaoCtrl.regiaoSelecionada.unidades.splice(indexOfItem, 1);
		        }
		        console.log(' regiao selecionada ',regiaoCtrl.regiaoSelecionada);
		        regiaoService.salvarRegiao(regiaoCtrl.regiaoSelecionada, callback, callbackErro);
		    }
	    };


 		var verificarUnidadeJaExisteParaEssaRegiao = function(unidade){
	    	var jaExiste = false;
        	if(regiaoCtrl.regiaoSelecionada.unidades){

        		for(var i = 0; i < regiaoCtrl.regiaoSelecionada.unidades.length; i++){
        			var un = regiaoCtrl.regiaoSelecionada.unidades[i];
        			if(un._id == unidade._id){
        				jaExiste = false;
        				break;
        			}
        		}
        	}
        	return jaExiste;
	    }
		
	  


	  	/*INIT*/
		if(!regiaoCtrl.processando){
			regiaoCtrl.getEmpresasPorDono();
		}
	}
	
);