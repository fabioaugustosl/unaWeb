
apoioApp.controller('UnidadeController', 
	function ($scope, $rootScope, $routeParams, $mdDialog, $sessionStorage, NgTableParams, notify, empresaService, unidadeService){
		
		var unidadeCtrl = this;

		$scope.$emit("tituloPagina", "Unidades para atendimento");
		var dono = $sessionStorage.dono;


		var notificarErro = function(msg){
			notify({ message: msg, classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, classes: 'alert-success', position: 'right', duration: 3000 });
		};


		unidadeCtrl.processando = false;
		unidadeCtrl.agrupamentoSelecionado = null;
		unidadeCtrl.idAgrupamentoSelecionado = null;
		unidadeCtrl.empresaSelecionada = null;

		unidadeCtrl.tabelaListagemUnidades = null;
		
		var getEmpresa = function(idEmpresa){

			//console.log('var recuperar a empresa nesta lista : ',unidadeCtrl.empresas);
			//console.log('vai buscar pelo id ',idEmpresa);
			if(unidadeCtrl.empresas){
				for (i = 0; i < unidadeCtrl.empresas.length; i++) { 
					var e = unidadeCtrl.empresas[i];
					//console.log(e);
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
				unidadeCtrl.empresaSelecionada = unidadeCtrl.empresas[0];
				console.log('Unidade selecionada: ', unidadeCtrl.empresaSelecionada);
				unidadeCtrl.getAgrupamentos(unidadeCtrl.empresaSelecionada._id);
			}
		};


		unidadeCtrl.dataURItoBlob = function(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], {type:mimeString});
        };


		unidadeCtrl.download = function(){
			var doc = new jsPDF();

			for (i = 0; i < unidadeCtrl.unidades.length; i++) { 
				let multiplicador = i==0 ? 100 : 0;
				
				if(i > 0 && i % 2 === 0){
					doc.addPage();
					multiplicador = 100;
				}
				
				var unid = unidadeCtrl.unidades[i];
				var b64Data = unid.qrcodeImg;

				var blob = unidadeCtrl.dataURItoBlob(unid.qrcodeImg);
				var blobUrl = URL.createObjectURL(blob);

				doc.text(unid.nome, 20, 40+multiplicador);
				doc.text(unid.codigo, 20, 60+multiplicador);
				doc.addImage(blobUrl, 'PNG', 100, 20+multiplicador, 100,100);
			}

			doc.save('unidadesDeAula.pdf');
		};


		unidadeCtrl.getEmpresas = function(){
			empresaService.listarPorDono(dono, callbackListarEmpresas);		
		};


		unidadeCtrl.trocarEmpresa = function(){
			unidadeCtrl.getAgrupamentos(unidadeCtrl.empresaSelecionada._id);
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
			unidadeCtrl.tabelaListagemUnidades =  new NgTableParams({}, { dataset: unidadeCtrl.unidades});
			unidadeCtrl.processando  = false;
		};

		
		unidadeCtrl.getUnidades = function(idAgrupamento){
			unidadeCtrl.processando = true;
			console.log('get unidades ',idAgrupamento);
			unidadeService.getUnidades(idAgrupamento, callbackListarUnidades);		
		};



		unidadeCtrl.selecionarAgrupamento = function(){
			unidadeCtrl.processando  = true;
			console.log('selectionar agrupamento ',unidadeCtrl.idAgrupamentoSelecionado);

			for (i = 0; i < unidadeCtrl.agrupamentos.length; i++) { 
				var ag = unidadeCtrl.agrupamentos[i];
				if(ag._id == unidadeCtrl.idAgrupamentoSelecionado){
					unidadeCtrl.agrupamentoSelecionado = ag;
					break;
				}
			}

			unidadeCtrl.getUnidades(unidadeCtrl.idAgrupamentoSelecionado);
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
				unidadeCtrl.unidadeSalvar.dono = dono;
				unidadeCtrl.unidadeSalvar.nome = null;
				unidadeCtrl.unidadeSalvar.andar = null;

				console.log('unidadeCtrl.unidadeSalvar: ',unidadeCtrl.unidadeSalvar)

				unidadeCtrl.andares =  [];
		    	console.log('qtd andares: ',unidadeCtrl.agrupamentoSelecionado);
		    	if(unidadeCtrl.agrupamentoSelecionado){
					for (i = 1; i <= unidadeCtrl.agrupamentoSelecionado.qtdAndares; i++) { 
				    	unidadeCtrl.andares.push(i);
					}
		    	}
		    }
	  	};


	  	unidadeCtrl.removerUnidade = function(unidade){
			unidadeService.removerUnidade(unidade, callbackRemoverUnidade);
	  	};

	  	var callbackRemoverUnidade  = function(idUnidade) {
			
			for(var i = 0; i < unidadeCtrl.unidades.length; i++){
    			var uni = unidadeCtrl.unidades[i];
    			if(idUnidade == uni._id){
    				unidadeExcluir = uni;
    				break;
    			}
    		} 
    		console.log('vai remover : ', uni);
			var indexOfItem = unidadeCtrl.unidades.indexOf(unidadeExcluir);
			console.log('index vai remover : ', indexOfItem);
		    unidadeCtrl.unidades.splice(indexOfItem, 1);

		    unidadeCtrl.tabelaListagemUnidades =  new NgTableParams({}, { dataset: unidadeCtrl.unidades});

			unidadeCtrl.msg = "Unidade de atendimento removida com sucesso.";
			unidadeCtrl.msgErro = '';
			notificarSucesso(unidadeCtrl.msg);
		};


	  	unidadeCtrl.salvarUnidade = function(){
	  		console.log(unidadeCtrl.unidadeSalvar);
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
			unidadeCtrl.modoSalvarUnidade = false;
		};


		var callbackSucessoSalvarUnidade  = function(unidadeSalva) {
			var msg = 'Sala salva com sucesso. ';
			unidadeCtrl.unidades.push(unidadeSalva);

			unidadeCtrl.tabelaListagemUnidades =  new NgTableParams({}, { dataset: unidadeCtrl.unidades});

			unidadeCtrl.msg = msg;
			unidadeCtrl.msgErro = '';
			notificarSucesso(unidadeCtrl.msg);

			unidadeCtrl.modoSalvarUnidade = false;

			// limpar
			unidadeCtrl.modoSalvarUnidade = null;
			cancelarSalvarUnidade();
		};


		var callbackErroSalvarUnidade  = function(msg) {
			unidadeCtrl.msg = '';
			unidadeCtrl.msgErro = msg;
			notificarErro(unidadeCtrl.msgErro);
		};

	  		

	  	/*INSERIR PREDIO - chamado aqui de agrupamento */

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
	    		var emp = unidadeCtrl.empresaSelecionada;
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
			unidadeCtrl.modoSalvarAgrup = false;
		};



		var callbackSucessoSalvarAgrup = function(agrupSalva) {
			var msg = 'Prédio foi salvo com sucesso. ';
			if(unidadeCtrl.agrupamentos){
				unidadeCtrl.agrupamentos = [];
			}
			unidadeCtrl.agrupamentos.push(agrupSalva);

			// atualizar a listagem
			unidadeCtrl.idAgrupamentoSelecionado = agrupSalva._id;
			unidadeCtrl.selecionarAgrupamento();

			unidadeCtrl.modoSalvarAgrup = false;
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