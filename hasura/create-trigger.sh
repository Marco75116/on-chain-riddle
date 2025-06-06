#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

# Check required environment variables
if [ -z "$HASURA_METADATA_ENDPOINT" ]; then
    echo "❌ Error: HASURA_METADATA_ENDPOINT is not set or empty in .env file!"
    echo "💡 Please add HASURA_METADATA_ENDPOINT=http://localhost:8080/v1/metadata to your .env file"
    exit 1
fi

if [ -z "$HASURA_WEBHOOK_URL" ]; then
    echo "❌ Error: HASURA_WEBHOOK_URL is not set or empty in .env file!"
    echo "💡 Please add HASURA_WEBHOOK_URL=http://host.docker.internal:3000/trigger_new_riddle to your .env file"
    exit 1
fi

echo "🎯 Creating event trigger for trigger_new_riddle inserts..."
echo "📡 Metadata endpoint: $HASURA_METADATA_ENDPOINT"
echo "🔗 Webhook URL: $HASURA_WEBHOOK_URL"

# Use double quotes to allow variable expansion
curl -X POST \
  "$HASURA_METADATA_ENDPOINT" \
  -H 'Content-Type: application/json' \
  -d "{
    \"type\": \"pg_create_event_trigger\",
    \"args\": {
      \"name\": \"trigger_new_riddle\",
      \"source\": \"default\",
      \"table\": {
        \"name\": \"trigger_new_riddle\",
        \"schema\": \"public\"
      },
      \"webhook\": \"$HASURA_WEBHOOK_URL\",
      \"insert\": {
        \"columns\": \"*\"
      },
      \"retry_conf\": {
        \"num_retries\": 0,
        \"interval_sec\": 10,
        \"timeout_sec\": 60
      }
    }
  }"

echo ""
echo "✅ Event trigger creation request sent!"

