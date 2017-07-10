json.service do
  json.extract! @service, :status, :mecano_profile_id, :user_id, :vehicle_id
end
