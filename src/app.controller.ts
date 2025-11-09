import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
// this is know as controller, get and post decorator.
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  // Get request
  @Get()
  getallReports(@Param('type') type: string) {
    const reporttype =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reporttype);
  }

  // get request on specific id's
  @Get(':id')
  incomeReport(@Param('type') type: string, @Param('id') id: string) {
    const reporttype =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type === reporttype)
      .find((report) => report.id === id);
  }

  //post request ( requesting the data from the user.)
  @Post()
  CreateReport(
    @Body() { amount, source }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    console.log(newReport);
    return newReport;
  }

  // put request ( used for updating the data. )
  @Put(':id')
  updateReport(@Param('id') id: string) {
    return 'This is the put request for updating the data.';
  }

  @Delete(':id')
  deleteReport() {
    return 'delete the report using delete method.';
  }
}

// controller help to appent the url path
// write in the controller (report/income)
// http://localhost:3000/report/income

// if we set @controller("url/path") it works on every url request append after the PORT number and thier specific url path append.

/// get request by id : http://localhost:3000/reports/income/dhhdihfdh
