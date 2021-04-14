import { Meta } from "../generics/meta";
import { PaginationInput } from "src/generics/pagination.input";
import { FindConditions, FindManyOptions, Repository } from "typeorm";
import { Carpool } from "src/carpool/entities/carpool.entity";
import { OrderBy } from "src/generics/ordery-by";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { Logger } from "@nestjs/common";


type KeysMatching<T,V> = NonNullable<
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;


export class Pagination {

    static async paginate<T>(
        repository: Repository<T>,
        paginationInput: PaginationInput, 
        options?: Partial<Record<KeysMatching<T, Object>, Object>>,
        order?: { [P in EntityFieldsNames<T>]?: "ASC" | "DESC" | 1 | -1; }
        ): Promise<any> {
            const {page, limit} = paginationInput;
            const skip = (limit * page) - limit;
            let items;
            if(options) {
                const {...conditions} = options;
                items = await repository.find({
                    order,
                    where:conditions,
                    skip,
                    take: limit,
                });
            } else {
                items = await repository.find({
                    skip,
                    take: limit
                });
            }
            const itemCount = items.length;
            const currentPage = page;
            const meta: Meta = {
                itemCount, currentPage
            };
            return {items, meta};
    }
}