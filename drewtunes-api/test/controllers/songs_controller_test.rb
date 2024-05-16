require "test_helper"

class SongsControllerTest < ActionDispatch::IntegrationTest
  test "index" do
    get "/songs.json"
    assert_response 200

    data = JSON.parse(response.body)
    assert_equal Song.count, data.length
  end

  test "show" do
    get "/songs/#{Song.first.id}.json"
    assert_response 200

    data = JSON.parse(response.body)
    assert_equal ["id", "title", "artist", "album", "release_date", "length", "song_url", "image_url"], data.keys
  end

  test "update" do
    song = Song.first
    patch "/songs/#{song.id}.json", params: { length: 180}
    assert_response 200

    data = JSON.parse(response.body)
    assert_equal 180, data["length"]
  end

  test "create" do
    assert_difference "Song.count", 1 do
      post "/songs/new.json", params: {title: "test", artist: 'mr. test', album: 'testing my patience'}
    end
  end

  test "delete" do
    assert_difference "Song.count", -1 do
      delete "/songs/#{Song.last.id}.json"
      assert_response 200
    end
  end
end



