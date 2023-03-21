export default async function handler(req, res) {
  const url = 'https://oauth-klaviyo.ngrok.io/api/events';
  const klaviyoResponse = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        revision: '2023-02-22',
        // Eventually need to pass relevant OAuth token here
        Authorization: 'Bearer QjwmukyDfz3nzCxtYafllFOOvF4C1g'
      }
    },
  );
  const myJSON = await klaviyoResponse.json();
  console.log(`my JSON is ${JSON.stringify(myJSON)}`);
  res.status(200).json({ text: 'Hello' });
}