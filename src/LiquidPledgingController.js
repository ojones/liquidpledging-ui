import ProviderHelper from "./Web3ProviderHelper"

const liquidpledging = require('liquidpledging');
const LiquidPledging = liquidpledging.LiquidPledging;
const LiquidPledgingState = liquidpledging.LiquidPledgingState;
const EventEmitter = require('events')

const testRPCProvider = 'ws://localhost:8546'
const liquidPledgingContractAddress = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24'

class LiquidPledgingController extends ProviderHelper {

    constructor()
    {
        super()
        this.interval = {}
        this.STATE_CHANGED = "stateChanged"
        this.setupWeb3()
        this.state={} 
    }

    setupWeb3(){
        this.setup([testRPCProvider]).then(()=>{

            this.setupLiquidPledging()

        }).catch((e)=>{console.error(e)})
    }

    setupLiquidPledging()
    {
        console.log("setupLiquidPledging")

        const liquidPledging = new LiquidPledging(this.web3, liquidPledgingContractAddress);
        this.liquidPledgingState = new LiquidPledgingState(liquidPledging);

        setInterval(()=>{ 

            console.log(this.liquidPledgingState.getState())

            this.liquidPledgingState.getState()
            .then((data) => {
                this.state = data
                this.emit(this.STATE_CHANGED)
                console.log("state changed", this.state)
            })
            .catch((error)=>{console.error(error)})

         }, 3000)

    }

    getState(){
        return this.state
    }
}

export default new LiquidPledgingController()
