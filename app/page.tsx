import Milestones from './_components/Milestones';

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

  const currentMilestoneHashes = Object.keys(apiMilestoneResponse);

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <p>hi 👋</p>
      <Milestones hashes={currentMilestoneHashes}/>
    </main>
  );
}
