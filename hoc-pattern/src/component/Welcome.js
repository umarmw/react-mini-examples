import React from 'react';
class Welcome extends React.Component{
    render(){
        return(<div> Welcome {this.props.user}</div>)
    }
}

// propsProxy HOC
const withUser = (WrappedComponent) => {
    return class extends React.Component {
        render(){
            if(this.props.user){
                return (<WrappedComponent { ...this.props}></WrappedComponent>)
            }
            return <div>Welcome Guest!</div>
        }
    }
}

//  inheritanceInversion HOC
const withLoader = (WrappedComponent) => {
    return class extends WrappedComponent {
        render(){
            const {isLoaded} = this.props;
            if(!isLoaded){
                return <div>Loading ...</div>
            } else{
                return super.render();
            }
            
        }
    }
}

export default withLoader(withUser(Welcome));