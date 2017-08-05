
var apoioApp = angular.module('apoioApp', ['ngRoute', 'ngStorage', 'ngMaterial', 'cgNotify','angular-md5', 'angularMoment', 'ngMask'])
		.config(function($routeProvider, $locationProvider, $logProvider, $qProvider) {
			$routeProvider.when('/index', {template:'/view/dashboard.html', controller: 'DashboardController'})
						  .when('/dashboard', {templateUrl:'/view/dashboard.html', controller: 'DashboardController'})
						  .when('/apoio', {templateUrl:'/view/apoio.html', controller: 'ApoioController'})
						  .when('/categoria', {templateUrl:'/view/categoria.html', controller: 'CategoriaItemController'})
						  .when('/empresa', {templateUrl:'/view/empresa.html', controller: 'EmpresaController'})
						  .when('/regiao', {templateUrl:'/view/regiao.html', controller: 'RegiaoController'})
						  .when('/unidade', {templateUrl:'/view/unidade.html', controller: 'UnidadeController'})
						  .when('/grafico', {templateUrl:'/view/grafico.html', controller: 'GraficoController'})
						  .when('/chamados', {templateUrl:'/view/chamados.html', controller: 'ChamadosController'})
						  .otherwise({redirectTo:'/index'});

			$locationProvider.html5Mode(true);

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




