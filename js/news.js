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
