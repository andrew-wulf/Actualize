#IDEAS


#Sports


#Translator app

#Meetup



#NFL
#Given a team, return their hardest opponents based on power rankings and head-to-head matchups.


#Name that actor or movie!

#If you don't know someone's name but know what they're in, enter in productions they've been a part of to narrow the search


require 'uri'
require 'net/http'
require 'json'
require 'sqlite3'


class Movie_trivia_game

  def start_game
    puts "Welcome to trivia battle!"
    puts "Enter the name for Player 1:"
    p1_name = gets.chomp
    puts "Enter the name for Player 2:"
    p2_name = gets.chomp

    p1_points, p2_points = 0, 0

    used_list = []
  end


end






class Movie_DB
  def initialize

    db_path = "/Users/awulf/API_Keys/api_keys.db"
    db = SQLite3::Database.new(db_path)
    res = db.execute("select api_key1, api_key2 from API_Keys WHERE service = ?", 'themoviedb').first

    @access_token = res[1]

    @api_key = res[0]

    @base_url = 'https://api.themoviedb.org/3'
  end


  def search(term, type='person')
    
    if type == 'person'
      search_url = URI("#{@base_url}/search/person")
    elsif type == 'movie'
      search_url = URI("#{@base_url}/search/movie")
    else
      return nil
    end

    search_params = { 'api_key' => @api_key, 'query' => term }
    search_url.query = URI.encode_www_form(search_params)

    response = Net::HTTP.get_response(search_url)

    data = JSON.parse(response.body)
    if data['results'].any?
      return data['results'][0]['id']
    end
    return nil
  end



  def find_movie

    puts "To find a movie, keep naming actors to narrow the results."

    movies = []

    while movies.length == 0 || movies.length > 1


      puts "Name an actor:"
      actor = gets.chomp
      if actor == "exit"
        return
      elsif actor == "movies"
        puts "Possible movie list:"
        puts movies
      end

      actor_id = search(actor)

      # Check if id was found
      if actor_id

        # Get movie credits for actor
        credits_url = URI("#{@base_url}/person/#{actor_id}/movie_credits")
        credits_params = { 'api_key' => @api_key }
        credits_url.query = URI.encode_www_form(credits_params)

        credits_response = Net::HTTP.get_response(credits_url)
        credits_data = JSON.parse(credits_response.body)

        # Print titles of movies featuring actor

        if movies.length == 0
          credits_data['cast'].each do |movie|
            movies.push(movie['title'])
          end

        elsif movies.length > 1
          new_movies = []
          credits_data['cast'].each do |movie|
            if movies.include?(movie['title'])
              new_movies.push(movie['title'])
            end
          end
          
          if new_movies.length > 0
            movies = new_movies
          end
        end
        puts "There are #{movies.length} possible movies you could be looking for."
      else
        puts "#{actor} not found."
      end
    end
  end
end


db = Movie_DB.new
db.find_movie