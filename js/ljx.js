$(document).ready(function() {
    var $resourceTypeList = $('.video_list ul');

    if($(".video_list").length>0){
        $resourceTypeList.infinitescroll({
        navSelector: "#more",
        nextSelector: "#more a",
        itemSelector: ".pad_m40",
        clickb: true,
        clickobj: ".addmore",
        loading: {
            img: "",
            msgText: '加载中',
            finishedMsg: '没有了',
            finished: function() {
                $("#infscr-loading").remove();
                if($(".pad_m40 li")==""){
                    $(".pad_m40 li").remove()

                }
                imgratio();
                video_list();
            }
        },
        errorCallback: function() {
            $(".addmore").hide();
            }
        }, function(newElements) {
            var $newElems = $(newElements);
            
            $newElems.fadeIn();
            return;
        });
    }


  
    


})




 window.onload = function () {
        $(window).resize(function(){

        function personnel(divHight,divName){
            var num = Math.round($('.occupation').width()/$('.occupation li:eq(0)').width());
            var h=divHight;
            var liCount=divName;
            var storkCount=0;
            h.each(function(i){
                var prevLi=i-1;
                if(prevLi<0){
                    prevLi=0;
                };
                if(i%num==0){
                    storkCount++;
                }; 
                $(this).addClass(liCount+storkCount);
            });
            Array.prototype.max = function() {
                return Math.max.apply({},this);
            };

            var storkArr=[];
            var maxNum=0;
            for(var i=1; i<(storkCount+1); i++){
                $("."+liCount+i).each(function(){
                    storkArr.push($(this).find("dd").height());
                });
                maxNum=storkArr.max();
                $("."+liCount+i+" dd").height(maxNum);
                storkArr=[];
            };
       };


        if($(".occupation").length>0){
            personnel($(".occupation li"),"occupation");
        }
        
        })
        $(window).resize();
} 

function mapselect(){
    $(".map_select").each(function (i) {
        $(this).find("dt").click(function (e) {
            
            if($(this).hasClass('on_o')){
                $(this).removeClass('on_o');
            }else{
                $(this).addClass('on_o');
            }
            
            e.preventDefault();
            e.stopPropagation()
            $(".map_select").eq(i).find("dd a").each(function (x) {
                $(this).click(function () {
                    $(".map_select").eq(i).find("dd a").removeClass("on")
                    $(this).addClass("on")
                    $(".map_select").eq(i).find("dt").text($(this).text());

                    //$(".map_select").eq(i).find("dt").attr({"data-val":$(this).text()});
                    $(".map_select").eq(i).find("dt").attr({"data-val":$(this).data("val")});
                    $(".map_select").eq(i).find("dt").attr({"data-city":$(this).text()});
                    $(".map_select").eq(i).find("dt").attr({"data-x":$(this).data("x")});
                    $(".map_select").eq(i).find("dt").attr({"data-y":$(this).data("y")});

                    $(".mapbox_text ul").eq($(this).index()).addClass("on").siblings().removeClass("on");


                })
            })

        })
    })
    $(document).click(function () {
        $(".map_select dd").hide();
        $(".map_select dt").removeClass('on_o');
    })
     
    $(".map_select dt").on("click", function(e){
        if($(this).siblings(".map_select dd").is(":hidden")){
           $(this).siblings(".map_select dd").show();
           $(this).parents(".map_select").siblings(".map_select").children(".map_select dd").hide();

        }else{
            $(this).siblings(".map_select dd").hide();
          
        }           
    });
}

