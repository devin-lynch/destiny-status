import Milestones from './Milestones';

export default async function FetchMilestones() {
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

  const hashData = await fetchMilestones();

  const hashArray = Object.keys(hashData);

  // console.log(hashArray);

  const hashComponents = hashArray.map((hash, i) => {
    return (
      <li key={i}>
        <Milestones hash={hash} />
      </li>
    );
  });

  return <div>{hashComponents}</div>;
}
