class ChatroomsController < ApplicationController
  def show
    @room_message = RoomMessage.new
    @users = user_except_current()
    @room_id = params[:room_id]
    @selected_user_detail = User.find(@room_id)

    @chat_messages = RoomMessage.where(
                  sender_id: current_user.id, 
                  receiver_id: @room_id
                ).or(
                  RoomMessage.where(
                    sender_id: @room_id, 
                    receiver_id: current_user.id
                  )
                ).order(created_at: :asc)
  end

  # Send Message In Chat 
  def sendMessage
    @room_message = RoomMessage.new(
        room_id:1, 
        sender_id: current_user.id,
        receiver_id: params[:room_id],
        message: chat_form_params[:message],
    )

    respond_to do |format|
      
      if @room_message.save
        
        ActionCable.server.broadcast "room_channel_#{current_user.id}", @room_message

        msg = { 
          :status => true, 
          :message => "Message Sent", 
        }
        format.json  { render :json => msg } # don't do msg.to_json
      else
        msg = { 
          :status => false, 
          :message => "Something Went Wrong", 
        }
        format.json  { render :json => msg } # don't do msg.to_json
      end
    end
  end

  private

  def chat_form_params
    return params.require(:room_message).permit( :message )
  end
end
