import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    vus: 10,
    duration: '30s',
}

export default function () {
    const res = http.get('http://localhost:3333')
    check(res, {
        'Deve receber status code: 200': (r) => r.status === 200
    })

    sleep(1)
}
