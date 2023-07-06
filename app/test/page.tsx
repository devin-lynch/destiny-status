import Keyval from '../_components/Keyval';

export default function Test() {
  const apiCall = async () => {
    try {
      const response = await fetch(
        'https://www.bungie.net/Platform/Destiny2/Manifest/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data.Response.version;
    } catch (err) {
      console.warn(err);
    }
  };

  const apiData = apiCall();

  return (
    <div className="mx-auto text-center">
      <p>Hello world</p>
      <p>{apiData}</p>
      <Keyval />
    </div>
  );
}
