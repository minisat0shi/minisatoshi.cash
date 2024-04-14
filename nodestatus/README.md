# node-status

Simple node status for Bitcoin Cash nodes as seen on https://status.electroncash.de

## Installation

Edit config.inc.php - run status.sql on a MariaDB database if you want to store the results 
of AbuseIPDB or DNSBL lookups. These lookups can take a long time and AbuseIPDB 
has API limits. You should only enable these options if you have a database.