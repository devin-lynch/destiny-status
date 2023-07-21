'use client';

import { useState, useEffect } from 'react';
import CharacterContainer from './_components/CharacterContainer';
import SearchComponent from './_components/SearchResult';

type SearchResult = {
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchResultComponents, setSearchResultComponents] = useState<
    JSX.Element[]
  >([]);
  const [characterData, setCharacterData] = useState();

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      if (username.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(
          'http://localhost:3000/api/bungie-user-search',
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

  const fetchCharacters = async () => {
    const response = await fetch(
      'http://localhost:3000/api/get-bungie-profile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
        body: JSON.stringify({
          membershipType: '3',
          membershipId: '4611686018467284386',
        }),
      }
    );
    const data = await response.json();
    return data.characterEquipment.data;
  };

  useEffect(() => {
    if (!characterData) {
      (async () => {
        try {
          const characterData = await fetchCharacters();
          setCharacterData(characterData);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const searchResultsContainer = (
    <div className="max-h-60 w-60 overflow-auto bg-slate-900 border border-slate-500">
      {searchResultComponents}
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
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
      {characterData ? (
        <CharacterContainer characterData={characterData} />
      ) : null}
    </main>
  );
}
