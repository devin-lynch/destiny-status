'use client';
import { useEffect } from 'react';
import { get, set } from 'idb-keyval';

export default function FetchManifest() {
  // get the most recent manifest version from bungie
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

  // if mismatch, fetch current manifest from bungie and save it in store
  const fetchManifest = async () => {
    // would prefer to have saved the path in state and not have to invoke fetchManifestData here as it will have already been called once before this function is invoked.  was having some issues getting the promises to resolve in time though; will revisit and fix that later
    const [fetchedVersionNumber, fetchedManifestPath] =
      await fetchManifestData();
    const response = await fetch(
      `https://www.bungie.net${fetchedManifestPath}`
    );
    const data = await response.json();
    console.log(data);
    // currently only saving one table from the manifest in local store as a proof of concept -- full manifest is larger than firefox will accept (works in Chrome apparently).  looks like DIM only stores the tables that are needed for app functionality, so I'll need to figure out a way to only save the chunks of the manifest that will actually be useful
    set('manifest', data.DestinyActivityDefinition);
  };

  useEffect(() => {
    (async () => {
      const [fetchedVersionNumber, fetchedManifestPath] =
        await fetchManifestData();
      const manifestVersionsMatch = await compareManifestVersion(
        fetchedVersionNumber
      );
      if (manifestVersionsMatch) {
        console.log("it's a match");
        await fetchManifest();
      } else {
        console.log('no match, fixing that');
        set('cacheManifestVersion', fetchedVersionNumber);
        await fetchManifest();
      }
    })();
  }, []);

  return (
    <>
      <p>hi from FetchManfest component</p>
    </>
  );
}
