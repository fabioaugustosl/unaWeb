
apoioApp.factory('categoriaItemService', function($http, $log){
	
	//var urlPadrao = 'http://localhost:3000'; //'http://ec2-52-11-115-221.us-west-2.compute.amazonaws.com:81'
	var urlPadrao = 'http://ec2-35-160-247-116.us-west-2.compute.amazonaws.com:84';

	var urlCategoria = urlPadrao+'/api/categoria/v1/';
	var urlItem = urlPadrao+'/api/item/v1/';
	


	
	var getCategorias = function(dono, fcCallback){
		$http.get(urlCategoria+"?dono="+dono)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get categorias');
				}
			);
	};

	
	var salvarCategoria = function(categoria, fcCallback, fcError){
		console.log("Categoria novo: ", categoria);
		if(categoria._id){
			$http.patch(urlCategoria+categoria._id, categoria).
				then(
					function(data, status){
						console.log('service callback sucesso categoria', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO categoria', data);
						fcCallbackError(data.data);
					}
				);

		} else {
			$http.post(urlCategoria, categoria)
				.then(
					function(data, status, headers, config){
						fcCallback(data.data);
					},
					function(data, status, headers, config){
						console.log(data);
						fcError(data.data);
					}
				);	
		}
	};


	var removerCategoria = function(idCategoria, fcCallback){
		$http.delete(urlCategoria+idCategoria)
			.then(
				function(status){
					console.log('call back service remover categoria');
					fcCallback(idCategoria);
				}
			);	
			
	};



	/*********************************/
	/***** ITENS *********************/
	/*********************************/
	var getItemPorNome = function(nomeItem, fcCallback){
		$http.get(urlItem+"?nome="+nomeItem)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get itens');
				}
			);
	};


	var getItemPorId = function(idItem, fcCallback){
		$http.get(urlItem+idItem)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get itens');
				}
			);
	};

	
	var getItensPorDono = function(dono, fcCallback){
		$http.get(urlItem+"?dono="+dono)
			.then(
				function(data){
					console.log(data);
					fcCallback(data.data);
				},
				function(data){
					console.log('erro get itens');
				}
			);
	};

	
	var salvarItem = function(item, fcCallback, fcError){
		console.log("Item novo: ", item);
		if(item._id){
			$http.patch(urlItem+item._id, item).
				then(
					function(data, status){
						console.log('service callback sucesso item', data);
						fcCallback(data.data);
					},
					function(data){
						console.log('service callback ERRO item', data);
						fcCallbackError(data.data);
					}
				);

		} else {
			$http.post(urlItem, item)
				.then(
					function(data, status, headers, config){
						fcCallback(data.data);
					},
					function(data, status, headers, config){
						console.log(data);
						fcError(data.data);
					}
				);	
		}
	};


	var removerItem = function(idItem, fcCallback){
		$http.delete(urlItem+idItem)
			.then(
				function(status){
					console.log('call back service remover categoria');
					fcCallback(idItem);
				}
			);	
			
	};





	return {
		
		getCategorias : getCategorias,
		removerCategoria :removerCategoria,
		salvarCategoria : salvarCategoria,
		getItensPorDono : getItensPorDono,
		getItemPorId : getItemPorId,
		getItemPorNome : getItemPorNome,
		removerItem :removerItem,
		salvarItem : salvarItem

	};


});
