FROM hasura/graphql-engine:latest

# Install curl for API calls
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create JSON payloads for table tracking
RUN echo '{"type": "pg_track_table", "args": {"source": "default", "table": {"name": "trigger_new_riddle", "schema": "public"}}}' > /track_trigger.json
RUN echo '{"type": "pg_track_table", "args": {"source": "default", "table": {"name": "answer_attempt", "schema": "public"}}}' > /track_answer.json

# Create JSON payloads for event triggers
RUN echo '{"type": "pg_create_event_trigger", "args": {"name": "trigger_new_riddle", "source": "default", "table": {"name": "trigger_new_riddle", "schema": "public"}, "webhook": "WEBHOOK_PLACEHOLDER_1", "insert": {"columns": "*"}, "retry_conf": {"num_retries": 0, "interval_sec": 10, "timeout_sec": 60}}}' > /create_trigger1.json
RUN echo '{"type": "pg_create_event_trigger", "args": {"name": "answer_attempt_trigger", "source": "default", "table": {"name": "answer_attempt", "schema": "public"}, "webhook": "WEBHOOK_PLACEHOLDER_2", "insert": {"columns": "*"}, "retry_conf": {"num_retries": 0, "interval_sec": 10, "timeout_sec": 60}}}' > /create_trigger2.json

# Create entrypoint script
COPY <<EOF /entrypoint.sh
#!/bin/bash
set -e

# Start Hasura in background
graphql-engine serve &
HASURA_PID=\$!

# Wait for Hasura to be ready
echo "⏳ Waiting for Hasura to start..."
sleep 15

# Set default values
HASURA_PORT=\${HASURA_PORT:-8080}
RIDDLE_API_PORT=\${RIDDLE_API_PORT:-3000}

# Set webhook URLs (riddle-api endpoints)
WEBHOOK_URL_1="http://riddle-api:\$RIDDLE_API_PORT/trigger_new_riddle"
WEBHOOK_URL_2="http://riddle-api:\$RIDDLE_API_PORT/new_attempt"

# Update webhook URLs in JSON files
sed -i "s|WEBHOOK_PLACEHOLDER_1|\$WEBHOOK_URL_1|g" /create_trigger1.json
sed -i "s|WEBHOOK_PLACEHOLDER_2|\$WEBHOOK_URL_2|g" /create_trigger2.json

# Track tables (ignore if already tracked)
echo "🔄 Tracking 'trigger_new_riddle' table..."
RESPONSE1=\$(curl -s -X POST "http://localhost:\$HASURA_PORT/v1/metadata" -H "Content-Type: application/json" -d @/track_trigger.json)
if echo "\$RESPONSE1" | grep -q "already-tracked"; then
  echo "✅ trigger_new_riddle table already tracked"
else
  echo "✅ trigger_new_riddle table tracked successfully"
fi

echo ""
echo "🔄 Tracking 'answer_attempt' table..."
RESPONSE2=\$(curl -s -X POST "http://localhost:\$HASURA_PORT/v1/metadata" -H "Content-Type: application/json" -d @/track_answer.json)
if echo "\$RESPONSE2" | grep -q "already-tracked"; then
  echo "✅ answer_attempt table already tracked"
else
  echo "✅ answer_attempt table tracked successfully"
fi

echo ""
echo "🎯 Creating event trigger for trigger_new_riddle inserts..."
echo "🔗 Webhook URL: \$WEBHOOK_URL_1"
RESPONSE3=\$(curl -s -X POST "http://localhost:\$HASURA_PORT/v1/metadata" -H "Content-Type: application/json" -d @/create_trigger1.json)
if echo "\$RESPONSE3" | grep -q "already exists"; then
  echo "✅ trigger_new_riddle event trigger already exists"
else
  echo "✅ trigger_new_riddle event trigger created successfully"
fi

echo ""
echo "🎯 Creating event trigger for answer_attempt inserts..."
echo "🔗 Webhook URL: \$WEBHOOK_URL_2"
RESPONSE4=\$(curl -s -X POST "http://localhost:\$HASURA_PORT/v1/metadata" -H "Content-Type: application/json" -d @/create_trigger2.json)
if echo "\$RESPONSE4" | grep -q "already exists"; then
  echo "✅ answer_attempt event trigger already exists"
else
  echo "✅ answer_attempt event trigger created successfully"
fi

echo ""
echo "✅ All tables tracked and event triggers created successfully!"

# Keep Hasura running
wait \$HASURA_PID
EOF

# Make entrypoint executable
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 8080

CMD ["/entrypoint.sh"]