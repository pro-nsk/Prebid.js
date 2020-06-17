import { registerBidder } from 'src/adapters/bidderFactory';
import { deepClone } from '../src/utils';

const BIDDER_CODE = 'qwarry';
const ENDPOINT = 'https://ui-bidder.kantics.co/bid/adtag?prebid=true&zoneToken='

export const spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],
  aliases: ['ex'], // short code

  isBidRequestValid: (bid) => {
    return bid.params && bid.params.zoneToken;
  },

  buildRequests: (validBidRequests, bidderRequest) => {
    let bid = validBidRequests[0];
    let zoneToken = bid.params.zoneToken;
    return {
      method: 'POST',
      url: ENDPOINT + zoneToken,
      data: {}
    };
  },

  interpretResponse: (serverResponse, request) => {
    const serverBody = serverResponse.body;

    let bid = deepClone(serverBody);
    bid.cpm = parseFloat(serverBody.price);

    return [bid];
  },

  getUserSyncs: (syncOptions, serverResponses, gdprConsent, uspConsent) => {

  },

  onTimeout: (timeoutData) => {

  },

  onBidWon: (bid) => {

  },
  
  onSetTargeting: (bid) => {

  }
}

registerBidder(spec);