
import axios from 'axios'
import { BinanceSymbolsResponse } from './BinanceSymbolsResponse'


export const Binance = {
  apiUrl: 'https://www.binance.com/api/v3',
  apiKey: '',
  apiSecret: '',
  wssconnection: null,

  eventsBuffer: [],

  events: [],

  cb: null,

  symbol: 'BNBBTC',


  changeSymbol(symbol) {
    this.symbol = symbol

    this.eventsBuffer = []
    this.events = []

    return this.startFetchData(this.symbol)
  },

  on(topic, cb) {
    this.cb = cb
  },

  getSymbols() {
    // return axios.get('https://www.binance.com/bapi/margin/v1/friendly/margin/symbols')
    return Promise.resolve(BinanceSymbolsResponse)
  },

  getMarketDepth({ symbol, limit }) {
    return axios.get(`${this.apiUrl}/depth?symbol=${this.symbol ? this.symbol : symbol}&limit=${limit}`)
  },

  wssConnect() {
    this.wssconnection = new WebSocket('wss://stream.binance.com/stream')
    this.wssSubscribe()
  },

  wssSubscribe() {
    this.wssconnection.addEventListener('open', () => {
      this.wssconnection.onmessage = (event) => {

        const data = JSON.parse(event.data)

        if (data.stream != (this.symbol.toLowerCase()+"@depth")) {
          return;
        }


        this.eventsBuffer.push(data)

        if (this.depthSnapshot && this.events.length === 0) {
          const { lastUpdateId } = this.depthSnapshot

          const [ firstEvent ] = this.eventsBuffer.filter((eventItem) => {
              const { U , u }  = eventItem.data
              return U <= lastUpdateId + 1 && u >= lastUpdateId + 1
            })
        
            
          if (firstEvent) {
            this.events.push(firstEvent)

            this.cb(firstEvent)

            this.eventsBuffer = []
          }
        }

        if (this.events.length > 0) {
          const index = this.events.length-1
          const prevEvent = this.events[index]
          const { u: lastUpdateId } = prevEvent.data

          const [ subsequentEvent ] = this.eventsBuffer.filter((eventItem) => {
              const { U }  = eventItem.data
              return U === lastUpdateId + 1
            })

          if (subsequentEvent) {
            this.events.push(subsequentEvent)

            this.cb(subsequentEvent)

            this.eventsBuffer = []
          }
        }
      }
        const params = {
          "method":"SUBSCRIBE",
          "params":[
            "!miniTicker@arr@3000ms",
            this.symbol.toLowerCase()+"@aggTrade",
            this.symbol.toLowerCase()+"@kline_1d",
            this.symbol.toLowerCase()+"@depth"
          ],
          "id":1
        }
      this.wssconnection.send(JSON.stringify(params))
    })
  },

  async startFetchData(symbol) {
    this.wssConnect()

    return new Promise ( (resolve)=> {
      setTimeout(async () => {
        const { data } = await this.getMarketDepth({ symbol, limit: 500 })
        this.depthSnapshot = data
        resolve(data)
      }, 3000)
    })
   
    
  }
}
