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
      console.log(data);
      return data.Response.version;
    } catch (err) {
      console.warn(err);
    }
  };

  const apiData = apiCall();

  return (
    <div>
      <p>Hello world</p>
      <p>{apiData}</p>
    </div>
  );
}
