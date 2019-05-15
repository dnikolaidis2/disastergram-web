// ** Main modules
import React from 'react';

export default class Thumbnail extends React.Component {
	constructor(props) {
		super(props);

		this.handleThumbClick = this.props.handleThumbClick;

		this.state = {
			isVis: false
		}

		this.show = this.show.bind(this);
	}

	componentWillMount(){
		var that=this;
		setTimeout( () => {
			that.show();
		}, that.props.wait);
	}

	show(){
		this.setState({isVis: true})
	}

  render() {
    
    const { id,  url, index, wait } = this.props;
    const isVis = this.state.isVis;

    const style = {
      opacity: isVis ? '1' : '0' ,
      top: isVis ? '0px' : '20px',
    }
    
    return(
      <img 
        key={id} 
        alt={id}
        src={url} 
        className='thumbnail_gallery' 
        onClick={this.handleThumbClick.bind(this, id)}
        style={style}></img>
    );

  }
}