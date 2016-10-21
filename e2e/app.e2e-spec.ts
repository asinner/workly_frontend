import { WorklyPage } from './app.po';

describe('workly App', function() {
  let page: WorklyPage;

  beforeEach(() => {
    page = new WorklyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
