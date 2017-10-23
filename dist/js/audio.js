(function($,root){
    function musicPlay() {
        
        var audio = $('.first-wrap audio').get(0);
        var audioControl = $('.first-wrap .menu button').eq(1);
        audioControl.on('click',function(){
            console.log(1);
            $('.music-control').css({display: 'block'});
        })
        $('.music-control-close').on('click',function(){
            $('.music-control').css({display: 'none'});
        })
        $('.music-control .music-btn').on('mousedown',function(){
            
            $(document).on('mousemove',function(){
                var a = $('.music-control .music-btn').val();
                audio.volume = a/100;
            })
            $(document).on('mouseup',function(){
                console.log(111)
                $(this).unbind('mousemove').unbind('mouseup')
            })
        })
    }
    
    root.musicPlay = musicPlay;
}(window.$,window.page1||(window.page1={})))