#!/bin/bash
docker exec -ti --user node ciencias-top-frontend-ui-1 sh -c "ng g --defaults service $1"