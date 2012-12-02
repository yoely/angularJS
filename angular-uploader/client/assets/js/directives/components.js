angular.module('components', [])
    .directive('sAutoHeight', function($http, $parse, $compile) {
        return {
            restrict: 'A',

            compile: function compileFn(element, attrs) {

                $(window).bind('resize', function() {
                    setHeight();
                })

                function setHeight() {
                    var parent = element.parent()[0].tagName==="BODY"?$(window):$(element.parent()),
                        parentHeight = parent.height(),
                        elementExtraHeight = $(element).outerHeight(true)-$(element).height(),
                        parentChildrenHeight = 0;

                    $(element.parent()).children().each(function(index, child) {
                        if ($(child).css('display')!=="none" && $(child).width()>0 && $(child).height()>0) {
                            if ($(child).offset().left == $(element).offset().left) {
                                if ($(element).css('position')==="absolute") {
                                    if ($(child).css('position')==="absolute") {
                                        parentChildrenHeight += $(child).outerHeight(true);
                                    }
                                } else {
                                    parentChildrenHeight += $(child).outerHeight(true);
                                }
                            }
                        }
                    })
                    parentChildrenHeight = parentChildrenHeight - $(element).outerHeight(true);
                    parentChildrenHeight = parentChildrenHeight<0?0:parentChildrenHeight;
                    $(element).height(parentHeight-elementExtraHeight-parentChildrenHeight);
                }

                setHeight();
            }
        }
    })
    .directive('sDrop', function($http, $parse, $compile) {
        return {
            link: function(scope, element, attr) {
                var fn = $parse(attr.sDrop);
                element.bind('drop', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            }
        }
    })
    .directive('sDragover', function($http, $parse, $compile) {
        return {
            link: function(scope, element, attr) {
                var fn = $parse(attr.sDragover);
                element.bind('dragover', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            }
        }
    })
    .directive('sDragleave', function($http, $parse, $compile) {
        return {
            link: function(scope, element, attr) {
                var fn = $parse(attr.sDragleave);
                element.bind('dragleave', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            }
        }
    })