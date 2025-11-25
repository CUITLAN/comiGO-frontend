'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Interfaces
interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapRestaurant {
  id: string | number;
  name: string;
  category?: string;
  logo?: string;
  coordinates?: Coordinates;
  location?: Coordinates;
  [key: string]: any;
}

interface MapExploreProps {
  restaurants: MapRestaurant[];
  centerCoordinates?: { lat: number; lng: number } | null; 
}

// Token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapExplore({ restaurants, centerCoordinates }: MapExploreProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Referencia para limpiar marcadores antiguos

  // 1. Inicializar Mapa (Solo una vez)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Previene doble inicialización
    if (!MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initialLat = centerCoordinates?.lat || 19.4326;
    const initialLng = centerCoordinates?.lng || -99.1332;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialLng, initialLat],
      zoom: 13,
      attributionControl: false,
    });

    // Controles de navegación (Zoom +/-)
    mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup al desmontar
    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Manejar Movimiento (FlyTo) cuando cambia centerCoordinates
  useEffect(() => {
    if (!mapInstanceRef.current || !centerCoordinates) return;

    mapInstanceRef.current.flyTo({
      center: [centerCoordinates.lng, centerCoordinates.lat],
      zoom: 15,
      duration: 2000
    });

    // Opcional: Agregar un marcador temporal para la búsqueda/centro
    // (Podrías manejarlo igual que los restaurantes si quisieras un pin específico)

  }, [centerCoordinates]);

  // 3. Renderizar Marcadores de Restaurantes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filtrar válidos
    const validRestaurants = restaurants.filter(r => r.coordinates || r.location);

    validRestaurants.forEach((restaurant) => {
      const coords = restaurant.coordinates || restaurant.location!;
      
      // --- CREAR ELEMENTO DOM PERSONALIZADO PARA EL PIN ---
      const el = document.createElement('div');
      el.className = 'marker-custom';
      
      // Estructura HTML del Pin (Replicando tu diseño con Tailwind classes traducidas a string)
      // Nota: Usamos un <img> normal porque estamos fuera del ciclo de render de React directo
      const logoHtml = restaurant.logo 
        ? `<img src="${restaurant.logo}" alt="${restaurant.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />` 
        : `<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:#4A7729;">📍</div>`;

      el.innerHTML = `
        <div style="position:relative; display:flex; flex-direction:column; align-items:center; cursor:pointer; transition: transform 0.2s;">
            <div style="width:48px; height:48px; background:white; border-radius:50%; border:2px solid #4A7729; box-shadow:0 4px 6px rgba(0,0,0,0.1); display:flex; justify-content:center; align-items:center; overflow:hidden; z-index:20; position:relative;">
                ${logoHtml}
            </div>
            <div style="width:16px; height:16px; background:white; transform: rotate(45deg); margin-top:-8px; margin-bottom:8px; border-right:2px solid #4A7729; border-bottom:2px solid #4A7729; z-index:10;"></div>
        </div>
      `;

      // Configurar Popup
      const popupHTML = `
        <div style="padding:4px; font-family:sans-serif;">
            <h3 style="font-weight:bold; color:#0C3252; font-size:14px; margin-bottom:4px;">${restaurant.name}</h3>
            ${restaurant.category ? `<span style="background:#dcfce7; color:#166534; font-size:10px; padding:2px 6px; border-radius:99px;">${restaurant.category}</span>` : ''}
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(popupHTML);

      // Crear y añadir marcador
      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup) // Enlazar popup
        .addTo(mapInstanceRef.current!);

      // Efecto hover simple en JS
      el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.1)';
          el.style.zIndex = '50';
          marker.togglePopup(); // Mostrar popup al hover
      });
      el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.zIndex = 'auto';
          marker.togglePopup(); // Ocultar popup
      });

      markersRef.current.push(marker);
    });

    // Marcador Central (Si existe)
    if (centerCoordinates) {
        const centerEl = document.createElement('div');
        centerEl.innerHTML = '<div style="font-size:32px; filter: hue-rotate(90deg); drop-shadow: 0 2px 4px rgba(0,0,0,0.2);">📍</div>';
        const centerMarker = new mapboxgl.Marker({ element: centerEl, anchor: 'bottom' })
            .setLngLat([centerCoordinates.lng, centerCoordinates.lat])
            .addTo(mapInstanceRef.current);
        markersRef.current.push(centerMarker);
    }

  }, [restaurants, centerCoordinates]); // Se re-ejecuta si cambian los restaurantes

  if (!MAPBOX_TOKEN) {
     return (
       <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100 text-xs p-4">
         Falta Token
       </div>
     );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-gray-200 relative bg-gray-50">
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}