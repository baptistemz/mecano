json.service do
  Rails.logger.debug("@service: #{@service.mecano_profile_id}")
  json.extract! @service, :status, :mecano_profile_id, :user_id, :vehicle_id
end
