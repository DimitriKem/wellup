
const React = require('react');

module.exports = React.createClass({
    render () {
        return (
            <svg width="0" height="0" style={{position: 'absolute'}}>
                <defs>
                    <rect id="svg-checkbox-path-1" x="0" y="0" width="14" height="14" rx="2"></rect>
                    <mask id="svg-checkbox-mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="14" height="14" fill="white">
                        <use xlinkHref="#svg-checkbox-path-1"></use>
                    </mask>

                    
                    <polygon id="bell-icon-path-closed-1" points="7.45190296 -2.55545635 9.26561146 -2.55545635 9.26561146 19.2729708 7.45190296 19.2729708"></polygon>
                    <mask id="bell-icon-path-mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="1.8137085" height="21.8284271" fill="white">
                        <use xlinkHref="#bell-icon-path-closed-1"></use>
                    </mask>
                    <path d="M13.425977,11.2852028 L13.425977,6.8533498 C13.425977,4.35325263 11.8263402,2.3378579 9.617318,1.77556276 L9.617318,1.20822914 C9.617318,0.563302829 9.08505791,0 8.47567247,0 C7.86533486,0 7.33402693,0.563302829 7.33402693,1.20822914 L7.33402693,1.77556276 C5.12405255,2.3378579 3.52536793,4.35325263 3.52536793,6.8533498 L3.52536793,11.2852028 L2,12.899534 L2,13.7066996 L14.9513449,13.7066996 L14.9513449,12.899534 L13.425977,11.2852028 Z" id="bell-icon-path-closed-3"></path>
                    <mask id="bell-icon-path-mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="12.9513449" height="13.7066996" fill="white">
                        <use xlinkHref="#bell-icon-path-closed-3"></use>
                    </mask>
                    <path d="M8.57308905,17.7714351 C9.98491506,17.7714351 11.1381472,16.5275763 11.1381472,15 L6,15 C6,16.5275763 7.16126304,17.7714351 8.57308905,17.7714351 L8.57308905,17.7714351 Z" id="bell-icon-path-closed-5"></path>
                    <mask id="bell-icon-path-mask-6" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="5.13814724" height="2.77143515" fill="white">
                        <use xlinkHref="#bell-icon-path-closed-5"></use>
                    </mask>
                </defs>
            </svg>
        );
    }
});