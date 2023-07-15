'use client';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import Milestone from './Milestone';

export default function Milestones({ hashes }) {
  const manifestIsLoaded = useManifestStatus();

  const hashComponents = hashes.map((hash, i: number) => {
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
