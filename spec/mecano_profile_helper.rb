def create_mecano_profile(mecano_params, status = :created)
  post api_mecano_profiles_path, params: mecano_params, headers: access_tokens
  expect(response).to have_http_status(status)
  payload = parsed_body
end

def register_domains(domains, mecano_profile_id, success = true)
  domains = {domains: domains}
  post api_mecano_profile_domains_register_domains_path(:mecano_profile_id), params: domains, headers: access_tokens
  payload = parsed_body
  return payload
end
