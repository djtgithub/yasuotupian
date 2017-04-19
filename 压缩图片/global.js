

//上传头像
function modifyUserPhoto520(){
			var imgsource520=  getBase64Image($("#imgPreview").find("img").get(0));
			var userId = localStorage.getItem("userId");
			//==========================================================
			//var fileObj = document.getElementById("photoFile").files[0]; // js 获取文件对象
 
            var FileController = AjaxUrl_weixin;                    // 接收上传文件的后台地址 
            // FormData 对象
            var form = new FormData();
			//var photoName = fileObj.name;
            form.append("act", 'modifyUserPhoto');  
            form.append("photo", 'jpg');             // 可以增加表单数据
            form.append("id", userId);
            form.append("photoFile", convertBase64UrlToBlob(imgsource520));                           // 文件对象
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.onload = function () {
            	var data = JSON.parse(xhr.responseText);
                if(data.success){
                	$("#imgPreview").find("img").get(0).src = "";
                	$("#imgFlag").val("scwb");	
					$(".tk").animate({opacity:'1'});
					$('.tk').css({'display':'block'});
					$('.tk').html('恭喜您上传成功!');
					$(".tk").animate({opacity:'0'},5000);
					
                }else{
                	
                	//如果身份信息过期，那么久再次登录，并执行此方法	
					if(typeof(data.msg)!="undefined"&&data.msg.toString().indexOf("身份信息过期")!=-1){
						
						againLogin(modifyUserPhoto520);
						
					}else{
						$(".tk").animate({opacity:'1'});
						$('.tk').css({'display':'block'});
						$(".tk").animate({opacity:'0'},2000);
	                	$('.tk').html('上传失败了，请稍后再试');
					}
                }
            };
            // xhr.upload.addEventListener("progress", progressFunction, false);
            xhr.send(form);
}
//base64码转blob对象
function convertBase64UrlToBlob(urlData){
    
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : 'image/jpeg'});
}
//图片转base64
function getBase64Image(img) {
        var canvas1 = document.createElement("canvas");
        canvas1.width = img.width*2;
        canvas1.height = img.height*2;
        var ctx = canvas1.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width*2, img.height*2);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
       // var dataURL = canvas1.toDataURL("image/"+ext);
        var dataURL = canvas1.toDataURL("image/jpeg");
        dataURL = changeDPI300(dataURL);
        
        return dataURL;
}


function changeDPI300(base64_dpi_NOT300){
	var str_pre  = base64_dpi_NOT300.substring(0,26);//获取图片dpi前的base64信息
	var str_mid  = base64_dpi_NOT300.substring(26,51);//获取图片dpi信息，dpi为72的

//base64信息：/4AAQSkZJRgABAQEASABIAAD/
	var str_suf  = base64_dpi_NOT300.substring(51);//获取图片dpi后的base64信息
	if(str_pre=='data:image/jpeg;base64,/9j'){//如果图片是JPG格式的，那么就返回替换后的base64码，否则返回原base64码
		return str_pre+'/4AAQSkZJRgABAQEBLAEsAAD/'+str_suf;
	}else{
		return base64_dpi_NOT300;
	}
}
