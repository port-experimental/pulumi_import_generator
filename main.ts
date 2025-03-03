import { getClient } from './src/port_client';
import { generateImportFile } from './src/import_file_generator';
import dotenv from 'dotenv';

if (!process.env.GITHUB_ACTIONS) {
  dotenv.config();
}

async function main() {
  const PORT_CLIENT_ID = process.env.PORT_CLIENT_ID;
  const PORT_CLIENT_SECRET = process.env.PORT_CLIENT_SECRET;

  if (!PORT_CLIENT_ID || !PORT_CLIENT_SECRET) {
    console.log('Please provide env vars PORT_CLIENT_ID and PORT_CLIENT_SECRET');
    process.exit(0);
  }


  try {
    const client = await getClient();
    console.log('fetching actions');
    const { actions } = await client.get('/actions?version=v2');
    console.log('fetching blueprints');
    const { blueprints } = await client.get('/blueprints');
    console.log('fetching scorecards');
    const { scorecards } = await client.get('/scorecards');
    console.log('fetching integrations');
    const { integrations } = await client.get('/integration');
    console.log('fetching webhooks');
    const { integrations: webhooks } = await client.get('/webhooks');
    console.log('fetching pages');
    const { pages } = await client.get('/pages');


    console.log('writing import files');

    await Promise.all([
        generateImportFile('import_actions.json', actions.map(action => ({
            type: 'port:index/action:Action',
            name: action.title,
            id: action.identifier
        }))),
        generateImportFile('import_blueprints.json', blueprints.map(blueprint => ({
            type: 'port:index/blueprint:Blueprint',
            name: blueprint.title,
            id: blueprint.identifier
        }))),
        generateImportFile('import_scorecards.json', scorecards.map(scorecard => ({
            type: 'port:index/scorecard:Scorecard',
            name: scorecard.title,
            id: scorecard.identifier
        }))),
        generateImportFile('import_integrations.json', integrations.map(integration => ({
            type: 'port:index/integration:Integration',
            name: integration.title,
            id: integration.identifier
        }))),
        generateImportFile('import_webhooks.json', webhooks.map(webhook => ({
            type: 'port:index/webhook:Webhook',
            name: webhook.title,
            id: webhook.identifier
        }))),
        generateImportFile('import_pages.json', pages.map(page => ({
            type: 'port:index/page:Page',
            name: page.title,
            id: page.identifier
        })))
    ]);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();