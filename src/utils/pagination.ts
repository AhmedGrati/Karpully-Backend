import {Meta} from '../generics/meta';
import {PaginationInput} from 'src/generics/pagination.input';
import {
  FindConditions,
  FindManyOptions,
  QueryBuilder,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import {Carpool} from 'src/carpool/entities/carpool.entity';
import {OrderByDirection} from 'src/generics/ordery-by-direction';
import {EntityFieldsNames} from 'typeorm/common/EntityFieldsNames';
import {Logger} from '@nestjs/common';

type KeysMatching<T, V> = NonNullable<
  {[K in keyof T]: T[K] extends V ? K : never}[keyof T]
>;

export class Pagination {
  static async paginate<T>(
    repository: Repository<T>,
    paginationInput: PaginationInput,
    options?: Partial<Record<KeysMatching<T, Object>, Object>>,
    order?: {[P in EntityFieldsNames<T>]?: 'ASC' | 'DESC' | 1 | -1},
  ): Promise<any> {
    const {page, limit} = paginationInput;
    const skip = limit * page - limit;
    let items;
    if (options) {
      const {...conditions} = options;
      items = await repository.find({
        where: conditions,
        skip,
        take: limit,
      });
    } else {
      items = await repository.find({
        skip,
        take: limit,
      });
    }
    const allItems = await repository.find();
    const itemCount = allItems.length;
    const currentPage = page;
    const meta: Meta = {
      itemCount,
      currentPage,
    };
    return {items, meta};
  }

  static async paginateQueryBuilder<T>(
    queryBuilder: SelectQueryBuilder<T>,
    repository: Repository<T>,
    paginationInput: PaginationInput,
  ): Promise<any> {
    const {page, limit} = paginationInput;
    const skip = limit * page - limit;
    const items = await queryBuilder.take(limit).skip(skip).getMany();
    const allItems = await repository.find();
    const itemCount = allItems.length;
    const currentPage = page;
    const meta: Meta = {
      itemCount,
      currentPage,
    };
    return {items, meta};
  }

  //     static async queryBuilderPaginate<T>(
  //     queryBuilder: SelectQueryBuilder<T>,
  //     paginationInput: PaginationInput,
  //     options?: Partial<Record<KeysMatching<T, Object>, Object>>,
  //     orders?: [string],
  //     orderByDirection?: OrderBy | OrderBy.ASC
  //     ): Promise<any> {
  //         const {page, limit} = paginationInput;
  //         const skip = (limit * page) - limit;
  //         let items =await queryBuilder
  //                     .take(limit)
  //                     .skip(skip)
  //                     .orderBy(orders[0], orderByDirection);

  //         orders.forEach((order) => {
  //             if(order !== order[0]) {
  //                 items = items.addOrderBy()
  //             }
  //         })

  //         const itemCount = items.length;
  //         const currentPage = page;
  //         const meta: Meta = {
  //             itemCount, currentPage
  //         };
  //         return {items, meta};
  // }
}
