'use client';

type Props = {
  item: {
    displayProperties: {
      name: string;
      icon: string;
    };
    itemTypeAndTierDisplayName: string;
  };
  itemInstanceId: number;
};

export default function Item({ item, itemInstanceId }: Props) {
  console.log('item:', item, 'itemInstanceId:', itemInstanceId);
  return (
    <div className="flex mt-8 items-center">
      <img
        src={`https://bungie.net${item.displayProperties.icon}`}
        alt=""
        style={{ height: '8em' }}
      />
      <div className="text-center grow">
        <p className="text-xl">{item.displayProperties.name}</p>
        <p className="text-sm italic mt-2">{item.itemTypeAndTierDisplayName}</p>
      </div>
    </div>
  );
}
