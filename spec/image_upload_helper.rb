def updateImage(status = :ok)
  profile_picture_params = { profile_picture: "data:image/jpeg;base64,#{Base64.encode64(File.read('spec/factories/images/avatar.jpeg'))}" }
  put api_user_registration_path, params: profile_picture_params, headers: access_tokens
  expect(response).to have_http_status(status)
  payload = parsed_body
end

def getUser(status = :ok)
  get api_auth_validate_token_path, headers: access_tokens
  expect(response).to have_http_status(status)
  payload = parsed_body
end
