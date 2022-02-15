$(function() {
    $('#new_room_message').on('ajax:success', function(a, b,c ) {
      let field_value = $('#romm_message_text').val()
      let html = `<div class="chat-message-right pb-4">
                    <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                        <div class="text-muted small text-nowrap mt-2">2:34 am</div>
                    </div>
                    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div class="font-weight-bold mb-1">You</div>
                        ${field_value}
                    </div>
                </div>`
      $('#chat_messages_div').append(html)
      $('#chat_messages_div').animate({scrollTop: document.body.scrollHeight},"fast");
      $(this).find('input[type="text"]').val('');
    });
  });
  