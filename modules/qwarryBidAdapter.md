# Overview

```
Module Name: Qwarry Bidder Adapter
Module Type: Bidder Adapter
Maintainer: akostritsa@asteriosoft.com
```

# Description

Connects to Qwarry Bidder for bids.
Qwarry bid adapter supports Banner and Video ads.

# Test Parameters
```
var adUnits = [
  {
    code: 'test-div',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300,600]]
      }
    },
    bids: [
      {
          bidder: 'quantumdex',
          params: {
              siteId: 'qwarry-site-id', // siteId provided by Qwarry
          }
      }
    ]
  }
];
```

# Video Test Parameters
```
var videoAdUnit = {
  code: 'test-div',
  sizes: [[640, 480]],
  mediaTypes: {
    video: {
      playerSize: [[640, 480]],
      context: 'instream'
    },
  },
  bids: [
    {
      bidder: 'quantumdex',
      params: {
        siteId: 'qwarry-site-id', // siteId provided by Qwarry
      }
    }
  ]
};
```
