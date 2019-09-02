function uploadImg(){
    var reader = new FileReader();
    var AllowImgFileSize = 11000000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    var file = $("#imgPath")[0].files[0];
    var imgUrlBase64;
    if (file) {
        //将文件以Data URL形式读入页面
        imgUrlBase64 = reader.readAsDataURL(file);

        reader.onload = function (e) {
            var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1);//截取base64码部分（可选可不选，需要与后台沟通）
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                alert( '上传失败，请上传不大于10M的图片！');
                return;
            }else{
                console.log(reader.result)
                $("#imgPath").data("base64",ImgFileSize)//将图片转成base64并赋值在input中
            }
        }
    }
}
function addNews(){
    var dataNew = {
        type:$("#type").val(),
        title:$("#title").val(),
        time:$("#time").val(),
        context:$("#context").val(),
        imgPath:$("#imgPath").data("base64"),
    }

    $.ajax({
        url: path +"/news/insertOne",
        data: JSON.stringify(dataNew),
        type: "post",
        headers:{"Content-Type":"application/json;charset=UTF-8"},
        dataType: "json",
        success: function(data) {
            var o = data.resultCode;
            console.log(o)
        }
    });

}

(function(){
    pathname = window.document.location.pathname
    pathname = pathname.substr(1,pathname.length)
    protocol  =window.location.origin;
    if (!protocol) {
        protocol = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    /*path = protocol +"/"+ pathname.substring(0,pathname.indexOf("/"))*/
    path = protocol
    console.log("path: "+path)

})()

var pVue = new Vue({
    el:'#product',
    data:{
        aa:"111111",
        plist:[],
        path:"",
        currentPageNum:0
    },
    created:function () {
        this.refush()

    },
    methods:{
        refush:function(){
            $.ajax({
                url: path +"/users/list",
                type: "get",
                dataType: "json",
                success: function(data) {
                    var o = data.resultObject
                    pVue.plist = o;
                    pVue.currentPageNum = 0;
                }
            })
        }
        ,
        addProduct:function () {

            $("#type").val("")
            $("#username").val("")
            $("#password").val("")
            $("#phone").val("")
            $("#addNewOne").show()
        },
        updatePro:function (vo) {
            $("#type").val(vo.type)
            $("#username").val(vo.username)
            $("#username").data("id",vo.id)
            $("#password").val(vo.password)
            $("#phone").val(vo.phone)
            $("#addNewOne").show()


        },
        submitThis:function () {

            var data = {

                type:$("#type").val(),
                username: $("#username").val(),
                password: $("#password").val(),
                phone:$("#phone").val()
            }
            if($("#username").data("id")!=''){
                data.id = $("#username").data("id")
                this.ajaxP("/users/update",data)
            }else{
                this.ajaxP("/users/insert",data)
            }

            $("#addNewOne").hide()

        },
        ajaxP:function (p,data) {
            $.ajax({
                url: path +p,
                data: JSON.stringify(data),
                type: "post",
                headers:{"Content-Type":"application/json;charset=UTF-8"},
                dataType: "json",
                success: function(data) {
                    var o = data.resultCode;
                    console.log(o)
                    pVue.refush();
                }
            })
        }


    }

})