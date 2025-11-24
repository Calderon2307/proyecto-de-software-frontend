import {Types} from '@data/types.ts';
import {TypeData} from '@models/types';

export const getTypeDataByName = (typeName: string | null): TypeData | null => {
  if (!typeName) return null;

  return (
    Types.find(
      (type: TypeData) =>
        type.name.toLowerCase() === typeName.toLowerCase(),
    ) || null
  );
}