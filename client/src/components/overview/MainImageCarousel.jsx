import React, { useState, useEffect, useRef } from 'react';
import { GrFormDown, GrFormUp } from 'react-icons/gr';

function MainImageCarousel({ photosData, dispatch, selected }) {
  const [current, setCurrent] = useState(selected);
  const upButton = useRef(null);
  const downButton = useRef(null);
  const carouselY = useRef(null);

  const scrollUp = () => {
    carouselY.current.scrollBy({
      top: -35,
      behaviour: 'smooth',
    });
  };

  const scrollDown = () => {
    carouselY.current.scrollBy({
      top: 35,
      behaviour: 'smooth',
    });
  };

  useEffect(() => {
    if (current < selected) {
      scrollDown();
    } else {
      scrollUp();
    }
    setCurrent(selected);
  }, [selected, current]);

  useEffect(() => {
    carouselY.current.scrollTo(0, 0);
  }, [photosData]);

  const showNav = () => {
    upButton.current.style.opacity = 0.80;
    downButton.current.style.opacity = 0.80;
  };

  const hideNav = () => {
    upButton.current.style.opacity = 0;
    downButton.current.style.opacity = 0;
  };

  return (
    <div className="ov-carousel_wrapper" onMouseEnter={showNav} onMouseLeave={hideNav}>
      <div
        className="ov-carousel_button"
        style={{ opacity: 0, transition: 'opacity ease-in-out 0.2s' }}
        ref={upButton}
        role="button"
        tabIndex={0}
        onClick={scrollUp}
        onKeyUp={scrollUp}
      >
        <GrFormUp />
      </div>
      <div className="ov-imageBox_thumbnail" ref={carouselY}>
        <div className="ov-imageBox-inside">
          {photosData.map((photo, index) => {
            return (
              <div
                className={current === index ? 'ov-thumbnail ov-thumbnail--active' : 'ov-thumbnail'}
                key={index}
                onClick={()=> dispatch({type: 'changeImage', idx: index})}
                onKeyPress={()=> dispatch({type: 'changeImage', idx: index})}
                role="button"
                tabIndex={0}
              >
                <img
                  alt=""
                  className="ov-thumbnail--image"
                  src={photo.thumbnail_url}/>
              </div>
            )
          })}
        </div>
      </div>
      <div
        className="ov-carousel_button"
        style={{ opacity: 0, transition: 'opacity ease-in-out 0.2s' }}
        ref={downButton}
        role="button"
        tabIndex={0}
        onKeyUp={scrollDown}
        onClick={scrollDown}
      >
        <GrFormDown />
      </div>
    </div>
  );
}

export default MainImageCarousel;