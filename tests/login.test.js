// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from 'k6/http';

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep, check } from 'k6';

const postLogin = JSON.parse(open ('../fixtures/postLogin.json'))

export const options = {

    stages: [
        { durations: '5', target: 10 },
        { durations: '20s', target: 10 },
        { durations: '5s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Valida que o status code é 200': (r) => r.status === 200,
        'Valida que o Token é uma string': (r) => typeof (r.json().token) === 'string'
    });


    sleep(1);
}