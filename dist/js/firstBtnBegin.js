(function ($,root) {
    function firstBtnBegin(){
        $('.first-wrap .menu button').eq(0).on('click',function(){
            $('.first-wrap').css({display:'none'})
            
            $(this).unbind('click')
            root.page2();
        })
    }
    root.firstBtnBegin = firstBtnBegin

}(window.$,window.page1||(window.page1={})))