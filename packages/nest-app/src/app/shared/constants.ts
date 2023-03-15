export const DEFAULT_SERVER_HOSTNAME = 'localhost';
export const DEFAULT_SERVER_PORT = 8080;

export function buildServerUrl(serverOptions: { secure: boolean; host: string; port: number }): string {
    return `http${serverOptions.secure ? 's' : ''}://${serverOptions.host}:${serverOptions.port}/`;
}
