// ** Main modules
import React from 'react';

export default class Thumbnail extends React.Component {
	constructor(props) {
		super(props);

		this.handleThumbClick = this.props.handleThumbClick;

		this.state = {
			isVis: false,
			loading: false,
		}

		this.toggleShow = this.toggleShow.bind(this);
		this.onImageLoad = this.onImageLoad.bind(this);
	}

	componentWillMount(){
		var that=this;
		setTimeout( () => {
			// that.toggleShow();
		}, that.props.wait);
	}

	compomentDidUpdate(prevProps){
		console.log(prevProps.galID + ' -- ' + this.props.galID)
		if(prevProps.loading !== this.props.loading){
			// this.toggleShow();
			// var that=this;

			// setTimeout( () => {
			// 	that.toggleShow();
			// }, that.props.wait);
		}
	}

	toggleShow(){
		this.setState({isVis: !this.state.isVis})
	}

onImageLoad(){
		if(!this.state.isVis)
			this.toggleShow();
	}

  render() {
    
    const { id,  url, loading } = this.props;
    const isVis = this.state.isVis && !loading;

    const style = {
      opacity: isVis ? '1' : '0' ,
      top: isVis ? '0px' : '20px',
    }

    const className = 'thumbnail_' + this.props.type;
    
    return(
      <img
        key={id} 
        alt={id}
        src={url} 
        className={className} 
        onClick={this.handleThumbClick.bind(this, id)}
        onLoad={this.onImageLoad}
        style={style}></img>
    );

  }
}