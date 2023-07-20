'use client';
import { useState, useEffect } from 'react';

type SearchResult = {
  bungieGlobalDisplayName: string;
};

export default function apitest() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/serverless-example',
          {
            method: 'POST',
            body: JSON.stringify({ username }),
          }
        );
        const data = await response.json();
        setSearchResults([...data.searchResults]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }, 300);
    return () => clearTimeout(fetchUsers);
  }, [username]);

  useEffect(() => {
    if (searchResults.length === 0) {
      return;
    }
    console.log('search results populated');
  }, [searchResults]);

  return (
    <div className="flex justify-center mt-2">
      <input
        value={username}
        placeholder="search by Bungie name..."
        className="bg-slate-900 border border-slate-500"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
    </div>
  );
}
