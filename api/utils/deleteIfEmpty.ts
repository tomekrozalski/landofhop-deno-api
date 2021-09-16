import { lodash } from "lodash";

export function deleteIfEmpty(fields: string[], object: any)  {
  return fields.forEach((field) => {
    if (lodash.isEmpty(lodash.get(object, field))) {
      lodash.unset(object, field);
    }
  });
};
