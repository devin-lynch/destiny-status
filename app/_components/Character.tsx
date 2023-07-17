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

export default function Character({ characterData }: Props) {
  const [itemDefinitions, setItemDefinitions] = useState();
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>();
  const manifestIsLoaded = useManifestStatus();

  // defines the items of the first character of the user
  const firstCharacterData = characterData['2305843009300009399'].items;

  // defines the manifest table we want
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

  // creates individual item components referencing the manifest for definitions
  useEffect(() => {
    if (itemDefinitions) {
      const itemComponents: JSX.Element[] = firstCharacterData.map(
        (item, i: number) => {
          const itemHash = item.itemHash;
          return (
            <li key={i} style={{ listStyle: 'none' }}>
              <Item item={itemDefinitions[itemHash]} />
            </li>
          );
        }
      );
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions]);

  return (
    <main>
      <div>Character</div>
      {itemComponents}
    </main>
  );
}
