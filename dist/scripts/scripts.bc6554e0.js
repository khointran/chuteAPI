"use strict";angular.module("mytodoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","bootstrapLightbox","wu.masonry"]).config(["$routeProvider",function(a){a.when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/",{templateUrl:"views/gallery.html",controller:"GalleryCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("mytodoApp").controller("MainCtrl",["$scope",function(a){a.todos=["Item 1","Item 2","Item 3","Item 4"]}]),angular.module("mytodoApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);var gallery=angular.module("mytodoApp");gallery.factory("dataFactory",["$http",function(a){var b,c=function(c,d){a.get(c).success(function(a){b=a,d(b)})};return c}]),gallery.controller("GalleryCtrl",["$scope","$http","$localStorage","Lightbox","dataFactory",function(a,b,c,d,e){function f(b){e(b,function(b){return void 0!==c.photos&&JSON.parse(c.photos)[0].url==b.data[0].url+"/fit/400x300"?void(a.photos=JSON.parse(c.photos)):(a.data=b,void g())})}function g(){null==c.id?c.id=0:null,null===c.nextPage&&restart(),a.photos=void 0===c.photos||void 0==c.photos[0]?[]:JSON.parse(c.photos);var b=a.data.data;for(var d in b){var e={};e.url=b[d].url+"/fit/400x300",e.id=++c.id,a.photos.push(e)}c.photos=angular.toJson(a.photos),c.nextPage=a.data.pagination.next_page}var h="https://api.getchute.com/v2/albums/aus6kwrg/assets?per_page=5&page=1";f(h),a.add=function(){b.get(c.nextPage).success(function(b){a.urls_from_chute=b.data;for(var d in a.urls_from_chute){var e={};e.url=a.urls_from_chute[d].url+"/fit/400x300",e.id=++c.id,a.photos.push(e)}c.photos=angular.toJson(a.photos),c.nextPage=b.pagination.next_page}).error(function(){})},a.clear=function(){a.photos=[],delete c.photos,f(c.nextPage)},a.restart=function(){a.photos=[],c.$reset(),f(h)},a.openLightboxModal=function(b){d.openModal(a.photos,b)}}]),gallery.directive("scroller",function(){return{restrict:"A",link:function(a,b){b.bind("scroll",function(){var b=$(this);console.log(b.height()),b[0].scrollHeight-b.scrollTop()==b.height()&&a.$apply("add()")})}}});