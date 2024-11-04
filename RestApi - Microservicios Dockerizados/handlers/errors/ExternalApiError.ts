import { ErrorMessage, HttpStatusCode } from "../enums";

export type ExternalserviceError = {
  statusCode: HttpStatusCode;
  message: string;
  [key: string]: any;
};

export class ExternalApiError extends Error {
  [key: string]: any;

  constructor(serviceError :ExternalserviceError) {

    super() 
    
    for (const key in serviceError) {
      if (serviceError.hasOwnProperty(key)) {
        this[key] = serviceError[key]; 
      }
    }

    // Captura el stack de la pila de errores
    Error.captureStackTrace(this, this.constructor);
  }
}
