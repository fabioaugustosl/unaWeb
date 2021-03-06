
apoioApp.controller('ApoioController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, notify, NgTableParams, empresaService, apoioService){
		
		console.log("chegou no controller de apoios");
		var apoioCtrl = this;

		$scope.$emit("tituloPagina", "Profissionais de apoio");
		var dono = $sessionStorage.dono;

		$scope.pesquisa = {};

		apoioCtrl.processando = false;

		apoioCtrl.apoios = {};

		apoioCtrl.msg = null;
		apoioCtrl.msgErro = null;

		apoioCtrl.tabelaListagem = null;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
		
		var iniciarApoio = function(){
			apoioCtrl.apoio = {};
			apoioCtrl.apoio.dono = dono;
		};


		var callbackRemover = function(){
			console.log("callback remover apoio");
			
			var indexOfItem = apoioCtrl.apoios.indexOf(apoioCtrl.apoioRemover);
	        apoioCtrl.apoios.splice(indexOfItem, 1);
	        apoioCtrl.tabelaListagem =  new NgTableParams({}, { dataset: apoioCtrl.apoios});
	        
			apoioCtrl.processando  = false;
			apoioCtrl.msg = "Apoio foi removido com sucesso";
			notificarSucesso(apoioCtrl.msg);
			apoioCtrl.msgErro = '';
			apoioCtrl.apoioRemover = null;
		};


		var callbackRemoverErro= function(resultado){
			apoioCtrl.processando  = false;
			apoioCtrl.msg = "";
			apoioCtrl.msgErro = 'Ocorreu um erro ao remover o apoio';

			notificarErro(apoioCtrl.msgErro);

			apoioCtrl.apoioRemover = null;
		};


		apoioCtrl.remover = function(ap){
			apoioCtrl.processando = true;
			apoioCtrl.apoioRemover = ap;
			apoioService.remover(ap._id, callbackRemover, callbackRemoverErro);		
		};


		apoioCtrl.editar = function(ap){
			apoioCtrl.apoio = ap;
			apoioCtrl.editando = true
		};


		apoioCtrl.cancelarEdicao = function(ap){
			iniciarApoio();
			apoioCtrl.editando = false;
		};

	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);
			
			if(!apoioCtrl.editando){
				
				for(var i = 0; i < apoioCtrl.empresas.length; i++){
        			var emp = apoioCtrl.empresas[i];
        			if(resultado.empresa == emp._id){
        				resultado.empresa = emp;
        				break;
        			}
        		} 

				apoioCtrl.apoios.push(resultado);
			}
			
			apoioCtrl.tabelaListagem =  new NgTableParams({}, { dataset: apoioCtrl.apoios});

			apoioCtrl.editando = false;

			apoioCtrl.processando  = false;
			apoioCtrl.msg = "Apoio foi salvo com sucesso";
			apoioCtrl.msgErro = '';

			notificarSucesso(apoioCtrl.msg);

			iniciarApoio();
		};


		var callbackSalvarErro= function(resultado){
			apoioCtrl.processando  = false;
			apoioCtrl.msg = "";
			apoioCtrl.msgErro = 'Ocorreu um erro ao salvar o apoio';
			notificarErro(apoioCtrl.msgErro);
		};


		apoioCtrl.salvar = function(){
			apoioCtrl.processando = true;
			apoioService.salvar(apoioCtrl.apoio, callbackSalvar, callbackSalvarErro);		
		};


		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			apoioCtrl.apoios = resultado;
			apoioCtrl.tabelaListagem =  new NgTableParams({}, { dataset: resultado});
			apoioCtrl.processando  = false;
		};
		
		apoioCtrl.getApoios = function(parametros){
			apoioCtrl.processando = true;
			apoioService.listar(parametros, callbackListar);		
		};


		var callbackListarEmpresas = function(resultado){
			apoioCtrl.empresas = resultado;
			if(apoioCtrl.empresas.length == 1){
				apoioCtrl.apoio.empresa = apoioCtrl.empresas[0]._id;
			}
		};


		apoioCtrl.getEmpresas = function(){
			console.log('APIOOOOOOSS ');
			empresaService.listarPorDono(dono, callbackListarEmpresas);		
		};


		apoioCtrl.pesquisar = function(){
				
			var p = 'dono='+dono;
			if(apoioCtrl.pesquisa && apoioCtrl.pesquisa.nome){
				p += '&nome='+apoioCtrl.pesquisa.nome;
			}
			// if(apoioCtrl.pesquisa.conta){
			// 	if(p){
			// 		p += '&';
			// 	}
			// 	p += 'info_extra3='+$scope.pesquisa.conta;
			// }

			if(p){
				p = '?'+p;
			}

			//console.log(p);
			apoioCtrl.getApoios(p);
		};


		
		iniciarApoio();

		if(!apoioCtrl.processando){
			apoioCtrl.getEmpresas('dono='+dono);
			apoioCtrl.pesquisar();
		}
		
	}
	
);