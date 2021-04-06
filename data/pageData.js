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

const pageText={
    privacyBeyondButtonTextRefuse:'No thanks'
};

module.exports = {pageSelectors, pageText}
