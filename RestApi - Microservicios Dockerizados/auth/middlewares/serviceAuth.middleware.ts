import { Request, Response, NextFunction } from "express";
import TokenUtils from "../utils/tokenUtils";
import { ForbiddenError } from "../../handlers/errors/Errors";

type SignaturePayload = { service: string };

/* 
Esta clase esta diseñada para que en cada instancia se le proporcione el nombre del servicio correspone, y un array con los nombre de los microservicios servicios de los cuales quiero generar middelwares independientes de authorizacion.
Es decir, creara dentro de authMiddlewares, middlewares por cada servicio pasado en el array los cuales permiten el uso de una ruta siempre y cuando provenga del servicio del middleware usado.

A su vez proporciona un metodo que se usa como middleware de aplicacion al final de todas las rutas de cada microservicio en donde proporciona una firma encriptada (jwt) con el nombre del servicio que emitio la respuesta de la peticion
*/
class ServiceAuthMiddleware {
  private authorizedService: string[];
  private currentService: string;
  public authMiddlewares: {
    [key: string]: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => void;
  } = {};

  constructor(currentService: string, authorizedService: string[]) {
    this.currentService = currentService;
    this.authorizedService = authorizedService;
    this.middlewareGenerator()
  }

  private middlewareGenerator() {
    for (const service of this.authorizedService) {
      this.authMiddlewares[service] = ServiceAuthMiddleware.serviceAuthGenerator(service)
    }
  }

  private static serviceAuthGenerator(authorizedService: string) {
    const serviceAuth =  (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const token = req.cookies.originService;        

        if (!token) {
          throw new ForbiddenError();
        }

        const decoded = TokenUtils.decodeToken(token) as SignaturePayload;
        
        if (decoded.service !== authorizedService) {
          throw new ForbiddenError();
        }

        next();
      } catch (error) {
        next(error);
      }
    };

    return serviceAuth
  }

  serviceSignature = (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: SignaturePayload = { service: this.currentService }
      
      const token = TokenUtils.generateToken(payload);
      
      req.cookies.currentService = token

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default ServiceAuthMiddleware;
