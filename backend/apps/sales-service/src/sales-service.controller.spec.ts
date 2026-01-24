import { Test, TestingModule } from '@nestjs/testing';
import { SalesServiceController } from './sales-service.controller';
import { SalesServiceService } from './sales-service.service';

describe('SalesServiceController', () => {
  let salesServiceController: SalesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SalesServiceController],
      providers: [SalesServiceService],
    }).compile();

    salesServiceController = app.get<SalesServiceController>(SalesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(salesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
