import React from "react";
import LazyLoad from 'react-lazy-load';

export default class FBContent extends React.Component{

  constructor(props){
    super(props);
    this.state = {images: []};
  }

  handleClick(){
    FB.logout(function() {
      this.props.history.go('/facebook')
    }.bind(this));
  }

  getImages(){
    let self = this;
    FB.api(
        "/me/albums",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            response.data.forEach((album) => {
              FB.api(
                `/${album.id}/photos?fields=images` ,
                function (response) {
                  if (response && !response.error) {
                    /* handle the result */
                    response.data.forEach((img) => {
                      let image_object = Object.assign({},
                        {
                          album: album.name,
                          img_id: img.id
                         },
                        {
                          source: img.images.filter((img_dest) => {
                               return 600 == img_dest.width;
                             } )[0]['source']
                        }
                      );
                      self.setState({
                        images: self.state.images.push(image_object) && self.state.images
                      })
                    })
                  }
                }
              );
            })
          }
        }
    );
  }

  componentDidMount(){
    this.getImages();
  }

  render(){
    return (
      <div>
        <button type="button" onClick={this.handleClick.bind(this)}>Logout</button>
        <br/>
        <div>
          <h4>images</h4>
          <div>
            {this.state.images.map((img) => {
              return (
                <LazyLoad key={img.img_id} height={600}>
                  <img src={img.source} />
                </LazyLoad>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
