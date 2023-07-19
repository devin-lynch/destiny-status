'use client';

import { useManifestStatus } from '../_hooks/useManifestStatus';
import { useState, useEffect } from 'react';
import { get } from 'idb-keyval';
import Item from './Item';

type Props = {
  characterData: {
    [key: string]: {
      // can come back to fix later -- unsure of how we want the data long-term
      items: any[];
    };
  };
};

export default function Character({ characterData, itemHash }: Props) {
  const [itemDefinitions, setItemDefinitions] = useState();
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>();
  const manifestIsLoaded = useManifestStatus();

  const getItemDefinitions = async () => {
    const manifest = await get('manifest');
    return manifest.DestinyItemInventoryDefinition;
  };

  // sets the manifest table as our state
  useEffect(() => {
    if (!manifestIsLoaded) return;
    (async () => {
      const itemDefinitions = await getItemDefinitions();
      setItemDefinitions(itemDefinitions);
    })();
  }, [manifestIsLoaded]);

  useEffect(() => {
    if (itemDefinitions) {
      const itemComponents = itemHash.map((item, i) => {
        return (
          <li key={i}>
            <Item item={itemDefinitions[item]} />
          </li>
        );
      });
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions]);

  // console.log(itemHash);
  return <main>{itemComponents}</main>;
}
