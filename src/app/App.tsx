import { Component } from 'react';

import { type Character, getCharacters } from '~/api/rick-morty';
import { ErrorSection } from '~/components/error-section';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';

type AppState = {
  searchTerm: string;
  characters: Character[];
  loading: boolean;
  error: null | string;
};

export class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: '',
    characters: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    void this.initializeApp();
  }

  initializeApp = async () => {
    const savedSearch = localStorage.getItem('search') ?? '';

    this.setState({ searchTerm: savedSearch });

    await this.fetchCharacters(savedSearch);
  };

  setSearchTerm = (value: string) => {
    this.setState({ searchTerm: value });
  };

  fetchCharacters = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });

    try {
      const characters = await getCharacters(searchTerm);

      this.setState({
        characters,
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load characters';

      this.setState({
        characters: [],
        error: errorMessage,
        loading: false,
      });
    }
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
