import { User } from "@/entities";
import { EntityNotFoundError, BadUserInputError } from "@/errors";
import { FindOneOptions, FindManyOptions } from "typeorm";
import { generateErrors } from "./validation";

type EntityConstructor = typeof User;
type EntityInstance = User;

const entities: Record<string, EntityConstructor> = {
  User
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  return validateAnySaveEntity(instance as InstanceType<T>);
};

export const findEntityByCount = async <T extends EntityConstructor>(
  Constructor: T,
  query: FindManyOptions &
    Partial<Record<"size" | "page" | "select" | "relations" | "where", string>>
): Promise<{
  data: Array<InstanceType<T>>;
  total: number;
}> => {
  const { size, page, select, relations, where, ...restOpts } = query;
  const options = {} as FindManyOptions;
  // 分页
  if (size) {
    options.take = parseInt(size);
    if (page) {
      let skip = (parseInt(page) - 1) * options.take;
      skip = skip < 0 ? 0 : skip;
      options.skip = skip;
    }
  }
  // 选择查询
  if (select) {
    options.select = select.split(",").filter(Boolean);
  }
  // 关联查询
  if (relations) {
    options.relations = relations.split(",").filter(Boolean);
  }
  // 搜索查询
  if (where) {
    options.where = where
      .split(",")
      .filter(Boolean)
      .reduce((memo, prev) => {
        const [key, value] = prev.split("=");
        memo[key] = value;
        return memo;
      }, {} as Record<string, string>);
  }

  const [data, total] = await Constructor.findAndCount({
    ...options,
    ...restOpts
  });

  return {
    data,
    total
  };
};

export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  options?: FindOneOptions
): Promise<InstanceType<T>> => {
  const instance = await Constructor.findOne(id, options);
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance;
};

export const validateAnySaveEntity = async <T extends EntityInstance>(
  instance: T
): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ("validations" in Constructor) {
    const errorFields = generateErrors(instance, Constructor.validations);
    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }

  return instance.save();
};

export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>
) => {
  const instance = await findEntityOrThrow(Constructor, id);
  Object.assign(instance, input);
  return validateAnySaveEntity(instance);
};

export const deleteEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  await instance.remove();
  return instance;
};
