import { ItemModel } from './item.model';


export class ItemInstanceModel {
    constructor(
        public item: ItemModel,
        public number: number
    ) {}
}