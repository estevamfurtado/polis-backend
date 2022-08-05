import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    schemas: path.resolve(__dirname, '../../schemas'),
    routers: path.resolve(__dirname, '../../routers'),
    middlewares: path.resolve(__dirname, '../../middlewares'),
    controllers: path.resolve(__dirname, '../../controllers'),
    services: path.resolve(__dirname, '../../services'),
    repositories: path.resolve(__dirname, '../../repositories'),
}