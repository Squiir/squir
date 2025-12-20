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

import Overlay from "ol/Overlay";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";

import { PARIS_BARS } from "@constants/bars-paris";
import type { Coordinate } from "@components/map/Coordinate";
import { useGenerateQrCode } from "@hooks/use-generate-qrcode";
import { API_URL } from "@services/api";
import { getToken } from "@services/token";

export default function FranceMapWeb({ latitude, longitude }: Coordinate) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const popupEl = useRef<HTMLDivElement | null>(null);
  const popupOverlayRef = useRef<Overlay | null>(null);

  const genQr = useGenerateQrCode();

  useEffect(() => {
    if (!mapEl.current) return;

    const center = fromLonLat([longitude ?? 2.3522, latitude ?? 48.8566]);

    // Vector source + features
    const vectorSource = new VectorSource();
    PARIS_BARS.forEach((bar) => {
      const f = new Feature({
        geometry: new Point(fromLonLat([bar.longitude, bar.latitude])),
        name: bar.name,
        barId: bar.id,
        arrondissement: bar.arrondissement,
      });
      vectorSource.addFeature(f);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) =>
        new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "rgba(255, 120, 180, 0.9)" }),
            stroke: new Stroke({ color: "rgba(255,255,255,0.8)", width: 2 }),
          }),
          text: new Text({
            text: feature.get("name"),
            offsetY: -18,
            fill: new Fill({ color: "white" }),
            stroke: new Stroke({ color: "rgba(0,0,0,0.7)", width: 3 }),
          }),
        }),
    });

    // Popup overlay
    const popupOverlay = new Overlay({
      element: popupEl.current as HTMLElement,
      positioning: "bottom-center",
      offset: [0, -12],
      stopEvent: true,
    });
    popupOverlayRef.current = popupOverlay;

    const map = new Map({
      target: mapEl.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      overlays: [popupOverlay],
      view: new View({ center, zoom: 12 }),
    });

    map.on("singleclick", async (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f as Feature);

      if (!feature) {
        popupOverlay.setPosition(undefined);
        if (popupEl.current) popupEl.current.style.display = "none";
        return;
      }

      const name = feature.get("name");
      const arr = feature.get("arrondissement");
      const barId = feature.get("barId");

      // popup "loading"
      if (popupEl.current) {
        popupEl.current.innerHTML = `
          <div style="
            background: rgba(15,15,15,.95);
            border: 1px solid rgba(255,255,255,.12);
            padding: 10px 12px;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,.35);
            color: white;
            font-family: system-ui;
            min-width: 200px;
          ">
            <div style="font-weight: 800; font-size: 14px;">${name}</div>
            ${arr ? `<div style="opacity:.8; margin-top: 4px;">Paris ${arr}e</div>` : ""}
            <div style="opacity:.7; margin-top: 10px;">Génération du QR…</div>
          </div>
        `;
        popupEl.current.style.display = "block";
      }
      popupOverlay.setPosition(evt.coordinate);

      try {
        // 1) generate
        const qr = await genQr.mutateAsync({
          barId,
          productId: "product-default",
          label: `QR ${name}`,
        });

        // 2) fetch png as blob with Authorization
        const token = await getToken();
        const pngRes = await fetch(`${API_URL}/qrcodes/${qr.id}.png`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        if (!pngRes.ok) {
          throw new Error(`PNG HTTP ${pngRes.status}`);
        }

        const blob = await pngRes.blob();
        const objectUrl = URL.createObjectURL(blob);

        if (popupEl.current) {
          popupEl.current.innerHTML = `
            <div style="
              background: rgba(15,15,15,.95);
              border: 1px solid rgba(255,255,255,.12);
              padding: 10px 12px;
              border-radius: 14px;
              box-shadow: 0 10px 30px rgba(0,0,0,.35);
              color: white;
              font-family: system-ui;
              min-width: 220px;
            ">
              <div style="font-weight: 800; font-size: 14px;">${qr.label || name}</div>
              <div style="opacity:.8; margin-top: 8px; display:flex; justify-content:center;">
                <img src="${objectUrl}" style="width:200px; height:200px; border-radius:14px; object-fit:contain;" />
              </div>
            </div>
          `;
          popupEl.current.style.display = "block";
        }
      } catch (e: any) {
        if (popupEl.current) {
          popupEl.current.innerHTML = `
            <div style="
              background: rgba(15,15,15,.95);
              border: 1px solid rgba(255,255,255,.12);
              padding: 10px 12px;
              border-radius: 14px;
              box-shadow: 0 10px 30px rgba(0,0,0,.35);
              color: white;
              font-family: system-ui;
              min-width: 220px;
            ">
              <div style="font-weight: 800; font-size: 14px;">Erreur</div>
              <div style="opacity:.75; margin-top: 6px;">${e?.message ?? "Impossible de générer le QR"}</div>
            </div>
          `;
          popupEl.current.style.display = "block";
        }
      }
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
      <div ref={popupEl} style={{ display: "none" }} />
    </div>
  );
}
