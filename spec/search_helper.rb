def search(params, results = true)
  get api_mecano_profiles_path, params: params, headers: {"HTTP_APP_KEY" => ENV['APP_KEY']}
  expect(response).to have_http_status(:ok)
  payload = parsed_body
  if results
    expect(payload).not_to be_empty
  else
    expect(payload).to be_empty
  end
end

def geocode_addresses()
  Geocoder.configure(:lookup => :test)
  Geocoder::Lookup::Test.add_stub(
    "200 rue Nationale,Lille,France", [
      {
        'coordinates'  => [50.6324107, 3.0511614],
        'latitude'     => 50.6324107,
        'longitude'    => 3.0511614,
        'address'      => '200 rue Nationale, Lille, France',
        'country'      => 'France',
        'country_code' => 'FR'
      }
    ]
  )
  Geocoder::Lookup::Test.add_stub(
  "20 Avenue Foch, Marcq-en-Baroeul, France", [
    {
      'coordinates'  => [50.6684952, 3.1017777],
      'latitude'     => 50.6684952,
      'longitude'    => 3.0483849,
      'address'      => '20 Avenue Foch, Marcq-en-Baroeul, France',
      'country'      => 'France',
      'country_code' => 'FR'
    }
   ]
  )
  Geocoder::Lookup::Test.add_stub(
  "20 rue de Lille, Tourcoing, France", [
    {
      'coordinates'  => [50.7224594, 3.157532],
      'latitude'     => 50.7224594,
      'longitude'    => 3.157532,
      'address'      => '20 rue de Lille, Tourcoing, France',
      'country'      => 'France',
      'country_code' => 'FR'
    }
   ]
  )
  Geocoder::Lookup::Test.add_stub(
    "200 boulevard Vauban , Lille, France", [
      {
        'coordinates'  => [50.6291279, 3.0427623],
        'latitude'     => 50.6291279,
        'longitude'    => 3.0427623,
        'address'      => "200 boulevard Vauban , Lille, France",
        'country'      => 'France',
        'country_code' => 'FR'
      }
    ]
  )
  Geocoder::Lookup::Test.add_stub(
    "200 Avenue Mozart, Paris, France", [
      {
        'coordinates'  => [48.8492454, 2.2664065],
        'latitude'     => 48.8492454,
        'longitude'    => 2.2664065,
        'address'      => '200 Avenue Mozart, Paris, France',
        'country'      => 'France',
        'country_code' => 'FR'
      }
    ]
  )
end
