import { ValidationError as ClassValidatorValidationError } from 'class-validator';
import { ValidationError } from './errors/Errors';

export type ValidationMessage = {
    property: string;
    constraints: Record<string, string>; 
}

export const ValidationErrorHandler = (errors: ClassValidatorValidationError[]) => {
    const errorMessages: ValidationMessage[] = errors.map(error => ({
        property: error.property,
        constraints: error.constraints || {}, 
    }));
    
    return new ValidationError(errorMessages); 
}
