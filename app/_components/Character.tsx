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
  itemHash: number[];
};

export default function Character({ itemDefinitions, itemHash }: Props) {
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>();

  useEffect(() => {
    if (itemDefinitions) {
      const itemComponents = itemHash.map((item, i) => {
        return (
          <div key={i}>
            <Item item={itemDefinitions[item]} />
          </div>
        );
      });
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions]);

  return <div className="w-60">{itemComponents}</div>;
}
