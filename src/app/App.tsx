import { Component } from 'react';

import { type Character, getCharacters } from '~/api/rick-morty.api';
import { ErrorTestButton } from '~/components/error-test-button';
import { ResultsSection } from '~/components/results-section';
import { SearchSection } from '~/components/search-section';

type AppState = {
  searchTerm: string;
  lastSearchTerm: string;
  characters: Character[];
  loading: boolean;
  error: null | string;
};

export class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    searchTerm: '',
    lastSearchTerm: '',
    characters: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    void this.initializeApp();
  }

  private initializeApp = async () => {
    const savedSearch = localStorage.getItem('search') ?? '';

    this.setState({
      searchTerm: savedSearch,
      lastSearchTerm: savedSearch,
    });

    await this.fetchCharacters(savedSearch);
  };

  private setSearchTerm = (value: string) => {
    this.setState({ searchTerm: value });
  };

  private handleSearchSubmit = () => {
    const { searchTerm, lastSearchTerm } = this.state;
    const trimmed = searchTerm.trim();

    if (trimmed === lastSearchTerm) return;

    localStorage.setItem('search', trimmed);

    this.setState({
      searchTerm: trimmed,
      lastSearchTerm: trimmed,
    });

    void this.fetchCharacters(trimmed);
  };

  private fetchCharacters = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });

    try {
      const characters = await getCharacters(searchTerm);

      this.setState({
        characters,
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

      this.setState({
        characters: [],
        error: errorMessage,
        loading: false,
      });
    }
  };

  render() {
    const { searchTerm, characters, loading, error } = this.state;

    return (
      <main className="main container">
        <SearchSection
          value={searchTerm}
          onChange={this.setSearchTerm}
          onSubmit={this.handleSearchSubmit}
        />
        <ResultsSection characters={characters} loading={loading} error={error} />
        <ErrorTestButton />
      </main>
    );
  }
}
