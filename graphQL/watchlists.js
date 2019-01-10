const { buildSchema } = require('graphql');
const { UserModel, MovieModel, ObjectId } = require('../database/database');

// Construct a schema, using GraphQL schema language
const watchlistSchema = buildSchema(`
  type User {
    id: String!
    username: String!
    password: String!
    movies: [String]
  }
  
  type Movie {
    id: String!
    vote_count: Int!
    video: Boolean!
    vote_average: Int!
    title: String!
    popularity: Int!
    poster_path: String!
    original_language: String!
    original_title: String!
    backdrop_path : String!
    adult: Boolean!
    overview: String!
    release_date: String!
    tmdb_id: Int!
    genres: [String]!
  }


  type Query {
    getWatchlist(username: String!): [Movie]
    addToWatchlist(username: String!, title: String!): User
  }
`);

// The root provides a resolver function for each API endpoint
const rootAlternative = {
  getWatchlist: ({ username}) => {
    return new Promise((resolve) => {
      UserModel.findOne({username},{movies:1}).then(data => {
        if(data === null){
          return null;
          }
          else {
            const promises =[];
            data.foreach(element => {
              promises.push(MovieModel.findById(data));
            })
            Promise.all(promises).then(data =>{
              let allMovies = []
              data.forEach(element =>{
                allMovies = allMovies.push(element);
              })
              resolve(allMovies)
            })
          }
      })
    })
  },
  addToWatchlist: ({ username, title }) => {
    return new Promise((resolve) =>{
      UserModel.findOne({username},{ password:0} ).then(data => {
        if(data === null){
          resolve(null)
        }else{
          const user = data;
          MovieModel.findOne({title}).then(dataMovie =>{
            console.log(dataMovie)
            movieId = dataMovie.id
            UserModel.updateOne({username}, {$addToSet: {movies: movieId}})
          }).then(res =>{
            resolve(user);
          })

        }
      }).catch(err => {resolve(err)})
    })
  },
  
};

module.exports = { watchlistSchema, rootAlternative };