const AnnouncementBar = () => {
  const announcements = [
    'FREE SHIPPING ON ORDERS OVER $200',
    'HANDCRAFTED IN INDIA – DELIVERED TO USA',
    'EASY 30-DAY RETURNS',
    'AUTHENTIC HERITAGE CRAFTSMANSHIP'
  ];

  return (
    <div className="bg-[#6f4d1e] text-white overflow-hidden">
      <div className="container-luxury py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {announcements.map((announcement, idx) => (
            <span key={idx} className="text-[10px] tracking-[0.15em] uppercase font-medium text-white/95">
              {announcement}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
