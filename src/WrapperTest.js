import React, { Component } from 'react'
import Wrapper from "./FakeWrapper.js"

class WrapperTest extends Component {

    constructor(){
        super()

        Wrapper.on(Wrapper.STATE_CHANGED, this.onStateChanged)
        this.state={data:[1,2,3]}
    }

    onStateChanged=()=>{

        let data = Wrapper.getData()
        this.setState({data:data})
    }

    render() {
        return (
            <div >
                <h1> {this.state.data.toString()} </h1>
            </div>
        )
    }
}

export default WrapperTest
