Chatroom::Application.routes.draw do
  resources :messages

  match 'about/index' => 'about#index'

  root :to => "about#index"

end
