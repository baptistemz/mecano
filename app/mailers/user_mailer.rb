class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #
  def welcome(user)
    @user = user
    mail to: @user.email, subject:"Bienvenue sur Restor'it"
  end

  def mecano_registered(mecano)
    @mecano = mecano
    mail to: @mecano.user.email, subject:"Confirmation d'enregistrement mécano"
  end
end
