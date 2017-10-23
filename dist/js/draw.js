(function($,root){
    function draw(){
        var drawSvg = $('.first-wrap .title svg path');
        var l = drawSvg.length - 1;
        var count = 0;
    
        (function print(params) {
            var pathLen = drawSvg.get(params).getTotalLength();
       
            drawSvg.eq(params).animate({strokeDashoffset: 500 - pathLen},pathLen,function(){
                if(count < l){
                    count++;
                    print(count);
                }
            })
        }(count))
    
    }
    root.draw = draw;
}(window.$,window.page1||(window.page1={})))