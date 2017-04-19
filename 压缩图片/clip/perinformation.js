
//上传头像
function modifyUserPhoto(){
			var userId = localStorage.getItem("userId");
			//==========================================================
			var fileObj = document.getElementById("photoFile").files[0]; // js 获取文件对象
 
            var FileController = AjaxUrl_weixin;                    // 接收上传文件的后台地址 
            // FormData 对象
            var form = new FormData();
			var photoName = fileObj.name;
            form.append("act", 'modifyUserPhoto');             // 可以增加表单数据
            form.append("photo", photoName.substr(photoName.lastIndexOf('.')+1));             // 可以增加表单数据
            form.append("id", userId);
            form.append("photoFile", fileObj);                           // 文件对象
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.onload = function () {
            	var data = JSON.parse(xhr.responseText);
                if(data.success){
                	// alert(data.msg);
                	$("#imgFlag").val("scwb");
                	$("#photoForm").get(0).reset();
                }else{
                	//如果身份信息过期，那么久再次登录，并执行此方法	
					if(typeof(data.msg)!="undefined"&&data.msg.toString().indexOf("身份信息过期")!=-1){
						againLogin(modifyUserPhoto);
					}
                }
            };
            // xhr.upload.addEventListener("progress", progressFunction, false);
            xhr.send(form);
}
function validateImg(){
		var file = document.getElementById("photoFile").files[0]; 
		 var reader = new FileReader();  
	    //将文件以Data URL形式读入页面  
	    reader.readAsDataURL(file); 
	    //图片预览 
	    reader.onload=function(e){  
	    var result=document.getElementById("imgPreview");  
	        //显示文件  
	       $("#imgPreview").find("img").attr("src",this.result);
	    };  
	    var w = 0;
	    var h = 0;
		var flag = true;
 	  $("#imgPreview").find("img").load(function(){
	        w = $("#imgPreview").find("img").get(0).width;
	        h =  $("#imgPreview").find("img").get(0).height;
	       if(w!=0&&h!=0&&flag){
       		flag = false;
       		if(w<520||h<520){
		   		alert('请上传长宽为大于520的图片');
		   		$("#photoForm").get(0).reset();
		       }else{
		       	$("#imgFlag").val("scz");
		       	modifyUserPhoto();
		       }
	       }
		});
 }  
