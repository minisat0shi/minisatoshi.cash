<?php
$config = array(
    // Page title & description for meta data and h1 title
    'page_title' => 'Node status',
    'page_description' => 'Node status: uptime, blockchain and node info for my nodes',
    
    // AbuseIPDB API Key
    //
    // Generate an API key for free: https://www.abuseipdb.com/account/api
    // Verify your website with abuseipdb.com to increase API limits.
    // 
    // 'abuseipdb_apikey' => '80characterapikeyfromabuseipdb',
    //
    // Refresh AbuseIPDB database entries if older than (x) seconds (604800 if not defined)
    // 'abuseipdb_interval' => 604800,
        
    // Database config
    //
    // You should specify a database if DNSBL and/or AbuseIPDB is enabled.
    // Otherwise the script will try to fetch information from DNSBLs and AbuseIPDB 
    // This process can take several minutes. 
    // AbuseIPDB queries are also limited to 5000 checks per day for verified webmasters!
    
    'db_user' => 'databaseuser',
    'db_name' => 'databasename',
    'db_pass' => 'databasepassword',
    'db_table' => 'databasetablename',
    'db_host' => 'localhost',
    'db_port' => 3306,
    
    // Set to 1 to enable DNSBL lookups
    'dnsbl' => 0,
    'peers_per_page' => 20,
    // Refresh DNSBL database entries if older than (x) seconds (604800 if not defined)
    // 'dnsbl_interval' => 604800
    
    
    // List of DNS blacklists to check against
    'dnsbl_lookup' => [
        'all.s5h.net','b.barracudacentral.org','bl.spamcop.net',
        'blacklist.woody.ch','bogons.cymru.com','cbl.abuseat.org',    
        'combined.abuse.ch','db.wpbl.info','dnsbl-1.uceprotect.net',
        'dnsbl-2.uceprotect.net','dnsbl-3.uceprotect.net','dnsbl.dronebl.org',
        'dnsbl.sorbs.net','drone.abuse.ch','duinv.aupads.org','dnsbl.dronebl.org',
        'dul.dnsbl.sorbs.net','dyna.spamrats.com','http.dnsbl.sorbs.net',
        'ips.backscatterer.org','ix.dnsbl.manitu.net','list.dsbl.org','korea.services.net',
        'misc.dnsbl.sorbs.net','noptr.spamrats.com','orvedb.aupads.org',
        'pbl.spamhaus.org','proxy.bl.gweep.ca','psbl.surriel.com',
        'relays.bl.gweep.ca','relays.nether.net','sbl.spamhaus.org',
        'singular.ttk.pte.hu','smtp.dnsbl.sorbs.net','socks.dnsbl.sorbs.net',
        'spam.abuse.ch','spam.dnsbl.anonmails.de','spam.dnsbl.sorbs.net',
        'spam.spamrats.com','spambot.bls.digibase.ca','spamrbl.imp.ch',
        'spamsources.fabel.dk','ubl.lashback.com','ubl.unsubscore.com',
        'virus.rbl.jp','web.dnsbl.sorbs.net','wormrbl.imp.ch',
        'xbl.spamhaus.org','z.mailspike.net','zen.spamhaus.org',
        'zombie.dnsbl.sorbs.net'
    ],
    
     // Your nodes
     // Specify the rpcuser, rpcpassword, rpcport from your bitcoin.conf and set the IP address of your node
    'nodes' => array(
        array(
            'name' => 'mainnet',
            'user' => 'rpcusername',
            'pass' => 'password',
            'ip' => '127.0.0.1',
            'port' => '8332'
        ),
        array(
            'name' => 'testnet',
            'user' => 'rpcusername',
            'pass' => 'password',
            'ip' => '127.0.0.1',
            'port' => '18332'
        )
    )
);
?>