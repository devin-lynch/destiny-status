'use client';

import { useState, useEffect } from 'react';
import Item from './Item';

type Props = {
  itemDefinitions: {
    [key: number]: {
      displayProperties: {
        name: string;
        icon: string;
      };
      itemTypeAndTierDisplayName: string;
    };
  };
  itemHashes: number[];
  itemInstanceIds: number[];
};

export default function Character({
  itemDefinitions,
  itemHashes,
  itemInstanceIds,
}: Props) {
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>();

  console.log('characters instance ids', itemInstanceIds);

  useEffect(() => {
    if (itemDefinitions) {
      const itemComponents = itemHashes.map((item, i) => {
        return (
          <div key={i}>
            <Item
              item={itemDefinitions[item]}
              itemInstanceId={itemInstanceIds[i]}
            />
          </div>
        );
      });
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions, itemHashes]);

  return <div className="w-100">{itemComponents}</div>;
}
