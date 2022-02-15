import consumer from "./consumer"


document.addEventListener('turbolinks:load',() => {
  
  const element = document.getElementById('chat_room_id')
  if (element) {
  const room_id = element.getAttribute('data-room-id')
  const current_user = element.getAttribute('data-current-user')
  const receiver_user = element.getAttribute('data-receiver-name')
    consumer.subscriptions.create({channel: "RoomChannel", room_id}, {
      connected() {
        // Called when the subscription is ready for use on the server
        console.log('Connected to The Room Channel');
      },
    
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
    
      received(data) {
        console.log(data);
        // Called when there's incoming data on the websocket for this channel
        let chat_class = (Number(data.receiver_id) == Number(current_user)) ? 'chat-message-left' : 'chat-message-right'
        let chatter_name = (Number(data.sender_id) == Number(current_user)) ? 'You' : receiver_user
        
        let html = `<div class="${chat_class} pb-4">
                      <div>
                          <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                          <div class="text-muted small text-nowrap mt-2">2:34 am</div>
                      </div>
                      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                          <div class="font-weight-bold mb-1">${ chatter_name }</div>
                          ${data.message}
                      </div>
                  </div>`
        $('#chat_messages_div').animate({scrollTop: $('#chat_messages_div').body.scrollHeight},"fast");
        $('#chat_messages_div').append(html)
      }
    });
    
  }
  $('#chat_messages_div').animate({scrollTop: document.body.scrollHeight},"fast");
})



