# Pulumi Import Generator

## Usage

1. Set env vars:
```
export PORT_CLIENT_ID=<your_client_id>
export PORT_CLIENT_SECRET=<your_client_secret>
export PORT_BETA_FEATURES_ENABLED=true # this is required if you want to export pages
```

2. Run the tool - bun is really easy and fast, and you don't need to mess around with transpiling any typescript. If you use devenv, just write `devenv shell` first

```
bun run main.ts
```

3. You now have all the import resources in `*.json` - take a look

```
ls *.tf
cat import_blueprints.json
```

4. Now run pulumi import

```
pulumi import --file ./import_blueprints.json
## Alternatively, pipe directly into a file
pulumi import --file ./import_blueprints.json --out generated.ts
```
