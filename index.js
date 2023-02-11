import signupLoad from "./tests/signup-load.js";
import signupSmoke from "./tests/signup-smoke.js";
import { group, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
        http_req_failed: ['rate<0.01'] // 1% das requisições podem ocorrer erro
    }
}

export function handleSummary(data) {
    return {
        "report-k6.html": htmlReport(data),
    };
}

export default () => {
    group('Teste de carga', () => {
        signupLoad()
    })

    group('Teste de fumaça', () => {
        signupSmoke()
    })

    sleep(1)
}