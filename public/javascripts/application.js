// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


//function updateMsg(){
//$("#messages").append("<br/>add every time");
//setTimeout('updateMsg',4000);
//};

lastid = 2;

function safe(s)
{
  return s.replace(/&(?!\w+([;\s]|$))/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


function updateMessages(){

  $.ajax({
      type : "GET",
      url : "http://chatroom.heroku.com/messages.json",
      //url : "http://localhost:3000/messages.json",
      dataType : "json",
      complete : function(data){
        var id_thistime; //这次的最后一个ID
        var str = "var ret = " + data.responseText + ";"; 
        eval(str);
        var toAdd = "";

        //alert(str);

        for(var i = 0; i < ret.length; i++)
        {
          //alert(ret[i]._id.$oid);
          if (i == ret.length -1) //最后一句话
          {
            //pc部署有$oid
            //id_thistime = ret[i]._id.$oid; 
            //heroku 无$oid
            id_thistime = ret[i]._id;
            //alert(id_thistime);
          }
        }
        
        //alert(id_thistime);
        //alert($.cookie('last_id'));
        if (id_thistime != lastid) //最后一句话变了
        //if (id_thistime != $.cookie('last_id')) //最后一句话变了
        {
          //得到目前昵称
          var current_nickname = $('form').html();
          //alert(current_nickname);

          $("#messages").empty();
          for(var i = 0; i < ret.length; i++)
          {
            time = ret[i].created.match(/\d+:\d+:\d+/);
            toAdd = "<span class = 'time'>" + "[" + time + "]" + "</span>"+ "<b>" + ret[i].user + "</b>" + ":" + safe(ret[i].content) + "<br/>"; 
            $("#messages").append(toAdd);
          }

          lastid = id_thistime;
          //$.cookie('last_id', id_thistime);
          $('.scroll-pane').jScrollPane();
          var pane = $('.scroll-pane');
          var api = pane.data('jsp');
          api.scrollToBottom();
        }
      }
    });


}

$(document).ready(function(){
    updateMessages();
    $('.scroll-pane').jScrollPane();
    $("#message_content").append("再此输入想要说的话");
    //$("#message_user").append("再此输入昵称");
    //alert("hello");
    //$("#messages").append("Start");
    //$("#messages").click(function(){
    //alert("hi");}
    //);
    //updateMsg();
    //var a = 0;
    $('body').everyTime('5s', updateMessages);
      //$("#messages").append("Timer:" + a);
      //a = a + 1;

      //$.getJSON("http://localhost:3000/messages.json",
          //function(data){
            //alert("awwaar");
            ////$("#messages").append("receive" + data);
          //}
        //);
      //$.get(
        //"http://localhost:3000/messages.json",
        //function(data){
        //alert(data);}
        //function(ret, status){
        //alert(ret+ status);
        //$("#messages").append(ret);
        //}
        //);
    });
