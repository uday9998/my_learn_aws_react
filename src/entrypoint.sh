#!/bin/sh
set -e

log() {
  echo "[entrypoint] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

ENV_FILE="/app/.env"

log "Container starting..."

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
  log ".env file already exists at $ENV_FILE. Skipping secret fetch."
else
  log ".env file not found. Preparing to fetch from AWS Secrets Manager."

  # Validate SECRET_ID
  if [ -z "$SECRET_ID" ]; then
    log "ERROR: SECRET_ID environment variable is not set."
    exit 1
  fi

  log "Fetching secret '$SECRET_ID' from AWS Secrets Manager..."

  SECRET=$(aws secretsmanager get-secret-value \
    --secret-id "$SECRET_ID" \
    --query SecretString \
    --output text > "$ENV_FILE")

  chmod 600 "$ENV_FILE"

  log "Successfully created .env file at $ENV_FILE"
fi

log "Starting application: $*"

exec "$@"