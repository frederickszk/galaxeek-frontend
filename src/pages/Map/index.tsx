import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect, Component, ReactNode } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import L from 'leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const [mapInit, setMapInit] = useState<boolean>(false);

  useEffect(() => {
    if (!mapInit) {
      var map = L.map('map').setView([51.505, -0.09], 13);
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
      ).addTo(map);

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(map);

      var h = document.body.clientHeight;
      var mapHeight = Math.floor(h * 0.8);

      document.getElementById('map')!.style.height = mapHeight + 'px';
      map.invalidateSize(true);

      setMapInit(true);
    }
  }, [mapInit]);

  return (
    <PageContainer
      content="这是一个新页面，从这里进行开发！"
      className={styles.main}
    >
      {/* <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div> */}

      <div id="map" className={styles.map}></div>
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
