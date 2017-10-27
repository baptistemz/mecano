class WallPictureUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
  process eager: true  # Force version generation at upload time.

  process convert: 'jpg'

  version :wall do
    cloudinary_transformation width: 1200, height: 400, crop: :thumb
  end
end
