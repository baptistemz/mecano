json.extract! domain, :id, :kind, :value, :mecano_profile_id
json.recommended domain.recommended(current_api_user)
json.recommendation_number domain.recommendation_number
