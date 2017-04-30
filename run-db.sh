set -e

docker run \
  -it \
  --rm \
  --publish 5432:5432 \
  --volume data:/var/lib/postgresql \
  --env 'PG_TRUST_LOCALNET=true' \
  sameersbn/postgresql:9.6-2