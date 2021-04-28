export class PaginationModel {
    // TotalCount : number;
    // PageSize : number;
    // CurrentPages : number;
    // TotalPages : number;
    selectItemsPerPage: number[] = [5, 10, 20, 30, 50];
    pageSize = this.selectItemsPerPage[0];
    pageNumber = 1;
    allItemsLength = 0;
}