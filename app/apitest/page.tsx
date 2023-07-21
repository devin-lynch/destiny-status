'use client';
import { useState, useEffect } from 'react';
import SearchComponent from '../_components/SearchResult';

type SearchResult = {
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
};

export default function apitest() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchResultComponents, setSearchResultComponents] = useState<
    JSX.Element[]
  >([]);

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      if (username.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(
          'http://localhost:3000/api/serverless-example',
          {
            method: 'POST',
            body: JSON.stringify({ username }),
          }
        );
        const data = await response.json();
        setSearchResults(data.searchResults);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }, 300);
    return () => clearTimeout(fetchUsers);
  }, [username]);

  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResultComponents([]);
      return;
    }
    console.log('search results populated');
    const searchResultComponents = searchResults.map((searchResult, i) => {
      return (
        <SearchComponent
          displayName={searchResult.bungieGlobalDisplayName}
          displayNameCode={searchResult.bungieGlobalDisplayNameCode.toString()}
          handleUserClick={handleUserClick}
          key={`search result ${i}`}
        />
      );
    });
    setSearchResultComponents(searchResultComponents);
  }, [searchResults]);

  const handleUserClick = () => {
    console.log('hi');
  };

  const searchResultsContainer = (
    <div className="max-h-60 w-60 overflow-auto bg-slate-900 border border-slate-500">
      {searchResultComponents}
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-2 gap-1">
      <input
        value={username}
        placeholder="search by Bungie name..."
        className="bg-slate-900 border border-slate-500 w-60"
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* need to rewrite this to show the user some kind of difference between an empty input and an input that returned no results from Bungie */}
      {searchResultComponents.length ? searchResultsContainer : null}
    </div>
  );
}
