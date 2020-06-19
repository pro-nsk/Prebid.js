import {expect} from 'chai'
import {spec} from 'modules/qwarryBidAdapter.js'
import {newBidder} from 'src/adapters/bidderFactory.js'

const REQUEST = {
  'bidder': 'qwarry',
  'sizes': [[720, 480]],
  'renderMode': 'video',
  'params': {
    zoneToken: 'f4ae4e4c-8d27-41fb-92d8-c62104d03ea1'
  }
}

const serverResponse = {
  ad: '',
  requestId: 1111,
  cpm: 2.4,
  currency: 'USD',
  width: 720,
  height: 480,
  ttl: 200,
  creativeId: 1,
  netRevenue: true,
  winUrl: 'https://event-logger.kantics.co/event/win?id=H4sIAAAAAAAAAGNgZmBgLJrb5FfJwMgAAYwYDGYGRvuDr1vldgS-YbRM0rj_5bTTnDZ9juNrUzLEGLDoAwAZjHHDVQAAAA==&zoneId=1',
  format: 'video',
}

describe('qwarryBidAdapter', function () {
  const adapter = newBidder(spec)

  describe('isBidRequestValid', function () {
    it('should return true when required params found', function () {
      expect(spec.isBidRequestValid(REQUEST)).to.equal(true)
    })

    it('should return false when required params are not passed', function () {
      let bid = Object.assign({}, REQUEST)
      delete bid.params
      expect(spec.isBidRequestValid(bid)).to.equal(false)
    })
  })

  describe('buildRequests', function () {
    let bidRequests = [REQUEST]

    const request = spec.buildRequests(bidRequests, {})

    it('sends bid request to ENDPOINT via GET', function () {
      expect(request[0].method).to.equal('GET')
    })
  })

  describe('interpretResponse', function () {
    let bidderRequest = {
      bidderCode: 'bidderCode',
      bids: []
    }

    it('handles native request : should get correct bid response', function () {
      const result = spec.interpretResponse({body: nativeServerResponse}, NATIVE_REQUEST)
      expect(result[0]).to.have.property('cpm').equal(0.3)
      expect(result[0]).to.have.property('width').to.be.below(2)
      expect(result[0]).to.have.property('height').to.be.below(2)
      expect(result[0]).to.have.property('mediaType').equal('native')
      expect(result[0]).to.have.property('native')
    })

    it('should get correct bid response', function () {
      const result = spec.interpretResponse({body: serverResponse}, REQUEST)
      expect(result[0]).to.have.property('cpm').equal(0.3)
      expect(result[0]).to.have.property('width').equal(300)
      expect(result[0]).to.have.property('height').equal(250)
      expect(result[0]).to.have.property('mediaType').equal('banner')
      expect(result[0]).to.have.property('ad')
    })

    it('handles nobid responses', function () {
      const nobidServerResponse = {bids: []}
      const nobidResult = spec.interpretResponse({body: nobidServerResponse}, bidderRequest)
      // console.log(nobidResult)
      expect(nobidResult.length).to.equal(0)
    })
  })
})
