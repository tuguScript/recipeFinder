Rails.application.routes.draw do
  get 'user', :to => 'access#menu'
  get 'access/menu'
  get 'access/login'
  post 'access/attempt_login'
  post 'access/attempt_signup'
  get 'access/log_out'
  # save recipes
  post 'saved_recipes', :to => 'save_recipe#return_saved_recipes'
  post 'save_recipe', :to => 'save_recipe#save_recipe'
  # delete 'save', :to => 'save_recipe#return_saved_recipes'

  root 'pages#index'
  get '*path', to: 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
