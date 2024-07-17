import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/searchQuery.dto';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getProducts(@Query() query: SearchQueryDto) {
    return await this.searchService.getProducts({
      id: query.id,
      keyword: query.keyword,
      categoryId: query.category,
      page: query.page,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      status: query.status,
      condition: query.condition,
    });
  }

  // @Get('list')
  // async getProductsList() {

  // }
}
