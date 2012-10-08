$(document).ready(function(){


  $('#msg').keypress(function(event) {
    var msg = $(this).attr("value");
    if ( event.which == 13 ) {
      console.log("sendMsg=>"+username + " : " + room + " : "+msg);
      if(!msg)
      {
        return;
      }

      document.getElementById("chats").innerHTML+=strip('<div class="msgln"><b>'+username+'</b>: '+msg+'<br/></div>');
      $("#chats").animate({ scrollTop: 2000 }, 'normal');


      $.ajax({
        url: jzChatSend,
        data: {"user": username,
               "room": room,
               "message": msg,
              },

        success:function(response){
          console.log("success");
          document.getElementById("msg").value = '';
        },

        error:function (xhr, status, error){

        }

      });
    }

  });

  var old = '';
  //var chatEventSource = new EventSource('/chat/chatServlet/<%=room%>');
  var chatEventSource = new EventSource(jzChatSend+'&room='+room);

  chatEventSource.onmessage = function(e){
    //console.log("chatEventSource::onmessage");
    if(old!=e.data){
      console.log("DATA="+e.data);
      document.getElementById("chats").innerHTML='<span>'+e.data+'</span>';
      old = e.data;
    }
  };


  function strip(html)
  {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
  }

});