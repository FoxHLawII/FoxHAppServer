import 'module-alias/register';
import Server from './server';

const server = Server.instance;

server.configServer();
server.configRoutes();
server.handleErrors();
server.init();