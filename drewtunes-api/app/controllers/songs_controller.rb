class SongsController < ApplicationController
  def index
    @songs = Song.all
    render(template: "songs/index", formats: :json)
  end


  def show
    @song = Song.find_by(id: params[:id])
    render(template: "songs/show", formats: :json)
  end

  def update
    @song = Song.find_by(id: params[:id])

    @song.update(title: params[:title] || @song.title,
                artist: params[:artist] || @song.artist,
                album: params[:album] || @song.album,
                length: params[:length] || @song.length,
                release_date: params[:release_date] || @song.release_date,
                song_url: params[:song_url] || @song.song_url,
                image_url: params[:image_url] || @song.image_url
    )

    render(template: "songs/show", formats: :json)
  end

  def delete
    @song = Song.find_by(id: params[:id])
    @song.destroy
    status = Song.find_by(id: params[:id]) == nil

    render json: {id: params[:id], deleted_successfully: status}
  end

  def create
    @song = Song.new()
    @song.save

    render(template: "songs/show", formats: :json)
  end

end
