export const enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204, 

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    
    INTERNAL_SERVER_ERROR = 500,
  }
  
  export const enum ErrorMessage {
    UNAUTHORIZED_ACCESS = "Unauthorized access",
    FORBIDDEN = "You do not have permission to access this resource",
    NOT_FOUND = "Resource not found",
    BAD_REQUEST = "Bad request",
    INTERNAL_SERVER_ERROR = "An internal server error occurred",
  }
  
  export const enum SuccessMessage {
    RESOURCE_CREATED = "Resource created successfully",
    RESOURCE_UPDATED = "Resource updated successfully",
    RESOURCE_DELETED = "Resource deleted successfully",
    OPERATION_SUCCESSFUL = "Operation completed successfully",
  }