
apoioApp.controller('CategoriaItemController', 
	function ($scope, $rootScope, $routeParams, $mdDialog, $sessionStorage,notify,categoriaItemService,empresaService){
		
		var categoriaCtrl = this;

		$scope.$emit("tituloPagina", "Categorias de atendimento");
		var dono = $sessionStorage.dono;
		var idEmpresa = $sessionStorage.idEmpresa;


		categoriaCtrl.processando = false;

		categoriaCtrl.categoriaSelecionado = null;

		categoriaCtrl.itemSelecionadoParaInserir = null;
		categoriaCtrl.empresas = null;

		// esse variavel eh apenas para agora quando existe apenas 1 unidade...
		categoriaCtrl.empresaSelecionada = null;



		var notificarErro = function(msg){
			notify({ message: msg, classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, classes: 'alert-success', position: 'right', duration: 3000 });
		};




		var callbackListarEmpresaPorDono = function(resultado){
			console.log('TODOS as empresas: ',resultado);
			categoriaCtrl.empresas = resultado;
			if(categoriaCtrl.empresas && categoriaCtrl.empresas.length == 1){
				categoriaCtrl.empresaSelecionada = categoriaCtrl.empresas[0];
			}
		};

		categoriaCtrl.getEmpresasPorDono = function(){
			empresaService.listarPorDono(dono, callbackListarEmpresaPorDono);		
		};



		/* parte ITENS */

		var callbackListarItens = function(resultado){
			console.log("call back listar", resultado);
			categoriaCtrl.itensCateg = resultado;
			categoriaCtrl.processando  = false;
		};

		
		categoriaCtrl.getItens = function(idItem){
			categoriaCtrl.processando = true;
			categoriaItemService.getItens(idItem, callbackListarItens);		
		};


		var callbackListarItensPorDono = function(resultado){
			console.log('TODOS os itens: ',resultado);
			categoriaCtrl.iten = resultado;
		};

		
		categoriaCtrl.getItensPorDono = function(){
			categoriaItemService.getItensPorDono(dono, callbackListarItensPorDono);		
		};

	
		categoriaCtrl.adicionarItem = function() {
			if(!categoriaCtrl.categoriaSelecionado){
				categoriaCtrl.msgErro = "É necessário selecionar uma categoria";
				notificarErro("É necessário selecionar uma categoria");
	    	} else {
				categoriaCtrl.msgErro = "";
				//console.log('categ selecionado: ',categoriaCtrl.categoriaSelecionado);
				categoriaCtrl.modoSalvarItem = true;
				categoriaCtrl.itemSalvar = {};
				categoriaCtrl.itemSalvar.dono = dono;
				categoriaCtrl.itemSalvar.nome = null;
		    }
			
	  	};


	  	categoriaCtrl.salvarItem = function(){
	  		console.log(categoriaCtrl.itemSalvar.nome);

	  		if(!categoriaCtrl.itemSalvar.nome){
				categoriaCtrl.msgErro = "É necessário informar o nome do item";
	    	} else {
	    		
		    	// passos: tenta salva na tabela de itens. se salvar ok. joga na tabela de categ e salva de novo
		    	// se não salvar tenta recuperar pelo nome, se recuperar joga na tabela de categ.. se nao da erro fatal
				categoriaItemService.salvarItem(categoriaCtrl.itemSalvar, callbackSucessoSalvarItem, callbackErroSalvarItem);
	    	}
				
		};


		categoriaCtrl.cancelarSalvarItem = function(){
	  		categoriaCtrl.msgErro = "";
			categoriaCtrl.modoSalvarItem = null;
			categoriaCtrl.itemSalvar = {};
			categoriaCtrl.modoSalvarItem = false;
		};


		var callbackSucessoSalvarItem  = function(itemSalvo) {
			var callbackSucessoSalvarItemNaCateg = function(){
				var msg = 'Item salvo com sucesso. ';
				categoriaCtrl.msg = msg;
				categoriaCtrl.msgErro = '';
				notificarSucesso(msg);
				categoriaCtrl.itemSalvar = {};
				categoriaCtrl.modoSalvarItem = false;

				// como para salvar inserimos apenas o _id na lista. Agora vamos retirar esse id e colocar o objeto na lista, isso para que a exibição fique bacana.
				var indexOfItem = categoriaCtrl.categoriaSelecionado.itens.indexOf(itemSalvo._id);
	        	categoriaCtrl.categoriaSelecionado.itens.splice(indexOfItem, 1);
	        	categoriaCtrl.categoriaSelecionado.itens.push(itemSalvo);
			};
			
			var callbackNovoErro = function(){
				console.log("fudeu erri ai salvar item");
			};


			categoriaCtrl.categoriaSelecionado.itens.push(itemSalvo._id);
    		categoriaItemService.salvarCategoria(categoriaCtrl.categoriaSelecionado, callbackSucessoSalvarItemNaCateg,callbackNovoErro);
		};


		var callbackErroSalvarItem  = function(msg) {
			var callbackRecuperarItemPorNome = function(item){
	  			if(item){
					callbackSalvarItem(item._id);
	  			} else {
		  			categoriaCtrl.msg = '';
					categoriaCtrl.msgErro = "Ocorreu um erro grave e não foi possível salvar o novo item";
					notificarErro("Ocorreu um erro grave e não foi possível salvar o novo item");
	  			}
	  		};

			categoriaItemService.getItemPorNome(categoriaCtrl.itemSalvar.nome, callbackRecuperarItemPorNome);
		};



		categoriaCtrl.atualizarEmpresaSelecionada = function(empresa){
			var adicionada = true;

			var callback = function(categSalva){
				console.log(categSalva);
				if(adicionada){
					notificarSucesso("Empresa adicionada com sucesso.");
				} else {
					notificarSucesso("Empresa removida com sucesso.");
				}
				
			};

			var callbackErro = function(msg){
				console.log(msg);
				notificarErro(msg);
			};

			if(categoriaCtrl.categoriaSelecionado) {
		        if(empresa.checked){
		        	var existe = verificarEmpresaJaExisteParaEssaCategoria(empresa);
		        	if(!existe){
						categoriaCtrl.categoriaSelecionado.empresas.push(empresa._id);
		        	}
		        }else{
		        	adicionada = false;
		        	var indexOfItem = categoriaCtrl.categoriaSelecionado.empresas.indexOf(empresa._id);

		        	categoriaCtrl.categoriaSelecionado.empresas.splice(indexOfItem, 1);
		        }
		        categoriaItemService.salvarCategoria(categoriaCtrl.categoriaSelecionado, callback,callbackErro);
		    }
	    };


	    var verificarEmpresaJaExisteParaEssaCategoria = function(empresa){
	    	var jaExiste = false;
        	if(categoriaCtrl.categoriaSelecionado.empresas){

        		for(var i = 0; i < categoriaCtrl.categoriaSelecionado.empresas.length; i++){
        			var emp = categoriaCtrl.categoriaSelecionado.empresas[i];
        			if(emp._id == empresa._id){
        				jaExiste = false;
        				break;
        			}
        		}
        	}
        	return jaExiste;
	    }


		categoriaCtrl.removerItem = function(item){
			
			var callback = function(item){
				categoriaCtrl.msg = "O item foi removido com sucesso.";
				categoriaCtrl.msgErro = '';
				notificarSucesso("O item foi removido com sucesso.");
			};

			var callbackErro = function(msg){
				categoriaCtrl.msg = "";
				categoriaCtrl.msgErro = 'Ocorreu um erro ao remover o item.';
				notificarErro('Ocorreu um erro ao remover o item.');
			};

			if(categoriaCtrl.categoriaSelecionado) {
		        var indexOfItem = categoriaCtrl.categoriaSelecionado.itens.indexOf(item._id);
	        	categoriaCtrl.categoriaSelecionado.itens.splice(indexOfItem, 1);

		        categoriaItemService.salvarCategoria(categoriaCtrl.categoriaSelecionado, callback,callbackErro);
		    }
	    };

	  	

	  	/*Parte de  CATEGORIA */

		categoriaCtrl.removerCategoria = function(idCateg){
			
			var callback = function(idCategoria){
				for(var i = 0; i < categoriaCtrl.categorias.length; i++){
	    			var uni = categoriaCtrl.categorias[i];
	    			if(idCategoria == uni._id){
	    				categExcluir = uni;
	    				break;
	    			}
	    		} 
	    		var indexOfItem = categoriaCtrl.categorias.indexOf(categExcluir);
	        	categoriaCtrl.categorias.splice(indexOfItem, 1);

				categoriaCtrl.msg = "A categoria foi removida com sucesso.";
				categoriaCtrl.msgErro = '';
				notificarSucesso(categoriaCtrl.msg);

			};

			var callbackErro = function(msg){
				categoriaCtrl.msg = "";
				categoriaCtrl.msgErro = 'Ocorreu um erro ao remover a categoria.';
				notificarErro(categoriaCtrl.msgErro);
			};

		   

		    categoriaItemService.removerCategoria(idCateg, callback, callbackErro);
		    
	    };


		categoriaCtrl.selectionarCategoria = function(categoria){
			categoriaCtrl.processando  = true;
			categoriaCtrl.categoriaSelecionado = categoria;
			categoriaCtrl.itensCateg = categoria.itens;
			//categoriaCtrl.getItens(categoria._id);

			for (var k = 0; k < categoriaCtrl.empresas.length; k++) {
				categoriaCtrl.empresas[k].checked = false;
			}

			for (var i = 0; i < categoria.empresas.length; i++) {
				var empCateg = categoria.empresas[i];
				
				for (var k = 0; k < categoriaCtrl.empresas.length; k++) {
					if(empCateg == categoriaCtrl.empresas[k]._id){
						categoriaCtrl.empresas[k].checked = true;
					} 
					//else {
				//		categoriaCtrl.empresas[k].checked = false;
				//	}
				}
			}

			categoriaCtrl.processando  = false;
		};


	  	var callbackListarCategorias = function(resultado){
			console.log("call back listar", resultado);
			categoriaCtrl.categorias = resultado;
			categoriaCtrl.processando  = false;
			categoriaCtrl.categoriaSelecionado = null;
		};

		
		categoriaCtrl.getCategorias = function(){
			categoriaCtrl.processando = true;
				
			categoriaItemService.getCategorias(dono, callbackListarCategorias);		
		};




		categoriaCtrl.adicionarCategoria= function() {
			categoriaCtrl.msgErro = "";
			
			categoriaCtrl.modoSalvarCateg = true;
			categoriaCtrl.categSalvar = {};
			categoriaCtrl.categSalvar.dono = "una";
			categoriaCtrl.categSalvar.empresas = [idEmpresa];
			categoriaCtrl.categSalvar.nome = "";
	  	};


	  	categoriaCtrl.salvarCategoria = function(){
	  		console.log(categoriaCtrl.categSalvar.nome);
	  		if(!categoriaCtrl.categSalvar.nome){
				categoriaCtrl.msgErro = "É necessário informar o nome da categoria";
				notificarErro("É necessário informar o nome da categoria");
	    	} else {
	    		// se tiver apenas uma empresa / unidade ela ja eh setada como default daquela categoria
	    		if(categoriaCtrl.empresaSelecionada ){
					categoriaCtrl.categSalvar.empresas= [];
					categoriaCtrl.categSalvar.empresas.push(categoriaCtrl.empresaSelecionada._id);
				}
				
		    	categoriaItemService.salvarCategoria(categoriaCtrl.categSalvar, callbackSucessoSalvarCateg, callbackErroSalvarCateg);
	    	}
				
		};


		categoriaCtrl.cancelarSalvarCateg = function(){
			categoriaCtrl.msgErro = "";
			categoriaCtrl.categSalvar = {};
			categoriaCtrl.modoSalvarCateg = false;
		};



		var callbackSucessoSalvarCateg = function(categSalva) {
			var msg = 'Categoria foi salva com sucesso. ';
			//if(categoriaCtrl.catogorias){
			//	categoriaCtrl.catogorias = [];
			//}
			//categoriaCtrl.catogorias.push(categSalva);
			categoriaCtrl.getCategorias(); 
			categoriaCtrl.modoSalvarCateg = false;

			categoriaCtrl.msg = msg;
			categoriaCtrl.msgErro = '';
			notificarSucesso(msg);
		};


		var callbackErroSalvarCateg  = function(msg) {
			categoriaCtrl.msg = '';
			categoriaCtrl.msgErro = msg;
			notificarErro(msg);
		};




	  	/*INIT*/
		if(!categoriaCtrl.processando){
			categoriaCtrl.getCategorias();
			categoriaCtrl.getEmpresasPorDono();
		}
	}
	
);