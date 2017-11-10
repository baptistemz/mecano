class ApplicationMailer < ActionMailer::Base
  default from: ENV['SENDGRID_FROM_EMAIL']
  layout 'mailer'
end
