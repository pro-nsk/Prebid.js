import { registerBidder } from 'src/adapters/bidderFactory';

const BIDDER_CODE = 'example';

export const spec = {
  code: BIDDER_CODE,
  aliases: ['ex'], // short code
  isBidRequestValid: (bid) => {

  },
  buildRequests: (validBidRequests, bidderRequest) => {

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
