import React from "react";

class Drink extends React.Component{
    render(){
        return <div onClick={this.props.onClick} className="ClickableButton"><div className="drinkname">
            {this.props.drinkname}</div><div className="drinkprice">{this.props.drinkprice}
            </div></div>;
    }
}

export default Drink;