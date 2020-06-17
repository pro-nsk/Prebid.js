# Overview

```
Module Name: Qwarry Bidder Adapter
Module Type: Bidder Adapter
Maintainer: akasheev@asteriosoft.com
```

# Description

Connects to Qwarry Bidder for bids.
Qwarry bid adapter supports Banner and Video ads.

# Test Parameters
```
const adUnits = [
  {
    code: 'test-div',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300,600]]
      }
    },
    bids: [
      {
          bidder: 'qwarry',
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
const videoAdUnit = {
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
      bidder: 'qwarry',
      params: {
        siteId: 'qwarry-site-id', // siteId provided by Qwarry
      }
    }
  ]
};
```
