import React, { useReducer, useRef, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import MainImageCarousel from './MainImageCarousel';

export default function ProductImage({ photosData, extended, toggleView }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[X, Y], setXY] = useState([0, 0]);
  const [[w, h], setSize] = useState([0, 0]);
  const { length } = photosData;
  const image = useRef(null);

  // reducer function for button functionality
  const selectImage = (count, action) => {
    // action -> {type: 'changeImage'}
    switch (action.type) {
      case 'next':
        if (count < length) {
          count += 1;
          return count;
        }
        break;
      case 'prev':
        if (count !== 0) {
          count -= 1;
          return count;
        }
        break;
      case 'changeImage':
        count = action.idx;
        return count;
      default:
        return count;
    }
  };

  const [count, dispatch] = useReducer(selectImage, 0);

  // handler to extend the image
  // working process
  const handleClick = () => {
    toggleView(!extended);
    image.current.style.cursor = image.current.style.cursor === 'zoom-out' ? 'zoom-in' : 'zoom-out';
  };

  // zoom function
  const turnOnZoom = (e) => {
    // update image size and turn on magn
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    console.log(elem);
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const moveZoom = (e) => {
    // update cursor position
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    console.log(elem);
    // calculate cursor position on image
    console.log(e);
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div className={extended ? 'ov-imageBox ov-imageBox--extended' : 'ov-imageBox'}>
      <MainImageCarousel photosData={photosData} dispatch={dispatch} selected={count} />
      {/* --end of buttons */}
      <div className={extended ? 'ov-sliderContainer ov-sliderContainer--extended' : 'ov-sliderContainer'}>
        {count > 0 && <GrFormPrevious className="ov-imageBox_prev ov-btn" onClick={() => dispatch({ type: 'prev' })} />}
        {count < length - 1 && <GrFormNext className="ov-imageBox_next ov-btn" onClick={() => dispatch({ type: 'next' })} />}
        {photosData.map((photo, index) => (
          <div
            key={photo.url}
            className={index === count ? 'ov-imageBox_activeItem' : 'ov-imageBox_slideItem'}
            role="button"
            tabIndex="0"
            onKeyPress={handleClick}
            onClick={handleClick}
          >
            <div style={{ position: 'relative' }}>
              <img
                ref={image}
                className={extended ? 'ov-img--extended' : 'ov-imageBox_mainImage'}
                src={photo.url}
                alt="productImage"
                onMouseEnter={extended && index === count ? turnOnZoom : null}
                onMouseMove={extended && index === count ? moveZoom : null}
                onMouseLeave={() => setShowMagnifier(false)}
              />
              {extended && (
                <div
                  className="magnifier"
                  style={{
                    display: showMagnifier ? '' : 'none',
                    position: 'absolute',
                    pointerEvents: 'none',
                    height: `${200}px`,
                    width: `${200}px`,
                    // move element center to cursor position
                    top: `${Y - 200 / 2}px`,
                    left: `${X - 200 / 2}px`,
                    opacity: '1',
                    border: '1px solid lightgray',
                    backgroundColor: 'white',
                    backgroundImage: index === count ? `url('${photo.url})` : 'none',
                    backgroundRepeat: 'no-repeat',

                    // calculate zoomed image size
                    backgroundSize: `${w * 2}px ${h * 2}px`,
                    backgroundPositionX: `${-X * 2 + 200 / 2}px`,
                    backgroundPositionY: `${-Y * 2 + 200 / 2}px`,
                  }}
                />
              )}
            </div>
          </div>
        ))}
        {/* --end of photos slider. each image live inside it's div */}
      </div>
    </div>
  );
}
