import {registerBidder} from 'src/adapters/bidderFactory';

const BIDDER_CODE = 'example';
const ENDPOINT = 'https://ui-bidder.kantics.co/bid/adtag?prebid=true&zoneToken='

export const spec = {
  code: BIDDER_CODE,
  aliases: ['ex'], // short code
  isBidRequestValid: (bid) => {
    return bid.params && bid.params.zoneToken;
  },
  buildRequests: (validBidRequests, bidderRequest) => {
    let zoneToken = validBidRequests[0].params.zoneToken;
    return {
      method: 'POST',
      url: ENDPOINT + zoneToken,
      data: {},
    };
  },
  interpretResponse: (serverResponse, request) => {

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
