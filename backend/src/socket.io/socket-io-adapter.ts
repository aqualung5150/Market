import { INestApplicationContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { ChatSocket } from 'src/@types/socket';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    this.logger.log('웹소켓 서버 생성 - socket.io');

    const jwtService = this.app.get(JwtService);
    const server: Server = super.createIOServer(port, options);

    server.of('chat').use(createJwtMiddleware(jwtService, this.logger));

    return server;
  }
}

const createJwtMiddleware =
  (jwtService: JwtService, logger: Logger) => (socket: ChatSocket, next) => {
    const cookief: string = socket.request.headers.cookie;

    if (!cookief) return;
    const cookies = cookief.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
    }, {}) as ReqCookies;

    const token = cookies.access_token;

    try {
      if (!token) {
        throw new Error('no token');
      }
      const payload = jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      socket.userId = payload.id;

      next();
    } catch (err) {
      logger.debug(`REFUSED - ${err.message}`);
      next(new Error(`REFUSED - ${err.message}`));
    }
  };
