"use client"

import React, { useEffect, useState } from "react"
import { CalendarDays, Globe, Wifi } from "lucide-react"
import { motion } from "framer-motion"

interface DeviceInfo {
  date: string;
  system: string;
  ipAddress: string;
  isp: string;
}

export function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    date: formatDate(new Date()),
    system: "Đang tải...",
    ipAddress: "Đang tải...",
    isp: "Đang tải..."
  })
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Phát hiện thông tin hệ thống chính xác hơn
    const getSystemInfo = () => {
      const ua = window.navigator.userAgent;
      let os = "Không xác định";
      let browser = "Không xác định";
      
      // Phát hiện hệ điều hành
      if (/Windows NT 10.0/.test(ua)) os = "Windows 10";
      else if (/Windows NT 6.3/.test(ua)) os = "Windows 8.1";
      else if (/Windows NT 6.2/.test(ua)) os = "Windows 8";
      else if (/Windows NT 6.1/.test(ua)) os = "Windows 7";
      else if (/Mac/.test(ua)) os = "macOS";
      else if (/Android/.test(ua)) os = "Android";
      else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
      else if (/Linux/.test(ua)) os = "Linux";
      
      // Phát hiện trình duyệt
      if (/Edg/.test(ua)) browser = "Microsoft Edge";
      else if (/Firefox\//.test(ua)) browser = "Mozilla Firefox";
      else if (/OPR\/|Opera\//.test(ua)) browser = "Opera";
      else if (/Chrome\//.test(ua)) browser = "Google Chrome";
      else if (/Safari\//.test(ua)) browser = "Safari";
      else if (/Trident\/|MSIE/.test(ua)) browser = "Internet Explorer";
      
      return `${os} - ${browser}`;
    };
    
    // Lấy thông tin IP và ISP
    const getIpInfo = async () => {
      try {
        // 1. Lấy địa chỉ IP trước
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        
        if (!ipResponse.ok) {
          throw new Error(`Lỗi khi lấy địa chỉ IP: ${ipResponse.status}`);
        }
        
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        
        // Set IP trước, các thông tin khác sẽ được cập nhật sau
        setDeviceInfo(prev => ({
          ...prev,
          system: getSystemInfo(),
          ipAddress: ip || "Không xác định"
        }));
        
        // 2. Thử dùng ip-api.com (không cần token, dữ liệu chi tiết)
        try {
          const geoResponse = await fetch(`https://ip-api.com/json/${ip}?fields=isp,org`);
          
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            // Ưu tiên org nếu có, nếu không thì dùng isp
            let ispInfo = geoData.org || geoData.isp || "Không xác định";
            
            // Cập nhật state với thông tin mới
            setDeviceInfo(prev => ({
              ...prev,
              isp: ispInfo
            }));
            
            return; // Kết thúc nếu API này thành công
          }
        } catch (error) {
          console.log("Không lấy được dữ liệu từ ip-api.com, thử phương án khác.");
        }
        
        // 3. Thử dùng ipwhois.app (backup API)
        try {
          const whoisResponse = await fetch(`https://ipwhois.app/json/${ip}`);
          
          if (whoisResponse.ok) {
            const whoisData = await whoisResponse.json();
            
            // Cập nhật state với thông tin mới
            setDeviceInfo(prev => ({
              ...prev,
              isp: whoisData.isp || "Không xác định"
            }));
            
            return; // Kết thúc nếu API này thành công
          }
        } catch (error) {
          console.log("Không lấy được dữ liệu từ ipwhois.app, thử phương án khác.");
        }
        
        // 4. Phương án cuối cùng - ipapi.co (giống code cũ)
        try {
          const apiResponse = await fetch(`https://ipapi.co/${ip}/json/`);
          
          if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            
            // Xử lý thông tin ISP
            let ispInfo = apiData.org || "Không xác định";
            if (ispInfo && ispInfo.startsWith("AS")) {
              const orgParts = ispInfo.split(" ");
              if (orgParts.length > 1) {
                ispInfo = orgParts.slice(1).join(" ");
              }
            }
            
            // Cập nhật state với thông tin mới
            setDeviceInfo(prev => ({
              ...prev,
              isp: ispInfo
            }));
          }
        } catch (error) {
          console.error("Không thể lấy thông tin ISP:", error);
          setDeviceInfo(prev => ({
            ...prev,
            isp: "Không thể xác định"
          }));
        }
        
      } catch (error) {
        console.error("Lỗi khi tải thông tin IP:", error);
        
        // Ít nhất vẫn hiển thị thông tin hệ thống nếu không lấy được IP
        setDeviceInfo(prev => ({
          ...prev,
          system: getSystemInfo(),
          ipAddress: "Không thể tải",
          isp: "Không thể tải"
        }));
      } finally {
        setIsLoading(false);
      }
    };
    
    // Thực hiện lấy thông tin
    getIpInfo();
    
    // Cập nhật ngày mỗi phút
    const intervalId = setInterval(() => {
      setDeviceInfo(prev => ({
        ...prev,
        date: formatDate(new Date())
      }));
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Định dạng ngày tháng theo kiểu Việt Nam: DD/MM/YYYY
  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  // Xác định biểu tượng hệ điều hành
  const getOsIcon = () => {
    const system = deviceInfo.system.toLowerCase();
    if (system.includes("windows")) return "fab fa-windows";
    if (system.includes("macos")) return "fab fa-apple";
    if (system.includes("ios")) return "fab fa-apple";
    if (system.includes("android")) return "fab fa-android";
    if (system.includes("linux")) return "fab fa-linux";
    return "fas fa-desktop";
  };
  
  // Xác định biểu tượng nhà mạng
  const getIspIcon = () => {
    const isp = deviceInfo.isp.toLowerCase();
    if (isp.includes("viettel")) return "https://play-lh.googleusercontent.com/P2iJIqZ49qIEONco_ngViQNU11PHqM_f7_uAeMpUircHkfxGJ1xsrZujhGtg4elRe9k";
    if (isp.includes("vnpt") || isp.includes("vinaphone")) return "https://vnptgroup.vn/wp-content/uploads/2020/06/cropped-logo-vnpt-2.jpg";
    if (isp.includes("fpt")) return "/images/https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png";
    if (isp.includes("mobifone")) return "/images/mobifone-logo.svg";
    if (isp.includes("cmctelecom") || isp.includes("cmc")) return "/images/cmc-logo.svg";
    return null;
  };
  
  const ispIcon = getIspIcon();

  return (
    <motion.div 
      className="flex items-center justify-center gap-4 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-border/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CalendarDays className="h-3 w-3 text-primary/60" />
        <span>{deviceInfo.date}</span>
      </motion.div>
      
      <div className="h-3 w-px bg-border/50" />
      
      <motion.div 
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className={`${getOsIcon()} h-3 w-3 text-primary/60`}></i>
        <span>{deviceInfo.system}</span>
      </motion.div>
      
      <div className="h-3 w-px bg-border/50" />
      
      <motion.div 
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {ispIcon ? (
          <img src={ispIcon} alt="ISP" className="h-3 w-3 object-contain" />
        ) : (
          <Wifi className="h-3 w-3 text-primary/60" />
        )}
        <span>{deviceInfo.isp}</span>
      </motion.div>
      
      <div className="h-3 w-px bg-border/50" />
      
      <motion.div 
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="h-3 w-3 text-primary/60" />
        <span>{deviceInfo.ipAddress}</span>
      </motion.div>
    </motion.div>
  )
}
