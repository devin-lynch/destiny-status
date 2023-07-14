'use client';
import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export function useManifestStatus() {
  const [fetchedVersionNumber, setFetchedVersionNumber] = useState('');
  const [manifestPath, setManifestPath] = useState('');
  const [manifestLoaded, setManifestLoaded] = useState(false);

  // get the most recent manifest version and the location to download it
  const fetchManifestData = async () => {
    const response = await fetch(
      'https://www.bungie.net/Platform/Destiny2/manifest/'
    );
    const data = await response.json();
    return [data.Response.version, data.Response.jsonWorldContentPaths.en];
  };

  // check active manifest version against what's in keyval store
  const compareManifestVersion = async (fetchedVersionNumber: string) => {
    const cacheManifestVersion = await get('cacheManifestVersion');
    return cacheManifestVersion == fetchedVersionNumber;
  };

  // fetch current manifest from bungie and save it in store
  const fetchManifest = async () => {
    const response = await fetch(`https://www.bungie.net${manifestPath}`);
    const data = await response.json();
    // currently only saving one table from the manifest in local store as a proof of concept -- full manifest is larger than firefox will accept (works in Chrome apparently).  looks like DIM only stores the tables that are needed for app functionality, so I'll need to figure out a way to only save the chunks of the manifest that will actually be useful
    set('manifest', data.DestinyMilestoneDefinition);
  };

  // initial API request to add relevant metadata to state
  useEffect(() => {
    (async () => {
      const [version, path] = await fetchManifestData();
      setFetchedVersionNumber(version);
      setManifestPath(path);
    })();
  }, []);

  // once the previous effect is complete and state variables have been updated, check for version match and fetch the manifest if mismatch
  useEffect(() => {
    if (manifestPath !== '') {
      (async () => {
        const manifestVersionsMatch = await compareManifestVersion(
          fetchedVersionNumber
        );
        if (manifestVersionsMatch) {
          console.log('stored manifest matches current version');
          setManifestLoaded(true);
        } else {
          console.log(
            'stored manifest does not match current version -- downloading new manifest'
          );
          set('cacheManifestVersion', fetchedVersionNumber);
          await fetchManifest();
          setManifestLoaded(true);
        }
      })();
    }
  }, [manifestPath]);

  return manifestLoaded;
}
