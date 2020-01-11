#!/bin/bash

failures=0
number=0

# never exit
while (("$failures" < 9999));
do
	number=$((260 + RANDOM%(1+380-260)))
	curl -iX PUT --url 'http://192.168.183.128:1026/v2/entities/Light1/attrs/voltaje/value'   --header 'Content-Type: text/plain'   --data $number
	sleep 1
done