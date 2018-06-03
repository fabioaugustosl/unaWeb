
apoioApp.controller('SolicitanteAutorizadoController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, notify, autorizadoService){
		
		console.log("chegou no controller de solicitantes autorizados");
		var autorizadoCtrl = this;

		$scope.$emit("tituloPagina", "Pessoas autorizadas a abrir chamado");
		var dono = $sessionStorage.dono;

		$scope.pesquisa = {};

		autorizadoCtrl.processando = false;

		autorizadoCtrl.autorizados = {};

		autorizadoCtrl.msg = null;
		autorizadoCtrl.msgErro = null;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		
		
		var iniciarCadastro = function(){
			autorizadoCtrl.autorizado = {};
			autorizadoCtrl.autorizado.dono = dono;
		};

		
		var callbackRemover = function(){
			console.log("callback remover autorizado");
			
			var indexOfItem = autorizadoCtrl.autorizados.indexOf(autorizadoCtrl.autorizadoRemover);
	        autorizadoCtrl.autorizados.splice(indexOfItem, 1);
	        
			autorizadoCtrl.processando  = false;
			autorizadoCtrl.msg = "Autorização foi removida com sucesso";
			notificarSucesso(autorizadoCtrl.msg);
			autorizadoCtrl.msgErro = '';
			autorizadoCtrl.autorizadoRemover = null;
		};

		var callbackRemoverErro= function(resultado){
			autorizadoCtrl.processando  = false;
			autorizadoCtrl.msg = "";
			autorizadoCtrl.msgErro = 'Ocorreu um erro ao remover a autorização';

			notificarErro(autorizadoCtrl.msgErro);

			autorizadoCtrl.autorizadoRemover = null;
		};

		autorizadoCtrl.remover = function(ap){
			autorizadoCtrl.processando = true;
			autorizadoCtrl.autorizadoRemover = ap;
			autorizadoService.remover(ap._id, callbackRemover, callbackRemoverErro);		
		};


		autorizadoCtrl.editar = function(ap){
			autorizadoCtrl.autorizado = ap;
			autorizadoCtrl.editando = true
		};


		autorizadoCtrl.cancelarEdicao = function(ap){
			iniciarCadastro();
			autorizadoCtrl.editando = false;
		};

	        	
		var callbackSalvar = function(resultado){
			console.log("call back salvar", resultado);
			
			if(!autorizadoCtrl.editando){
				autorizadoCtrl.autorizados.push(resultado);
			}
			autorizadoCtrl.editando = false;

			autorizadoCtrl.processando  = false;
			autorizadoCtrl.msg = "Autorização de foi salva com sucesso";
			autorizadoCtrl.msgErro = '';

			notificarSucesso(autorizadoCtrl.msg);

			iniciarCadastro();
		};

		var callbackSalvarErro= function(resultado){
			autorizadoCtrl.processando  = false;
			autorizadoCtrl.msg = "";
			autorizadoCtrl.msgErro = 'Ocorreu um erro ao salvar a autorização.';
			notificarErro(autorizadoCtrl.msgErro);
		};

		autorizadoCtrl.salvar = function(){
			autorizadoCtrl.processando = true;				
			autorizadoService.salvar(autorizadoCtrl.autorizado, callbackSalvar, callbackSalvarErro);		
		};




		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			autorizadoCtrl.autorizados = resultado;
			autorizadoCtrl.processando  = false;
		};
		
		autorizadoCtrl.getListaAutorizados = function(parametros){
			autorizadoCtrl.processando = true;		
			autorizadoService.listar(parametros, callbackListar);		
		};


		autorizadoCtrl.pesquisar = function(){
				
			var p = 'dono='+dono;
			if(autorizadoCtrl.pesquisa && autorizadoCtrl.pesquisa.nome){
				p += '&nome='+autorizadoCtrl.pesquisa.nome;
			}

			if(p){
				p = '?'+p;
			}

			//console.log(p);
			autorizadoCtrl.getListaAutorizados(p);
		};


		iniciarCadastro();

		if(!autorizadoCtrl.processando){
			autorizadoCtrl.pesquisar();
		}
		

	}
	
);