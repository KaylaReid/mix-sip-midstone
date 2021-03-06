import React, { Component } from "react";
import { Button, Icon, Input, Divider } from 'semantic-ui-react';
import DataManager from "../../modules/DataManager";




export default class DrinkIngredientCard extends Component {
    state = {
        amount: "",
        edit: false
    }
    
    componentDidMount(){
        this.setState({amount: this.props.drinkIngredient.amount})
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveChanges = () => {
        let changedAmount = {amount: this.state.amount}
        DataManager.patch("drinkIngredients", changedAmount, this.props.drinkIngredient.id)
        .then(() => this.setState({edit: false}))
    }

    removeIngredient = () => {
        DataManager.delete("drinkIngredients", this.props.drinkIngredient.id)
        .then(() => this.props.resetData())
    }

    editIng = () => {
        this.setState({edit: true})
    }

    render(){
        return (
            <div className="drink-ing-card">
            <Divider />
                {
                    !this.state.edit &&
                    <div>
                        <div className="card-top">
                            <h3 className="capitalize font">{this.props.name}</h3>
                            <Button animated basic size="tiny" className="blue-btn-outline font" onClick={this.editIng}>
                                <Button.Content visible><Icon name="edit" /></Button.Content>
                                <Button.Content hidden>Edit</Button.Content>
                            </Button>
                        </div>
                    </div>
                }
                {
                    this.state.edit && 
                    <div>
                        <div className="card-top">
                            <h3 className="capitalize font">{this.props.name}</h3>
                            <Button basic blue animated size="tiny" className="font" onClick={this.removeIngredient}>
                                <Button.Content visible><Icon name="trash alternate outline" /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button>
                        </div>
                        <div className="card-bottom">
                            <Input type="text" className="font box-shadow-light" label={{ content: 'Amount'}} onChange={this.handleFieldChange} id="amount" defaultValue={this.props.drinkIngredient.amount} />
                            <Button basic blue animated size="tiny" className="font" onClick={this.saveChanges}>
                                <Button.Content visible><Icon name="checkmark" /></Button.Content>
                                <Button.Content hidden>Update</Button.Content>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
