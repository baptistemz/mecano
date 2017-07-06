class ServiceMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.service_mailer.welcome.subject
  #
  def contact(service)
    @service = service
    mail from: @service.user.email, to: @service.mecano_profile.user.email, subject:"Restor'it - Demande de service sur #{@service.vehicle.brand} #{@service.vehicle.model} #{@service.vehicle.trim} de #{@service.vehicle.year}"
  end
end
