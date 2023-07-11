'use client';

import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export default function Milestones({ hash }) {
  const [milestones, setMilestones] = useState();
  const getManifestMilestones = async () => {
    const milestones = await get('manifest');
    setMilestones(milestones);
    // console.log(milestones);
    return milestones;
  };

  useEffect(() => {
    getManifestMilestones();
    // fetchMilestones();
  }, []);

  useEffect(() => {
    if (milestones) {
      console.log(milestones[67076417].displayProperties);
    }
  }, [milestones]);

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
