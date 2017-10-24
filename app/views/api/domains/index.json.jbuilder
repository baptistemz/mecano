Rails.logger.debug("@domains: #{@domains}")
json.array! @domains, partial: 'api/domains/domain', as: :domain
