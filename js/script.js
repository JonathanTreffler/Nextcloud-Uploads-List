(function(window, $, undefined) {
    'use strict';

    $(window).load(function() {
        let otherNavbarMenues = ["#contactsmenu",".notifications"];
        let uploads = [];
        
        function createGUI(){
            let headerRight = $("#header > div.header-right");
            
            let uploadsmenu = document.createElement("div");
            uploadsmenu.id="uploadsmenu";
            
            let menutoggle = document.createElement("div");
            menutoggle.classList.add("icon-uploadsmenu");
            menutoggle.classList.add("menutoggle");
            menutoggle.tabIndex = 0;
            $(menutoggle).attr("role","button");
            $(menutoggle).attr("aria-haspopup",true);
            $(menutoggle).css("background-image","var(--icon-upload-fff)");
            
            let menu = document.createElement("div");
            menu.id = "uploadsmenu-menu";
            menu.classList.add("menu");
            
            let uploadsDiv = document.createElement("div");
            
            menu.appendChild(uploadsDiv);
            uploadsmenu.appendChild(menutoggle);
            uploadsmenu.appendChild(menu);
            headerRight.prepend(uploadsmenu);
            
            console.log(uploadsmenu);
        }
        
        
        function closeOtherNavbarMenues(){
           for(let navbarMenueId in otherNavbarMenues){
               $(otherNavbarMenues[navbarMenueId]+" > div.menu").css("display","none");
           }
        }
        function setUploadsMenuState(state){
            if(state == true){
                openUploadsMenu();
            }else{
                closeUploadsMenu();
            }
        }
        function openUploadsMenu(){
            $("#uploadsmenu > div.menu").css("display","block");
        }
        function closeUploadsMenu(){
            $("#uploadsmenu > div.menu").css("display","none");
        }
        
        function configureEventListeners(){
            $("#uploadsmenu > div.menutoggle")[0].addEventListener("click",function(){
                closeOtherNavbarMenues();
                setUploadsMenuState($("#uploadsmenu > div.menu").css("display") == "none");
            });
            
            for(let navbarMenueId in otherNavbarMenues){
                console.log( $(otherNavbarMenues[navbarMenueId]+" > div.menutoggle"));
                
                $(otherNavbarMenues[navbarMenueId]+" > div.menutoggle")[0].addEventListener("click",function(){
                    closeUploadsMenu();
                });
            }
        }
        
        function checkForChanges(){
            uploads = [];
            
            for(let uploadId in FileList._uploader._uploads){
                let upload = FileList._uploader._uploads[uploadId];
                uploads.push({
                    name: upload.data.files[0].name,
                    type: upload.data.files[0].type,
                    lastModifiedDate: upload.data.files[0].lastModifiedDate,
                    totalSize: upload.data.progress().total,
                    loadedSize: upload.data.progress().loaded,
                    progress: upload.data.progress().loaded / upload.data.progress().total,
                    bitrate: upload.data.progress().bitrate,
                });
            }
            
            console.log(uploads);
            updateGUI();
        }
        
        function updateGUI(){
            $("#uploadsmenu-menu > div").empty();
            
            if(uploads.length == 0){
                $("#uploadsmenu-menu > div").text("Derzeit keine Uploads");
            }else{
                for(let uploadId in uploads){
                    let upload = uploads[uploadId];
                    
                    let uploadDiv = document.createElement("div");
                    $(uploadDiv).css("width","100%");
                    
                    let nameP = document.createElement("p");
                    $(nameP).text(upload.name);
                    $(nameP).css("background-color","gray");
                    
                    let progressP = document.createElement("p");
                    $(progressP).text(upload.progress*100+" %");
                    
                    let sizeP = document.createElement("p");
                    $(sizeP).text(upload.totalSize);
                    
                    uploadDiv.appendChild(nameP);
                    uploadDiv.appendChild(progressP);
                    uploadDiv.appendChild(sizeP);
                    $("#uploadsmenu-menu > div")[0].appendChild(uploadDiv);
                }
            }
        }
        
        
        createGUI();
        configureEventListeners();
        
        setInterval(checkForChanges,1000);
    });
})(window, jQuery);