import React from 'react'
import { ClockLoader } from 'react-spinners';

const ComponentWaiter = () => {
    return (
        <div className="component-waiter">
          <ClockLoader color="pink" />
          <style jsx>{`
            .component-waiter {
              margin: 25px 0px 10px 0px;
            }
          `}</style>
        </div>
    );
}

export default ComponentWaiter