import React, { Component } from 'react'
import { Styles, Currency, Icons, Merge } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'

class DelegateHeader extends Component {

    constructor(props){
        super()
    }

    onToggle=()=>
    {
        this.props.onToggle(!this.props.colapsed)
    }

    onAddButton=()=>
    {
        let transferData={
            giverName:this.props.name,
            emiterId:0,
            recieverId:this.props.adminId,
            amount:undefined
        }

        Caller.showTransferDialog(transferData)
    }

    onCancel=()=>
    {
        let cancelData={
            giverName:this.props.name,
            emiterId:0,
            recieverId:this.props.adminId,
            amount:this.props.availableAmount
        }

        Caller.showCancelDialog(cancelData)
    }
   
    render() {
        let toggleIcon = <Icons.colapsed size={20}/>

        if(this.props.colapsed)
        {
            toggleIcon =<Icons.shown size={20}/>
        }

        let colapseButton = <div style = {Styles.emptyButton} />
        if(this.props.showColapseButton)
        {
            colapseButton = (
                <IconButton
                    onClick = {this.onToggle}>
                    {toggleIcon}
                </IconButton>)
        }

        let addFundsButton = (
            <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}>

                <Icons.add size={15}/>
            </IconButton>)

        let CancelDelegateButton = (
            <IconButton
                onClick = {this.onCancel}
                style = {{color:'grey'}}>
                <Icons.cancel size={15}/>
            </IconButton>)

        return (

            <div style = {Merge(Styles.delegation.header, Styles.delegation.delegateHeader)}>

                <div style = {Styles.delegation.headerCell}>
                     <p key = {"name"}  style= {Styles.delegation.title}>
                        {this.props.name}
                    </p>

                    <p key = {"amount"} style = {Styles.delegation.amount} >
                        {Currency.symbol+ " "+ Currency.format(Currency.toEther(this.props.availableAmount)) +' / '+ Currency.format(Currency.toEther(this.props.assignedAmount))}
                    </p>
                   
                </div>

                <div style = {Styles.delegation.headerCell}>

                   
                </div>

                 <div style = {Merge(Styles.delegation.headerCell, Styles.delegation.row)}>

                    {CancelDelegateButton}
                    {addFundsButton}
                    {colapseButton}
                   

                </div>       
            </div>
        )
    }
}

export default DelegateHeader
