import { useMemo } from 'react';
import { List, useDynamicRowHeight, type RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

type CountryRowData = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const CountryCardRow = ({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
  rowRef,
}: RowComponentProps<CountryRowData & { rowRef?: React.Ref<HTMLDivElement> }>) => {
  const country = countries[index];

  return (
    <div style={style} ref={rowRef}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredAndSortedCountries = useMemo(() => {
    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else {
          const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
          const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowProps = useMemo<CountryRowData>(
    () => ({
      countries: filteredAndSortedCountries,
      selectedYear,
      selectedColumns,
    }),
    [filteredAndSortedCountries, selectedYear, selectedColumns]
  );

  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: 350,
  });

  if (filteredAndSortedCountries.length === 0) {
    return <div className={styles.noResults}>No countries found</div>;
  }

  return (
    <div className={styles.countryList}>
      <List
        rowComponent={CountryCardRow}
        rowCount={filteredAndSortedCountries.length}
        rowHeight={dynamicRowHeight}
        rowProps={rowProps}
        overscanCount={3}
        style={{
          height: 800,
          width: '100%',
        }}
      />
    </div>
  );
};
