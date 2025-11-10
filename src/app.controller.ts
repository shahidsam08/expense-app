import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';


@Controller('report/:type')
export class AppController {
  // Get request [ 'report/:type' ]
  @Get()
  getallReports(@Param('type') type: string) {
    const reporttype =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reporttype);
  }

  // get request: ['report/:type/:id']
  @Get(':id')
  incomeReport(@Param('type') type: string, @Param('id') id: string) {
    const reporttype =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type === reporttype)
      .find((report) => report.id === id);
  }

  // post request: ['report/:type/'] post the data from the frontend to the backend
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

  
  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reporttype =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reporttoUpdate = data.report
      .filter((report) => report.type === reporttype)
      .find((report) => report.id === id);
    if (!reporttoUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === reporttoUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };
    return data.report[reportIndex];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
    return;
  }
}

// controller help to append the url path.
// write in the controller (report/income).
// http://localhost:3000/report/income.

// if we set @controller("url/path") it works on every url request append after the PORT number and thier specific url path append.

/// get request by id : http://localhost:3000/reports/income/dhsdh332323@ghadf
