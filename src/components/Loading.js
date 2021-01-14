import React from 'react';
import styled from 'styled-components';


const Loading = () => {
    return (
        <React.Fragment>
            <LoadingContainer>
                <div className="animoBouncingLoader"><div /></div>
            </LoadingContainer>
            <div className="mask" />
        </React.Fragment>
    );
}

const LoadingContainer = styled.div`
    width:100%;
    height:100%;
    max-width: none !important;
    display:flex;
    position:fixed;
    top:0;
    left:0;
    z-index:99999;
    justify-content:center;
    align-items:center;
    /* loading animation */
    .animoBouncingLoader::after,
    .animoBouncingLoader::before,
    .animoBouncingLoader>div{
        display:inline-block;
        width:13px;
        height:13px;
        background:#00A0E2;
        border-radius:50%;animation:bouncing-loader .6s infinite alternate}
        .animoBouncingLoader::after,
        .animoBouncingLoader::before,
        .animoBouncingLoader>div{content:''}
        .animoBouncingLoader>div{margin:0 5px}
        .animoBouncingLoader>div{animation-delay:.2s}
        .animoBouncingLoader::after{animation-delay:.4s}
        @keyframes bouncing-loader{
            to{opacity:.1;transform:translate3d(0,-16px,0)}
        }
`;

export default Loading;