const TIMEOUT = 3000;  
const MAX_RETRY_ATTEMPTS = 5;

const fetchWithTimeout = (url, options, timeout = TIMEOUT) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
};

const processPayment = async (token, attempts) => {
    if (attempts > MAX_RETRY_ATTEMPTS) {
        return {
            status: 500,
            message: 'Server error'
        }
    }

    try {
        const response = await fetchWithTimeout(`https://localhost:${process.env.EPAY_PORT}/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });

        if (response.status === 500) {
            throw new Error('Server error');
        }

        return {
            status: response.status,
            message: await response.json()
        }
    }
    catch (err) {
        await new Promise((resolve) => setTimeout(resolve, TIMEOUT));
        return processPayment(token, attempts + 1);
    }
};

module.exports = processPayment;
