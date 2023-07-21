import Milestones from './_components/Milestones';
import CharacterContainer from './_components/CharacterContainer';

export default async function Home() {
  const fetchMilestones = async () => {
    const response = await fetch(
      'https://www.bungie.net/Platform/Destiny2/Milestones/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.Response;
  };

  const apiMilestoneResponse = await fetchMilestones();

  const currentMilestoneHashes = Object.keys(apiMilestoneResponse).map(
    (key) => {
      return parseInt(key);
    }
  );

  const fetchCharacters = async () => {
    const response = await fetch(
      'http://localhost:3000/api/get-bungie-profile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
        body: JSON.stringify({
          membershipType: '3',
          membershipId: '4611686018467284386',
        }),
      }
    );
    const data = await response.json();
    return data.characterEquipment.data;
  };

  const characterData = await fetchCharacters();

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <p>hi 👋</p>
      <CharacterContainer characterData={characterData} />
      <Milestones hashes={currentMilestoneHashes} />
    </main>
  );
}
