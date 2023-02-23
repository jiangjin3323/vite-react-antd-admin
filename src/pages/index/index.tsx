import React from 'react';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const App: React.FC = () => {
    //全局store
    const store = useSelector(state => state);
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div style={{ width: '100%' }}>
            <Carousel afterChange={onChange}>
                <Link to='/user'>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                </Link>
                <Link to='/login'>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                </Link>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </div>
    );
};

export default App;