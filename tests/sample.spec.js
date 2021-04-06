const pageData = require('../data/pageData.js');
const { expect } = require('chai');

describe('Surfshark order page tests', function () {
    this.timeout(10000);
    let page;
  
    before (async function () {
        page = await browser.newPage();
        await page.setViewport({width: 1280, height: 800});
        await page.goto(pageData.pageSelectors.url);
    });
  
    after (async function () {
        await page.close();
    })
    
    it('should change privacy button text on click', async function () {
        await page.waitForSelector(pageData.pageSelectors.privacyBeyondButton);
        await page.click(pageData.pageSelectors.privacyBeyondButton);
        expect(await page.$eval(pageData.pageSelectors.privacyBeyondButton, e => e.innerHTML)).to.be.eql(pageData.pageText.privacyBeyondButtonTextRefuse);
    });
  
    it('should change all currencies on the page', async function() {
        await page.waitForSelector(pageData.pageSelectors.currencyDropdown);
        const value = pageData.pageSelectors.getRandomValue();
        await page.select(pageData.pageSelectors.currencyDropdown, value);
        await page.waitForSelector(pageData.pageSelectors.currencyItems);
        let val = await page.$$eval(pageData.pageSelectors.currencyItems, el => {return el.map(e => e.textContent)})
        val.every( i => expect(i).to.be.eql(value));
    });

    it ('should display a summary div when provider item clicked', async function() {
        await page.waitForSelector(pageData.pageSelectors.providerList);
        const provider = await page.$(pageData.pageSelectors.providerList);
        const providerChildren = await provider.$$(':scope > *');
        const clickIndex = Math.floor(Math.random() * providerChildren.length);
        await providerChildren[clickIndex].click();
        await page.waitForSelector(pageData.pageSelectors.providerSummary);
        const summaryItem = await page.$(pageData.pageSelectors.providerSummary);
        expect(summaryItem).to.exist
    });
  });