const originalFetch = fetch;
fetch = function () {
  console.log(
    `[NETWORK INTERCEPTOR] fetch request: `,
    JSON.stringify(arguments),
    'network======jsongStringify6666666666666666666',
  );
  return originalFetch
    .apply(this, arguments)
    .then(function (response) {
      console.log(
        `[NETWORK INTERCEPTOR] fetch response: `,
        JSON.stringify(response),
        'network======77777777777777777777777',
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        `[NETWORK INTERCEPTOR] fetch error: `,
        error,
        'network=====11111111111111111',
      );
      throw error;
    });
};

const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function () {
  console.log(
    `[NETWORK INTERCEPTOR] xhr request: `,
    arguments[1],
    'network======19191911999119191919',
  );
  return originalXhrOpen.apply(this, arguments);
};
XMLHttpRequest.prototype.send = function () {
  console.log(
    `[NETWORK INTERCEPTOR] xhr send: `,
    this._url,
    'network======232323232323',
  );
  this.addEventListener('load', function () {
    console.log(
      `[NETWORK INTERCEPTOR] xhr response: `,
      this._responseType != 'blob' ? this.responseText : this.responseURL,
      'network======2525252525',
    );
  });
  return originalXhrSend.apply(this, arguments);
};
