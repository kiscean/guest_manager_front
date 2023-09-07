import React from 'react';

import { Carousel } from 'antd';

import './Hello.css';

const Hello = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <Carousel afterChange={onChange} autoplay className='startcarusel'>
            <div>
                <h3 className='content'>1</h3>
            </div>
            <div>
                <h3 className='content'>2</h3>
            </div>
            <div>
                <h3 className='content'>3</h3>
            </div>
            <div>
                <h3 className='content'>4</h3>
            </div>
        </Carousel>
    );
};
export default Hello;