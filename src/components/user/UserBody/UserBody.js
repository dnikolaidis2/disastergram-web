// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

import './userbody.css';

export default class UserBody extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;

    this.state = {
      photos: [
        {id: 1, name: 'img1name', url: 'http::/1234' },
        {id: 2, name: 'img2name', url: 'http::/2234' },
        {id: 3, name: 'img3name', url: 'http::/3234' },
        {id: 4, name: 'img4name', url: 'http::/4234' },
        {id: 5, name: 'img5name', url: 'http::/5234' },
      ],
    }
  }

  render() {
    const photos = this.state.photos;
    // alert(photos)
    // alert(this.state.photos)
    // alert(photos[0])
    alert(typeof photos)

    return(
      <header id='userbody'>
        {TopBanner()}
        {GalleryShowcase(this.state.photos)}
      </header>
    );
  }


}

function TopBanner() {

  return (
    <picture className='top-banner'>
      <div className='top-banner_image'/>
    </picture>    
  );
}

function GalleryShowcase(photos){

  let galleryName = 'Gallery Name';

  return (
    <article className='gal-showcase'>
      <h3 className='gal-showcase__title'>
        {galleryName}
      </h3>
      <section className='gal-showcase__body'>
        <Thumbnails photos={photos}/>
      </section>
    </article>
  );
}

function Thumbnails(photos){
  return photos.map( photo => {
    Thumbnail(photo);
  });
}

function Thumbnail(photo){
  return(
    <div className='thumbnail'></div>
  );
}