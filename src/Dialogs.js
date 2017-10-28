import React, { Component } from 'react'
import Caller from './LiquidPledgingCaller'
import LPState from "./LiquidPledgingState.js"
import DonateDialog from './DonateDialog'
import TransferDialog from './TransferDialog'
import AddAdminDialog from './AddAdminDialog'
import PledgesDialog from './PledgesDialog'

class Dialogs extends Component {

    constructor()
    {
        super() 
        this.state={
            currentAddress:'',
            donateOpen:false,
            donateData:{reciever:0, emiter:0, amount:0, giverName:'unga'},

            transferOpen:false,
            transferData:{reciever:0, emiter:0, amount:0, giverName:'unga'},
            transferMetadata:{emiters:[]},

            addAdminOpen:false,
            addAdminData:{reciever:0, emiter:0, amount:0, giverName:'unga'},
            addAdminMetadata:{emiters:[]},

            pledgesOpen:false,
            pledgesData:{},
            pledgesMetadata:{emiters:[]}
        }

        LPState.on(LPState.STATE_CHANGED, this.onStateChanged)
        LPState.on(LPState.ACCOUNT_CHANGED, this.onAccountChanged)
        LPState.on(LPState.NETWORK_CHANGED, this.onNetworkChanged)

        Caller.on(Caller.DONATE_DIALOG, this.donateOnShow)
        Caller.on(Caller.TRANSFER_DIALOG, this.transferOnShow)
        Caller.on(Caller.ADD_ADMIN_DIALOG, this.addAdminOnShow)
        Caller.on(Caller.PLEDGES, this.pledgesOnShow)
    }

    onStateChanged=()=>{

        let emiters = LPState.getDelegationsByAddress(this.state.currentAddress)
        let transferMetadata={}
        transferMetadata.emiters=emiters
        this.setState({ transferMetadata:transferMetadata})
    }

    onAccountChanged=()=>{
        this.setState({ currentAddress:LPState.getCurrentAccount()})
    }

    onNetworkChanged=()=>{
        //let newNetwork = LPState.getCurrentNetwork().name
        //this.setState({network:newNetwork})
    }

    //Donate
    donateOnShow=(data)=>
    {
        this.setState({ donateData:data, donateOpen:true})
    }

    donateOnCancel=()=>
    {
        this.setState({  donateOpen:false })
    }

    donateOnDone=(transfer)=>
    {
        this.setState({ donateOpen:false })
        Caller.donate(transfer)
    }

    //Transfer
    transferOnShow=(data)=>
    {
        this.setState({ transferData:data, transferOpen:true})
    }

    transferOnCancel=()=>
    {
        this.setState({ transferOpen:false })
    }

    transferOnDone=(data)=>
    {
        this.setState({  transferOpen:false })
        Caller.transfer(data)
    }

    //AddAdmin
    addAdminOnShow=(data)=>
    {
        this.setState({ addAdminData:data, addAdminOpen:true})
    }

    addAdminOnCancel=()=>
    {
        this.setState({ addAdminOpen:false })
    }

    addAdminOnDone=(data)=>
    {
        this.setState({  addAdminOpen:false })
        Caller.addAdmin(data)
    }

    //Pledges
    pledgesOnShow=(data)=>
    {
        this.setState({ pledgesData:data, pledgesOpen:true})
    }

    pledgesOnCancel=()=>
    {
        this.setState({ pledgesOpen:false })
    }

    render() {
        return (
            <div>            
                <DonateDialog
                    open={this.state.donateOpen}
                    onCancel ={this.donateOnCancel}
                    onDone ={this.donateOnDone}
                    data={this.state.donateData}/>

                <TransferDialog
                    open={this.state.transferOpen}
                    onCancel ={this.transferOnCancel}
                    onDone ={this.transferOnDone}
                    data={this.state.transferData}
                    meta={this.state.transferMetadata}/>

                <AddAdminDialog
                    open={this.state.addAdminOpen}
                    onCancel ={this.addAdminOnCancel}
                    onDone ={this.addAdminOnDone}
                    data={this.state.addAdminData}/>

                 <PledgesDialog
                    open={this.state.pledgesOpen}
                    onCancel ={this.pledgesOnCancel}
                    data={this.state.pledgesData}/>

            </div>
        )
    }
}

export default Dialogs

