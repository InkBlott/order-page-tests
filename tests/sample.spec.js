const { expect } = require('chai');

const pageSelectors = {
    url: 'https://order.surfshark.com/',
    currencyDropdown: '[data-test=select-currencies]',
    currencyItems: '[data-test=currency]',
    providerList: '[data-test=provider-list]',
    summary : '[data=test=summary]',
    providerSummary: '[data-test=summary]',
    privacyBeyondButton:'[data-test=button-privacy]',
    values: ['USD', 'EUR', 'AUD', 'CAD', 'CNY', 'GBP'],
    getRandomValue: function(){
        return this.values[Math.floor(Math.random() * this.values.length)]
  }
};

describe('Surfshark order page tests', function () {
    this.timeout(10000);
    let page;
  
    before (async function () {
        page = await browser.newPage();
        await page.setViewport({width: 1280, height: 800});
        await page.goto(pageSelectors.url);
    });
  
    after (async function () {
        await page.close();
    })
  
    it('should change privacy button text on click', async function () {
        await page.waitForSelector(pageSelectors.privacyBeyondButton);
        await page.click(pageSelectors.privacyBeyondButton);
        expect(await page.$eval(pageSelectors.privacyBeyondButton, e => e.innerHTML)).to.be.eql('No thanks');
    });
  
    it('should change all currencies on the page', async function() {
        await page.waitForSelector(pageSelectors.currencyDropdown);
        const value = pageSelectors.getRandomValue();
        await page.select(pageSelectors.currencyDropdown, value);
        await page.waitForSelector(pageSelectors.currencyItems);
        let val = await page.$$eval(pageSelectors.currencyItems, el => {return el.map(e => e.textContent)})
        val.every( i => expect(i).to.be.eql(value));
    });

    it ('should display a summary div when provider item clicked', async function() {
        await page.waitForSelector(pageSelectors.providerList);
        const provider = await page.$(pageSelectors.providerList);
        const providerChildren = await provider.$$(':scope > *');
        const clickIndex = Math.floor(Math.random() * providerChildren.length);
        await providerChildren[clickIndex].click();
        await page.waitForSelector(pageSelectors.providerSummary);
        const summaryItem = await page.$(pageSelectors.providerSummary);
        expect(summaryItem).to.exist
    });
  });