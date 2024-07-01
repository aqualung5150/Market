import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getAll() {}

  @Get(':keyword')
  async getKeyword(@Param('keyword') keyword, @Query() query) {
    const res = await this.searchService.getProducts({
      keyword,
      categoryId: parseInt(query.categoryId),
      page: query.page ? parseInt(query.page) : undefined,
    });
    return res;
  }
}
