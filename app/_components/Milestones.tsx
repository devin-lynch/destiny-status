"use client";
import { useManifestStatus } from "../_hooks/useManifestStatus";
import { useState, useEffect } from "react";
import { get } from "idb-keyval";
import Milestone from "./Milestone";

type Props = {
  hashes: number[];
};

type MilestoneDefinitions = {
  [key: number]: {
    displayProperties: {
      name: string;
      description: string;
      icon: string;
    };
  };
};

export default function Milestones({ hashes }: Props) {
  const [milestoneDefinitions, setMilestoneDefinitions] =
    useState<MilestoneDefinitions>();
  const [milestoneComponents, setMilestoneComponents] = useState<JSX.Element[]>(
    []
  );
  const manifestIsLoaded = useManifestStatus();

  // console.log(milestoneDefinitions);

  const getMilestoneDefinitions = async () => {
    const manifest = await get("manifest");
    return manifest.DestinyMilestoneDefinition;
  };

  useEffect(() => {
    if (!manifestIsLoaded) return;
    (async () => {
      const milestoneDefinitions = await getMilestoneDefinitions();
      setMilestoneDefinitions(milestoneDefinitions);
    })();
  }, [manifestIsLoaded]);

  useEffect(() => {
    if (milestoneDefinitions) {
      const milestoneComponents: JSX.Element[] = hashes.map((hash, i) => {
        return (
          <li key={i}>
            <Milestone milestoneDefinition={milestoneDefinitions[hash]} />
          </li>
        );
      });
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
