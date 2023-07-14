'use client';
import { useState } from 'react';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import Milestone from './Milestone';

export default function Milestones({ hashes }) {
  const [loaded, setLoaded] = useState(false);
  const manifestIsLoaded = useManifestStatus();

  const hashComponents = hashes.map((hash, i) => {
    return (
      <li key={i}>
        <Milestone hash={hash} />
      </li>
    );
  });

  return (
    <div>
      {manifestIsLoaded ? (
        hashComponents
      ) : (
        <p>Retrieving manifest data from Bungie...</p>
      )}
    </div>
  );
}
