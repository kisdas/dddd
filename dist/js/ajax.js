(function($,root){

    
function ajax(url,cb) {
    $.ajax({
        url :url,
        type:"GET",
        success:cb,
        error : function(e){
            console.log(e)
        }

    })
}
   

root.ajax = ajax;

}(window.$,window.page1 ||(window.page1  ={})));