const { buildSchema } = require('graphql');
const { UserModel, MovieModel, ObjectId } = require('../database/database');

// Construct a schema, using GraphQL schema language
const userSchema = buildSchema(`
  type User {
    id: String!
    username: String!
    password: String!
    Movies: [String]
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
    createUser(username: String!, password: String!): User
    getUser(username: String!): User
  }
`);

// The root provides a resolver function for each API endpoint
const rootBis = {
  createUser: ({ username, password }) => {
    return new Promise((resolve) => {
      let newUser = new UserModel({ username, password });
      UserModel.findOne({username}).then(data => {
        if(data === null){
          newUser.save()
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            resolve(err)
          })
          }
          else {
            resolve(null)
          }
      })
    })
  },
  getUser: ({ username }) => {
    return new Promise((resolve) =>{
      UserModel.findOne({username},{ password:0} ).then(data => {
        if(data === null){
          resolve(null)
        }else{
          resolve(data)
        }
      }).catch(err => {resolve(err)})
    })
  },
  
};

module.exports = { userSchema, rootBis };