Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index, :create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :posts, except: [:edit, :new]
    resources :experiences, only: [:create, :destroy, :update, :index]
    
  end
  get '*path', to: "static_pages#frontend_index"
end
