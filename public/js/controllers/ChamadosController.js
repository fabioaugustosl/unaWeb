
apoioApp.controller('ChamadosController', 
	function ($scope, $rootScope, $routeParams, $mdDialog,$uibModal, $sessionStorage, NgTableParams, notify, chamadoService, empresaService){
		
		var chamadoCtrl = this;

		$scope.$emit("tituloPagina", "Chamados");
		var dono = $sessionStorage.dono;
		var idEmpresa = $sessionStorage.idEmpresa;


		chamadoCtrl.processando = false;

		chamadoCtrl.categoriaSelecionado = null;

		//chamadoCtrl.itens = null;
		chamadoCtrl.itemSelecionadoParaInserir = null;

		// fitros
		chamadoCtrl.empresaFiltro = idEmpresa;

		chamadoCtrl.empresas = null;
		chamadoCtrl.tabelaListagem = null;


		/* Recupera as empresas para exibição no combo do filtro */
		chamadoCtrl.recuperarEmpresasFiltro = function(){

			var fn = function(resultado){
				chamadoCtrl.empresas = resultado;
			};

			empresaService.listarPorDono(dono,  fn);
		};



		var callbackListarEmpresaPorDono = function(resultado){
			console.log('TODOS as empresas: ',resultado);
			chamadoCtrl.empresas = resultado;
		};

		
		chamadoCtrl.getEmpresasPorDono = function(){
			empresaService.listarPorDono(dono, callbackListarEmpresaPorDono);		
		};


		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};


		


		chamadoCtrl.atualizarEmpresaSelecionada = function(empresa){
			
			/*var callback = function(categSalva){
				console.log(categSalva);
			};

			var callbackErro = function(msg){
				console.log(msg);
			};

			if(chamadoCtrl.categoriaSelecionado) {
		        if(empresa.checked){
		        	chamadoCtrl.categoriaSelecionado.empresas.push(empresa._id);
		            
		        }else{
		        	var indexOfItem = chamadoCtrl.categoriaSelecionado.empresas.indexOf(empresa._id);

		        	chamadoCtrl.categoriaSelecionado.empresas.splice(indexOfItem, 1);
		        }
		        categoriaItemService.salvarCategoria(chamadoCtrl.categoriaSelecionado, callback,callbackErro);
		    }*/

	    };

  	

		chamadoCtrl.selecionarChamado = function(chamado){
			chamadoCtrl.processando  = true;
			chamadoCtrl.chamadoSelecionado = chamado;
			chamadoCtrl.processando  = false;
			$scope.open();
		};



	  	var callbackListarChamados = function(resultado){
			console.log("call back listar", resultado);
			chamadoCtrl.chamados = resultado;
			chamadoCtrl.tabelaListagem =  new NgTableParams({}, { dataset: chamadoCtrl.chamados});
			chamadoCtrl.processando  = false;
			chamadoCtrl.chamadoSelecionado = null;
		};

		
		chamadoCtrl.listarChamados = function(){
			chamadoCtrl.processando = true;
			
			var parametro = "dono="+dono;
			if(chamadoCtrl.empresaFiltro){
				parametro += "&idEmpresa="+chamadoCtrl.empresaFiltro;
			}
			chamadoService.listar(parametro, callbackListarChamados);		
		};



	  	/*INIT*/
		if(!chamadoCtrl.processando){
			chamadoCtrl.listarChamados();
			chamadoCtrl.recuperarEmpresasFiltro();
		}



		

		$scope.open = function (size) {

		    var modalInstance = $uibModal.open({
		     animation: true,
		      templateUrl: '/view/dialogs/chamado.tmpl.html',
		      controller: 'DialogController',
		      size: 'lg',
		      appendTo : angular.element(document.querySelector('#teste')),
		      resolve: {
		        dataToPass: function () {
		          return chamadoCtrl.chamadoSelecionado;
		        }
		      }
		    });

		    modalInstance.result.then(function () {
		      	// Tive que fazer essa gambiarra pra sumir com uma div q ficava na frente da tela 
		       angular.element(document.querySelector('.modal')).css( "zIndex", -2);
		       angular.element(document.querySelector('.modal-backdrop')).css( "zIndex", -2);
		      

		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		  };


	}
	
);


apoioApp.controller('DialogController', function ($scope, $uibModalInstance, dataToPass) {

  $scope.chamadoSelecionado = dataToPass;

  $scope.ok = function () {
  	$scope.chamadoSelecionado = null
    $uibModalInstance.close();
  };

  
});