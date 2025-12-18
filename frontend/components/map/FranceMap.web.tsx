import React, { useEffect, useRef } from "react";
import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";

import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import Overlay from "ol/Overlay";
import { PARIS_BARS } from "@constants/bars-paris";
import type { Coordinate as Props } from "@components/map/Coordinate";

export default function FranceMapWeb({ latitude, longitude }: Props) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const popupEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapEl.current || !popupEl.current || mapRef.current) return;

    const center = fromLonLat([longitude ?? 2.3522, latitude ?? 48.8566]);

    // Source des bars
    const source = new VectorSource();

    PARIS_BARS.forEach((bar) => {
      const f = new Feature({
        geometry: new Point(fromLonLat([bar.longitude, bar.latitude])),
        name: bar.name,
        arrondissement: bar.arrondissement,
        color: bar.color,
      });

      // 🎨 Style coloré + numéro d’arrondissement
      f.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 9,
            fill: new Fill({ color: bar.color }),
            stroke: new Stroke({ color: "rgba(255,255,255,0.9)", width: 2 }),
          }),
          text: new Text({
            text: String(bar.arrondissement),
            offsetY: 0,
            fill: new Fill({ color: "#111" }),
            stroke: new Stroke({ color: "rgba(255,255,255,0.85)", width: 3 }),
            font: "bold 12px system-ui",
          }),
        })
      );

      source.addFeature(f);
    });

    // Option : position utilisateur
    if (latitude && longitude) {
      const me = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
        name: "Moi",
      });

      me.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 8,
            fill: new Fill({ color: "#4D96FF" }),
            stroke: new Stroke({ color: "rgba(255,255,255,0.9)", width: 2 }),
          }),
        })
      );

      source.addFeature(me);
    }

    const vectorLayer = new VectorLayer({ source });

    const popupOverlay = new Overlay({
      element: popupEl.current,
      autoPan: {
        animation: { duration: 220 },
      },
      offset: [0, -14],
      positioning: "bottom-center",
    });

    const map = new Map({
      target: mapEl.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      overlays: [popupOverlay],
      view: new View({
        center,
        zoom: 12,
      }),
    });

    map.on("singleclick", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (ft) => ft as Feature);

      if (!feature) {
        popupOverlay.setPosition(undefined);
        popupEl.current!.style.display = "none";
        return;
      }

      const name = feature.get("name");
      const arr = feature.get("arrondissement");

      // Affichage popup
      popupEl.current!.innerHTML = `
        <div style="
          background: rgba(15,15,15,.95);
          border: 1px solid rgba(255,255,255,.12);
          padding: 10px 12px;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,.35);
          color: white;
          font-family: system-ui;
          min-width: 160px;
          backdrop-filter: blur(8px);
        ">
          <div style="font-weight: 800; font-size: 14px;">${name}</div>
          ${arr ? `<div style="opacity:.8; margin-top: 4px;">Paris ${arr}e</div>` : ""}
        </div>
      `;

      popupEl.current!.style.display = "block";
      popupOverlay.setPosition(evt.coordinate);
    });

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={mapEl} style={{ width: "100%", height: "100%" }} />
      {/* élément popup (OpenLayers Overlay) */}
      <div ref={popupEl} style={{ display: "none" }} />
    </div>
  );
}
