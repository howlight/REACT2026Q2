import { Component } from 'react';

import { ErrorSection } from '~/components/error-section';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';

export class App extends Component {
  render() {
    return (
      <main className="main container">
        <SearchSection />
        <ResultsSection />
        <ErrorSection />
      </main>
    );
  }
}
