import React from 'react'

const PageLoader = () => {
    return (
        <div className="page-loader">
          Loading...
          <style jsx>{`
            .page-loader {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.5);
              opacity:0.1;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 2em;
            }
          `}</style>
        </div>
    );
}

export default PageLoader