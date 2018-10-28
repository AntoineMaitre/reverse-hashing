import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hash')
  root(@Query('string') providedString: any): number {
    return this.appService.hashMethod(providedString);
  }

  @Get('resolve')
  async resolver(@Query('hash') hash): Promise<string> {
    // cast the query hash to number
    const providedHash = parseInt(hash, 10);
    // actually call the service to perform the reverse job
    return await this.appService.resolve(providedHash);
  }
}
