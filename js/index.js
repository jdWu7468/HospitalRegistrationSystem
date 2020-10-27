//banner栏无缝滚动
window.onload = function () {
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var list = document.getElementById("bannerList");
    var buttons = document.getElementById("bannerButtons").getElementsByTagName("span");
    var banner = document.getElementById("banner");
    var index = 1;
    var timer;
    var animated = false;
    function shownButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                /* prev和next每click一次，就会清除一次前一个class为on的span元素，*/
                break;
            }
            //  或者直接遍历清除  buttons[i].className=""；
        }
        buttons[index - 1].className = "on";//Banner滚动的时候下边焦点跟随
    }
    function animate(offset) {
        var time = 272;
        var inteval = 16;
        //(time/inteval)要为整数，能被整除，否则因为影响到list.style.left的位移量。这里的值也可以写死。
        var speed = offset / (time / inteval);
        animated = true;
        var newLeft = parseInt(list.style.left) + offset;
        function go() {
            if ((speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            } else {
                animated = false;
                // list.style.left=newLeft+"px";
                if (newLeft > -544) {
                    list.style.left = -1632 + "px";
                };
                if (newLeft < -1632) {
                    list.style.left = -544 + "px";
                };
            }
        }
        go();
    };
    prev.onclick = function () {
        if (!animated) {
            if (index == 1) {
                index = 3;
            } else {
                index -= 1;
            }
            shownButton();
            animate(544);
        }
    };
    next.onclick = function () {
        if (!animated) {
            if (index == 3) {
                index = 1;
            } else {
                index += 1;
            }
            shownButton();
            animate(-544);
        }
    };
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            //无关紧要，判断目前banner图是否是用户正要选择的
            if (this.className == "on") {
                return;
            }
            var myIndex = parseInt(this.getAttribute("index"));
            var offset = -544* (myIndex - index);
            if (!animated) {
                animate(offset);
            }
            index = myIndex;
            shownButton();
        }
    }

    function play() {
        timer = setInterval(function () {
            next.onclick();
        }, 2000);//banner停止滚动，展示banner的时间
    }

    function stop() {
        clearInterval(timer);
    }
    play();
    banner.onmouseover = stop;//鼠标在banner停留时停止滚动
    banner.onmouseout = play;
}

//搜索栏toggle功能及选择功能
function toggle(){
    var ul = document.getElementById('selectList').classList.contains('show');
    if(ul){
        document.getElementById('selectList').classList.remove('show');
        document.getElementById('selectList').classList.add('hide');
    }else{
        document.getElementById('selectList').classList.remove('hide');
        document.getElementById('selectList').classList.add('show');
    }
}

function liSelected(name){
    document.getElementById('selected').innerText = name;
    document.getElementById('selectList').classList.remove('show');
    document.getElementById('selectList').classList.add('hide');
}

function searchButtonSubmit(){
    var name=document.getElementById('selected').innerText;
    var someThingWantToKnow = document.getElementById("searchButtonInput").value;
    if(!someThingWantToKnow){
        alert("请输入搜索内容");
        return;
    }
    var prarms=[{
        "name":name,
        'someThingWantToKnow':someThingWantToKnow,
    }]
    //原生的http请求应该是这样的，没去测试，就留个坑吧
    //创建 XMLHttpRequest 对象
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post","http://192.168.XXX.XXX:XXXX/XXXXXX/XXXXXX",true);//请求接口
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify(prarms));
    xmlHttp.onreadystatechange = function() {
        if(this.status==200){
            //ToDo，回调函数
        }
    }
}

//科室导航栏aside鼠标移入移出效果
function departmentSelected(id){
    if(id==3){
        document.getElementById('department1Illness').style.display = "block";
        remove('li1Ctrl','liCtrl');
        add('li1Ctrl','liCtrlHover');
        remove('department1Img','departmentImg');
        add('department1Img','departmentImgHover');
        remove('a1Ctrl','aCtrl');
        add('a1Ctrl','aCtrlHover');
        remove('a11Ctrl','aCtrl');
        add('a11Ctrl','aCtrlHover');
    }else if(id==4){
        document.getElementById('department2Illness').style.display = "block";
        remove('li2Ctrl','liCtrl');
        add('li2Ctrl','liCtrlHover');
        remove('department2Img','departmentImg');
        add('department2Img','departmentImgHover');
        remove('a2Ctrl','aCtrl');
        add('a2Ctrl','aCtrlHover');
        remove('a22Ctrl','aCtrl');
        add('a22Ctrl','aCtrlHover');
    }else{
        document.getElementById('department'+id+'Illness').style.display = "block";
        remove('li'+id+'Ctrl','liCtrl');
        add('li'+id+'Ctrl','liCtrlHover');
        remove('department'+id+'Img','departmentImg');
        add('department'+id+'Img','departmentImgHover');
        remove('a'+id+'Ctrl','aCtrl');
        add('a'+id+'Ctrl','aCtrlHover');
        remove('a'+id+id+'Ctrl','aCtrl');
        add('a'+id+id+'Ctrl','aCtrlHover');
    }
}

