(function( $, root){
    function skillCb (data) {
        root.person1Skill = data[root.dataArray[0]];
        root.person2Skill = data[root.dataArray[1]];
        console.log(root.person1Skill)
        root.skillBuild()
        // root.skillBuild2()
    }
    root.skillCb = skillCb;
}(window.$,window.page1 ||(window.page1={})))