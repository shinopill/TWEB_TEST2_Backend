const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://admin:admin@twebtest-qz7vs.mongodb.net/test?retryWrites=true';

const options = {
    useNewUrlParser: true,
    dbName: 'movie-time',
  };
  
mongoose.connect(dbURI, options);
  
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  watched: { type: Array, required: true, default: []}
});


const movieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  vote_count: { type: Number, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  title:{ type: String, required: true },
  popularity: { type: Number, required: true },
  poster_path: { type: String, required: true },
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  backdrop_path : { type: String, required: true },
  adult: { type: Boolean, required: true },
  overview:{ type: String, required: true },
  release_date: { type: String, required: true },
  tmdb_id: { type: Number, required: true },
  genres:{ type: Array, required: true, default: []} 
})

const UserModel = mongoose.model('user', userSchema);
const MovieModel = mongoose.model('movie',movieSchema)

module.exports = { UserModel, MovieModel, ObjectId };