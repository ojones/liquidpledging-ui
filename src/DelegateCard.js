import React, { Component } from 'react'
import { Styles, Currency, Icons } from './Styles'
import IconButton from 'material-ui/IconButton'
import Caller from './LiquidPledgingCaller'
import DelegationsList from './DelegationsList'
import GiverCardHeader from './GiverCardHeader'
import Paper from 'material-ui/Paper'
//Todo. this shouldn't be here
import LPState from "./LiquidPledgingState.js"

class DelegateCard extends Component {

    constructor(props){
        super()
        this.state={isHovering:false}
    }

    onToggle=()=>
    {
        this.props.onToggle(!this.props.colapsed)
    }

    onPledges=()=>
    {
        let parentPledgesIds = LPState.getPledgesIdsFromDelegations(this.props.parentDelegations)
        let parentPledges = LPState.getPledgesFromIds(parentPledgesIds)

        let delegatedPledgesIds = LPState.getPledgesIdsFromDelegations(this.props.delegatedDelegations)
        let delegatedPledges = LPState.getPledgesFromIds(delegatedPledgesIds)

        let data = {
            pledgesBlocks:
            [
                {
                    pledges:parentPledges,
                    title:"Assigned"
                },
                {
                    pledges:delegatedPledges,
                    title:"Delegated"
                },
            ],
            title: this.props.delegateNode.name
        }

        Caller.showPledgesDialog(data)
    }

    onAddButton=()=>
    {
        let donateData={
            giverName:this.props.delegateNode.name,
            emiterId:this.props.delegateNode.adminId,
            recieverId:this.props.delegateNode.adminId,
            amount:undefined
        }
        Caller.showDonateDialog(donateData)
    }

    onMouseEnter=()=>
    {
        this.setState({isHovering:true})
    }

    onMouseLeave=()=>
    {
        this.setState({isHovering:false})
    }

    onBackgroundClick=()=>
    {
        //this.props.onToggle(!this.props.colapsed)
    }
   
    render() {

        //let isAdmin = (this.props.currentAddress === this.props.delegateNode.adminAddress)
        /*let toggleIcon = <Icons.colapsed size={20}/>

        if(this.props.colapsed)
        {
            toggleIcon =<Icons.shown size={20}/>
        }*/
/*
        let colapseButton = <div style = {Styles.emptyButton} />
        if(this.props.showColapseButton)
        {
            colapseButton = (
                <IconButton
                    style = {Styles.inline}
                    onClick = {this.onToggle}>
                    {toggleIcon}
                </IconButton>)
        }
*/
        /*let addFundsButton = <div style = {Styles.emptyButton} />

         if(isAdmin)
        {
            addFundsButton = (
                <IconButton
                onClick = {this.onAddButton}
                style = {{color:'grey'}}>

                <Icons.add size={15}/>
            </IconButton>)
        }*/


        //let totalAmount = 0//this.props.delegateNode.assignedAmount
        //let availableAmount = 0//this.props.delegateNode.availableAmount
       // let usedAmount = totalAmount - availableAmount

       /* let actionButons = <div/>

        if(this.state.isHovering)
        {
            actionButons =(
                <div style = {Styles.delegation.actionButons}>
                    {addFundsButton}
                </div>)
        }*/

        //let headerStyle = Merge(Styles.delegation.header, Styles.delegation.rootHeader)

        let delegateddAmount = LPState.getNodeDelegatedAmount(this.props.delegateNode)
        let delegatedText = Currency.symbol+Currency.format(Currency.toEther(delegateddAmount))

        let assignedAmount = LPState.getNodeAssignedAmount(this.props.delegateNode)
        let assignedText = Currency.symbol+Currency.format(Currency.toEther(assignedAmount))

        let assignedDelegationsSubtitle = 'No funds assigned'
        let delegatedDelegationsSubtitle = 'No funds delegated'
        let projectsSubtitle = 'No funds on intended projects'

        if(this.props.delegatesParents.length)
        {
            assignedDelegationsSubtitle = assignedText + ' assigned to you from'
        }

        if(this.props.delegatesChildren.length)
        {
            delegatedDelegationsSubtitle = delegatedText + ' delegated to'
            projectsSubtitle = 'Intended projects'

            if(!this.props.projectsChildren.length)
                projectsSubtitle = 'No funds have been assigned to a Project'
        }

        return ( 
            
            <Paper style={{padding:20, paddingTop:5, marginTop:10, marginBottom:20}} zDepth={1}>

                 
                <GiverCardHeader 
                    node = {this.props.delegateNode}
                    userAddress={this.props.userAddress}
                    showAddFundsButton = {false}
                    />

                 <div style ={Styles.section}>{assignedDelegationsSubtitle}</div>

                <DelegationsList
                    key='IncomingDelegations'
                    treeChildren={this.props.delegatesParents}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <div style ={Styles.space}/>

                <div style ={Styles.section}>{delegatedDelegationsSubtitle}</div>

                <DelegationsList
                    key='Delegations'
                    treeChildren={this.props.delegatesChildren}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <div style ={Styles.space}/>

                <div style ={Styles.section}>{projectsSubtitle}</div>

                <DelegationsList
                    key='Projects'
                    treeChildren={this.props.projectsChildren}
                    indentLevel={-1}
                    userAddress={this.props.currentAddress}
                    defaultColapsed = {false}
                    defaultColapsedRoot={true}/>

                <div style ={Styles.space}/>

                <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'flex-end',
                        alignItems: 'center',
                        color:'grey',
                    }}>

                    <IconButton
                        style = {{float: 'right', color:'grey'}}
                        onClick = {this.onPledges}>
                        <Icons.pledges size={15}/>
                    </IconButton>

                </div>

            </Paper>
        )
    }
}

export default DelegateCard
