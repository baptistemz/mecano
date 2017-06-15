Rails.application.routes.draw do
  get '/', to: 'react_app#index'
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth'
    get 'authcheck/checkme'
    resources :mecano_profiles, only: [:create, :update, :show, :index, :destroy] do
      resources :domains, only: [:index]
      post 'domains/register_domains'
    end
  end
  get '/*path' => 'react_app#index'
end
