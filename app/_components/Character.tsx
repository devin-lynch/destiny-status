'use client';

import { useState, useEffect } from 'react';
import Item from './Item';
import ItemView from './ItemView';

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
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>([<></>]);

  useEffect(() => {
    if (itemDefinitions) {
      const itemComponents: JSX.Element[] = itemHashes.map((item, i) => {
        let powerLevel = undefined;
        if (itemInstances[itemInstanceIds[i]].primaryStat) {
          powerLevel = itemInstances[itemInstanceIds[i]].primaryStat.value;
        }
        return (
          <Item item={itemDefinitions[item]} powerLevel={powerLevel} key={i} />
        );
      });
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions, itemHashes]);

  const handleViewClick = (currentView: string) => {
    console.log(currentView);
  };

  return (
    <div className="">
      <div className="text-center mt-2">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => handleViewClick('Item View')}
        >
          Item View
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => handleViewClick('Stat View')}
        >
          Stat View
        </button>
      </div>
      <ItemView itemComponents={itemComponents} />
    </div>
  );
}
