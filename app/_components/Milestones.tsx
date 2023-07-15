'use client';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import { useState, useEffect } from 'react';
import { get } from 'idb-keyval';
import Milestone from './Milestone';

export default function Milestones({ hashes }) {
  const [milestoneDefinitions, setMilestoneDefinitions] = useState();
  const [milestoneComponents, setMilestoneComponents] = useState([]);
  const manifestIsLoaded = useManifestStatus();

  const getMilestoneDefinitions = async () => {
    const manifest = await get('manifest');
    return manifest.DestinyMilestoneDefinition;
  };

  useEffect(() => {
    (async () => {
      const milestoneDefinitions = await getMilestoneDefinitions();
      setMilestoneDefinitions(milestoneDefinitions);
    })();
  }, []);

  useEffect(() => {
    if (manifestIsLoaded) {
      const milestoneComponents: JSX.Element[] = hashes.map(
        (hash, i: number) => {
          return (
            <li key={i}>
              <p>hi</p>
              <Milestone milestoneDefinition={milestoneDefinitions[hash]} />
            </li>
          );
        }
      );
      setMilestoneComponents(milestoneComponents);
    }
  }, [milestoneDefinitions]);

  return (
    <div>
      {manifestIsLoaded ? (
        milestoneComponents
      ) : (
        <p>Retrieving manifest data from Bungie...</p>
      )}
    </div>
  );
}
