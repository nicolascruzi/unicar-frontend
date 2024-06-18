import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Initialize the Loader once
const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
  version: 'weekly',
  libraries: ['geometry'],
});

const MapComponent = ({ center, zoom }) => {
  const googleMapRef = useRef(null);

  // Assuming your encoded polyline data
  const encodedPolyline = 'pwpjEz}omLTwB`@oDNq@@]p@iBx@uB^]POh@p@bArAZk@|BsD`AcAt@k@nAm@RMp@SvB]f@jGr@fIZlBRtAP|BV|CLhBPnBLt@Vr@~CnFp@fA`BtBdAfAFNp@l@fBzAr@n@r@`@z@\\pAV|EZrELtF\\xJj@dCTV?~@KpA]z@Y~@[f@Ix@ApATrAR|@F|ALjAX|ChAx@Tn@HzA@z@Kz@WbAg@|AsAvCqClBgCNYj@aAh@kALu@@YEcCFiAPm@~@uBPc@f@mC\\i@d@Q`@@ZJZ`@Nd@Rr@IpBSnBc@nBa@rAwApDyAhDyArDg@|Am@tCg@hDStE?`BLxD`@nDf@rCzBzJd@tCJv@TjCNnCr@hN^fIr@lLXpElA`Uf@bMZ~F\\vCdAvEpCpJtAvFd@vAfCvIr@jCd@xBr@tE^~C`@vEj@lHvA|R~@vMZhD`@zBhAjD~@dBdPfTdClDfJ`M|@pAzBxDlBvCzG|I|@lAlCbCdA|@|BpArLjGjCfAfB`@|AH~LAjKMvBO|Gm@`B@nARnFlAbIhBzDx@|FxAdCv@|Al@xAn@j@PxCl@`APnCXfGf@pF|@~CnAn@XhAv@xDxDbAz@v@x@xE~FfGtJpA|Dd@zBZxAjCdNxAlH~@`Dx@xBd@z@x@|AZ`@`AjAvBtB`DhBxC|@dJxBbAZnBn@xAr@pDtBhDdCr@r@tCvCxCfD|BlDfB`E~GlQj@bB`@xATpALfCEpBq@~FkAdIeA~BuBdGWb@GXOl@g@vByAtGpBb@nDl@vDz@z@\\tA\\jDOjABP@n@LnKnElA`@nANz@OdCqAh@a@p@oAt@sEl@gE^qCf@_FHqCCeAMmAYgBuAwGqCkN`@KxAQhMoChHyAhA[~AWz@G`Do@pCm@|IeBdFeA~Cm@tIiBhD{@fAKrCg@vRuDz[gGlI_BhEy@vBc@lF}@jAe@n@g@jAaC~@kBj@u@ZMh@MfD]jFaAvDm@DALC\\G\\EDAzEu@Cs@eB^oE|@eGt@i@AIG{@{Ag@wAQcAKaAEoAS{DGyBOwFOmHQgIGaC?UFM@EEgCXBvCEbDYtEUvAEhK[vKYjPq@|N[jLc@bAW|BcBbAS~E[dRy@r@A\\Er@S|@_@bAu@nEsErJ_MtAuBxDmFpA}A|@Yl@EtYbBQxFOrFS|DG~@c@EAXA~@EbAM|BKvCMzBWdIAB_@BCvAGn@GFuCf@kBT';

  useEffect(() => {
    loader.load().then(() => {
      if (!googleMapRef.current) return;

      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        center: center,
        zoom: zoom,
      });

      // // Create a marker and set its position.
      // new window.google.maps.Marker({
      //   map: googleMap,
      //   position: center,
      // });

      // Check if the geometry library is loaded
      if (!window.google.maps.geometry || !window.google.maps.geometry.encoding) {
        console.error('Geometry library not loaded.');
        return;
      }

      // Decode the polyline using Google Maps API's geometry library
      const decodedPath = window.google.maps.geometry.encoding.decodePath(encodedPolyline);
      console.log("DECODED PATH", decodedPath);

      // Create a polyline to display the route
      const routePath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      // Set the map to display the polyline
      routePath.setMap(googleMap);
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }, [center, zoom, encodedPolyline]);

  return <div ref={googleMapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;

