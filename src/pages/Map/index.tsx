import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect, Component, ReactNode } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import L, { LatLng, LatLngExpression } from 'leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { useRequest } from 'umi';
import { queryPositionByDevice } from './service';
import type { Position } from './data.d';
import { merge } from '@umijs/deps/compiled/lodash';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined;
  height: number | undefined;
}

export default () => {
  // For timeout example.

  // For map initialization
  const [mapInit, setMapInit] = useState<boolean>(false);
  const [map, setMap] = useState<L.Map>();

  function resizeMap(map: L.Map) {
    var h = document.body.clientHeight;
    var mapHeight = Math.floor(h * 0.65);
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
  // const size: Size = useWindowSize();

  // For the position fetching initialization
  function parseDatetime(time: string) {
    let date = time.substring(0, 10);
    let hour_value = Number(time.substring(11, 13));
    let hour = String(hour_value + 8);
    let hms = hour + time.substring(13, 19);

    return { date, hms };
  }

  function pos(): { data: Position; loading: boolean } {
    const { data, loading } = useRequest(
      () => {
        return queryPositionByDevice({
          device_id: 19,
          history: false,
        });
      },
      {
        formatResult: (res) => res,
      },
    );
    const position = data as Position;

    if (!loading && mapInit) {
      var marker = L.marker([
        Number(position.latitude),
        Number(position.longitude),
      ]).addTo(map!);
      console.log(position.time);
      const { date, hms } = parseDatetime(position.time);

      marker
        .bindPopup('<b>最近更新时间：</b><br>' + date + '<br>' + hms)
        .openPopup();
    }
    return { data: position, loading };
  }

  function converToLatLngs(position_list: Position[]) {
    const latlngs: LatLng[] = [];
    for (let i = 0; i < position_list.length; i += 1) {
      // latlngs.push([Number(position_list[i].latitude), Number(position_list[i].longitude)] as LatLng);

      latlngs.push(
        L.latLng(
          Number(position_list[i].latitude),
          Number(position_list[i].longitude),
        ),
      );
    }
    return latlngs;
  }

  function track() {
    const { data, loading } = useRequest(
      () => {
        return queryPositionByDevice({
          device_id: 19,
          history: true,
        });
      },
      {
        formatResult: (res) => res,
      },
    );
    const position_list = data as Position[];
    console.log('pos_list', position_list);

    if (!loading && mapInit) {
      var latlngs = converToLatLngs(position_list);
      var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map!);
    }
  }

  const { data, loading } = pos();
  console.log('data:', data);
  track();

  // var popup = L.popup()
  //   .setLatLng([Number(data.latitude), Number(data.longitude)])
  //   .setContent("I am a standalone popup.")
  //   .openOn(map!);

  return (
    <PageContainer
      content="查看设备的实时定位及历史轨迹"
      className={styles.main}
    >
      {/* <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div> */}

      <div id="map" className={styles.map}></div>
      {/* <div style = {{height: size.height! * 0.75, width: '100%' }}> */}
      {/* <div>
        {size.width}px / {size.height}px
      </div> */}
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
