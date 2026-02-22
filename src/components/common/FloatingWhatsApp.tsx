import React, { useMemo } from "react";

const FloatingWhatsApp: React.FC = () => {
  // replace number with real support number if available
  const whatsappUrl = useMemo(
    () =>
      "https://wa.me/91XXXXXXXXXX?text=Hi%20Sutra%20Team,%20I%20need%20help%20with%20my%20order.",
    []
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={
        "fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110"
      }
    >
      {/* WhatsApp icon taken from official brand svg */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.67-1.612-.916-2.21-.242-.578-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.015-1.04 2.473 0 1.458 1.064 2.87 1.213 3.067.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2.003c-5.523 0-9.997 4.475-9.997 9.998 0 1.762.468 3.484 1.356 4.99L2 22l5.186-1.342a9.93 9.93 0 0 0 4.818 1.236h.001c5.523 0 9.997-4.475 9.997-9.998a9.96 9.96 0 0 0-9.998-9.986z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
