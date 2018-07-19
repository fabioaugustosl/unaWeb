
var apoioApp = angular.module('apoioApp', ['ngRoute', 'ngStorage', 'ngMaterial', 'cgNotify','angular-md5', 'angularMoment', 'ngMask'])
		.config(function($routeProvider, $locationProvider, $logProvider, $qProvider, $compileProvider) {
			$routeProvider.when('/index', {templateUrl:'/view/user.html', controller: 'PrincipalController'})
						  .when('/dashboard', {templateUrl:'/view/dashboard.html', controller: 'DashboardController'})
						  .when('/apoio', {templateUrl:'/view/apoio.html', controller: 'ApoioController'})
						  .when('/categoria', {templateUrl:'/view/categoria.html', controller: 'CategoriaItemController'})
						  .when('/empresa', {templateUrl:'/view/empresa.html', controller: 'EmpresaController'})
						  .when('/regiao', {templateUrl:'/view/regiao.html', controller: 'RegiaoController'})
						  .when('/unidade', {templateUrl:'/view/unidade.html', controller: 'UnidadeController'})
						  .when('/grafico', {templateUrl:'/view/grafico.html', controller: 'GraficoController'})
						  .when('/autorizado', {templateUrl:'/view/autorizado.html', controller: 'SolicitanteAutorizadoController'})
						  .when('/chamados', {templateUrl:'/view/chamados.html', controller: 'ChamadosController'})
						  .when('/grafico', {templateUrl:'/view/graficos.html', controller: 'GraficoController'})
						  .when('/relatorios', {templateUrl:'/view/relatorio.html', controller: 'RelatorioController'})
						  .otherwise({redirectTo:'/index'});


			$locationProvider.html5Mode(true);
			
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
			//$qProvider.errorOnUnhandledRejections(false);
			
			$logProvider.debugEnabled(true);
			
		}).directive('focus',
			function($timeout) {
				return {
					scope : {
						trigger : '@focus'
					},
					link : function(scope, element) {
						scope.$watch('trigger', function(value) {
							if (value === "true") {
								$timeout(function() {
									element[0].focus();
								});
							}
						});
					}
				};
			}
		);

apoioApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Você tem certeza que deseja continuar?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])