function mapInt(mapTitle,mapAdress,mapx,mapy){
    //var map = new BMap.Map("map");
    var map = new BMap.Map('map', { mapType: BMAP_HYBRID_MAP });
    var point2 = new BMap.Point(mapx,mapy);
    map.enableScrollWheelZoom();
     //坐标偏移 var point2 = new BMap.Point(mapx+0.05,mapy);

    //var point2 = new BMap.Point(mapx-0.01,mapy);
     if($(window).width()>768){
        //var point2 = new BMap.Point(mapx-0.01,mapy);
        var point2 = new BMap.Point(mapx,mapy);
     }else{
        var point2 = new BMap.Point(mapx,mapy);
    }
    

   // var myIcon = new BMap.Icon("../images/address.png", new BMap.Size(30,40));// icon按钮
	 var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                        offset: new BMap.Size(10, 25), // 指定定位位置
                        imageOffset: new BMap.Size(0, 0 - 11 * 25) // 设置图片偏移
                    });
	
    var marker2 = new BMap.Marker(point2,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中

    map.centerAndZoom(point2, 16);
    var opts = {
      width : 200,     // 信息窗口宽度
      height: 50,     // 信息窗口高度
      title : mapTitle  // 信息窗口标题
    
    }



    var infoWindow = new BMap.InfoWindow(mapAdress, opts); 
    marker2.addEventListener("click", function(){          
        map.openInfoWindow(infoWindow,point2); 
    });
    
}




$(function(){
    differentHeightClass('.pro_table .ph_table td','count','.tablediv',setHeight);
})

/*根据高度不同赋予不同Class*/
function differentHeightClass(className,newClass,tagName,fn){
    var h=$(className);
    var liCount=newClass;
    var storkCount=1;
    h.each(function(i){
        var prevLi=i-1;
        if(prevLi<0){
            prevLi=0;
        }
        if(h.eq(i).offset().top>h.eq(prevLi).offset().top){
            storkCount++;   
        }
        $(this).addClass(liCount+storkCount);
    })
    if (fn) {
      fn(className,tagName);
    }
}

/*比较高度并设置*/
function setHeight(className,tagName){
    Array.prototype.max = function() {   
        return Math.max.apply({},this)  /*创建比较最大值方法*/
    } 
    var storkArr=[];
    var maxNum=0;
    var length=$(className).length;
    $(className).each(function(index, el) {
        var target=$(this);
        if (tagName) {
            target=target.find(tagName);
        }
        storkArr.push(target.height());
        maxNum=storkArr.max();
    });
    $(className).find(tagName).height(maxNum)
}






function video_list(){
    $(".vide0_close").click(function() {

       $(this).parents(".video_appbox").hide();
       
     });



    var srcl="",simg='',src2="";
    //高度计算

    
    var isSupportTouch = "ontouchend" in document ? true : false;
    $(".video_button").click(function(e){
        srcl=$(this).data("video");
        src2=$(this).data("video1");
        simg=$(this).data("img");
        $(".video_appbox").fadeIn();
        video()
    })
    
    $(".video_appbox .mask").click(function(){
        $(".video_appbox").fadeOut();
        $(".video_t").html("")
    })
    

    
    function video(){

        $(".video_t").html("<video width='500' height='400' src='"+ srcl +"' type='video/mp4' id='media' poster='"+ simg +"' controls='controls' preload='none' autoplay='autoplay'></video>")
            
        $(".video_t video").attr({width:$(".video_t").width(),height:$(".video_t").height()})
        if(isSupportTouch) {
            $(".video_t").html("<video width='500' height='400' src='"+ srcl +"' type='video/mp4' id='media' poster='"+ simg +"' controls='controls' preload='none'></video>")
            //
            $(".video_t video").attr({width:$(".video_t").width(),height:$(".video_t").height()})
        } else {
            videoBox($(".video_t").width(), $(".video_t").height(), src2,simg);
        }

    }
    
    function videoBox(width, height, url,img) {
        var s1 = new SWFObject("../flash/flvplayer.swf","single",width,height,"7");
        s1.addParam("allowfullscreen","true");
        s1.addParam("wmode","transparent");
        s1.addVariable("file",url);
        s1.addVariable("autostart","true");
        s1.addVariable("width",width);
        s1.addVariable("backcolor",0x000000);
        s1.addVariable("frontcolor",0xFFFFFF);
        s1.addVariable("lightcolor",0x000000);
        s1.addVariable("height",height);
        s1.write("player1");
    }
}


