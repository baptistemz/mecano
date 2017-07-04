class ProfilePictureUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
  process eager: true  # Force version generation at upload time.

  process convert: 'jpg'

  version :medium do
    cloudinary_transformation width: 300, height: 300, crop: :thumb, gravity: :face
  end
  Rails.logger.debug("IN UPLOADER")

  version :thumb do
    cloudinary_transformation width: 100, height: 100, crop: :thumb, gravity: :face
  end
end
