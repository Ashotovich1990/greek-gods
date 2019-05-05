import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
  });

const Root = () => (
<ApolloProvider client={client}>
    <App />
</ApolloProvider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
