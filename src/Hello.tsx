import React, {SyntheticEvent} from 'react'

export interface Props {
    name: string;
    enthousiasmLevel?: number;
}

interface State {
    currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
    state = { currentEnthusiasm: this.props.enthousiasmLevel || 1 }
    
    onIncrement = (event: SyntheticEvent) => {
        this.updateEnthusiasm(1)
    }

    onDecrement = (event: SyntheticEvent) => {
        this.updateEnthusiasm(-1)
    }

    updateEnthusiasm = (change:number) => {
        this.setState((currentState) => {
            return { currentEnthusiasm: currentState.currentEnthusiasm + change }
        })
    }

    render() {
        const { name } = this.props

    const getGreeting = () => {
        return this.state.currentEnthusiasm <= 0 ?(
            <div>
                You could be more enthousiastic...
            </div>) : (
            <div className="greeting">
                Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
            </div>
        ) 
    }
    return (
        <div className="hello">
            {getGreeting()}
            <div className='enthousiasm'>
                Your enthousiasm level is {this.state.currentEnthusiasm}
                <br/>
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.onDecrement}>-</button>
            </div>
        </div>
    )
    }
}

const getExclamationMarks = (numchars: number) => Array(numchars + 1).join("!")

export default Hello
