/**
 * EasyBitcoin-PHP
 *
 * A simple class for making calls to Bitcoin's API using PHP.
 * https://github.com/aceat64/EasyBitcoin-PHP
 *
 * The MIT License (MIT)
 * Copyright (c) 2013 Andrew LeCody
 * Copyright (c) 2023 Georg Engelmann
 */

class Bitcoin
{
    private $username;
    private $password;
    private $proto;
    private $host;
    private $port;
    private $url;
    private $CACertificate;
    private $id = 0;

    /**
     * @param string $username
     * @param string $password
     * @param string $host
     * @param int $port
     * @param string $proto
     * @param string $url
     */
    public function __construct($username, $password, $host = 'localhost', $port = 8332, $url = null)
    {
        $this->username = $username;
        $this->password = $password;
        $this->host = $host;
        $this->port = $port;
        $this->url = $url;
        $this->proto = 'http';
        $this->CACertificate = null;
    }

    /**
     * Set an optional CA certificate for SSL verification.
     *
     * @param string|null $certificate
     */
    public function setSSL($certificate = null)
    {
        $this->proto = 'https';
        $this->CACertificate = $certificate;
    }

    /**
     * Make a JSON-RPC request to the Bitcoin API.
     *
     * @param string $method
     * @param array $params
     * @return mixed
     * @throws \Exception
     */
    public function request($method, $params = [])
    {
        $this->status = null;
        $this->error = null;
        $this->raw_response = null;
        $this->response = null;
        $this->id++;

        // Build the request, validating method and parameters
        $request = json_encode([
            'method' => $method,
            'params' => $params,
            'id' => $this->id,
        ]);

        // Build the cURL session with proper SSL verification
        $curl = curl_init("{$this->proto}://{$this->host}:{$this->port}/{$this->url}");
        $options = [
            CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
            CURLOPT_USERPWD => $this->username . ':' . $this->password,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_HTTPHEADER => ['Content-type: application/json'],
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $request,
        ];

        if ($this->proto == 'https') {
            if (!empty($this->CACertificate)) {
                $options[CURLOPT_CAINFO] = $this->CACertificate;
                $options[CURLOPT_CAPATH] = dirname($this->CACertificate);
            } else {
                throw new \Exception('SSL certificate required for secure connection.');
            }
        }

        curl_setopt_array($curl, $options);
        $this->raw_response = curl_exec($curl);
        $this->response = json_decode($this->raw_response, true);
        $this->status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $curl_error = curl_error($curl);
        curl_close($curl);

        if (!empty($curl_error)) {
            throw new \Exception($curl_error);
        }

        if ($this->response['error']) {
            throw new \Exception($this->response['error']['message']);
        }

        return $this->response['result'];
    }
}