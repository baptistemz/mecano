Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get '/', to: 'react_app#index'
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: { passwords: 'api/users/passwords' }
    get 'authcheck/checkme'
    resources :vehicles, only: [:create, :index, :destroy]
    resources :services, only: [:create]
    resources :domains do
      resources :recommendations, only: [:create]
      delete 'recommendations/delete'
      get 'recommendations/pictures'
    end
    resources :mecano_profiles, only: [:create, :update, :show, :index, :destroy] do
      resources :reviews, only: [:create, :index]
      resources :domains, only: [:index]
      post 'domains/register_domains'
      post 'domains/update_technical_domains'
      post 'domains/update_car_domains'
    end
  end
  get '/mecanos/:id', to: 'mecano_profiles#show'
  get '/*path' => 'react_app#index'
end
