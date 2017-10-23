(function($,root){
    function skillBuild() {
        var canvas = document.getElementsByTagName('canvas')[0];
        var cxt = canvas.getContext('2d');
        var img = new Image(),img2 = new Image();
        var person1Offset = [120,200],person1OffsetHis = [120,200],
            person2Offset = [620,200],person2OffsetHis = [620,200];
        var disMoveX = 10,disMoveY = 10;
        var key = [1,1,1,1,1,1,1],usedKey = [1,1,1,1,1,1,1];
        var cell = 20;
        var countX = 0,countYTop = 0,countYDown = 0;
        console.log(this);
        
        //绘制人物
        function drawPerson(img,url,offset){
            img.src = url;
            img.onload = function(){
               cxt.drawImage(img,person1Offset[0],person1Offset[1],120,120); 
            }
        }
        drawPerson(img,root.person1Skill.figure,person1Offset)
        drawPerson(img2,root.person1Skill.figure,person2Offset)
        console.log(root.person1Skill.figure)
        //改变人物坐标位置的函数
        
        function offsetMove(countX,countYDown,countYTop,key,offset) {
            //前进
            if(countX > 0){
                    offset[0] = offset[0] + disMoveX;
                    countX--;
                   
                }else{
                    key[0] = 1;
                }
            //后退
            if(countX < 0){
                    offset[0] = offset[0] - disMoveX;
                    countX++;
                }else{
                    key[1] = 1;
                }
            //跳
            if(countYTop !== 0){
                    offset[1] = offset[1] - disMoveY;
                    countYTop--;
                }else{
                    //下落
                    if(countYDown < 0){
                        offset[1] += disMoveY;
                        countYDown++;
                    }else{
                        key[3] = 1;
                    }
                }
            //判断人物是否超出边界
            if(offset[0]<=0) offset[0] = 0;
            if(offset[0]>=880) offset[0] = 880;
            console.log(1)
            return [countX,countYDown,countYTop,key,offset]
        }
        //判断两人物是否重合；
        // function check(offset1,offset2){
        //     if
        // }
        //运动函数
        function move(cell) {
           
            setInterval(function(){
                person1OffsetHis[0] = person1Offset[0]
                person1OffsetHis[1] = person1Offset[1]
                person2OffsetHis[0] = person2Offset[0]
                person2OffsetHis[1] = person2Offset[1]
                // [person1OffsetHis[0],person2OffsetHis[0]] = [person1Offset[0],person2Offset[0]];
                // [person1OffsetHis[1],person2OffsetHis[1]] = [person1Offset[1],person2Offset[1]];
                console.log(1)
                cxt.clearRect(person1Offset[0], person1Offset[1], 120, 120);
                cxt.clearRect(person2Offset[0], person2Offset[1], 120, 120);
                [countX,countYDown,countYTop,key,person1Offset] = offsetMove(countX,countYDown,countYTop,key,person1Offset);
                if(Math.abs(person1Offset[0]-person2Offset[0]) <= 90 && (Math.abs(person1Offset[1]-person2Offset[1]) <= 90)) {
                    // [person1Offset[0],person2Offset[0]] = [person1OffsetHis[0],person2OffsetHis[0]] 
                    // [person1Offset[1],person2Offset[1]] = [person1OffsetHis[1],person2OffsetHis[1]]
                    if(person1Offset[1] < 200) {
                        person1Offset[0] = person1Offset[0] - (120 - person2Offset[0] + person1Offset[0])
                        person1Offset[1] -= 10;
                        console.log(2)
                        countYDown--;
                    }else{
                        person1Offset[0] = person1OffsetHis[0]
                        person1Offset[1] = person1OffsetHis[1]
                    }
                   
                   
                    person2Offset[0] = person2OffsetHis[0]
                    person2Offset[1] = person2OffsetHis[1]
                }
                if(key[0]!==usedKey[0]||key[1]!==usedKey[1]||key[2]!==usedKey[2]||key[3]!==usedKey[3]||key[4]!==usedKey[4]||key[5]!==usedKey[5]){
                    urlChange()
                }
                cxt.drawImage(img,person1Offset[0],person1Offset[1],120,120);
                cxt.drawImage(img2,person2Offset[0],person2Offset[1],120,120);
                console.log(3)
            },cell)

        }
        function skillChange(i,time){
            setTimeout(function(){
                key[i] = 1;
            },time)
        }
        //换图函数
        function urlChange() {
            if(key[0]*key[1] === 1){ img.src = root.person1Skill.figure};
            if(key[0]*key[1] === 0){ img.src = root.person1Skill.adv};


            //下蹲
            if(key[2] == 0){
               
                img.src = root.person1Skill.down;
                key[2] = 1;
            }

            //瞬移
            if(key[5] === 0){ 
                skillChange(5,100);
                if(key[0] + key[5] === 0){
                    person1Offset[0] += 150;
                
                }
                if(key[1] + key[5] === 0){
                    person1Offset[0] -= 150;    
                }
            }
            //飞踹
            if(key[3] === 0) {
                
                if(key[4] === 0){
                    img.src = root.person1Skill.legInAir;
                    skillChange(4,countX*cell);
                }else{
                    img.src = root.person1Skill.jump}
            };
            for (var i = 0; i < key.length; i++) {
                usedKey[i] = key[i];
            }    
        }
        //触发运动状态
        move(cell)
        document.onkeydown = function(e){
            switch (e.key){
                case 'd':
                    if(key[0] === 0) return;
                    key[0] = 0;
                    if(countYDown !== 0){
                        countX = countYTop - countYDown;
                        disMoveX = 8;
                    }else{
                        countX += 10;    
                    }
                    break;
                case 'a':
                    if(key[1] === 0) return;
                    key[1] = 0;
                    if(countYDown !== 0){
                        countX = -(countYTop - countYDown);
                        disMoveX = 8;
                    }else{
                        countX -= 10;    
                    }
                    break;
                case 's':
                    if(key[2] === 0) return;
                    key[2] = 0;
                    break;
                case 'w':
                    if(key[3] === 0) return;
                       key[3] = 0;
                       
                       countYTop += 20;
                       countYDown += -20;
                    break;
                case 'j'://出脚
                    if(key[4] ===0) return;
                    key[4] = 0;
                    break;
                case 'l'://瞬移
                    if(key[5] ===0) return;
                    key[5] = 0;
                    
                    break;

                
            }
        }
        
    }
    function skillBuild2() {
        var canvas = document.getElementsByTagName('canvas')[0];
        var cxt = canvas.getContext('2d');
        var img = new Image();
        var person1Offset = [520,200];
        var disMoveX = 10,disMoveY = 10;
        var key = [1,1,1,1,1,1,1],usedKey = [1,1,1,1,1,1,1];
        var cell = 20;
        var countX = 0,countYTop = 0,countYDown = 0;
        console.log(this);
        
        //绘制人物
        (function imgChange(img,url){
            img.src = url;
            img.onload = function(){
               cxt.drawImage(img,person1Offset[0],person1Offset[1],120,120); 
            }
        })(img,root.person1Skill.figure)
        console.log(root.person1Skill.figure)
        //实现人物坐标改变的函数
        function offsetMove(countX,countYDown,countYTop,key){
            if(countX > 0){
                    person1Offset[0] = person1Offset[0] + disMoveX;
                    countX--;
                   
                }else{
                    key[0] = 1;
                }
                if(countX < 0){
                    person1Offset[0] = person1Offset[0] - disMoveX;
                    countX++;
                }else{
                    key[1] = 1;
                }
                if(countYTop !== 0){
                    person1Offset[1] = person1Offset[1] - disMoveY;
                    countYTop--;
                }else{
                    if(countYDown !== 0){
                        person1Offset[1] = person1Offset[1] + disMoveY;
                        countYDown++;
                    }else{
                        key[3] = 1;
                    }
                }
                return [countX,countYDown,countYTop,key];
                console.log(countX)
        }
        //实现运动，技能的函数
        // function move(cell) {
           
            setInterval(function(){
                cxt.clearRect(person1Offset[0], person1Offset[1], 120, 120);
                [countX,countYDown,countYTop,key] = offsetMove(countX,countYDown,countYTop,key)
                
                // if(countX > 0){
                //     person1Offset[0] = person1Offset[0] + disMoveX;
                //     countX--;
                   
                // }else{
                //     key[0] = 1;
                // }
                // if(countX < 0){
                //     person1Offset[0] = person1Offset[0] - disMoveX;
                //     countX++;
                // }else{
                //     key[1] = 1;
                // }
                // if(countYTop !== 0){
                //     person1Offset[1] = person1Offset[1] - disMoveY;
                //     countYTop--;
                // }else{
                //     if(countYDown !== 0){
                //         person1Offset[1] = person1Offset[1] + disMoveY;
                //         countYDown++;
                //     }else{
                //         key[3] = 1;
                //     }
                // }
                if(key[0]!==usedKey[0]||key[1]!==usedKey[1]||key[2]!==usedKey[2]||key[3]!==usedKey[3]||key[4]!==usedKey[4]||key[5]!==usedKey[5]){
                    console.log(1)
                    urlChange()
                }
                console.log(countX)
                cxt.drawImage(img,person1Offset[0],person1Offset[1],120,120);
            },cell)

        // }
        function skillChange(i,time){
            setTimeout(function(){
                key[i] = 1;
            },time)
        }
        //换图函数
        function urlChange() {
            if(key[0]*key[1] === 1){ img.src = root.person1Skill.figure};
            if(key[0]*key[1] === 0){ img.src = root.person1Skill.adv};


            //下蹲
            if(key[2] == 0){
               
                img.src = root.person1Skill.down;
                key[2] = 1;
            }

            //瞬移
            if(key[5] === 0){ 
                skillChange(5,100);
                if(key[0] + key[5] === 0){
                    person1Offset[0] += 150;
                
                }
                if(key[1] + key[5] === 0){
                    person1Offset[0] -= 150;    
                }
            }
            //飞踹
            if(key[3] === 0) {
                
                if(key[4] === 0){
                    img.src = root.person1Skill.legInAir;
                    skillChange(4,countX*cell);
                }else{
                    img.src = root.person1Skill.jump}
            };
            for (var i = 0; i < key.length; i++) {
                usedKey[i] = key[i];
            }    
        }
        //触发运动状态
        // move(cell)
        document.onkeypress = function(e){
            switch (e.key){
                case '1':
                    if(key[0] === 0) return;
                    key[0] = 0;
                    if(countYDown !== 0){
                        countX = countYTop - countYDown;
                        disMoveX = 8;
                    }else{
                        countX += 10;    
                    }
                    break;
                case '2':
                    if(key[1] === 0) return;
                    key[1] = 0;
                    if(countYDown !== 0){
                        countX = -(countYTop - countYDown);
                        disMoveX = 8;
                    }else{
                        countX -= 10;    
                    }
                    break;
                case '3':
                    if(key[2] === 0) return;
                    key[2] = 0;
                    break;
                case '4':
                    if(key[3] === 0) return;
                       key[3] = 0;
                       
                       countYTop += 20;
                       countYDown += -20;
                    break;
                case '5'://出脚
                    if(key[4] ===0) return;
                    key[4] = 0;
                    break;
                case '6'://瞬移
                    if(key[5] ===0) return;
                    key[5] = 0;
                    
                    break;

                
            }
        }
        
    }
    root.skillBuild = skillBuild
    root.skillBuild2 = skillBuild2
})(window.$,window.page1||(window.page1={}))