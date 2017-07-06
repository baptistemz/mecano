# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome
    user = User.last
    UserMailer.welcome(user)
  end
  def mecano_registered
    mecano = MecanoProfile.last
    UserMailer.mecano_registered(mecano)
  end
end
