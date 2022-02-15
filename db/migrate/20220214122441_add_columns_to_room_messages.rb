class AddColumnsToRoomMessages < ActiveRecord::Migration[6.0]
  def change
    rename_column :room_messages, :user_id, :sender_id
    add_column :room_messages, :receiver_id, :bigint, null: true 
  end
end
