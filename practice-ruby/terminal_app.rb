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
require 'titlecase'


def input
  comm = gets.chomp
  if comm.downcase == 'exit'
    abort('Exiting program.')
  end
  return comm
end


class Movie_Battle

  #Connect to local sqlite db for api keys
  def initialize
    mac_path = "/Users/awulf/API_Keys/api_keys.db"
    win_path = ""

    db = SQLite3::Database.new(mac_path)
    res = db.execute("select api_key1, api_key2 from API_Keys WHERE service = ?", 'themoviedb').first

    @access_token = res[1]

    @api_key = res[0]

    @base_url = 'https://api.themoviedb.org/3'
  end


  #new game method refreshes all variables and starts a new match.
  def new_game

    @players, @used_links = {}, []
    puts "Welcome to trivia battle!"
    puts "Enter the name for Player 1:"
    name1 = input.titlecase
    puts "Enter the name for Player 2:"
    name2 = input.titlecase


    num = rand(0..1)
    if num == 0
      @players[name1] = {points: 0, bans: []}
      @players[name2] = {points: 0, bans: []}
    else
      @players[name2] = {points: 0, bans: []}
      @players[name1] = {points: 0, bans: []}
    end
    first, second = @players.keys.first, @players.keys.last

    for pl in [first, second]
      puts "\n#{pl} will go first."
      puts "#{pl}, pick three actors to ban for the other player."

      3.times do
        actor = search(input, type='person')
        if actor
          @players[pl][:bans].push(actor['name'])
        end
      end
    end

    for pl in [first, second]
      puts "\n\n#{pl}'s bans: "
      puts @players[pl][:bans]
    end

    prev = nil
    running = true
    


    movie_to_match = 'dune 2'
    current_data = movie_data(movie_to_match)
    movies = [movie_to_match]

    puts "\nStarting Game!" 


    while running
      info = current_data[:info]
      pretty_title = "----- #{info[0]} (#{info[1]}) -----"

      puts "\n\n#{pretty_title}"

      #puts "--- Round #{round} ---"
      for player in [first, second]
        if not running
          break
        end

        if player == first
          opp = second
        else
          opp = first
        end
        
        puts "\n#{player}'s turn:"
        if prev
          puts"Name a movie to link with \'#{movie_to_match}\'."
        end
        
        guess = input.titlecase
        
        if guess == 'exit'
          winner = opp
          running = false
        end
          
        if not search(guess)
          puts "Invalid guess, give it 1 more try!"
          guess = input.titlecase
        end

        challenger = movie_data(guess)

        res = compare_movies(current_data, challenger)
        if res
          puts "\nLink! --- #{res[0]} (#{res[1]}) | used: X X X"
          movie_to_match, current_data = challenger[:info][0], challenger
          movies.push(movie_to_match)
        else
          puts "No links found."
          pp challenger
          winner = opp
          running = false
        end
      end
    end

    puts "\n\n | #{winner} wins! |"
    puts "\nMovie streak: #{movies.length}"
  end



  #the search method validates that the input has a valid entry in moviedb, and returns the id of the match.
  def search(term, type='movie')

    search_params = { 'api_key' => @api_key, 'query' => term }

    if type == 'person'
      search_url = URI("#{@base_url}/search/person")
    elsif type == 'movie'
      search_url = URI("#{@base_url}/search/movie")
    else
      return nil
    end

    search_url.query = URI.encode_www_form(search_params)
    #pp search_url
    response = Net::HTTP.get_response(search_url)

    data = JSON.parse(response.body)
    if data['results'].any?
      return data['results'][0]
    end
    return nil
  end
  

  def movie_data(term)

    info = self.search(term, type='movie')
    id = info['id']
    #pp info

    search_params = { 'api_key' => @api_key, 'query' => term }
    search_url = URI("#{@base_url}/movie/#{id}/credits?language=en-US")

    search_url.query = URI.encode_www_form(search_params)
    response = Net::HTTP.get_response(search_url)
    data = JSON.parse(response.body)

    if data
      output = {info: [info['title'], info['release_date'][...4]], director: [], screenplay: [], cinematographer: [], composer: [], editor: [], cast: []}

      for row in data['crew']
        job = row['job']
        #pp job
        for title in output.keys
          t = title.to_s
          if t == 'cinematographer'
            t = "director of photography"
          elsif t == 'composer'
            t = "original music composer"
          end

          if job.downcase == t
            output[title].push(row['name'])
          end
        end
      end

      cast = data['cast']

      i = 0
      while i < 50 && i < cast.length
        output[:cast].push([cast[i]['name'], cast[i]['character']])
        i +=1
      end
      return output
    else
      return nil
    end
  end


  #compare method will try to match a cast or crew member of two given movies without using any blacklisted names

  def compare_movies(movie1_data, movie2_data, blacklist=nil)
    if not blacklist
      blacklist = []
    end

    info = movie2_data[:info]

    puts "\n----- #{info[0]} (#{info[1]}) -----"


    i = 1
    while i < movie1_data.keys.length
      key = movie1_data.keys[i]

      for person in movie1_data[key]
        if key == :cast
          person = person[0]
        end

        for title in [:director, :screenplay, :cinematographer, :composer, :editor]
          for crew in movie2_data[title]
            if crew == person && blacklist.none? {|n| n == crew}
              return [crew, title.to_s]
            end
          end
        end

        for actor in movie2_data[:cast]
          if actor[0] == person && blacklist.none? {|n| n == actor[0]}
            return actor
          end
        end
      end
    
      i +=1
    end
    return nil
  end

end








def demo
  engine = Movie_Battle.new
  engine.new_game
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
      actor = input
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


#db = Movie_DB.new
#db.find_movie

demo