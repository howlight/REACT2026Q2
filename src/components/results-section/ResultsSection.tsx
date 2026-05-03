import './ResultsSection.css';

import { Component } from 'react';

export class ResultsSection extends Component {
  render() {
    return (
      <section className="results">
        <div className="results-header">
          <div className="header-name">Name</div>
          <div className="header-description">Description</div>
        </div>
        <div className="results-list">
          <div className="no-results">No results to display. Enter a search term above.</div>
        </div>
      </section>
    );
  }
}
