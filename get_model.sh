#!/bin/sh
# download .zip as model.zip
wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1n1sPXvT34yXFLT47QZA6FIRGrwMeSsZc' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1n1sPXvT34yXFLT47QZA6FIRGrwMeSsZc" -O model.zip && rm -rf /tmp/cookies.txt

# extract to folder
unzip model.zip