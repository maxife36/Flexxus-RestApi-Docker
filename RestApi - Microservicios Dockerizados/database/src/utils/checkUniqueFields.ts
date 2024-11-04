import {
  Model,
  ModelStatic,
  Op,
  WhereAttributeHash,
  WhereOptions,
} from "sequelize";
import { ValidationError } from "class-validator";

type DtoInstance = { [key: string]: any };

export default async function checkUniqueFields<T extends Model>(
  modelClass: ModelStatic<T>,
  dtoInstance: DtoInstance
): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const uniqueFields: string[] = [];

  // Obtengo los atributos únicos desde la clase del modelo
  const modelAttributes = modelClass.getAttributes();

  for (const [field, attributeProps] of Object.entries(modelAttributes)) {
    if (attributeProps.unique && dtoInstance[field]) {
      uniqueFields.push(field);
    }
  }

  // Creo condiciones OR para los campos únicos
  if (uniqueFields.length > 0) {
    const orConditions: WhereOptions<T>[] = uniqueFields.map(
      (field) => ({ [field]: dtoInstance[field] } as WhereAttributeHash<T>)
    );

    const existingEntry = await modelClass.findOne({
      where: { [Op.or]: orConditions },
    });

    // Si hay coincidencias, creo errores de validación
    if (existingEntry) {
      for (const field of uniqueFields) {
        if (existingEntry.getDataValue(field) === dtoInstance[field]) {
          const error = new ValidationError();
          error.property = field;
          error.constraints = {
            unique: `${field} ya está en uso.`,
          };
          errors.push(error);
        }
      }
    }
  }

  return errors;
}
