/**
 * For simplicity, there is no params validation check,
 * becuase this util function is only used here .
 * Also, I suppose that versionA and versionB are valid semver string .
 */
function isLargerOrEqual(versionA, versionB) {
  if (versionA === versionB)
    return true;

  var ver1 = versionA.substr(1).split('.');
  var ver2 = versionB.substr(1).split('.');

  var len = ver1.length;
  for (var i = 0; i < len; i++) {
    var v1 = parseInt(ver1[i]);
    var v2 = parseInt(ver2[i]);
    if (v1 > v2)
      return true;
    if (v1 < v2)
      return false;
  }
}

if (!isLargerOrEqual(process.version, 'v8.0.0')) {
  console.error('\033[1;31m' + `
    now your node version is lower than v8.0.0, 
    please use node-crc16@1.x.x instead.
`
  );
  process.exit(1);
} else {
  process.exit(0);
}