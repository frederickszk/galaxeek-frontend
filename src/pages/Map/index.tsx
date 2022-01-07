import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect, Component, ReactNode } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import L from 'leaflet';
import React from 'react';

// const Map: React.Component = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   componentDidMount()

//   const setupMap = () => {
//     var map = L.map('map').setView([51.505, -0.09], 13);
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
//     }).addTo(map);
//   }

//   return (
//     <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>

//       <div style={{ paddingTop: 100, textAlign: 'center' }}>
//         <Spin spinning={loading} size="large" />
//       </div>

//       <div id="map"></div>
//       {setupMap()}

//     </PageContainer>
//   );
// }

class Map extends React.Component {
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  componentDidMount() {
    var map = L.map('map').setView([51.505, -0.09], 13);
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    // accessToken: 'your.mapbox.access.token'
    // }).addTo(map);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
  }

  render() {
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
  }
}
export default Map;
