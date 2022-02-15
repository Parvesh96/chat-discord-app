Rails.application.routes.draw do
  get '/chat-room/:room_id' => 'chatrooms#show', as: 'chat_room'
  post '/chat-send-message/:room_id' => 'chatrooms#sendMessage', as: 'send_chat_message'
  resources :room_messages
  resources :rooms
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
