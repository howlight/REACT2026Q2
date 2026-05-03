import { Component } from 'react';

import { ErrorSection } from '~/components/error-section';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';

type AppState = {
  searchTerm: string;
};

export class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: '',
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem('search');

    if (savedSearch) {
      this.setState({ searchTerm: savedSearch });
    }
  }

  setSearchTerm = (value: string) => {
    this.setState({ searchTerm: value });
  };

  render() {
    return (
      <main className="main container">
        <SearchSection value={this.state.searchTerm} onChange={this.setSearchTerm} />
        <ResultsSection />
        <ErrorSection />
      </main>
    );
  }
}
