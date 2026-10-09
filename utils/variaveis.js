const configLocal = JSON.parse(open('../config/config.local.json'))

export function pegarBaseURL() {
    return baseURL = __ENV.BASE.URL || configLocal.baseURL;
}