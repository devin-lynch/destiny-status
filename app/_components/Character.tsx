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
  itemInstances: {
    [key: string]: {
      primaryStat: {
        value: number;
      };
    };
  };
};

export default function Character({
  itemDefinitions,
  itemHashes,
  itemInstanceIds,
  itemInstances,
}: Props) {
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>();

  useEffect(() => {
    if (itemDefinitions) {
      const itemComponents = itemHashes.map((item, i) => {
        console.log('####', itemInstances[itemInstanceIds[i]]);
        let powerLevel = undefined;
        if (itemInstances[itemInstanceIds[i]].primaryStat) {
          powerLevel = itemInstances[itemInstanceIds[i]].primaryStat.value;
        }
        return (
          <div key={i}>
            <Item
              item={itemDefinitions[item]}
              itemInstanceId={itemInstanceIds[i]}
              powerLevel={powerLevel}
              // powerLevel={4}
            />
          </div>
        );
      });
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions, itemHashes]);

  return <div className="w-100">{itemComponents}</div>;
}
