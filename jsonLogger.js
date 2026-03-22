export default function jsonLogger(req, res, next) {
  
  // Normalize IP (convert IPv6 localhost to IPv4)
  let ip = req.ip || req.connection.remoteAddress || '';
  if (ip === '::1') ip = '127.0.0.1';

  // Safely get userID from req.user or header
  //const userID = req.user?.sub || req.user?.email || req.headers["x-verified-user"] || null;
  //userId = req.user["x-verified-user"];
  //const verifiedUser = req.get('X-Verified-User') || null;


  const log = {
    timestamp: new Date().toISOString(),     // ISO format timestamp
    method: req.method,                      // GET, POST, etc.
    path: req.originalUrl,                   // full request path
    sourceIp: ip,
    //user:  req.user.sub || req.user.email // depends on auth middleware
    //user: req.user?.sub || req.user?.email || null
    //userID: req.headers["x-verified-user"],
    UserID: req.user
  };

  console.log(JSON.stringify(log));

  next();
}
