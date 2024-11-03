import React from 'react'
import { ClipLoader } from 'react-spinners';

const PageLoader = () => {
    return (
        <div className="page-loader">
          <ClipLoader color="blue" />
          <style jsx>{`
            .page-loader {
              position: absolute;
              top: 100px;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
            }
          `}</style>
        </div>
    );
}

export default PageLoader