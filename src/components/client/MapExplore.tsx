'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Importamos useRouter para navegación SPA
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
  // FIX: Agregamos la propiedad faltante a la interfaz
  baseDetailPath?: string; 
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapExplore({ restaurants, centerCoordinates, baseDetailPath }: MapExploreProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); 
  const router = useRouter(); // Hook para navegar sin recargar

  // 1. Inicializar Mapa (Solo una vez)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; 
    if (!MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initialLat = centerCoordinates?.lat || 20.5888;
    const initialLng = centerCoordinates?.lng || -100.3899;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialLng, initialLat],
      zoom: 13,
      attributionControl: false,
    });

    mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []); 

  // 2. Mover el mapa cuando cambian las coordenadas
  useEffect(() => {
    if (!mapInstanceRef.current || !centerCoordinates) return;

    mapInstanceRef.current.flyTo({
      center: [centerCoordinates.lng, centerCoordinates.lat],
      zoom: 15,
      duration: 2000
    });
  }, [centerCoordinates]);

  // 3. Renderizar Marcadores y Popups Interactivos
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Limpiar anteriores
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const validRestaurants = restaurants.filter(r => r.coordinates || r.location);

    validRestaurants.forEach((restaurant) => {
      const coords = restaurant.coordinates || restaurant.location!;
      
      // --- PIN (Marcador) ---
      const el = document.createElement('div');
      el.className = 'marker-custom';
      el.style.cursor = 'pointer';
      
      const logoHtml = restaurant.logo 
        ? `<img src="${restaurant.logo}" alt="${restaurant.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />` 
        : `<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:#4A7729;">📍</div>`;

      el.innerHTML = `
        <div style="position:relative; display:flex; flex-direction:column; align-items:center; transition: transform 0.2s;">
            <div style="width:40px; height:40px; background:white; border-radius:50%; border:2px solid #4A7729; box-shadow:0 4px 6px rgba(0,0,0,0.1); display:flex; justify-content:center; align-items:center; overflow:hidden; z-index:20;">
                ${logoHtml}
            </div>
            <div style="width:12px; height:12px; background:white; transform: rotate(45deg); margin-top:-6px; border-right:2px solid #4A7729; border-bottom:2px solid #4A7729; z-index:10;"></div>
        </div>
      `;

      // --- POPUP (Contenido Dinámico) ---
      // Usamos document.createElement para poder agregar eventos de click reales (Router)
      const popupNode = document.createElement('div');
      popupNode.style.padding = '4px';
      popupNode.style.color = 'black';
      popupNode.style.fontFamily = 'sans-serif';

      // Título y Categoría
      const infoDiv = document.createElement('div');
      infoDiv.innerHTML = `
        <h3 style="font-weight:bold; font-size:13px; margin:0 0 2px 0;">${restaurant.name}</h3>
        ${restaurant.category ? `<span style="font-size:10px; color:#666; background:#eee; padding:2px 6px; border-radius:10px;">${restaurant.category}</span>` : ''}
      `;
      popupNode.appendChild(infoDiv);

      // Botón de Ver Detalles (Solo si existe baseDetailPath)
      if (baseDetailPath) {
        const btn = document.createElement('button');
        btn.innerText = 'Ver detalles';
        // Estilos inline para el botón
        btn.style.marginTop = '8px';
        btn.style.width = '100%';
        btn.style.backgroundColor = 'transparent';
        btn.style.color = '#4A7729';
        btn.style.border = 'none';
        btn.style.fontSize = '12px';
        btn.style.fontWeight = 'bold';
        btn.style.cursor = 'pointer';
        btn.style.textAlign = 'left';
        btn.style.padding = '0';
        btn.style.textDecoration = 'underline';
        
        // FIX: Aquí usamos el router de Next.js para navegar sin recargar
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita cerrar el popup
            router.push(`${baseDetailPath}/${restaurant.id}`);
        });

        popupNode.appendChild(btn);
      }

      // Crear Popup usando setDOMContent (no setHTML)
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setDOMContent(popupNode);

      // Añadir marcador
      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(mapInstanceRef.current!);

      // Eventos Hover
      el.addEventListener('mouseenter', () => {
          el.style.zIndex = '50';
          el.style.transform = 'scale(1.1)';
          marker.togglePopup();
      });
      el.addEventListener('mouseleave', () => {
          el.style.zIndex = 'auto';
          el.style.transform = 'scale(1)';
          // Opcional: marker.togglePopup(); // Si quieres que se cierre al salir
      });

      markersRef.current.push(marker);
    });

    // Marcador central
    if (centerCoordinates) {
        const centerEl = document.createElement('div');
        centerEl.innerHTML = '<div style="font-size:32px; filter: hue-rotate(90deg); drop-shadow: 0 2px 4px rgba(0,0,0,0.2);">📍</div>';
        const centerMarker = new mapboxgl.Marker({ element: centerEl, anchor: 'bottom' })
            .setLngLat([centerCoordinates.lng, centerCoordinates.lat])
            .addTo(mapInstanceRef.current);
        markersRef.current.push(centerMarker);
    }

  }, [restaurants, centerCoordinates, baseDetailPath, router]); 

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