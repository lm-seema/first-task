import { Component, VERSION, OnInit } from '@angular/core';
// import { PostService } from '../post.service';
import { read, utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  // constructor(private postService: PostService) {}
  // ngOnInit(): void {
  //   this.fetchPosts();
  // }

  // fetchPosts(): void {
  //   this.postService.getAllPosts().subscribe(
  //     (response) => {
  //       this.POSTS = response;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.fetchPosts();
  // }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.fetchPosts();
  // }


  movies: any[] = [];
  title /* create workbook */(_title: any) {
    throw new Error('Method not implemented.');
  }
  name = 'Angular ' + VERSION.major;
  public tableData: any;
  public tableTitle: any;
  // public customPagination = null;
  public recordsPerPage = 5;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 5;
  public totalPageCount = 10;
  public currentPage = 1;
  // public screenSize=19;
  // public   tableSizes: any = [3, 6, 9, 12];

  onPageChange() {
    this.pageStartCount = this.currentPage * this.recordsPerPage;
    this.pageEndCount = this.pageStartCount + this.recordsPerPage;
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
  }
  goToPage(i: number) {
    this.currentPage = i;
    this.onPageChange();
  }
  nextPage() {
    if (this.currentPage < this.totalPageCount - 1) {
      this.currentPage++;
      this.onPageChange();
    }
  }
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.onPageChange();
    }
  }
  

  public uploadData($event: any) {
    console.log($event.target.files[0]);

    const target: DataTransfer = <DataTransfer>(<unknown>$event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {

      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });


      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];


      const data = XLSX.utils.sheet_to_json(ws);
      console.log(data);
      this.tableData = data;
      this.tableTitle = Object.keys(this.tableData[0]);
      this.tableRecords = this.tableData.slice(
        this.pageStartCount,
        this.pageEndCount
      );
      this.totalPageCount = this.tableData.length / this.recordsPerPage;
    };
  }


  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.movies = rows;
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  handleExport() {
    const headings = [[
      // 'id',
      // 'Name',
      // 'Address',
      // 'Salary',
      // 'UserName'
    ]];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.tableRecords, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'TableRecords.xlsx');
  }

}