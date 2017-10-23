(function( $, root){
    function callback1 (data) {
    
       $('.page3-wrapper').css('background','url(' + data[0][root.dataArray[2]] +')')
    }
    root.callback1 = callback1;
}(window.$,window.page1 ||(window.page1={})))