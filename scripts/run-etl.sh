set -e

echo "[ETL] Starting ETL run at $(date)"

docker compose run --rm backend node src/ingestion/runOnce.js

echo "[ETL] Finished ETL run at $(date)"
