'use client';

import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export default function Milestone({ hash }) {
  const [milestones, setMilestones] = useState();
  const getManifestMilestones = async () => {
    const milestones = await get('manifest');
    return milestones;
  };

  useEffect(() => {
    (async () => {
      const milestones = await getManifestMilestones();
      setMilestones(milestones);
    })();
  }, []);

  const loadedContent = milestones ? (
    <div>
      <p>Milestone: {milestones[hash].displayProperties.name}</p>
      <p>
        Milestone description:
        {milestones[hash].displayProperties.description}
      </p>
      <img
        src={`https://www.bungie.net${milestones[hash].displayProperties.icon}`}
        alt=""
      />
    </div>
  ) : null;

  return <div>{milestones ? loadedContent : 'loading...'}</div>;
}