function departmentUnselected(id){
    if(id==3){
        document.getElementById('department1Illness').style.display = "none";
        remove('li1Ctrl','liCtrlHover');
        add('li1Ctrl','liCtrl');
        remove('department1Img','departmentImgHover');
        add('department1Img','departmentImg');
        remove('a1Ctrl','aCtrlHover');
        add('a1Ctrl','aCtrl');
        remove('a11Ctrl','aCtrlHover');
        add('a11Ctrl','aCtrl');
    }else if(id==4){
        document.getElementById('department2Illness').style.display = "none";
        remove('li2Ctrl','liCtrlHover');
        add('li2Ctrl','liCtrl');
        remove('department2Img','departmentImgHover');
        add('department2Img','departmentImg');
        remove('a2Ctrl','aCtrlHover');
        add('a2Ctrl','aCtrl');
        remove('a22Ctrl','aCtrlHover');
        add('a22Ctrl','aCtrl');
    }else{
        document.getElementById('department'+id+'Illness').style.display = "none";
        remove('li'+id+'Ctrl','liCtrlHover');
        add('li'+id+'Ctrl','liCtrl');
        remove('department'+id+'Img','departmentImgHover');
        add('department'+id+'Img','departmentImg');
        remove('a'+id+'Ctrl','aCtrlHover');
        add('a'+id+'Ctrl','aCtrl');
        remove('a'+id+id+'Ctrl','aCtrlHover');
        add('a'+id+id+'Ctrl','aCtrl');
    } 
}

function add(id,clas){
    //添加样式
    document.getElementById(id).classList.add(clas);
}

function remove(id,clas){
    //删除样式
    document.getElementById(id).classList.remove(clas);
}

//快速预约区的联动下拉框,这里的数据一般由后端接口提供，这里就把他写死
function linkageGrade(obj){
    var val = obj.value;
    var grade = document.getElementById('input-grade');
    //清空，防止修改第一个下拉框的值后面几个下拉框不恢复默认值的情况
    clear('input-grade');
    clear('input-name');
    clear('input-subject');
    if(val == '1'){
        //可设置循环配置，也可一个一个配置
        grade.options[0] = new Option("医院等级","0");
        grade.options[1] = new Option("一级医院","11");
        grade.options[2] = new Option("二级医院","12");
    }else if(val == '2'){
        grade.options[0] = new Option("医院等级","0");
        grade.options[1] = new Option("二级医院","21");
        //或者for(i=obj.options.length-1 ; i>= 0 ; i--)初始化也行
        grade.options[2] = null;
    }else{
        clear('input-grade');
    }

}

function linkageName(obj){
    var val = obj.value;
    var name = document.getElementById('input-name');
    clear('input-name');
    clear('input-subject');
    if(val == '11'){
        name.options[0] = new Option("医院名称","0");
        name.options[1] = new Option("A1医院","111");
        name.options[2] = new Option("A2医院","112");
    }else if(val == '12'){
        name.options[0] = new Option("医院名称","0");
        name.options[1] = new Option("B1医院","121");
        name.options[2] = null;
    }else if(val == '21'){
        name.options[0] = new Option("医院名称","0");
        name.options[1] = new Option("C1医院","211");
        name.options[2] = new Option("C2医院","212");
    }else{
        clear('input-name');
    }
}

function linkageSubject(obj){
    var val = obj.value;
    var subject = document.getElementById('input-subject');
    clear('input-subject');
    if(val == '111'){
        subject.options[0] = new Option("医院科室","0");
        subject.options[1] = new Option("骨科","1111");
        subject.options[2] = new Option("内科","1112");
    }else if(val == '112'){
        subject.options[0] = new Option("医院科室","0");
        subject.options[1] = new Option("儿科","1121");
        subject.options[2] = null;
    }else if(val == '121'){
        subject.options[0] = new Option("医院科室","0");
        subject.options[1] = new Option("骨科","1211");
        subject.options[2] = new Option("内科","1212");
    }else if(val == '211'){
        subject.options[0] = new Option("医院科室","0");
        subject.options[1] = new Option("儿科","2111");
        subject.options[2] = null;
    }else if(val == '212'){
        subject.options[0] = new Option("医院科室","0");
        subject.options[1] = new Option("骨科","2121");
        subject.options[2] = new Option("内科","2122");
    }else{
        clear('input-subject');
    }
}

//清空input框的值
function clear(str){
    var id = document.getElementById(str);
    for(let i=id.options.length-1; i>= 1 ; i--){
        id.remove(i);
    }
}

//医院科室查询提交
function quickQuery(){
    //实际上只要提交科室的值后端进行字符串分割即可，具体看需求，全传也可以
    var subject = document.getElementById('input-subject');
    var sendStr='subject='+subject;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post","http://192.168.XXX.XXX:XXXX/XXXXXX/XXXXXX",true);
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(sendStr);
    xmlHttp.onreadystatechange = function() {
        if(this.status==200){
            //ToDo
        }
    }
}

//tab点击切换
function tabClick(id,barName,tabBarId,subtabId) {
    var lis = document.getElementById(tabBarId).children;
    if(tabBarId=='tabBar'){}
    for(var i = 0; i < lis.length; i++) {
        var li = lis[i];
        if(li == document.getElementById(barName+ id)) {
            li.style.backgroundColor = "#60bff2";
            li.style.color = "#fff";
        } else {
            if(tabBarId=='tabBar'){
                //tabBar和subtabBar没有被选中的时候样式是不一样的
                li.style.backgroundColor = "#f4f6fa";
                li.style.color = "#00B3EA";
            }else{
                li.style.backgroundColor = "#FFF";
                li.style.color = "#000";
            }
      }
    }
    var subtabs = document.getElementsByClassName(subtabId);
    for(var i = 0; i < subtabs.length; i++) {
        var tab = subtabs[i];
        if(tab == document.getElementById("tab" + id + "Content")) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    }
}

