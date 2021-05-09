export class PaginationModel {
    selectItemsPerPage: number[] = [5, 10, 20, 30, 50];

    totalItems = 0;
    pageSize = this.selectItemsPerPage[2];
    pageNumber = 1;
    totalPages : number;
    hasPrevious: boolean;
    hasNext: boolean;
}