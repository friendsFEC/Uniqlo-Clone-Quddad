import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GrFormDown, GrFormUp } from 'react-icons/gr';

const MainImageCarousel = ({ photosData, dispatch, selected }) => {
  const [current, setCurrent] = useState(selected);
  const upButton = useRef(null);
  const downButton = useRef(null);
  const carouselY = useRef(null);

  useEffect(()=> {
    if (current < selected) {
      scrollDown();
    } else {
      scrollUp();
    }
    setCurrent(selected)
  }, [selected]);

  useEffect(() => {
    carouselY.current.scrollTo(0, 0);
  }, [photosData])

  const handleClick = (index) => {
    dispatch({type: 'changeImage', idx: index})
    setCurrent(index);
  }

  const showNav = () => {
    upButton.current.style.opacity = 0.80;
    downButton.current.style.opacity = 0.80;
  }

  const hideNav = () => {
    upButton.current.style.opacity = 0;
    downButton.current.style.opacity = 0;
  }

  const scrollUp = () => {
    carouselY.current.scrollBy({
      top: -35,
      behaviour: 'smooth'
    });
  }

  const scrollDown = () => {
    let y = carouselY.current.scrollY;
    carouselY.current.scrollBy({
      top: 35,
      behaviour: 'smooth'
    })
  }

  return (
    <div className='ov-carousel_wrapper' onMouseEnter={showNav} onMouseLeave={hideNav}>
      <div
        className='ov-carousel_button'
         style={{opacity: 0, transition: 'opacity ease-in-out 0.2s'}}
         ref={upButton}
         onClick={scrollUp}>
        <GrFormUp />
      </div>
    <div className="ov-imageBox_thumbnail" ref={carouselY}>
      <div className="ov-imageBox-inside" >
        {photosData.map((photo, index) => {
          return (
            <div className={current === index ? 'ov-thumbnail ov-thumbnail--active' : 'ov-thumbnail'} key={index} onClick={()=> handleClick(index)}>
              <img className="ov-thumbnail--image"src={photo.thumbnail_url}/>
            </div>
          )
        })}
      </div>
    </div>
    <div
      className='ov-carousel_button'
      style={{opacity: 0, transition: 'opacity ease-in-out 0.2s'}}
      ref={downButton}
      onClick={scrollDown}>
      <GrFormDown/>
    </div>
    </div>
  )
}

export default MainImageCarousel;