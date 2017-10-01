
apoioApp.controller('UnidadeController', 
	function ($scope, $rootScope, $routeParams, $mdDialog, $sessionStorage, notify, empresaService, unidadeService){
		
		var unidadeCtrl = this;

		$scope.$emit("tituloPagina", "Unidades");
		var dono = $sessionStorage.dono;


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};


		unidadeCtrl.processando = false;
		unidadeCtrl.agrupamentoSelecionado = null;
		unidadeCtrl.empresaSelecionada = null;

		
		var getEmpresa = function(idEmpresa){

			console.log('var recuperar a empresa nesta lista : ',unidadeCtrl.empresas);
			console.log('vai buscar pelo id ',idEmpresa);
			if(unidadeCtrl.empresas){
				for (i = 0; i < unidadeCtrl.empresas.length; i++) { 
					var e = unidadeCtrl.empresas[i];
					console.log(e);
					if(e._id == idEmpresa){
						return e;
					}
				}
			}
			return null;
		};


		var callbackListarEmpresas = function(resultado){
			unidadeCtrl.empresas = resultado;
			if(unidadeCtrl.empresas){
				unidadeCtrl.empresaSelecionada = unidadeCtrl.empresas[0]._id;

				unidadeCtrl.getAgrupamentos(unidadeCtrl.empresaSelecionada);
			}
		};

		unidadeCtrl.getEmpresas = function(){
			empresaService.listarPorDono(dono, callbackListarEmpresas);		
		};

		unidadeCtrl.trocarEmpresa = function(){
			unidadeCtrl.getAgrupamentos(unidadeCtrl.empresaSelecionada);
		};
		



		var callbackListarAgrupamentos = function(resultado){
			console.log("call back listar", resultado);
			unidadeCtrl.agrupamentos = resultado;
			unidadeCtrl.processando  = false;
			unidadeCtrl.idAgrupamentoSelecionado = null;
		};

		
		unidadeCtrl.getAgrupamentos = function(idEmpresa){
			unidadeCtrl.processando = true;
				
			unidadeService.recuperarAgrupamentosPorEmpresa(idEmpresa, callbackListarAgrupamentos);		
		};



		var callbackListarUnidades = function(resultado){
			console.log("call back listar", resultado);
			unidadeCtrl.unidades = resultado;
			unidadeCtrl.processando  = false;
		};

		
		unidadeCtrl.getUnidades = function(idAgrupamento){
			unidadeCtrl.processando = true;
			unidadeService.getUnidades(idAgrupamento, callbackListarUnidades);		
		};



		unidadeCtrl.selectionarAgrupamento = function(agrupamento){
			unidadeCtrl.processando  = true;
			unidadeCtrl.agrupamentoSelecionado = agrupamento;
			unidadeCtrl.getUnidades(agrupamento._id);
		};



		/*INSERIR UNIDADE */
		unidadeCtrl.adicionarUnidade = function() {
			if(!unidadeCtrl.agrupamentoSelecionado){
				unidadeCtrl.msgErro = "É necessário um prédio";
				notificarErro(unidadeCtrl.msgErro);
	    	} else {

				unidadeCtrl.msgErro = "";
				console.log('unidade selecionado: ',unidadeCtrl.agrupamentoSelecionado);
				unidadeCtrl.modoSalvarUnidade = true;
				unidadeCtrl.unidadeSalvar = {};
				unidadeCtrl.unidadeSalvar.dono = "una";
				unidadeCtrl.unidadeSalvar.nome = null;
				unidadeCtrl.unidadeSalvar.andar = null;

				unidadeCtrl.andares =  [];
		    	console.log('qtd andares: ',unidadeCtrl.agrupamentoSelecionado);
		    	if(unidadeCtrl.agrupamentoSelecionado){
					for (i = 1; i <= unidadeCtrl.agrupamentoSelecionado.qtdAndares; i++) { 
				    	unidadeCtrl.andares.push(i);
					}
		    	}
		    }

			
	  	};


	  	unidadeCtrl.salvarUnidade = function(){
	  		console.log(unidadeCtrl.unidadeSalvar.nome);
	  		if(!unidadeCtrl.unidadeSalvar.nome){
				unidadeCtrl.msgErro = "É necessário informar o nome da sala";
				notificarErro(unidadeCtrl.msgErro);
	    	} else {
		    	unidadeCtrl.unidadeSalvar.idAgrupamento = unidadeCtrl.agrupamentoSelecionado._id;

				unidadeService.salvarUnidade(unidadeCtrl.unidadeSalvar, callbackSucessoSalvarUnidade, callbackErroSalvarUnidade);
	    	}

				
		};

		unidadeCtrl.cancelarSalvarUnidade = function(){
			
	  		unidadeCtrl.msgErro = "";
			unidadeCtrl.modoSalvarUnidade = null;
			unidadeCtrl.unidadeSalvar = {};
		};



		var callbackSucessoSalvarUnidade  = function(unidadeSalva) {
			var msg = 'Sala salva com sucesso. ';
			unidadeCtrl.unidades.push(unidadeSalva);

			unidadeCtrl.msg = msg;
			unidadeCtrl.msgErro = '';
			notificarSucesso(unidadeCtrl.msg);

			// limpar
			unidadeCtrl.modoSalvarUnidade = null;
			cancelarSalvarUnidade();
		};


		var callbackErroSalvarUnidade  = function(msg) {
			unidadeCtrl.msg = '';
			unidadeCtrl.msgErro = msg;
			notificarErro(unidadeCtrl.msgErro);
		};



	  		



	  	/*INSERIR PREDIO */


		unidadeCtrl.adicionarAgrupamento = function() {

			unidadeCtrl.msgErro = "";
			
			unidadeCtrl.modoSalvarAgrup = true;
			unidadeCtrl.agrupSalvar = {};
			unidadeCtrl.agrupSalvar.dono = dono;
			unidadeCtrl.agrupSalvar.idEmpresa = null;
			unidadeCtrl.agrupSalvar.nomeEmpresa = null;
			unidadeCtrl.agrupSalvar.nome = null;
			unidadeCtrl.agrupSalvar.qtdAndares = 1;
		
	  	};


	  	unidadeCtrl.salvarAgrupamento = function(){
	  		console.log(unidadeCtrl.agrupSalvar.nome);
	  		
	  		if(!unidadeCtrl.agrupSalvar.nome){
				unidadeCtrl.msgErro = "É necessário informar o nome do prédio";
				notificarErro(unidadeCtrl.msgErro);
	    	}else if(!unidadeCtrl.empresaSelecionada){
	    		unidadeCtrl.msgErro = "É necessário informar a empresa";
				notificarErro(unidadeCtrl.msgErro);
	    	} else {
	    		var emp = getEmpresa(unidadeCtrl.empresaSelecionada);
	    		console.log(emp);
	    		unidadeCtrl.agrupSalvar.idEmpresa = unidadeCtrl.empresaSelecionada;
				unidadeCtrl.agrupSalvar.nomeEmpresa = emp.nomeEmpresa;

		    	unidadeService.salvarAgrupamento(unidadeCtrl.agrupSalvar, callbackSucessoSalvarAgrup, callbackErroSalvarAgrup);
	    	}

				
		};

		unidadeCtrl.cancelarSalvarAgrup = function(){
			
	  		unidadeCtrl.msgErro = "";
			unidadeCtrl.modoSalvarAgrup = null;
			unidadeCtrl.agrupSalvar = {};
		};



		var callbackSucessoSalvarAgrup = function(agrupSalva) {
			var msg = 'Prédio foi salvo com sucesso. ';
			if(unidadeCtrl.agrupamentos){
				unidadeCtrl.agrupamentos = [];
			}
			unidadeCtrl.agrupamentos.push(agrupSalva);

			unidadeCtrl.msg = msg;
			unidadeCtrl.msgErro = '';
			notificarSucesso(unidadeCtrl.msg);
		};


		var callbackErroSalvarAgrup  = function(msg) {
			unidadeCtrl.msg = '';
			unidadeCtrl.msgErro = msg;
			notificarErro(unidadeCtrl.msgErro);
		};




	  	/*INIT*/
		if(!unidadeCtrl.processando){
			unidadeCtrl.getEmpresas();
		}
		

	}
	
);