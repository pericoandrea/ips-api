const blacklistMock = [
  { _id: { $oid: '60522166fc13ae2d95000000' }, ip: '68.150.35.145' },
  { _id: { $oid: '60522166fc13ae2d95000001' }, ip: '204.149.76.27' },
  { _id: { $oid: '60522166fc13ae2d95000002' }, ip: '9.14.254.130' },
  { _id: { $oid: '60522166fc13ae2d95000003' }, ip: '120.169.250.63' },
  { _id: { $oid: '60522166fc13ae2d95000004' }, ip: '251.236.116.77' },
  { _id: { $oid: '60522166fc13ae2d95000005' }, ip: '204.230.79.19' },
  { _id: { $oid: '60522166fc13ae2d95000006' }, ip: '186.113.210.84' },
  { _id: { $oid: '60522166fc13ae2d95000007' }, ip: '255.218.61.167' },
  { _id: { $oid: '60522166fc13ae2d95000008' }, ip: '237.230.98.14' },
  { _id: { $oid: '60522166fc13ae2d95000009' }, ip: '84.44.100.189' },
];

function filteredBlacklistMock(ip) {
  return blacklistMock.filter((blacklist) =>
    blacklist.ip.includes(ip)
  );
}

class BlacklistServiceMock {
  async getIp({ip}){
    return Promise.resolve(blacklistMock.find((ipInfo) =>
    ipInfo.ip.match(ip)
  ) || {});
  }
  async createIp(){
    return Promise.resolve(blacklistMock[0]._id);
  }
}
module.exports = {
  blacklistMock,
  filteredBlacklistMock,
  BlacklistServiceMock
};
