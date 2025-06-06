if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

if [ -z "$HASURA_GRAPHQL_DATABASE_URL" ]; then
    echo "❌ Error: HASURA_GRAPHQL_DATABASE_URL is not set or empty in .env file!"
    echo "💡 Please add HASURA_GRAPHQL_DATABASE_URL=your_database_url to your .env file"
    exit 1
fi

echo "🚀 Starting Hasura with environment variables..."

docker run -d -p 8080:8080 \
  -e HASURA_GRAPHQL_DATABASE_URL="$HASURA_GRAPHQL_DATABASE_URL" \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  -e HASURA_GRAPHQL_DEV_MODE=true \
  -e HASURA_GRAPHQL_ENABLED_LOG_TYPES=startup,http-log,webhook-log,websocket-log,query-log \
  hasura/graphql-engine:latest

echo "🚀 Hasura GraphQL Engine starting..."