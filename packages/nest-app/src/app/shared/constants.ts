import * as os from 'os';

export const DEFAULT_SERVER_HOSTNAME = 'localhost';
export const DEFAULT_SERVER_PORT = 8080;

export function buildServerUrl(serverOptions: { secure: boolean; host: string; port: number }): string {
    const ipAddresses = getServerIpAddresses();
    const host = serverOptions.host === '0.0.0.0' ? ipAddresses[0] : serverOptions.host;

    return `http${serverOptions.secure ? 's' : ''}://${host}:${serverOptions.port}/`;
}

function getServerIpAddresses(): string[] {
    const interfaces = os.networkInterfaces();
    const addresses = [];

    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];

            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}
