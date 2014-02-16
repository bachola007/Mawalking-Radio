


var allnews;
var thesenews;
var allvideos;
var schedule = [];



function lookup_schedule(){
    console.log("lookup_schedule");
    cachekiller=new Date();
    $.ajax({
           type: 'POST',
           url: 'http://mawalkingradio.com/app/lookup_DJrotatorcontent.php?cachekiller='+cachekiller,
           async: false,
           data: {
           sender:'',
           },
           success: function (data) {
           schedule = eval(data);
           console.log("schedule:"+schedule);
           return true
           },
           error: function (xhr, err1, err2) {navigator.notification.alert(err2+"This device is currently not connected to the internet and cannot update the program schedule.", null, "")},
           dataType: "json",
           timeout: 10000
           });
}



function listNews() {
    console.log("listNews");
    cachekiller=new Date();
    $.ajax({
           type:"GET",
           url:"http://allafrica.com/tools/headlines/rdf/latest/headlines.rdf?cachekiller="+cachekiller,
           dataType:"xml",
           success:parseNews
           });
}



function parseNews(xml) {
    console.log("xml:"+xml);
    var newspieces=0;
    $("#news_list > div > div").html("");
    $(xml).find("item").each(function(){
                              var thistitle = $(this).find("title").text();
                              var thislink = $(this).find("link").text();
                              newspieces++;
                              if(thistitle.search("Reuters")==-1){
                              $("#news_list > div > div").append("<div style='padding:5px 0; border-bottom:1px solid #ccc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis' onclick='window.open(\""+thislink+"\",\"_blank\", \"location=no\")'>➤ &nbsp;"+thistitle+"</div>");
                             console.log(thistitle);
                                //appML.refreshIscroll("news_page",70+$("#news_list").height());
                                       
                             }
                              });
}


function listVideos() {
    $.ajax({
           type:"GET",
           url:"https://gdata.youtube.com/feeds/api/users/UCKqW5SBSlvjOToKfvfaQI2g/uploads",
           dataType:"xml",
           success:parseXML
           });
}



function parseXML(xml) {
    
    $(xml).find("entry").each(function(){
                                var thisvideo = $(this).find("id").text().replace("http://gdata.youtube.com/feeds/api/videos/","");
                                zimages.push("http://img.youtube.com/vi/"+thisvideo+"/0.jpg");
                               });
    zflow(zimages, "#tray");
}




function share_by_SMS(){
window.plugins.smsBuilder.showSMSBuilderWithCB(function(result){
                                                 
                                                 if(result == 0)
                                                 console.log("Cancelled");
                                                 else if(result == 1)
                                                 console.log("Sent");
                                                 else if(result == 2)
                                                 console.log("Failed");
                                                 else if(result == 3)
                                                 console.log("Not Sent");
                                                 
                                                 },'', "Hey!\r\n\r\nCheck out this awesome african music app called Mawalking Radio!\r\n\r\nhttp://itunes.apple.com/us/app/mawalking-radio/id535067665?mt=8&uo=4");
}

function share_on_facebook(){
    console.log("fb");
    var ref = window.open('http://m.facebook.com/sharer.php?u=www.mawalkingradio.com/', '_blank', 'location=yes');
}

function share_on_twitter(){
    var ref = window.open('http://mobile.twitter.com/home?status=www.mawalkingradio.com/', '_blank', 'location=yes');
}

function share_by_email(){
alert("share_by_email");
    window.plugin.email.open("","","","Check out the 'Mawalking Radio' app","Hey!<br><br>Check out this awesome african music app called Mawalking Radio!<br><br><a href='http://itunes.apple.com/us/app/mawalking-radio/id535067665?mt=8&uo=4' target='itunes_store'><img src='http://r.mzstatic.com/images/web/linkmaker/badge_appstore-lrg.gif' alt='Mawalking Radio' style='border:0'></a>",true);
}
    
function create_sharepage(){
    if($("#sp-wrapper").length==0){
        div = document.createElement('div');
        div.id = 'sp-wrapper';
        div.style.top = window.innerHeight + window.pageYOffset + 'px';
        div.style.webkitTransitionProperty = '-webkit-transform';
        div.innerHTML = "<div align='center' style='width:100%'><span onclick='toggle_sharepage(\"close\"); share_by_SMS()'><img src='img/share/icon_message.png' width='80'></span><span onclick='toggle_sharepage(\"close\"); share_by_email()'><img src='img/share/icon_mail.png' width='80'></span><span onclick='toggle_sharepage(\"close\"); share_on_twitter()'><img src='img/share/icon_twitter.png' width='80'></span><span onclick='toggle_sharepage(\"close\"); share_on_facebook()'><img src='img/share/icon_facebook.png' width='80'></span><div align='center' style='margin-top:30px; padding-top:8px; width:100%; height:60px; background:#ededed; color:rgb(21,125,251); font:normal 26px HelveticaNeue-Thin, AvenirNext-UltraLight' onclick='toggle_sharepage(\"close\")'>Cancel</div></div>";
        document.body.appendChild(div);
        position="closed";
    }
}



function toggle_sharepage(action){ 
   console.log(action);
    if(action=="close"){
        appML.appManagerHideLoading();
        $("#appML_body_app_container").removeClass("blur");
        $("#sp-wrapper").removeClass("openSP");
        position="closed";
    }else{
        if(position=="closed"){
            appML.appManagerShowLoading();
            $("#appML_body_app_container").addClass("blur");
            $("#sp-wrapper").show();
            setTimeout(function(){$("#sp-wrapper").addClass("openSP")},50);
            position = "open";
        }else{
            appML.appManagerHideLoading();
            $("#appML_body_app_container").removeClass("blur");
            $("#sp-wrapper").removeClass("openSP");
            setTimeout(function(){$("#sp-wrapper").hide()},150);
            position="closed";
        }
    }
}


