
apoioApp.controller('EmpresaController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage, $mdDialog, notify, empresaService){
		
		console.log("chegou no controller da empresa");
		var empresaCtrl = this;

		$scope.$emit("tituloPagina", "Cadastro de Unidades");
		var dono = $sessionStorage.dono;

		$scope.pesquisa = {};

		empresaCtrl.processando = false;

		empresaCtrl.msg = null;
		empresaCtrl.msgErro = null;

		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};

		
		
		var iniciarEmpresa = function(){
			
			empresaCtrl.empresa = {};
			empresaCtrl.empresa.dono = dono;

		};
		iniciarEmpresa();




		var callbackRemover = function(){
			console.log("callback remover empresa");
			
			var indexOfItem = empresaCtrl.empresas.indexOf(empresaCtrl.empresaRemover);
	        empresaCtrl.empresas.splice(indexOfItem, 1);
	        
			empresaCtrl.processando  = false;
			empresaCtrl.msg = "Unidade foi removida com sucesso";
			notificarSucesso(empresaCtrl.msg);
			empresaCtrl.msgErro = '';
			empresaCtrl.empresaRemover = null;
		};

		var callbackRemoverErro= function(resultado){
			empresaCtrl.processando  = false;
			empresaCtrl.msg = "";
			empresaCtrl.msgErro = 'Ocorreu um erro ao remover a unidade';
			notificarErro(empresaCtrl.msgErro);
			empresaCtrl.empresaRemover = null;
		};


		empresaCtrl.remover = function(emp){

			empresaCtrl.processando = true;
			empresaCtrl.empresaRemover = emp;
			empresaService.remover(emp._id, callbackRemover, callbackRemoverErro);

		};

	        	
		var callbackSalvar = function(resultado){
			console.log("call back listar", resultado);
			empresaCtrl.empresas.push(resultado);
			empresaCtrl.processando  = false;
			empresaCtrl.msg = "Unidade foi salva com sucesso";
			notificarSucesso(empresaCtrl.msg);
			empresaCtrl.msgErro = '';
			iniciarEmpresa();
		};

		var callbackSalvarErro= function(resultado){
			empresaCtrl.processando  = false;
			empresaCtrl.msg = "";
			empresaCtrl.msgErro = 'Ocorreu um erro ao salvar a Unidade';
			notificarErro(empresaCtrl.msgErro);
		};

		empresaCtrl.salvar = function(){
			console.log('chegou no salvar unidades');
			empresaCtrl.processando = true;

			// TODO : validar mesmo nome de unidades
				
			empresaService.salvar(empresaCtrl.empresa, callbackSalvar, callbackSalvarErro);		
		};




		var callbackListar = function(resultado){
			console.log("call back listar", resultado);
			empresaCtrl.empresas = resultado;
			empresaCtrl.processando  = false;
		};

		
		empresaCtrl.getEmpresas = function(parametros){
			empresaCtrl.processando = true;
				
			empresaService.listar(parametros, callbackListar);		
		};



		empresaCtrl.pesquisar = function(){
				
			var p = '?dono='+dono;
			if(empresaCtrl.pesquisa.nome){
				p += '&nome='+$scope.pesquisa.nome;
			}
			// if(empresaCtrl.pesquisa.conta){
			// 	if(p){
			// 		p += '&';
			// 	}
			// 	p += 'info_extra3='+$scope.pesquisa.conta;
			// }

			if(p){
				p = '?'+p;
			}

			console.log(p);
			empresaCtrl.getEmpresas(p);
		};


		if(!empresaCtrl.processando){
			empresaCtrl.getEmpresas();
		}
		

	}
	
);