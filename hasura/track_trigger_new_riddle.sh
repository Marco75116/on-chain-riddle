if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

if [ -z "$HASURA_METADATA_ENDPOINT" ]; then
    echo "❌ Error: HASURA_METADATA_ENDPOINT is not set or empty in .env file!"
    echo "💡 Please add HASURA_METADATA_ENDPOINT= to your .env file"
    exit 1
fi

echo "🔄 Tracking 'trigger_new_riddle' table in Hasura..."

curl -X POST \
  "$HASURA_METADATA_ENDPOINT" \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "pg_track_table",
    "args": {
      "source": "default",
      "table": {
        "name": "trigger_new_riddle",
        "schema": "public"
      }
    }
  }'

echo ""
echo "✅ trigger_new_riddle table tracking request sent!"

echo ""
echo "🔄 Tracking 'answer_attempt' table in Hasura..."

curl -X POST \
  "$HASURA_METADATA_ENDPOINT" \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "pg_track_table",
    "args": {
      "source": "default",
      "table": {
        "name": "answer_attempt",
        "schema": "public"
      }
    }
  }'

echo ""
echo "✅ answer_attempt table tracking request sent!"
echo "🎉 All tables have been tracked successfully!"