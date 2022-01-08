import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect, Component, ReactNode } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import L from 'leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';

// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined;
  height: number | undefined;
}

export default () => {
  // For timeout example.
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // For map initialization
  const [mapInit, setMapInit] = useState<boolean>(false);
  const [map, setMap] = useState<L.Map>();

  function resizeMap(map: L.Map) {
    var h = document.body.clientHeight;
    var mapHeight = Math.floor(h * 0.75);
    document.getElementById('map')!.style.height = mapHeight + 'px';
    map.invalidateSize(true);
    setMap(map);
  }

  useEffect(() => {
    if (!mapInit) {
      var tempMap = L.map('map').setView([31.028, 121.435], 17);
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            'pk.eyJ1IjoiZnJlZGVyaWNrc3VuIiwiYSI6ImNreTU5bHFzczBmZTAycG9hZTV1YmtlcTUifQ.xQPSws8NDy78VJQ4TwRsZQ',
        },
      ).addTo(tempMap);

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(map);

      resizeMap(tempMap);
      setMapInit(true);
    }
  }, [mapInit]);

  // For auto-resize the map

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      resizeMap(map!);
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // DO NOT Call handler right away so state gets updated with initial window size
    // Because the map is updated async,
    // handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  // Hook example
  function useWindowSize(): Size {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<Size>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  const size: Size = useWindowSize();

  return (
    <PageContainer
      content="这是一个新页面，从这里进行开发！"
      className={styles.main}
    >
      {/* <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div> */}

      <div id="map" className={styles.map}></div>
      {/* <div style = {{height: size.height! * 0.75, width: '100%' }}> */}
      <div>
        {size.width}px / {size.height}px
      </div>
    </PageContainer>
  );
};

// class Map extends React.Component {
//   // const [loading, setLoading] = useState<boolean>(true);
//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     setLoading(false);
//   //   }, 3000);
//   // }, []);

//   componentDidMount() {
//     var map = L.map('map').setView([51.505, -0.09], 13);
//     // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     // maxZoom: 18,
//     // id: 'mapbox/streets-v11',
//     // tileSize: 512,
//     // zoomOffset: -1,
//     // accessToken: 'your.mapbox.access.token'
//     // }).addTo(map);
//     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//       maxZoom: 18,
//     }).addTo(map);
//   }

//   render() {
//     return (
//       <PageContainer
//         content="这是一个新页面，从这里进行开发！"
//         className={styles.main}
//       >
//         {/* <div style={{ paddingTop: 100, textAlign: 'center' }}>
//         <Spin spinning={loading} size="large" />
//         </div> */}
//         <div id="map" className={styles.map}></div>
//       </PageContainer>
//     );
//   }
// }
// export default Map;
