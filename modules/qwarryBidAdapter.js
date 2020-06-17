import {registerBidder} from 'src/adapters/bidderFactory';

const BIDDER_CODE = 'example';

export const spec = {
  code: BIDDER_CODE,
  aliases: ['ex'], // short code
  isBidRequestValid: (bid) => {

  },
  buildRequests: (validBidRequests, bidderRequest) => {

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
