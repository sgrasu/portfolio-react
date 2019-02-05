#/bin/bash

#update photo info json
python3 ./photoscript.py

#upload files
pushd ../
npm run build && aws s3 cp build/ s3://www.stefangrasu.com --recursive --acl public-read
aws s3 sync photos/thmbnl s3://www.stefangrasu.com/photos/thmbnl --acl public-read --delete
aws s3 sync photos/full s3://www.stefangrasu.com/photos/full --acl public-read --delete

#invalidate CDN edge caches
aws cloudfront create-invalidation --distribution-id E32UVXXQS187WI --paths /index.html /assets/data.JSON /photos/*
popd