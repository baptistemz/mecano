# Preview all emails at http://localhost:3000/rails/mailers/service_mailer
class ServiceMailerPreview < ActionMailer::Preview
  def contact
    service = Service.last
    ServiceMailer.contact(service)
  end
end
