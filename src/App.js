import React from "react";
import Grid from './components/Grid';
import '@fortawesome/fontawesome-free/js/all.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

class App extends React.Component {

  render() {
      return (
        <main>
          <Grid/>
        </main>
    );

  }
}

export default App;
