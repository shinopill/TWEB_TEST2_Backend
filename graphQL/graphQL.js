const { buildSchema } = require('graphql');
const { UserModel, MovieModel, ObjectId } = require('../database/database');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type User {
    _id: String!
    username: String!
    password: String!
    Movies: [String]
  }
  
  type Movie {
    _id: String!
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
    getAllMovies: [Movie]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  getAllMovies:() => {
    return new Promise((resolve) =>{
      MovieModel.find({}).then(data => {
        if(data === null){
          resolve(null)
        }else{
          resolve(data)
        }
      }).catch(err => {resolve(err)})
    })
  } 
};

module.exports = { schema, root };