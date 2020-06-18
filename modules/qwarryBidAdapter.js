import { registerBidder } from 'src/adapters/bidderFactory';
import { deepClone } from '../src/utils';
import { ajax } from '../src/ajax';

const BIDDER_CODE = 'qwarry';
const ENDPOINT = 'https://ui-bidder.kantics.co/bid/adtag?prebid=true&zoneToken='

export const spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],

  isBidRequestValid: function (bid) {
    return bid.params && bid.params.zoneToken;
  },

  buildRequests: function (validBidRequests, bidderRequest) {
    let bid = validBidRequests[0];
    let zoneToken = bid.params.zoneToken;
    return {
      method: 'POST',
      url: ENDPOINT + zoneToken,
      data: {}
    };
  },

  interpretResponse: function (serverResponse, request) {
    const serverBody = serverResponse.body;

    let bid = deepClone(serverBody);
    bid.cpm = parseFloat(serverBody.price);

    return [bid];
  },

  onBidWon: function (bid) {
    if (bid['winUrl']) {
      ajax(bid['winUrl'], null);
      return true;
    }
    return false;
  },
}

registerBidder(spec);
