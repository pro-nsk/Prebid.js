import { registerBidder } from 'src/adapters/bidderFactory';

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
      data: {
        bidId: bid.bidId
      },
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
    bid.netRevenue = serverBody.netRevenue;
    bid.currency = serverBody.currency;

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
