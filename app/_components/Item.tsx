'use client';

type Props = {
  item: {
    displayProperties: {
      name: string;
      icon: string;
    };
    itemTypeAndTierDisplayName: string;
  };
};

export default function Item({ item }: Props) {
  return (
    <div className="text-center mt-8">
      <p className="text-xl">{item.displayProperties.name}</p>
      <div className="flex justify-center">
        <img
          src={`https://bungie.net${item.displayProperties.icon}`}
          alt=""
          style={{ height: '8em' }}
        />
      </div>
      <p className="text-sm italic mt-2">{item.itemTypeAndTierDisplayName}</p>
    </div>
  );
}
