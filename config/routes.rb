Rails.application.routes.draw do
  get '/', to: 'react_app#index'
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth'
    get 'authcheck/checkme'
    resources :mecano_profiles
  end
  get '/*path' => 'react_app#index'
end
