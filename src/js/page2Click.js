(function($,root){
    
   
     function page2 () {
       $('.wrapper').css({display:'block'})


         $(".wrapper .person1-wrapper div").not('.person1-ok').on('click',function(){
           $(this).css({color:'red',fontSize:'15px'})
                root.dataArray[0] = $(this).index() - 1;
                
            $(".wrapper .person1-wrapper div").unbind('click');
         })

          $(".wrapper .person2-wrapper div").not('.person2-ok').on('click',function(){
           $(this).css({color:'red',fontSize:'15px'})
                root.dataArray[1] = $(this).index() - 1;
            $(".wrapper .person2-wrapper div").unbind('click')
         })

          $(".wrapper .bg-wrapper div").not('.bg-ok').on('click',function(){
           $(this).css({color:'red',fontSize:'15px'})
                root.dataArray[2] = $(this).index() - 1;
            $(".wrapper .bg-wrapper div").unbind('click')
         })

          $(".wrapper .time-wrapper div").not('.time-ok').on('click',function(){
           $(this).css({color:'red',fontSize:'15px'})
                root.dataArray[3] = $(this).index() - 1;
            $(".wrapper .time-wrapper div").unbind('click')
         })

         $(".start").on('click',function(){
              root.ajax('./mock/data.json',root.callback1)
              root.ajax('./mock/person.json',root.skillCb)
              $('.wrapper').css({display:'none'})
              $('.page3-wrapper').css({display:'block'})
              $(this).unbind('click')
              console.log(root.dataArray)
         })
     }
    
 

    root.page2 = page2;
}(window.$,window.page1 || (window.page1={})))