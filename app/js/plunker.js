var myDirectives = angular.module('myDirectives', []);
myDirectives.directive('scrollSpy', function($timeout){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var offset = parseInt(attr.scrollOffset, 10)
            var target = attr.target
            if(!offset) offset = 10;
            console.log("offset:  " + offset);
            console.log("target:"+target);
            //console.log("element.val:"+elem.val());
            //console.log("element JSON:"+JSON.stringify(elem));
            $('body').scrollspy({ "target": target})//, "offset" : offset});
            console.log("scrollspy is done");
            console.log(scope.test)
            scope.$watch(attr.scrollSpy, function(value) {
                    console.log("watch is called with value="+value)
                    $timeout(function() { 
                            console.log("timeout : "+offset)
                            //$('body').scrollspy('refresh')//, { "offset" : offset})
                            //$('#navPills').scrollspy()
                            $('#navPills').affix({
                                offset: { 
                                    top: 10
                                }
                            })
                            $('body').scrollspy('refresh')//, { "offset" : offset})
                        },
                    1);
                }
            ,true);
        }
    }
});

myDirectives.directive('preventDefault', function() {
    return function(scope, element, attrs) {
        jQuery(element).click(function(event) {
            event.preventDefault();
        });
    }
});

myDirectives.directive("scrollTo", ["$window", function($window){
    return {
        restrict : "AC",
        compile : function(){

            function scrollInto(elementId) {
                if(!elementId) $window.scrollTo(0, 0);
                //check if an element can be found with id attribute
                var el = document.getElementById(elementId);
                if(el) {
                    console.log(el.offsetTop);
                    $window.scrollTo(0,el.offsetTop-10);//scrollIntoView();
                }
            }

            return function(scope, element, attr) {
                element.bind("click", function(event){
                    scrollInto(attr.scrollTo);
                });
            };
        }
    };
}]);