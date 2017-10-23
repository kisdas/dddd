(function( $, root){
    function callback1 (data) {
        console.log(data[root.dataArr[0]])
    }
    root.callback1 = callback1;
}(window.$,window.page1 ||(window.page1={})))