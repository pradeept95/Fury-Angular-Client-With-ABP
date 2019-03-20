import { SunriseBankTemplatePage } from './app.po';

describe('SunriseBank App', function() {
  let page: SunriseBankTemplatePage;

  beforeEach(() => {
    page = new SunriseBankTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
