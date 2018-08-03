import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

export default new AxiosMockAdapter(axios, { delayResponse: 1000 })
