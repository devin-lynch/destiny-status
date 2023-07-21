'use client';

import Character from './Character';

type Props = {
  characterData: {
    [key: string]: {
      // can come back to fix later -- unsure of how we want the data long-term
      items: any[];
    };
  };
};

export default function CharacterContainer({ characterData }: Props) {
  const characterIds = Object.keys(characterData);
  const characters = characterIds.map((characterId, i) => {
    const itemHash = characterData[characterId].items.map((item, i) => {
      return item.itemHash;
    });

    return (
      <li key={i} style={{ listStyle: 'none', border: '1px solid purple' }}>
        {/* need to add dynamic character names */}
        <p>CHARACTER</p>
        <Character
          characterData={characterData[characterId]}
          itemHash={itemHash}
        />
      </li>
    );
  });

  return (
    <main className="text-center w-1/2">
      <div className="flex">{characters}</div>
    </main>
  );
}
