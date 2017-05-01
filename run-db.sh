set -e

docker run \
  -it \
  --rm \
  --publish 5432:5432 \
  --env 'PG_TRUST_LOCALNET=true' \
  --env 'DB_NAME=wave' \
  --env 'DB_USER=app' \
  --env 'DB_PASS=app' \
  sameersbn/postgresql:9.6-2