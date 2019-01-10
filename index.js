require('dotenv/config');

const express = require('express');
const passport = require('passport');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { port } = require('./config');
const api = require('./routes/api');
const { router } = require('./routes/auth');
const app  = express();
const { schema, root } = require('./graphQL/graphQL')
const { userSchema, rootBis } = require('./graphQL/users')
const {watchlistSchema, rootAlternative} = require('./graphQL/watchlists')
app.use(cors());

// middleware to enable json data
app.use(express.json());
app.use(passport.initialize());

// Source: https://graphql.github.io/graphql-js/
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use('/api', api);

app.use('/auth', router);

app.use('/movie', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.use('/user', graphqlHTTP({
    schema: userSchema,
    rootValue: rootBis,
    graphiql: true,
}));


app.use('/watchlist', graphqlHTTP({
  schema: watchlistSchema,
  rootValue: rootAlternative,
  graphiql: true,
}));



// middleware to handle erros
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong...');
});

app.listen(port, () => {
    console.log(`Server OK: http://localhost:${port}`);
});