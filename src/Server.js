import { serverIpAddress, serverPort } from './../remoteConfig.json';

export default function Server() {
  const ip = serverIpAddress || 'localhost';
  const port = serverPort || '5000';

  return `${ip}:${port}`;
}
