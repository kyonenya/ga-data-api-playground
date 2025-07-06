import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = '387252186';
const userPseudoId = '1206635440.1750629547';

async function main() {
  const client = new BetaAnalyticsDataClient({
    keyFilename: './credentials.json',
  });

  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dimensions: [
      { name: 'eventName' },
      { name: 'eventTimestamp' },
    ],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'userPseudoId',
        stringFilter: { value: userPseudoId },
      },
    },
    limit: 100,
  });

  console.log(JSON.stringify(response.rows, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
