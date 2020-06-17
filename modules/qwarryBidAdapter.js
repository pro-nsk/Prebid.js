import { registerBidder } from 'src/adapters/bidderFactory';

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
    const serverBody = serverResponse.body;

    let bid = {};
    bid.ad = serverBody.ad;
    bid.creativeId = serverBody.creative_id;
    bid.cpm = parseFloat(serverBody.price);
    bid.requestId = serverBody.bidId;
    bid.width = serverBody.width;
    bid.height = serverBody.height;
    bid.ttl = serverBody.ttl;
    bid.netRevenue = true;
    bid.currency = 'USD';

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
