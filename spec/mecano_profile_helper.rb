def create_mecano_profile(mecano_params, status = :created)
  post api_mecano_profiles_path, params: mecano_params, headers: access_tokens
  expect(response).to have_http_status(status)
  payload = parsed_body
  get api_mecano_profile_path id: payload['mecano_profile']['id']
  pp parsed_body.user_id
end

def register_domains(domains, mecano_profile_id, success = true)
  domains = {domains: domains}
  post api_mecano_profile_domains_register_domains_path(:mecano_profile_id), params: domains, headers: access_tokens
  payload = parsed_body
  if success
    payload["domains"].each do |d|
      expect(d["value"]).not_to be_nil
    end
  else
    payload["domains"].each do |d|
      expect(d["value"]).to be_nil
    end
  end
  return payload
end
