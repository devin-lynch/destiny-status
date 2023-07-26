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
          <li key={i}>
            <Item item={itemDefinitions[item]} />
          </li>
        );
      });
      setItemComponents(itemComponents);
    }
  }, [itemDefinitions]);

  return <main>{itemComponents}</main>;
}
